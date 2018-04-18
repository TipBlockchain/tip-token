var TipToken = artifacts.require("./TipToken.sol")
var TipTokenCrowdsale = artifacts.require("./TipTokenCrowdsale")

var moment = require('moment')

const seedRoundStart    = moment('2018-06-01T00:00:00Z').unix()
const seedRoundEnd      = moment('2018-06-15T23:59:59Z').unix()
const presaleStart      = moment('2018-07-13T00:00:00Z').unix()
const presaleEnd        = moment('2018-07-20T23:59:59Z').unix()
const crowdsaleStart    = moment('2018-07-21T00:00:00Z').unix()
const crowdsaleEnd      = moment('2018-08-17T23:59:59Z').unix()

const testSaleStart     = moment('2018-04-18T06:05:00Z').unix()
const testSaleEnd       = moment('2018-04-18T06:11:00Z').unix()

const exchangeRate      = 10000
const hardCap           = 50000 * Math.pow(10, 18)

module.exports = (deployer) => {
    deployer.deploy(TipToken)
    .then(() => {
        // Params (TokenSaleContract, startTime, endTime, rate, wallet, cap, tokenAddress)
        return deployer.deploy(
            TipTokenCrowdsale,
            testSaleStart,
            testSaleEnd,
            exchangeRate,
            web3.eth.coinbase,
            hardCap,
            TipToken.address
        )
    })
    .catch((err) => {
        console.log(err)
    })
}
