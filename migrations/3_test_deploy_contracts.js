var TipToken = artifacts.require("./TipToken.sol")
var TipTokenCrowdsale = artifacts.require("./TipTokenCrowdsale")

var moment = require('moment')

const seedRoundStart        = moment('2018-05-24T04:20:00Z').unix()
const seedRoundEnd          = moment('2018-05-24T04:24:59Z').unix()
const presaleStart          = moment('2018-05-24T04:25:00Z').unix()
const presaleEnd            = moment('2018-05-24T04:25:59Z').unix()

const crowdsaleWeek1Start   = moment('2018-05-24T04:26:00Z').unix()
const crowdsaleWeek1End     = moment('2018-05-24T04:26:59Z').unix()
const crowdsaleWeek2Start   = moment('2018-05-24T04:27:00Z').unix()
const crowdsaleWeek2End     = moment('2018-05-24T04:27:59Z').unix()
const crowdsaleWeek3Start   = moment('2018-05-24T04:28:00Z').unix()
const crowdsaleWeek3End     = moment('2018-05-24T04:28:59Z').unix()
const crowdsaleWeek4Start   = moment('2018-05-24T04:29:00Z').unix()
const crowdsaleWeek4End     = moment('2018-05-24T04:29:59Z').unix()

const baseRate              = 10000
const seedRoundRate         = baseRate * 3.0
const presaleRate           = baseRate * 1.5
const crowdsaleWeek1Rate    = baseRate * 1.3
const crowdsaleWeek2Rate    = baseRate * 1.2
const crowdsaleWeek3Rate    = baseRate * 1.1
const crowdsaleWeek4Rate    = baseRate

// Caps for each round. Caps are cumulative
const seedRoundCap          = web3.toWei(150, "ether")
const presaleCap            = web3.toWei(250, "ether")
const crowdsaleWeek1Cap     = web3.toWei(350, "ether")
const crowdsaleWeek2Cap     = web3.toWei(450, "ether")
const crowdsaleWeek3Cap     = web3.toWei(550, "ether")
const crowdsaleWeek4Cap     = web3.toWei(750, "ether")
const hardCap               = web3.toWei(750, "ether")

const seedRoundMin          = web3.toWei(24.9, "ether")
const presaleMin            = web3.toWei(0.9, "ether")
const crowdsaleMin          = web3.toWei(0.001, "ether")

module.exports = (deployer, network, accounts) => {
    return deploy(deployer, accounts)
}

async function deploy(deployer, accounts) {
    let tokenWallet     = accounts[0]
    let ethVault        = accounts[9]
    let admin           = accounts[1]

    let seedRound       = [seedRoundStart, seedRoundEnd, seedRoundRate, seedRoundCap, seedRoundMin]
    let presale         = [presaleStart, presaleEnd, presaleRate, presaleCap, presaleMin]
    let crowdsaleWeek1  = [crowdsaleWeek1Start, crowdsaleWeek1End, crowdsaleWeek1Rate, crowdsaleWeek1Cap, crowdsaleMin]
    let crowdsaleWeek2  = [crowdsaleWeek2Start, crowdsaleWeek2End, crowdsaleWeek2Rate, crowdsaleWeek2Cap, crowdsaleMin]
    let crowdsaleWeek3  = [crowdsaleWeek3Start, crowdsaleWeek3End, crowdsaleWeek3Rate, crowdsaleWeek3Cap, crowdsaleMin]
    let crowdsaleWeek4  = [crowdsaleWeek4Start, crowdsaleWeek4End, crowdsaleWeek4Rate, crowdsaleWeek4Cap, crowdsaleMin]

    return deployer
    // .then(() => {
    //     return deployer.deploy(TipToken)
    // })
    .then(() => {
        return deployer.deploy(
            TipTokenCrowdsale,
            // TipToken.address,
            '0xf25186b5081ff5ce73482ad761db0eb0d25abfbf',
            tokenWallet, ethVault, hardCap,
            seedRoundStart, crowdsaleWeek4End, baseRate
        )
    })
    .then(() => {
        return TipTokenCrowdsale.deployed()
    })
    .then(crowdsaleInstance => {
        crowdsaleInstance.addAdmin(admin)
        crowdsaleInstance.setTokenSaleRounds(seedRound, presale, crowdsaleWeek1, crowdsaleWeek2, crowdsaleWeek3, crowdsaleWeek4)
    })
    .catch(err => {
        console.log("Error deploying contracts: ", err)
    })
}
