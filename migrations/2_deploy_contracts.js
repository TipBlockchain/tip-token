var TipToken = artifacts.require("./TipToken.sol")
var TipTokenCrowdsale = artifacts.require("./TipTokenCrowdsale")

var moment = require('moment')

const seedRoundStart    = moment('2018-06-01T00:00:00Z').unix()
const seedRoundEnd      = moment('2018-06-15T23:59:59Z').unix()
const presaleStart      = moment('2018-07-13T00:00:00Z').unix()
const presaleEnd        = moment('2018-07-20T23:59:59Z').unix()
const crowdsaleStart    = moment('2018-07-21T00:00:00Z').unix()
const crowdsaleEnd      = moment('2018-08-17T23:59:59Z').unix()

const crowdsaleWeek1Start   = moment('2018-07-13T00:00:00Z').unix()
const crowdsaleWeek1End     = moment('2018-07-13T00:00:00Z').unix()
const crowdsaleWeek2Start   = moment('2018-07-13T00:00:00Z').unix()
const crowdsaleWeek2End     = moment('2018-07-13T00:00:00Z').unix()
const crowdsaleWeek3Start   = moment('2018-07-13T00:00:00Z').unix()
const crowdsaleWeek3End     = moment('2018-07-13T00:00:00Z').unix()
const crowdsaleWeek4Start   = moment('2018-07-13T00:00:00Z').unix()
const crowdsaleWeek4End     = moment('2018-07-13T00:00:00Z').unix()

const testSaleStart     = moment().add(1, 'minute')
const testSaleEnd       = moment().add(6, 'minute')
const testSaleStartUnix = testSaleStart.unix()
const testSaleEndUnix   = testSaleEnd.unix()

const baseRate              = 10000
const presaleRate           = baseRate * 1.5
const seedRoundRate         = baseRate * 3.0
const crowdsaleWeek1Rate    = baseRate * 1.3
const crowdsaleWeek2Rate    = baseRate * 1.2
const crowdsaleWeek3Rate    = baseRate * 1.1
const crowdsaleWeek4Rate    = baseRate


const hardCap           = web3.toWei(50000, "ether")

const timeFormat        = "MMMM DD YYYY, h:mm:ss a"
console.log("Sale start time = ", testSaleStart.format(timeFormat));
console.log("Sale end time = ", testSaleEnd.format(timeFormat));

module.exports = (deployer, network, accounts) => {
    return deploy(deployer, accounts)
}

async function liveDeploy(deployer, accounts) {

    let seedRound = [seedRoundStart, seedRoundEnd, seedRoundRate]
    let presale = [presaleStart, presaleEnd,presaleRate]
    let crowdsaleWeek1 = [crowdsaleWeek1Start, crowdsaleWeek1End, crowdsaleWeek1Rate]
    let crowdsaleWeek2 = [crowdsaleWeek2Start, crowdsaleWeek2End, crowdsaleWeek2Rate]
    let crowdsaleWeek3 = [crowdsaleWeek3Start, crowdsaleWeek3End, crowdsaleWeek3Rate]
    let crowdsaleWeek4 = [crowdsaleWeek4Start, crowdsaleWeek4End, crowdsaleWeek4Rate]
    let wallet = accounts[0]
    let vault = accounts[9]

        return deployer.deploy(
            TipTokenCrowdsale,
            token, vault, wallet, hardCap,
            seedRound, presale, crowdsaleWeek1, crowdsaleWeek2, crowdsaleWeek3, crowdsaleWeek4,
        )
        .then(async (instance) => {
           const crowdsale = await TipTokenCrowdsale.deployed()
           const token = await crowdsale.token.call()
           console.log("Tip Token deployed at address: ", token);
        })
}

async function deploy(deployer, accounts) {
    let tokenWallet = accounts[0]
    let ethVault = accounts[1]

    let seedRound = [seedRoundStart, seedRoundEnd, seedRoundRate]
    let presale = [presaleStart, presaleEnd,presaleRate]
    let crowdsaleWeek1 = [crowdsaleWeek1Start, crowdsaleWeek1End, crowdsaleWeek1Rate]
    let crowdsaleWeek2 = [crowdsaleWeek2Start, crowdsaleWeek2End, crowdsaleWeek2Rate]
    let crowdsaleWeek3 = [crowdsaleWeek3Start, crowdsaleWeek3End, crowdsaleWeek3Rate]
    let crowdsaleWeek4 = [crowdsaleWeek4Start, crowdsaleWeek4End, crowdsaleWeek4Rate]

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
    .catch(err => {
        console.log("Error deploying contracts: ", err)
    })
}
