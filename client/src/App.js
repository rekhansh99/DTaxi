import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SimpleStorageContract from './contracts/SimpleStorage.json';
import getWeb3 from './getWeb3';
import { ethers } from 'ethers';
import Header from './components/Header';
import Signup from './screens/SignupScreen';
import Login from './screens/LoginScreen';
import Booking from './screens/BookingScreen';
import Bids from './screens/BidScreen';
import RideConfirmed from './screens/RideScreen'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import RideOptions from './screens/RideOptionsScreen';

class App extends Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    account: null,
    contract: null,
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      const account = accounts[0];
      const signer = new ethers.providers.Web3Provider(
        window.ethereum
      ).getSigner();

      const URL = 'HTTP://127.0.0.1:8545';
      let provider = new ethers.providers.JsonRpcProvider(URL);

      let gasPrice = provider.getGasPrice();

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState(
        { web3, accounts, account, signer, gasPrice },
        this.runExample
      );
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
    }
  };

  // runExample = async () => {
  //   const { accounts, contract } = this.state;

  //   // Stores a given value, 5 by default.
  //   await contract.methods.set(5).send({ from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.methods.get().call();

  //   // Update state with the result.
  //   this.setState({ storageValue: response });
  // };

  render() {
    if (!this.state.account) {
      return (
        <Router>
          <Header />
          <Routes>
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/login' element={<Login />} />
          </Routes>
        </Router>
      );
    }
    return (
      <Router>
        <Routes>
          <Route exact path='/booking' element={<Booking />} />
          <Route exact path='/bids' element={<Bids />} />
          <Route exact path='/options' element={<RideOptions />} />
          <Route exact path='/rideConfirmed/:id' element={<RideConfirmed />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
