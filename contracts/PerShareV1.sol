// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// ─────────────────────────────────────────────────────────────────────────────
// PerShare V1 — Onchain collective payment pool
// Short name: SHARE
// Chain     : BNB Chain (BSC)
// Standard  : BEP-20 / ERC-20
//
// PHASE 1 - USDT Collection + collective validation + sending to destination
// PHASE 2 - BEP-20 presale tokens reception + validation + redistribution
//
// "SHARE - every member gets their share. Automatically."
// ─────────────────────────────────────────────────────────────────────────────

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract PerShare is ReentrancyGuard, Pausable, Ownable {
    using SafeERC20 for IERC20;

    // ─── Constants ────────────────────────────────────────────────────────────

    uint256 public constant MAX_MEMBERS    = 50;
    uint256 public feeBPS = 100; // 100 BPS = 1%
    address public feeRecipient;

    // Platform Token (dormant for V1)
    address public platformToken;
    uint256 public discountThreshold = 10_000 ether;

    // ─── Main structure - a SHARE ────────────────────────────────────────────

    struct Share {
        string    name;
        address   creator;
        address[] members;
        address   stablecoin;
        address   destination;
        uint256   targetAmount;
        uint256   deadline;
        uint256   threshold;
        uint256   totalReceived;
        uint256   totalTokensReceived; // Snapshot of tokens available for this share (Phase 2)
        bool      sent;
        bool      refunded;
        bool      tokensDistributed;
        address   expectedToken;
    }

    // ─── Storage ──────────────────────────────────────────────────────────────

    uint256 public shareCount;
    mapping(uint256 => Share) private shares;

    // Phase 1
    mapping(uint256 => mapping(address => uint256)) public contributions;
    mapping(uint256 => mapping(address => bool))    public isMember;
    mapping(uint256 => mapping(address => bool))    public validations;
    mapping(uint256 => uint256)                     public validationCount;
    mapping(uint256 => mapping(address => bool))    public hasClaimedRefund;

    // Phase 2
    mapping(uint256 => mapping(address => bool))   public distValidations;
    mapping(uint256 => uint256)                    public distValidationCount;
    mapping(uint256 => mapping(address => uint256)) public tokensClaimed;
    mapping(uint256 => uint256)                    public globalTokensClaimed;

    // Global registry to prevent token reuse/cross-share attacks
    mapping(address => bool) public isExpectedToken;
    mapping(address => bool) public isStablecoin;

    // ─── Events ───────────────────────────────────────────────────────────────

    event ShareCreated(
        uint256 indexed id,
        string  name,
        address indexed creator,
        address destination,
        uint256 targetAmount,
        uint256 deadline,
        uint256 threshold
    );

    event ContributionReceived(
        uint256 indexed id,
        address indexed member,
        uint256 amount,
        uint256 totalReceived
    );

    event ValidationAdded(
        uint256 indexed id,
        address indexed member,
        uint256 count,
        uint256 threshold
    );

    event FundsSent(
        uint256 indexed id,
        address indexed destination,
        uint256 amount,
        uint256 commission
    );

    event FundsRefunded(uint256 indexed id);

    event RefundClaimed(
        uint256 indexed id,
        address indexed member,
        uint256 amount
    );

    event DistValidationAdded(
        uint256 indexed id,
        address indexed member,
        uint256 count,
        uint256 threshold
    );

    event TokensDistributed(
        uint256 indexed id,
        address indexed token,
        uint256 totalAmount
    );

    event DistributionClaimed(
        uint256 indexed id,
        address indexed member,
        uint256 amount
    );

    event TokensDeposited(
        uint256 indexed id,
        address indexed from,
        uint256 amount,
        uint256 totalTokensReceived
    );

    event ExpectedTokenSet(
        uint256 indexed id,
        address indexed token
    );

    event DustSwept(
        uint256 indexed id,
        address indexed creator,
        uint256 amount
    );

    event PlatformTokenSet(address indexed token);
    event FeeUpdated(uint256 newFeeBPS);
    event FeeRecipientUpdated(address indexed newRecipient);
    event DiscountThresholdUpdated(uint256 newThreshold);

    // ─── Modifiers ────────────────────────────────────────────────────────────

    modifier onlyMember(uint256 id) {
        require(isMember[id][msg.sender], "PerShare: not a member");
        _;
    }

    modifier notClosed(uint256 id) {
        require(!shares[id].sent,     "PerShare: already sent");
        require(!shares[id].refunded, "PerShare: already refunded");
        _;
    }

    modifier onlyShareCreator(uint256 id) {
        require(msg.sender == shares[id].creator, "PerShare: not the creator");
        _;
    }

    // ─── Constructor ──────────────────────────────────────────────────────────

    constructor(address _feeRecipient) Ownable(msg.sender) {
        require(_feeRecipient != address(0), "PerShare: invalid feeRecipient");
        feeRecipient = _feeRecipient;
    }

    // ─── Admin functions ─────────────────────────────────────────────────────

    function setFeeBPS(uint256 _feeBPS) external onlyOwner {
        require(_feeBPS <= 200, "PerShare: fee max 200 BPS");
        feeBPS = _feeBPS;
        emit FeeUpdated(_feeBPS);
    }

    function setFeeRecipient(address _feeRecipient) external onlyOwner {
        require(_feeRecipient != address(0), "PerShare: invalid address");
        feeRecipient = _feeRecipient;
        emit FeeRecipientUpdated(_feeRecipient);
    }

    function setPlatformToken(address _token) external onlyOwner {
        platformToken = _token;
        emit PlatformTokenSet(_token);
    }

    function setDiscountThreshold(uint256 _threshold) external onlyOwner {
        require(_threshold > 0, "PerShare: invalid threshold");
        discountThreshold = _threshold;
        emit DiscountThresholdUpdated(_threshold);
    }

    function getEffectiveFee(address user) public view returns (uint256) {
        if (platformToken == address(0)) return feeBPS;
        try IERC20(platformToken).balanceOf(user) returns (uint256 balance) {
            if (balance >= discountThreshold) return 0;
            return feeBPS;
        } catch {
            return feeBPS;
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // FUNCTION 1 - Create a SHARE
    // ─────────────────────────────────────────────────────────────────────────

    function createShare(
        string   memory name,
        address[] memory members,
        address  stablecoin,
        address  destination,
        uint256  targetAmount,
        uint256  deadline,
        uint256  threshold
    ) external whenNotPaused returns (uint256) {

        require(bytes(name).length > 0,       "PerShare: name required");
        require(members.length >= 2,           "PerShare: min 2 members");
        require(members.length <= MAX_MEMBERS, "PerShare: max 50 members");
        require(stablecoin  != address(0),     "PerShare: invalid stablecoin");
        require(destination != address(0),     "PerShare: invalid destination");
        require(targetAmount > 0,              "PerShare: target required");
        require(deadline > block.timestamp,    "PerShare: deadline must be in future");
        require(threshold >= 1,                "PerShare: min 1 threshold");
        require(threshold <= members.length,   "PerShare: threshold > members");

        uint256 id = shareCount;

        for (uint256 i = 0; i < members.length; i++) {
            require(members[i] != address(0), "PerShare: invalid member");
            require(!isMember[id][members[i]], "PerShare: duplicate member");
            isMember[id][members[i]] = true;
        }

        Share storage s = shares[id];
        s.name              = name;
        s.creator           = msg.sender;
        s.members           = members;
        s.stablecoin        = stablecoin;
        s.destination       = destination;
        s.targetAmount      = targetAmount;
        s.deadline          = deadline;
        s.threshold         = threshold;

        // Register stablecoin globally to prevent it from being swept
        if (!isStablecoin[stablecoin]) {
            isStablecoin[stablecoin] = true;
        }

        shareCount++;

        emit ShareCreated(id, name, msg.sender, destination, targetAmount, deadline, threshold);
        return id;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // FUNCTION 2 - Contribute to a SHARE
    // ─────────────────────────────────────────────────────────────────────────

    function contribute(
        uint256 id,
        uint256 amount
    ) external onlyMember(id) notClosed(id) whenNotPaused nonReentrant {

        Share storage s = shares[id];

        require(block.timestamp <= s.deadline, "PerShare: deadline passed");
        require(amount > 0,                    "PerShare: amount required");

        // Measure actual received amount (protects against fee-on-transfer tokens)
        uint256 balanceBefore = IERC20(s.stablecoin).balanceOf(address(this));
        IERC20(s.stablecoin).safeTransferFrom(msg.sender, address(this), amount);
        uint256 received = IERC20(s.stablecoin).balanceOf(address(this)) - balanceBefore;

        require(received > 0, "PerShare: zero tokens received");

        contributions[id][msg.sender] += received;
        s.totalReceived               += received;

        emit ContributionReceived(id, msg.sender, received, s.totalReceived);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // FUNCTION 3 - Validate sending (Phase 1)
    // ─────────────────────────────────────────────────────────────────────────

    function validate(uint256 id) external onlyMember(id) notClosed(id) whenNotPaused nonReentrant {

        Share storage s = shares[id];

        // 🔒 FIX: Sending only allowed before deadline (prevents post-deadline race)
        require(block.timestamp <= s.deadline, "PerShare: deadline passed");
        require(
            s.totalReceived >= s.targetAmount,
            "PerShare: target not reached"
        );
        require(
            !validations[id][msg.sender],
            "PerShare: already validated"
        );

        validations[id][msg.sender] = true;
        validationCount[id]++;

        emit ValidationAdded(id, msg.sender, validationCount[id], s.threshold);

        if (validationCount[id] >= s.threshold) {
            _sendFunds(id);
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // FUNCTION 4 - Send funds (Internal Phase 1)
    // ─────────────────────────────────────────────────────────────────────────

    function _sendFunds(uint256 id) internal {

        Share storage s = shares[id];
        require(!s.sent, "PerShare: already sent");
        s.sent = true;

        uint256 total      = s.totalReceived;
        uint256 effectiveFee = getEffectiveFee(s.creator);
        uint256 commission = (total * effectiveFee) / 10000;
        uint256 toSend     = total - commission;

        IERC20(s.stablecoin).safeTransfer(s.destination, toSend);

        if (commission > 0) {
            IERC20(s.stablecoin).safeTransfer(feeRecipient, commission);
        }

        emit FundsSent(id, s.destination, toSend, commission);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // FUNCTION 4b - Deposit presale tokens for a share (explicit accounting)
    //
    // 🔒 HERMETIC CORE: tokens are credited to a share ONLY through this function,
    // via an accounted transferFrom. The contract therefore knows EXACTLY how many
    // tokens belong to each share and never has to infer it from its global balance.
    // The depositor (the share creator who claimed/received from the presale, or the
    // presale itself if it can approve) must approve this contract first, then call
    // depositTokens. Raw transfers to the contract are NOT credited (use sweepLostTokens).
    //
    // Callable for late tranches too (even after distribution): it simply increases
    // totalTokensReceived, and members can then claim the additional pro-rata amount.
    // ─────────────────────────────────────────────────────────────────────────

    function depositTokens(uint256 id, uint256 amount) external whenNotPaused nonReentrant {
        Share storage s = shares[id];

        require(s.sent,                        "PerShare: phase 1 not finished");
        require(s.expectedToken != address(0), "PerShare: expected token not set");
        require(amount > 0,                    "PerShare: amount required");

        // Measure actual received (protects against fee-on-transfer tokens)
        uint256 balanceBefore = IERC20(s.expectedToken).balanceOf(address(this));
        IERC20(s.expectedToken).safeTransferFrom(msg.sender, address(this), amount);
        uint256 received = IERC20(s.expectedToken).balanceOf(address(this)) - balanceBefore;

        require(received > 0, "PerShare: zero tokens received");

        s.totalTokensReceived += received;

        emit TokensDeposited(id, msg.sender, received, s.totalTokensReceived);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // FUNCTION 5 - Validate redistribution (Phase 2 - group buy presale)
    // ─────────────────────────────────────────────────────────────────────────

    function validateDistribution(
        uint256 id,
        address tokenAddress
    ) external onlyMember(id) whenNotPaused nonReentrant {

        Share storage s = shares[id];

        require(s.sent,                           "PerShare: phase 1 not finished");
        require(!s.tokensDistributed,             "PerShare: already distributed");
        require(tokenAddress != address(0),       "PerShare: invalid token");
        require(s.expectedToken != address(0),    "PerShare: expected token not set");
        require(tokenAddress == s.expectedToken,  "PerShare: wrong token");
        require(!distValidations[id][msg.sender], "PerShare: already validated dist");

        distValidations[id][msg.sender] = true;
        distValidationCount[id]++;

        emit DistValidationAdded(id, msg.sender, distValidationCount[id], s.threshold);

        if (distValidationCount[id] >= s.threshold) {
            // 🔒 HERMETIC FIX: distribute ONLY what was explicitly deposited for THIS share
            // via depositTokens(). NEVER read balanceOf(address(this)) — that is the global
            // balance and would let one share capture another share's tokens.
            require(s.totalTokensReceived > 0, "PerShare: no tokens deposited for this share");

            s.tokensDistributed = true;

            emit TokensDistributed(id, tokenAddress, s.totalTokensReceived);
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // FUNCTION 6 - Claim tokens (Phase 2 - Pull Pattern)
    // ─────────────────────────────────────────────────────────────────────────

    function claimDistribution(uint256 id) external whenNotPaused nonReentrant {
        Share storage s = shares[id];
        require(s.tokensDistributed, "PerShare: distribution not finalized");

        uint256 contribution = contributions[id][msg.sender];
        require(contribution > 0, "PerShare: no contribution");

        // Total owed based on final snapshot
        uint256 totalOwed = (s.totalTokensReceived * contribution) / s.totalReceived;
        uint256 alreadyClaimed = tokensClaimed[id][msg.sender];
        uint256 toClaim = totalOwed - alreadyClaimed;

        require(toClaim > 0, "PerShare: nothing to claim");

        tokensClaimed[id][msg.sender] += toClaim;
        globalTokensClaimed[id] += toClaim;

        IERC20(s.expectedToken).safeTransfer(msg.sender, toClaim);

        emit DistributionClaimed(id, msg.sender, toClaim);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // FUNCTION 6b - Sweep Dust (Phase 2)
    //
    // Allows the creator to sweep any leftover tokens (dust) resulting from
    // division rounding in claimDistribution. Dust is defined as the remainder
    // of totalTokensReceived after all theoretical claims are subtracted.
    // ─────────────────────────────────────────────────────────────────────────

    function sweepDust(uint256 id) external whenNotPaused nonReentrant {
        Share storage s = shares[id];
        require(msg.sender == s.creator, "PerShare: not the creator");
        require(s.tokensDistributed, "PerShare: distribution not finalized");

        uint256 totalTheoreticalClaims = 0;
        uint256 length = s.members.length;
        for (uint256 i = 0; i < length; i++) {
            totalTheoreticalClaims += (s.totalTokensReceived * contributions[id][s.members[i]]) / s.totalReceived;
        }

        require(s.totalTokensReceived > totalTheoreticalClaims, "PerShare: no dust");
        uint256 dust = s.totalTokensReceived - totalTheoreticalClaims;
        
        // Prevent sweeping the same dust twice if late tranches arrive
        s.totalTokensReceived -= dust;

        IERC20(s.expectedToken).safeTransfer(msg.sender, dust);
        emit DustSwept(id, msg.sender, dust);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // FUNCTION 7 - Late token tranches
    //
    // Late tranches are handled by calling depositTokens(id, amount) again — even
    // after distribution. It increases totalTokensReceived and members can then
    // claim the additional pro-rata amount via claimDistribution. No balanceOf read.
    // ─────────────────────────────────────────────────────────────────────────

    // ─────────────────────────────────────────────────────────────────────────
    // FUNCTION 8 - Mark refund state (Phase 1 - Pull Pattern)
    // ─────────────────────────────────────────────────────────────────────────

    function markRefunded(uint256 id) external onlyMember(id) notClosed(id) whenNotPaused nonReentrant {

        Share storage s = shares[id];

        require(block.timestamp > s.deadline, "PerShare: deadline not passed yet");
        require(s.totalReceived > 0,           "PerShare: nothing to refund");

        s.refunded = true;

        emit FundsRefunded(id);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // FUNCTION 9 - Claim refund (Phase 1 - Pull Pattern)
    // ─────────────────────────────────────────────────────────────────────────

    function claimRefund(uint256 id) external whenNotPaused nonReentrant {
        Share storage s = shares[id];
        require(s.refunded, "PerShare: not in refund state");
        require(!hasClaimedRefund[id][msg.sender], "PerShare: already claimed");

        uint256 amount = contributions[id][msg.sender];
        require(amount > 0, "PerShare: no contribution");

        hasClaimedRefund[id][msg.sender] = true;

        IERC20(s.stablecoin).safeTransfer(msg.sender, amount);

        emit RefundClaimed(id, msg.sender, amount);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // NOTE: expectedToken registry is PERMANENT by design.
    //
    // 🔒 Once a token is assigned to a share via setExpectedToken, isExpectedToken
    // stays true forever. A token can therefore be the subject of only ONE share in
    // this contract's lifetime. This is a deliberate hermetic guarantee: it makes it
    // impossible for a later share to ever capture tokens — including late tranches —
    // that belong to the original share. There is intentionally no release function.
    // ─────────────────────────────────────────────────────────────────────────

    // ─────────────────────────────────────────────────────────────────────────
    // ADMIN FUNCTIONS
    // ─────────────────────────────────────────────────────────────────────────

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function setExpectedToken(uint256 id, address tokenAddress) external whenNotPaused {
        Share storage s = shares[id];
        require(msg.sender == s.creator, "PerShare: not the creator");
        require(s.sent, "PerShare: phase 1 not finished");
        require(!s.tokensDistributed, "PerShare: already distributed");
        require(tokenAddress != address(0), "PerShare: invalid token");
        require(tokenAddress.code.length > 0, "PerShare: not a contract");
        require(tokenAddress != s.stablecoin, "PerShare: cannot be stablecoin");

        // 🔒 SECURITY: Prevent using a token already claimed by another active share
        require(!isExpectedToken[tokenAddress], "PerShare: token already assigned to another share");

        s.expectedToken = tokenAddress;
        isExpectedToken[tokenAddress] = true;

        emit ExpectedTokenSet(id, tokenAddress);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // RECOVERY FUNCTION - Sweep tokens sent by mistake (owner only)
    // ─────────────────────────────────────────────────────────────────────────

    function sweepLostTokens(address token, address to) external onlyOwner {
        require(token != address(0), "PerShare: invalid token");
        require(to != address(0), "PerShare: invalid recipient");
        require(!isExpectedToken[token], "PerShare: token is reserved for a share");
        require(!isStablecoin[token], "PerShare: token is a stablecoin");

        uint256 balance = IERC20(token).balanceOf(address(this));
        require(balance > 0, "PerShare: no tokens to sweep");

        IERC20(token).safeTransfer(to, balance);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // READ FUNCTIONS
    // ─────────────────────────────────────────────────────────────────────────

    function getShareDetails(uint256 id) external view returns (
        string   memory name,
        address  creator,
        address  stablecoin,
        address  destination,
        uint256  targetAmount,
        uint256  deadline,
        uint256  threshold
    ) {
        Share storage s = shares[id];
        return (
            s.name,
            s.creator,
            s.stablecoin,
            s.destination,
            s.targetAmount,
            s.deadline,
            s.threshold
        );
    }

    function getShareStatus(uint256 id) external view returns (
        uint256  totalReceived,
        uint256  currentValidations,
        uint256  currentDistValidations,
        bool     sent,
        bool     refunded,
        bool     tokensDistributed,
        address  expectedToken
    ) {
        Share storage s = shares[id];
        return (
            s.totalReceived,
            validationCount[id],
            distValidationCount[id],
            s.sent,
            s.refunded,
            s.tokensDistributed,
            s.expectedToken
        );
    }

    function getShareMembers(uint256 id) external view returns (address[] memory) {
        return shares[id].members;
    }

    function getProgress(uint256 id) external view returns (
        uint256 collected,
        uint256 target,
        uint256 percent,
        bool    targetReached
    ) {
        Share storage s = shares[id];
        uint256 pct = s.targetAmount > 0
            ? (s.totalReceived * 100) / s.targetAmount
            : 0;
        return (s.totalReceived, s.targetAmount, pct, s.totalReceived >= s.targetAmount);
    }

    function getContribution(uint256 id, address member) external view returns (uint256) {
        return contributions[id][member];
    }

    function hasValidated(uint256 id, address member) external view returns (bool) {
        return validations[id][member];
    }

    function hasValidatedDist(uint256 id, address member) external view returns (bool) {
        return distValidations[id][member];
    }

    function getTokenBalance(address tokenAddress) external view returns (uint256) {
        return IERC20(tokenAddress).balanceOf(address(this));
    }
}
