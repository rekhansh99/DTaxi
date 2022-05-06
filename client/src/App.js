import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { initDTaxiContract, initWeb3 } from './web3'

import Home from './screens/Home'
import Bids from './screens/BidScreen'
import RideOptions from './screens/RideOptionsScreen'
import RideConfirmed from './screens/RideScreen'

import './App.css'
import './screens/centerAlign.css'
import RiderForm from './screens/RiderForm'
import DriverForm from './screens/DriverForm'

import { getDoc, doc } from 'firebase/firestore/lite'
import db from './firebase'

class App extends Component {
  state = { web3: null, accounts: null, account: null, isDriver: false }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await initWeb3()

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts()

      // Set web3 and accounts to the state
      this.setState({ web3, accounts })
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert('Failed to load web3 or accounts. Check console for details.')
      console.error(error)
    }
  }

  setAccount = async (account) => {
    await initDTaxiContract(account)

    const driverSnap = await getDoc(doc(db, 'drivers', account))

    this.setState({ account, isDriver: driverSnap.exists() })
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>
    }

    if (!this.state.accounts) {
      return (
        <div>
          <p>No accounts found.</p>
        </div>
      )
    }

    if (!this.state.account) {
      return (<div className='bgImage'>
        <div className ='test verticalCenter'>
        <h1 style={{color:'white',fontSize:'5rem'}}><i className='taxi icon'></i> DTaxi</h1>
      <h1 style={{color:'white',fontSize:'2rem'}}>Select an account: </h1>
      <select style={{padding:'5%', margin:'2%', fontWeight:'bold'}} defaultValue={-1} onChange={(e) => this.setAccount(e.target.value)}>
        <option hidden disabled key={-1} value={-1}>
          -- select an option --
        </option>
        {this.state.accounts.map((account, index) => (
          <option style={{margin:'2%', padding:'2%'}} key={index} value={account}>
            {account}
          </option>
        ))}
      </select>
    </div></div>
        
      )
    }

    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Home isDriver={this.state.isDriver} />} />
          <Route exact path="/ride" element={<RiderForm />} />
          <Route exact path="/drive" element={<DriverForm setDriver={() => this.setState({ isDriver: true })} />} />
          <Route exact path="/bids" element={<Bids />} />
          <Route exact path="/options" element={<RideOptions />} />
          <Route exact path="/ongoingRide/:address" element={<RideConfirmed isDriver={this.state.isDriver} />} />
        </Routes>
      </Router>
    )
  }
}

export default App
