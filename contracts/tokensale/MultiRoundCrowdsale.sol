pragma solidity ^0.4.23;

import "./Crowdsale.sol";
import "../lib/Ownable.sol";
import "../math/SafeMath.sol";

contract MultiRoundCrowdsale is  Crowdsale, Ownable {

    using SafeMath for uint256;

    struct SaleRound {
        uint256 start;
        uint256 end;
        uint256 rate;
    }

    SaleRound seedRound;
    SaleRound presale;
    SaleRound crowdsaleWeek1;
    SaleRound crowdsaleWeek2;
    SaleRound crowdsaleWeek3;
    SaleRound crowdsaleWeek4;

    bool public saleRoundsSet = false;

    function setTokenSaleRounds(uint256[3] _seedRound, uint256[3] _presale, uint256[3] _crowdsaleWeek1, uint256[3] _crowdsaleWeek2, uint256[3] _crowdsaleWeek3, uint256[3] _crowdsaleWeek4) external onlyOwner returns (bool) {
        // This function can only be called once
        require(!saleRoundsSet);

        // Check that each round end time is after the start time
        require(_seedRound[0] < _seedRound[1]);
        require(_presale[0] < _presale[1]);
        require(_crowdsaleWeek1[0] < _crowdsaleWeek1[1]);
        require(_crowdsaleWeek2[0] < _crowdsaleWeek2[1]);
        require(_crowdsaleWeek3[0] < _crowdsaleWeek3[1]);
        require(_crowdsaleWeek4[0] < _crowdsaleWeek4[1]);

        // Check that each round ends before the next begins
        require(_seedRound[1] < _presale[0]);
        require(_presale[1] < _crowdsaleWeek1[0]);
        require(_crowdsaleWeek1[1] < _crowdsaleWeek2[0]);
        require(_crowdsaleWeek2[1] < _crowdsaleWeek3[0]);
        require(_crowdsaleWeek3[1] < _crowdsaleWeek4[0]);

        seedRound      = SaleRound(_seedRound[0], _seedRound[1], _seedRound[2]);
        presale        = SaleRound(_presale[0], _presale[1], _presale[2]);
        crowdsaleWeek1 = SaleRound(_crowdsaleWeek1[0], _crowdsaleWeek1[1], _crowdsaleWeek1[2]);
        crowdsaleWeek2 = SaleRound(_crowdsaleWeek2[0], _crowdsaleWeek2[1], _crowdsaleWeek2[2]);
        crowdsaleWeek3 = SaleRound(_crowdsaleWeek3[0], _crowdsaleWeek3[1], _crowdsaleWeek3[2]);
        crowdsaleWeek4 = SaleRound(_crowdsaleWeek4[0], _crowdsaleWeek4[1], _crowdsaleWeek4[2]);

        saleRoundsSet = true;
        return saleRoundsSet;
    }

    function getCurrentRate() public view returns (uint256) {
        require(saleRoundsSet);

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
        require(_weiAmount != 0);

        uint256 currentRate = getCurrentRate();

        require(currentRate != 0);
        
        return currentRate.mul(_weiAmount);
    }
}
