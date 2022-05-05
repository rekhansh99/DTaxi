import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { Button } from 'semantic-ui-react'
import { addListener, getRide, removeListener } from '../web3'

const RideScreen = () => {
  const loc = useLocation()

  const handleStartRide = async () => {
    const ride = getRide()
    const data = await ride.methods.startRide().send({ value: loc.state.bidAmount })
    console.log('start request')
    console.log(data)
  }

  useEffect(() => {
    const rideStartedListener = (error, event) => {
      if (error) {
        console.log(error)
        return
      }

      console.log(event)
      console.log('Ride started')
    }

    addListener('RideStarted', rideStartedListener)
    return () => removeListener('RideStarted', rideStartedListener)
  }, [])

  const handleEndRide = async () => {
    const ride = getRide()
    const data = await ride.methods.endRide().send()
    console.log('end request')
    console.log(data)
  }

  useEffect(() => {
    const rideCompletedListener = async (error, event) => {
      if (error) {
        console.log(error)
        return
      }

      console.log(event)
      console.log('Ride ended')
      const ride = getRide()
      const data = await ride.methods.withdraw().send()
      console.log(data)
    }

    addListener('RideCompleted', rideCompletedListener)
    return () => removeListener('RideCompleted', rideCompletedListener)
  }, [])

  const handleCancelRide = async () => {
    const ride = getRide()
    const data = await ride.methods.cancelRide().send()
    console.log('cancel request')
    console.log(data)
  }

  useEffect(() => {
    const rideCancelledListener = (error, event) => {
      if (error) {
        console.log(error)
        return
      }

      console.log(event)
      console.log('Ride cancelled')
    }

    addListener('RideCancelled', rideCancelledListener)
    return () => removeListener('RideCancelled', rideCancelledListener)
  }, [])

  return (
    <Container>
      <Row>
        <h1>Placeholder for ride tracking</h1>
      </Row>
      <Row>
        <Col md={8}>
          <div>Your ride has been confirmed!</div>
        </Col>
        <Col md={4}>
          <div>
            <h4>OTP:1234</h4>
          </div>
        </Col>
      </Row>
      <Row>
        <h2>Ride details</h2>
      </Row>
      <Row>
        <Col md={6}>Vehicle no:</Col>
        <Col md={6}></Col>
      </Row>
      <Row>
        <Col md={6}>Driver's name:</Col>
        <Col md={6}></Col>
      </Row>
      <Row>
        <Col md={6}>ETA:</Col>
        <Col md={6}>5 minutes</Col>
      </Row>
      <Row>
        <Col md={4}>
          <Button color="teal" fluid size="large" onClick={handleStartRide}>
            Start Ride
          </Button>
        </Col>
        <Col md={4}>
          <Button color="teal" fluid size="large" onClick={handleEndRide}>
            End Ride
          </Button>
        </Col>
        <Col md={4}>
          <Button color="teal" fluid size="large" onClick={handleCancelRide}>
            Cancel Ride
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default RideScreen
