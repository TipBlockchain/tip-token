pragma solidity ^0.4.23;

import "./lib/Ownable.sol";
import "./lib/ERC865Token.sol";
import "./math/SafeMath.sol";
import "./lib/ApproveAndCallFallback.sol";

/**
 * @title TipToken
 * TIP token smart contract.
 * ERC865 Token, with the addition of symbol, name and decimals and and
 * initial fixed supply.
 */
contract TipToken is ERC865Token, Ownable {
    using SafeMath for uint256;

    uint256 public constant TOTAL_SUPPLY = 10 ** 9;

    string public constant name = "Tip Token";
    string public constant symbol = "TIP";
    uint8 public constant decimals = 18;

    mapping (address => string) aliases;
    mapping (string => address) addresses;

    /**
     * Constructor
     */
    constructor() public {
        _totalSupply = TOTAL_SUPPLY * (10**uint256(decimals));
        balances[owner] = _totalSupply;
        emit Transfer(address(0), owner, _totalSupply);
    }

    /**
     * Returns the available supple (total supply minus tokens held by owner)
     */
    function availableSupply() public view returns (uint256) {
        return _totalSupply.sub(balances[owner]).sub(balances[address(0)]);
    }

    /**
     * Token owner can approve for `spender` to transferFrom(...) `tokens`
     * from the token owner's account. The `spender` contract function
     * `receiveApproval(...)` is then executed
     */
    function approveAndCall(address spender, uint256 tokens, bytes data) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        ApproveAndCallFallBack(spender).receiveApproval(msg.sender, tokens, this, data);
        return true;
    }

    /**
     * Don't accept ETH.
     */
    function () public payable {
        revert();
    }

    /**
     * Owner can transfer out any accidentally sent ERC20 tokens
     */
    function transferAnyERC20Token(address tokenAddress, uint256 tokens) public onlyOwner returns (bool success) {
        return ERC20(tokenAddress).transfer(owner, tokens);
    }

    /**
     * Sets the alias for the msg.sender's address.
     * @param alias the alias to attach to an address
     */
    function setAlias(string alias) public {
        aliases[msg.sender] = alias;
        addresses[alias] = msg.sender;
    }
}
