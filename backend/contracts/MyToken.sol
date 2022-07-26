// SPDX-License-Identifier: MIT
// Based on OpenZeppelin token/ERC20/presets/ERC20PresetFixedSupply.sol and token/ERC20/extensions/ERC20Capped.sol
// @author JRAlonso

pragma solidity ^0.8.0;

import "./MyERC20Template.sol";

contract MyToken {
    constructor() {}

    /**
     * @dev Deploys a {ERC20} customized contract, so that
     *
     *  - name, symbol and supply are parameters
     */
    function createToken(
        string memory name_,
        string memory symbol_,
        uint256 supply_
    ) public {
        MyERC20Template myERC20Token = new MyERC20Template();
        myERC20Token.createToken(name_, symbol_, supply_);
    }
}
