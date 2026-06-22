// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MockFOTToken is ERC20, Ownable {
    uint256 public feePercent;

    constructor(string memory name, string memory symbol, uint8 _decimals, uint256 _feePercent) ERC20(name, symbol) Ownable(msg.sender) {
        feePercent = _feePercent;
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        uint256 fee = (amount * feePercent) / 100;
        uint256 netAmount = amount - fee;
        
        super.transfer(owner(), fee);
        return super.transfer(to, netAmount);
    }

    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        uint256 fee = (amount * feePercent) / 100;
        uint256 netAmount = amount - fee;
        
        super.transferFrom(from, owner(), fee);
        return super.transferFrom(from, to, netAmount);
    }
}
