// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Mock USDT pour les tests PerShare sur BNB Testnet
// Ne pas deployer sur le mainnet

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSDT is ERC20 {
    constructor() ERC20("Mock USDT", "USDT") {
        _mint(msg.sender, 1_000_000 * 10**18);
    }

    // Faucet public pour les tests
    function faucet(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
