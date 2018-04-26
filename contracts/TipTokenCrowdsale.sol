pragma solidity ^0.4.23;

import "./tokensale/PostDeliveryCrowdsale.sol";
import "./tokensale/TimedCrowdsale.sol";
import "./tokensale/WhitelistedCrowdsale.sol";
import "./tokensale/CappedCrowdsale.sol";
import "./tokensale/AllowanceCrowdsale.sol";
import "./TipToken.sol";

contract TipTokenCrowdsale is CappedCrowdsale, TimedCrowdsale, WhitelistedCrowdsale, PostDeliveryCrowdsale, AllowanceCrowdsale {


    /**
     * @param _openingTime the start time of the token sale
     * @param _closingTime the end time of the token sale
     * @param _rate Number of token units a buyer gets per wei
     * @param _vault Address where collected funds will be forwarded to
     * @param _tokenWallet Address holding the tokens, which has approved allowance to the crowdsale
     * @param _cap the maximum number of tokens to be collected in the sale
     * @param _token Address of the token being sold
     */
    constructor(
        uint256 _openingTime,
        uint256 _closingTime,
        uint256 _rate,
        address _vault,
        address _tokenWallet,
        uint256 _cap,
        ERC20 _token
        ) public
        Crowdsale(_rate, _vault, _token)
        CappedCrowdsale(_cap)
        TimedCrowdsale(_openingTime, _closingTime)
        PostDeliveryCrowdsale()
        WhitelistedCrowdsale()
        AllowanceCrowdsale(_tokenWallet)
        {

    }

}
