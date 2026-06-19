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
// Intentionally excluded:
//   - Cancel / Pause (V2)
//   - Internal USDT distribution to members (V2)
//   - Vesting (V2)
//   - DeFi Integration (permanently excluded)
//   - Non-BEP-20 Tokens: Solana, SUI, TON (out of scope)
//   - ERC-721 NFT (V1.5 if market demands)
//
// "SHARE - every member gets their share. Automatically."
// ─────────────────────────────────────────────────────────────────────────────

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract PerShare is ReentrancyGuard, Pausable, Ownable {

    // ─── Constantes ───────────────────────────────────────────────────────────

    uint256 public constant MAX_MEMBERS    = 50;
    uint256 public feeBPS = 100; // 100 BPS = 1%
    address public feeRecipient;

    // Platform Token (dormant pour V1)
    address public platformToken;
    uint256 public discountThreshold = 10_000 ether;

    // ─── Main structure - a SHARE ─────────────────────────────────────

    struct Share {
        string    name;              // "Voyage Lisbonne" / "Presale XYZ"
        address   creator;           // SHARE creator wallet
        address[] members;           // List of members (2 a 50)
        address   stablecoin;        // USDT or USDC (BEP-20 address)
        address   destination;       // External wallet - presale or third party
        uint256   targetAmount;      // Stablecoin target
        uint256   deadline;          // Unix Timestamp - end of collection
        uint256   threshold;         // Number of validations to trigger sending
        uint256   totalReceived;     // Total stablecoin collected
        bool      sent;              // Phase 1 finished
        bool      refunded;          // SHARE refunded
        bool      tokensDistributed; // Phase 2 finished
        address   expectedToken;     // Expected BEP-20 token for Phase 2
    }

    // ─── Storage ──────────────────────────────────────────────────────────────

    uint256 public shareCount;
    mapping(uint256 => Share) private shares;

    // Phase 1
    mapping(uint256 => mapping(address => uint256)) public contributions;
    mapping(uint256 => mapping(address => bool))    public isMember;
    mapping(uint256 => mapping(address => bool))    public validations;
    mapping(uint256 => uint256)                     public validationCount;

    // Phase 2
    mapping(uint256 => mapping(address => bool)) public distValidations;
    mapping(uint256 => uint256)                  public distValidationCount;

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

    event FundsRefunded(
        uint256 indexed id,
        uint256 totalRefunded
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

    event ExpectedTokenSet(
        uint256 indexed id,
        address indexed token
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

    // ─── Constructor ──────────────────────────────────────────────────────────

    constructor(address _feeRecipient) Ownable(msg.sender) {
        require(_feeRecipient != address(0), "PerShare: invalid feeRecipient");
        feeRecipient = _feeRecipient;
    }

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
        s.totalReceived     = 0;
        s.sent              = false;
        s.refunded          = false;
        s.tokensDistributed = false;
        s.expectedToken     = address(0);

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

        require(
            IERC20(s.stablecoin).transferFrom(msg.sender, address(this), amount),
            "PerShare: transfer failed"
        );

        contributions[id][msg.sender] += amount;
        s.totalReceived               += amount;

        emit ContributionReceived(id, msg.sender, amount, s.totalReceived);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // FUNCTION 3 - Validate sending (Phase 1)
    // ─────────────────────────────────────────────────────────────────────────

    function validate(uint256 id) external onlyMember(id) notClosed(id) whenNotPaused nonReentrant {

        Share storage s = shares[id];

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
        s.sent = true;

        uint256 total      = s.totalReceived;
        uint256 effectiveFee = getEffectiveFee(s.creator);
        uint256 commission = (total * effectiveFee) / 10000;
        uint256 toSend     = total - commission;

        require(
            IERC20(s.stablecoin).transfer(s.destination, toSend),
            "PerShare: destination transfer failed"
        );

        if (commission > 0) {
            require(
                IERC20(s.stablecoin).transfer(feeRecipient, commission),
                "PerShare: commission transfer failed"
            );
        }

        emit FundsSent(id, s.destination, toSend, commission);
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

        uint256 tokenBalance = IERC20(tokenAddress).balanceOf(address(this));
        require(tokenBalance > 0, "PerShare: no tokens received");

        distValidations[id][msg.sender] = true;
        distValidationCount[id]++;

        emit DistValidationAdded(id, msg.sender, distValidationCount[id], s.threshold);

        if (distValidationCount[id] >= s.threshold) {
            _distributeTokens(id, tokenAddress, tokenBalance);
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // FUNCTION 6 - Token redistribution (Internal Phase 2)
    // ─────────────────────────────────────────────────────────────────────────

    function _distributeTokens(
        uint256 id,
        address tokenAddress,
        uint256 totalTokens
    ) internal {

        Share storage s = shares[id];
        s.tokensDistributed = true;

        uint256 totalContrib = s.totalReceived;
        uint256 distributed = 0;
        address firstContributor = address(0);

        for (uint256 i = 0; i < s.members.length; i++) {
            address member       = s.members[i];
            uint256 contribution = contributions[id][member];

            if (contribution > 0) {
                if (firstContributor == address(0)) {
                    firstContributor = member;
                }
                uint256 memberTokens = (totalTokens * contribution) / totalContrib;
                if (memberTokens > 0) {
                    distributed += memberTokens;
                    require(
                        IERC20(tokenAddress).transfer(member, memberTokens),
                        "PerShare: redistribution failed"
                    );
                }
            }
        }

        uint256 dust = totalTokens - distributed;
        if (dust > 0 && firstContributor != address(0)) {
            require(
                IERC20(tokenAddress).transfer(firstContributor, dust),
                "PerShare: dust redistribution failed"
            );
        }

        emit TokensDistributed(id, tokenAddress, totalTokens);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // FUNCTION 7 - Refund if deadline expired
    // ─────────────────────────────────────────────────────────────────────────

    function refund(uint256 id) external onlyMember(id) notClosed(id) whenNotPaused nonReentrant {

        Share storage s = shares[id];

        require(block.timestamp > s.deadline, "PerShare: deadline not passed yet");
        require(s.totalReceived > 0,           "PerShare: nothing to refund");

        s.refunded = true;

        uint256 totalRefunded = 0;

        for (uint256 i = 0; i < s.members.length; i++) {
            address member = s.members[i];
            uint256 amount = contributions[id][member];

            if (amount > 0) {
                contributions[id][member] = 0;
                require(
                    IERC20(s.stablecoin).transfer(member, amount),
                    "PerShare: refund failed"
                );
                totalRefunded += amount;
            }
        }

        emit FundsRefunded(id, totalRefunded);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // ADMIN AND CONFIGURATION FUNCTIONS
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
        s.expectedToken = tokenAddress;
        emit ExpectedTokenSet(id, tokenAddress);
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

    function getMembers(uint256 id) external view returns (address[] memory) {
        return shares[id].members;
    }
}
