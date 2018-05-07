var TipToken = artifacts.require("./TipToken.sol")
var TipTokenCrowdsale = artifacts.require("./TipTokenCrowdsale")

var moment = require('moment')

const seedRoundStart    = moment('2018-06-01T00:00:00Z').unix()
const seedRoundEnd      = moment('2018-06-15T23:59:59Z').unix()
const presaleStart      = moment('2018-07-13T00:00:00Z').unix()
const presaleEnd        = moment('2018-07-20T23:59:59Z').unix()
const crowdsaleStart    = moment('2018-07-21T00:00:00Z').unix()
const crowdsaleEnd      = moment('2018-08-17T23:59:59Z').unix()

const testSaleStart     = moment().add(1, 'minute')
const testSaleEnd       = moment().add(6, 'minute')
const testSaleStartUnix = testSaleStart.unix()
const testSaleEndUnix   = testSaleEnd.unix()

const exchangeRate      = 1
const rate              = 10000
const presaleRate       = rate * 1.5
const seedRoundRate     = rate * 3.0

const hardCap           = web3.toWei(50000, "ether")

const timeFormat        = "MMMM DD YYYY, h:mm:ss a"
console.log("Sale start time = ", testSaleStart.format(timeFormat));
console.log("Sale end time = ", testSaleEnd.format(timeFormat));

module.exports = (deployer, network, accounts) => {
    return deploy(deployer, accounts)
}

async function liveDeploy(deployer, accounts) {
        return deployer.deploy(
            TipTokenCrowdsale,
            testSaleStartUnix,
            testSaleEndUnix,
            exchangeRate,
            web3.eth.accounts[9],
            hardCap
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

    return deployer
    .then(() => {
        return deployer.deploy(TipToken)
    })
    .then(() => {
        return deployer.deploy(
            TipTokenCrowdsale,
            testSaleStartUnix,
            testSaleEndUnix,
            exchangeRate,
            ethVault,
            tokenWallet,
            hardCap,
            TipToken.address
        )
    })
    .catch(err => {
        console.log("Error deploying contracts: ", err)
    })
}
