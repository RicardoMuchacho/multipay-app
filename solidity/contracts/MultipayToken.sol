// SPDX-License-Identifier: MIT
// author: @rickmuch
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Multipay is ERC20 {
    uint256 public tokensPerEth = 1000;
    address public tokenOwner;

//1 Million Initial Supply Constructor for Owner Address
    constructor() ERC20("Multipay", "MPAY") {
        tokenOwner = msg.sender;
        uint256 supply = 1000000;
        _mint(msg.sender, supply*10**uint(decimals()));
    }

//there can only be 1 receive() function per contract and it goes without "function" first
    receive() external payable {
        uint256 amount = msg.value * tokensPerEth;

        require(balanceOf(tokenOwner) >= amount, 
            "Not enough tokens available");

        _transfer(tokenOwner, msg.sender, amount);
        emit Transfer(tokenOwner, msg.sender, amount);
        payable(tokenOwner).transfer(msg.value);
    }
}