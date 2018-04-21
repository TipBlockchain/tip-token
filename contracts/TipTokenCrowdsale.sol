pragma solidity ^0.4.23;

import "./tokensale/PostDeliveryCrowdsale.sol";
import "./tokensale/TimedCrowdsale.sol";
import "./tokensale/WhitelistedCrowdsale.sol";
import "./tokensale/CappedCrowdsale.sol";
import "./TipToken.sol";

contract TipTokenCrowdsale is CappedCrowdsale, TimedCrowdsale, WhitelistedCrowdsale, PostDeliveryCrowdsale {

    constructor(
        uint256 _openingTime,
        uint256 _closingTime,
        uint256 _rate,
        address _wallet,
        uint256 _cap,
        TipToken _token
        ) public
        Crowdsale(_rate, _wallet, _token)
        CappedCrowdsale(_cap)
        TimedCrowdsale(_openingTime, _closingTime)
        PostDeliveryCrowdsale()
        WhitelistedCrowdsale()
        {

    }
}
