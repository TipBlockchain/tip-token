var TipToken = artifacts.require("./TipToken.sol")
var TipTokenCrowdsale = artifacts.require("./TipTokenCrowdsale")

var moment = require('moment')

const seedRoundStart        = moment('2018-06-01T00:00:00Z').unix()
const seedRoundEnd          = moment('2018-06-15T23:59:59Z').unix()
const presaleStart          = moment('2018-07-13T00:00:00Z').unix()
const presaleEnd            = moment('2018-07-20T23:59:59Z').unix()

const crowdsaleWeek1Start   = moment('2018-07-21T00:00:00Z').unix()
const crowdsaleWeek1End     = moment('2018-07-27T23:59:59Z').unix()
const crowdsaleWeek2Start   = moment('2018-07-28T00:00:00Z').unix()
const crowdsaleWeek2End     = moment('2018-08-03T23:59:59Z').unix()
const crowdsaleWeek3Start   = moment('2018-08-04T00:00:00Z').unix()
const crowdsaleWeek3End     = moment('2018-08-10T23:59:59Z').unix()
const crowdsaleWeek4Start   = moment('2018-08-11T00:00:00Z').unix()
const crowdsaleWeek4End     = moment('2018-08-17T23:59:59Z').unix()

const baseRate              = 10000
const seedRoundRate         = baseRate * 3.0
const presaleRate           = baseRate * 1.5
const crowdsaleWeek1Rate    = baseRate * 1.3
const crowdsaleWeek2Rate    = baseRate * 1.2
const crowdsaleWeek3Rate    = baseRate * 1.1
const crowdsaleWeek4Rate    = baseRate

// Caps for each round. Caps are cumulative
const seedRoundCap          = web3.toWei(1250, "ether")
const presaleCap            = web3.toWei(20000, "ether")
const hardCap               = web3.toWei(50000, "ether")

module.exports = (deployer, network, accounts) => {
    return deploy(deployer, accounts)
}

async function deploy(deployer, accounts) {
    let tokenWallet     = accounts[0]
    let ethVault        = accounts[1]

    let seedRound       = [seedRoundStart, seedRoundEnd, seedRoundRate, seedRoundCap]
    let presale         = [presaleStart, presaleEnd, presaleRate, presaleCap]
    let crowdsaleWeek1  = [crowdsaleWeek1Start, crowdsaleWeek1End, crowdsaleWeek1Rate, hardCap]
    let crowdsaleWeek2  = [crowdsaleWeek2Start, crowdsaleWeek2End, crowdsaleWeek2Rate, hardCap]
    let crowdsaleWeek3  = [crowdsaleWeek3Start, crowdsaleWeek3End, crowdsaleWeek3Rate, hardCap]
    let crowdsaleWeek4  = [crowdsaleWeek4Start, crowdsaleWeek4End, crowdsaleWeek4Rate, hardCap]

    return deployer
    .then(() => {
        return deployer.deploy(TipToken)
    })
    .then(() => {
        return deployer.deploy(
            TipTokenCrowdsale,
            TipToken.address,
            tokenWallet, ethVault, hardCap,
            seedRoundStart, crowdsaleWeek4End, baseRate
        )
    })
    .then(() => {
        return TipTokenCrowdsale.deployed()
    })
    .then(crowdsaleInstance => {
        crowdsaleInstance.setTokenSaleRounds(seedRound, presale, crowdsaleWeek1, crowdsaleWeek2, crowdsaleWeek3, crowdsaleWeek4)
    })
    .catch(err => {
        console.log("Error deploying contracts: ", err)
    })
}
