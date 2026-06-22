// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MockBlacklistToken is ERC20, Ownable {
    mapping(address => bool) public isBlacklisted;

    constructor(string memory name, string memory symbol, uint8 _decimals) ERC20(name, symbol) Ownable(msg.sender) {}

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function setBlacklist(address user, bool status) external onlyOwner {
        isBlacklisted[user] = status;
    }

    function _update(address from, address to, uint256 value) internal virtual override {
        require(!isBlacklisted[from], "Blacklisted sender");
        require(!isBlacklisted[to], "Blacklisted recipient");
        super._update(from, to, value);
    }
}
