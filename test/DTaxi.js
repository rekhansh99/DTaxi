const DTaxi = artifacts.require('DTaxi')

contract('DTaxi', (accounts) => {
  it('should create new ride request', async () => {
    const dtaxi = await DTaxi.deployed()
    const result = await dtaxi.requestRide(1, 1, 2, 2, { from: accounts[0] })
  })
})