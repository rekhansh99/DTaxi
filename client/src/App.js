import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { initDTaxiContract, initWeb3 } from './web3'

import Booking from './screens/BookingScreen'
import Bids from './screens/BidScreen'
import RideOptions from './screens/RideOptionsScreen'
import RideConfirmed from './screens/RideScreen'

import './App.css'

class App extends Component {
  state = { web3: null, account: null }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await initWeb3()

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts()

      // Initialize contract once web3 and user accounts found.
      const contract = await initDTaxiContract(accounts[0])

      // Set web3, accounts, and contract to the state
      this.setState({ web3, account: accounts[0], contract })
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(`Failed to load web3, accounts, or contract. Check console for details.`)
      console.error(error)
    }
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>
    }

    if (!this.state.account) {
      return (
        <div>
          <p>No accounts found.</p>
        </div>
      )
    }

    return (
      <Router>
        <Routes>
          <Route exact path="/booking" element={<Booking />} />
          <Route exact path="/bids" element={<Bids />} />
          <Route exact path="/options" element={<RideOptions />} />
          <Route exact path="/ongoingRide/:string" element={<RideConfirmed />} />
        </Routes>
      </Router>
    )
  }
}

export default App
