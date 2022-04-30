import Web3 from 'web3'
import RideContract from './contracts/Ride.json'

let web3 = null
let contract = null

export const initWeb3 = () => new Promise((resolve, reject) => {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', async () => {
    // // Modern dapp browsers...
    // if (window.ethereum) {
    //   web3 = new Web3(window.ethereum);
    //   try {
    //     // Request account access if needed
    //     await window.ethereum.enable();
    //   } catch (error) {
    //     reject(error);
    //   }
    // }
    // // Legacy dapp browsers...
    // else if (window.web3) {
    //   // Use Mist/MetaMask's provider.
    //   web3 = window.web3;
    //   console.log("Injected web3 detected.");
    // }
    // // Fallback to localhost; use dev console port by default...
    // else {
      const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545')
      web3 = new Web3(provider)
      console.log('No web3 instance injected, using Local web3.')
    // }
    resolve(web3)
  })
})

export const getWeb3 = () => {
  if (web3)
    return web3
  
  throw new Error('Web3 is not initialized.')
}

export const deployContract = async (account, source_long, source_lat, dest_long, dest_lat) => {
  contract = new web3.eth.Contract(RideContract.abi)
  const deployedContract = await contract
    .deploy({
      data: RideContract.bytecode,
      arguments: [source_long, source_lat, dest_long, dest_lat]
    })
    .send({
      from: account,
      gas: 1500000,
      gasPrice: '30000000000000'
    })
  contract = deployedContract
  return contract
}

export const getContract = () => {
  if (contract)
    return contract

  throw new Error('Contract is not initialized.')
}