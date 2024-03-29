pragma solidity ^0.4.23;

import "./tokensale/MultiRoundCrowdsale.sol";
import "./tokensale/PostDeliveryCrowdsale.sol";
import "./tokensale/WhitelistedCrowdsale.sol";
import "./tokensale/CappedCrowdsale.sol";
import "./tokensale/AllowanceCrowdsale.sol";
import "./lib/Pausable.sol";
import "./TipToken.sol";

/**
 * @title TipTokenCrowdsale
 */
contract TipTokenCrowdsale is MultiRoundCrowdsale, CappedCrowdsale, WhitelistedCrowdsale, AllowanceCrowdsale, PostDeliveryCrowdsale, Pausable {

    /**
     * Contract name
     * String name - the name of the contract
     */
    string public constant name = "Tip Token Crowdsale";


    /**
     * @param _vault Address where collected funds will be forwarded to
     * @param _tokenWallet Address holding the tokens, which has approved allowance to the crowdsale
     * @param _cap the maximum number of tokens to be collected in the sale
     * @param _token Address of the token being sold
     */
    constructor(
        ERC20 _token,
        address _tokenWallet,
        address _vault,
        uint256 _cap,
        uint256 _start, uint256 _end, uint256 _baseRate
        ) public
        Crowdsale(_baseRate, _vault, _token)
        CappedCrowdsale(_cap)
        TimedCrowdsale(_start, _end)
        PostDeliveryCrowdsale()
        WhitelistedCrowdsale()
        AllowanceCrowdsale(_tokenWallet)
        MultiRoundCrowdsale()
        {
    }

    function _preValidatePurchase(address _beneficiary, uint256 _weiAmount) internal whenNotPaused() {
        super._preValidatePurchase(_beneficiary, _weiAmount);

        SaleRound memory currentRound = getCurrentRound();
        require(weiRaised.add(_weiAmount) <= currentRound.roundCap);
        require(balances[_beneficiary].add(_weiAmount) >= currentRound.minPurchase);
    }

    function _getTokenAmount(uint256 _weiAmount) internal view returns (uint256) {
        return MultiRoundCrowdsale._getTokenAmount(_weiAmount);
    }

    function _deliverTokens(address _beneficiary, uint256 _tokenAmount) internal {
        AllowanceCrowdsale._deliverTokens(_beneficiary, _tokenAmount);
    }
}
