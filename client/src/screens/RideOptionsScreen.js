import React, { useState, useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { addListener, removeListener } from '../web3'
import Ride from '../components/Ride'
import Loader from '../components/Loader'
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

    addListener('RideRequested', rideRequestedListener)
    return () => removeListener('RideRequested', rideRequestedListener)
  }, [])

  const removeRequest = (key) => {
    setRideRequests((requests) => {
      const newRequests = { ...requests }
      delete newRequests[key]
      return newRequests
    })
  }

  return (
    <div className="bgImage">
      {Object.keys(rideRequests).length ? (
        <Container>
          <Row>
            <Col className="banner">
              <h1 style={{ fontSize: '5rem' }}>
                <i className="taxi icon"></i> DTaxi
              </h1>
              <br />
              <h1 style={{ fontSize: '2rem' }}>Ride Requests</h1>
            </Col>
            <Col>
              {Object.entries(rideRequests).map((ride) => (
                <Row key={ride[0]} className="test">
                  <Ride ride={ride[1]} removeRequest={() => removeRequest(ride[0])} />
                </Row>
              ))}
            </Col>
          </Row>
        </Container>
      ) : (
        <>
          <h1 className="test verticalCenter" style={{ fontSize: '3rem', color: 'white' }}>
            <Loader />
            Searching for rides...
          </h1>
        </>
      )}
    </div>
  )
}

export default RideOptionsScreen
