import Web3 from 'web3'
import DTaxiContract from './contracts/DTaxi.json'
import RideContract from './contracts/Ride.json'

let web3 = null
let dtaxi = null
let ride = null

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
      const provider = new Web3.providers.WebsocketProvider('ws://127.0.0.1:9545')
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

export const initDTaxiContract = async (account) => {
  const networkId = await web3.eth.net.getId()
  dtaxi = new web3.eth.Contract(DTaxiContract.abi, DTaxiContract.networks[networkId].address, {
    from: account,
    gas: 1500000,
    gasPrice: '3000000000000'
  })
  return dtaxi
}

export const getDTaxiContract = () => {
  if (dtaxi)
    return dtaxi

  throw new Error('Contract is not initialized.')
}

export const setRide = (rideContractAddress) => {
  ride = new web3.eth.Contract(RideContract.abi, rideContractAddress, {
    gas: 1500000,
    gasPrice: '3000000000000'
  })
}
export const getRide = () => {
  if (ride)
    return ride

  throw new Error('Ride is not initialized.')
}