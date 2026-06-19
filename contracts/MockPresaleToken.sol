// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Mock token de presale pour tester la Phase 2 de PerShare
// Simule un token BEP-20 qu'un presale enverrait vers PerShare

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockPresaleToken is ERC20 {
    constructor() ERC20("Mock Presale Token", "MPT") {
        _mint(msg.sender, 10_000_000 * 10**18);
    }

    // Simule l'envoi depuis un presale vers PerShare
    function sendToShare(address perShareContract, uint256 amount) external {
        _transfer(msg.sender, perShareContract, amount);
    }
}
