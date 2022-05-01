import React, { useState, useEffect } from 'react'
import rides from '../ridesRaw'
import { Row, Col } from 'react-bootstrap'
import { getDTaxiContract, getWeb3 } from '../web3'
import Ride from '../components/Ride'
import './centerAlign.css'

function RideOptionsScreen() {
  const [rideRequests, setRideRequests] = useState([])
  const contract = getDTaxiContract()

  contract.events.RideRequested({}, (error, event) => {
    // TODO
  })

  return (
    <>
      {rides.map((ride) => (
        <Row key={ride.id} className="test">
          <Col md={3}>
            <Ride ride={ride} />
          </Col>
        </Row>
      ))}
    </>
  )
}
export default RideOptionsScreen
