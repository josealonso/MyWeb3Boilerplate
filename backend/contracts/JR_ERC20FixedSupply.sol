// SPDX-License-Identifier: MIT
// Based on OpenZeppelin token/ERC20/presets/ERC20PresetFixedSupply.sol and token/ERC20/extensions/ERC20Capped.sol

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @dev {ERC20} token, including:
 *
 *  - Preminted total supply
 *  - No access control mechanism (for minting/pausing) and hence no governance
 *
 */
contract JR_ERC20FixedSupply is ERC20 {
    /**
     * @dev Mints `initialSupply` amount of token and transfers them to `owner`.
     *
     * See {ERC20-constructor}.
     */
    uint256 private _cap; // Fixed supply

    // @dev The fourth argument will be msg.sender most of the times
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 totalSupply_
    )
        // address owner_
        ERC20(name_, symbol_)
    {
        _cap = totalSupply_;
        _mint(msg.sender, _cap * 10**decimals());
    }

    /**
     * @dev See {ERC20-_mint}.
     */
    function _mint(address account, uint256 amount) internal virtual override {
        require(
            // ERC20.totalSupply() + amount <= _cap,
            amount <= _cap * 10**decimals(),
            "ERC20Capped: cap exceeded"
        );
        super._mint(account, amount);
    }
}
