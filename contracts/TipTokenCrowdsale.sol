pragma solidity ^0.4.23;

import "./tokensale/PostDeliveryCrowdsale.sol";
import "./tokensale/TimedCrowdsale.sol";
import "./tokensale/WhitelistedCrowdsale.sol";
import "./tokensale/CappedCrowdsale.sol";
import "./tokensale/AllowanceCrowdsale.sol";
import "./tokensale/MultiRoundCrowdsale.sol";
import "./lib/Pausable.sol";
import "./TipToken.sol";

/**
 * @title TipTokenCrowdsale
 */
contract TipTokenCrowdsale is CappedCrowdsale, TimedCrowdsale, WhitelistedCrowdsale, AllowanceCrowdsale, PostDeliveryCrowdsale, MultiRoundCrowdsale, Pausable {


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
        require(weiRaised < currentRound.roundCap);
    }
}
