import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { initDTaxiContract, initWeb3 } from './web3'

import Booking from './screens/BookingScreen'
import Bids from './screens/BidScreen'
import RideOptions from './screens/RideOptionsScreen'
import RideConfirmed from './screens/RideScreen'

import './App.css'

class App extends Component {
  state = { web3: null, accounts: null, account: null }

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
    this.setState({ account })
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
      return (
        <div>
          <p>Select an account: </p>
          <select defaultValue={-1} onChange={(e) => this.setAccount(e.target.value)}>
            <option hidden disabled key={-1} value={-1}>
              -- select an option --
            </option>
            {this.state.accounts.map((account, index) => (
              <option key={index} value={account}>
                {account}
              </option>
            ))}
          </select>
        </div>
      )
    }

    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Booking />} />
          <Route exact path="/bids" element={<Bids />} />
          <Route exact path="/options" element={<RideOptions />} />
          <Route exact path="/ongoingRide/:address" element={<RideConfirmed />} />
        </Routes>
      </Router>
    )
  }
}

export default App
