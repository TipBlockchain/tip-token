pragma solidity ^0.4.23;

import "./Ownable.sol";
/**
 * Defines a contract that allows a list of administrators to run some specified functions.
 * This is similar to the "Ownable" contract, which restricts access to some functions
 * to previleged users.
 */
contract Administratable is Ownable {
    mapping (address => bool) admins;

    event AdminAdded(address indexed _admin);

    event AdminRemoved(address indexed _admin);

    modifier onlyAdmin() {
        require(admins[msg.sender]);
        _;
    }

    function addAdmin(address _addressToAdd) external onlyOwner {
        require(_addressToAdd != address(0));
        admins[_addressToAdd] = true;

        emit AdminAdded(_addressToAdd);
    }

    function removeAdmin(address _addressToRemove) external onlyOwner {
        require(_addressToRemove != address(0));
        admins[_addressToRemove] = false;

        emit AdminRemoved(_addressToRemove);
    }
}
