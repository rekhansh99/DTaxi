import React, { useState, useEffect } from 'react'
import rides from '../ridesRaw'
import { Row, Col } from 'react-bootstrap'
import { getDTaxiContract } from '../web3'
import Ride from '../components/Ride'
import './centerAlign.css'

let rideRequests = [];

function RideOptionsScreen() {
  
  const contract = getDTaxiContract()
  // const allEvents = contract.getPastEvents('RideRequested',{fromBlock:0},(error,events) => {
  //     console.log(events)
  //     setRideRequests(events)
  //   })
  contract.events.RideRequested({fromBlock: 0, toBlock: 'latest' }, (error, event) => {
    
    rideRequests.push(event);
    
  })
  console.log(rideRequests)
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
