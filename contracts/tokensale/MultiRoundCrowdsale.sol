pragma solidity ^0.4.23;

import "./Crowdsale.sol";
import "../math/SafeMath.sol";

contract MultiRoundCrowdsale is Crowdsale {

    using SafeMath for uint256;

    struct SaleRound {
        uint256 start;
        uint256 end;
        uint256 rate;
    }

    uint256 constant _baseRate = 10000;
    uint256 constant _seedRoundRate = 30000;
    uint256 constant _presaleRate = 15000;
    uint256 constant _crowdsaleWeek1Rate = 13000;
    uint256 constant _crowdsaleWeek2Rate = 12000;
    uint256 constant _crowdsaleWeek3Rate = 11000;
    uint256 constant _crowdsaleWeek4Rate = 10000;

    uint256 constant _seedRoundStart = 1527811200;
    uint256 constant _seedRoundEnd = 1529020800;
    uint256 constant _presaleStart = 1531440000;
    uint256 constant _presaleEnd = 1532044800;
    uint256 constant _crowdsaleWeek1Start = 1532044800;
    uint256 constant _crowdsaleWeek1End = 1532044800;
    uint256 constant _crowdsaleWeek2Start = 1532044800;
    uint256 constant _crowdsaleWeek2End = 1532044800;
    uint256 constant _crowdsaleWeek3Start = 1532044800;
    uint256 constant _crowdsaleWeek3End = 1532044800;
    uint256 constant _crowdsaleWeek4Start = 1532044800;
    uint256 constant _crowdsaleWeek4End = 1532044800;

    SaleRound seedRound;
    SaleRound presale;
    SaleRound crowdsaleWeek1;
    SaleRound crowdsaleWeek2;
    SaleRound crowdsaleWeek3;
    SaleRound crowdsaleWeek4;

    constructor() {
        seedRound      = SaleRound(_seedRoundStart, _seedRoundEnd, _seedRoundRate);
        presale        = SaleRound(_presaleStart, _presaleEnd, _presaleRate);
        crowdsaleWeek1 = SaleRound(_crowdsaleWeek1Start, _crowdsaleWeek1End, _crowdsaleWeek1Rate);
        crowdsaleWeek2 = SaleRound(_crowdsaleWeek2Start, _crowdsaleWeek2End, _crowdsaleWeek2Rate);
        crowdsaleWeek3 = SaleRound(_crowdsaleWeek3Start, _crowdsaleWeek3End, _crowdsaleWeek3Rate);
        crowdsaleWeek4 = SaleRound(_crowdsaleWeek4Start, _crowdsaleWeek4End, _crowdsaleWeek4Rate);
    }

    function getCurrentRate() public view returns (uint256) {
        uint256 currentTime = block.timestamp;
        if (currentTime > seedRound.start && currentTime <= seedRound.end) {
            return seedRound.rate;
        } else if (currentTime > presale.start && currentTime <= presale.end) {
            return presale.rate;
        } else if (currentTime > crowdsaleWeek1.start && currentTime <= crowdsaleWeek1.end) {
            return crowdsaleWeek1.rate;
        } else if (currentTime > crowdsaleWeek2.start && currentTime <= crowdsaleWeek2.end) {
            return crowdsaleWeek2.rate;
        } else if (currentTime > crowdsaleWeek3.start && currentTime <= crowdsaleWeek3.end) {
            return crowdsaleWeek3.rate;
        } else if (currentTime > crowdsaleWeek4.start && currentTime <= crowdsaleWeek4.end) {
            return crowdsaleWeek4.rate;
        } else {
            revert();
        }
    }

    function getTokenAmount(uint256 _weiAmount) internal view returns (uint256) {
        uint256 currentRate = getCurrentRate();
        return currentRate.mul(_weiAmount);
    }

    function secondsInDay() internal view returns (uint256) {
        return 60 * 60 * 24;
    }

    function secondsInWeek() internal view returns (uint256) {
        return secondsInDay() * 7;
    }
}
