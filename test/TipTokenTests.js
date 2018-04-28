var TipToken = artifacts.require("TipToken")
var assertRevert = require("./helpers/assertRevert")

contract("TipToken", (accounts) => {
    const numberOfDecimals = 18
    const supply = 1000000000
    const creator = accounts[0]
    const other = accounts[1]
    const account2 = accounts[2]
    const account3 = accounts[3]

    let token

    beforeEach(async () => {
        token = await TipToken.new({from: creator})
    })

    it("should have the correct name", async () =>{
        const name = await token.name()
        assert.equal(name, "Tip Token")
    })

    it("should have the correct symbol", async () => {
        const symbol = await token.symbol()
        assert.equal(symbol, "TIP")
    })

    it("should have the right number of decimals", async () => {
        const decimals = await token.decimals()
        assert.equal(numberOfDecimals, decimals)
    })

    it("should create the expected number of tokens", async () => {
        const totalSupply = await token.totalSupply()
        const expectedSupply = supply * (10**numberOfDecimals)
        let totalSupplyAsNumber = totalSupply.toNumber()
        assert.equal(totalSupplyAsNumber, expectedSupply)
    })

    it("returns the correct total supply and allocated to the creator's account", async () => {
        const totalSupply = await token.totalSupply()
        const creatorBalance = await token.balanceOf(creator)
        assert(totalSupply.eq(creatorBalance))
    })

    it("can transfer tokens to another address", async () => {
        let amount = 1000
        await token.transfer(other, amount)

        let balanceOfOther = await token.balanceOf(other)
        assert.equal(balanceOfOther.toNumber(), amount)

        let balanceOfCreator = await token.balanceOf(creator)
        let balanceOfCreatorAsNumber = balanceOfCreator.toNumber()

        let totalSupply = await token.totalSupply()

        assert.equal(totalSupply.toNumber(), balanceOfCreator.toNumber() + amount)
        assert.equal(balanceOfCreator.toNumber(), totalSupply.toNumber() - amount)
    })

    it("can approve and transfer from another account", async () => {
        const amount = 10000000
        await token.approve(other, amount)
        let allowance = await token.allowance(creator, other)
        assert.equal(amount, allowance)

        await token.transferFrom(creator, account2, amount, {from: other})
        let balanceOfAccount2 = await token.balanceOf(account2)
        assert.equal(balanceOfAccount2.toNumber(), amount)
    })
})
