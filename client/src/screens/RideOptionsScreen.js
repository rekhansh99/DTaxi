import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { getDTaxiContract } from '../web3'
import Ride from '../components/Ride'
import './centerAlign.css'



function RideOptionsScreen() {

  
  const [rideRequests,setRideRequests] = useState({});
  const contract = getDTaxiContract()
  contract.events.RideRequested({}, (error, event) => {
    let key = Object.keys(rideRequests).length
    setRideRequests({...rideRequests, [key]: event});
  })
  
  
  console.log(rideRequests)

  return (
    <>
      {Object.entries(rideRequests).map((ride) => (
        <Row key={ride[0]} className="test">
          <Col md={3}>
            <Ride ride={ride[1]} />
          </Col>
        </Row>
      ))}
      {/* {rides.map((ride) => (
        <Row key={ride.id} className="test">
          <Col md={3}>
            <Ride ride={ride} />
          </Col>
        </Row>
      ))} */}
    </>
  )
}
export default RideOptionsScreen
