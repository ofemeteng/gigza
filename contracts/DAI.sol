// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";


contract DAI is ERC20, ERC20Burnable, ERC20Permit, AccessControl {

  constructor() ERC20("DAI", "DAI") ERC20Permit("DAI") {
    _mint(msg.sender, 1000000 * 10 ** decimals());
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
  }
  
  function mint() external{
    _mint(msg.sender, 10000 *  10 ** decimals());
  }

   function mintAny(uint256 amount) external {
    _mint(msg.sender, amount *  10 ** decimals());
  }

}