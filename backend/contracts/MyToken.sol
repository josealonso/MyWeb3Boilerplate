// SPDX-License-Identifier: GPL
// Author: JR Alonso

pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./GenericToken.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint256 supply
    )
        ERC20(name, symbol)
    {
        _mint(msg.sender, supply);

        // new GenericToken(name, symbol, supply);
    }

    function getAddress() public view returns (address) {
        return address(this);
    }
}
