import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { addListener, removeListener } from '../web3'
import Ride from '../components/Ride'
import './centerAlign.css'

function RideOptionsScreen() {
  const [rideRequests, setRideRequests] = useState({})

  useEffect(() => {
    const rideRequestedListener = (error, event) => {
      if (error) {
        console.log(error)
        return
      }

      console.log(event)
      setRideRequests((requests) => {
        const key = Object.keys(requests).length
        return {
          ...requests,
          [key]: {
            address: event.returnValues._rider,
            source_name: event.returnValues._source_name,
            dest_name: event.returnValues._dest_name,
            rating: 5
          }
        }
      })
    }

    addListener("RideRequested", rideRequestedListener)
    return () => removeListener("RideRequested", rideRequestedListener)
  }, [])

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
