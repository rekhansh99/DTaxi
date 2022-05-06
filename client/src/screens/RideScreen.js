import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Button, Icon, Modal, Header, Form } from 'semantic-ui-react'
import { addListener, getRide, removeListener } from '../web3'
import './centerAlign.css'
import map from './map.jpg'

const RideScreen = () => {
  const [showCause, setShowCause] = useState(false)
  const [showRating, setShowRating] = useState(false)
  const [reason, setReason] = useState('')
  const [rating, setRating] = useState(3)
  const [started, setStarted] = useState(false)
  const navigate = useNavigate()
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
      setStarted(true)
    }

    addListener('RideStarted', rideStartedListener)
    return () => removeListener('RideStarted', rideStartedListener)
  }, [])

  const handleEndRide = async () => {
    const ride = getRide()
    const data = await ride.methods.endRide().send()
    console.log('end request')
    console.log(data)
    setShowRating(true)
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
    setShowCause(true)
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
    <>
      <Modal basic as={Form} onSubmit={() => navigate('/')} open={showCause} size="small">
        <Header icon="pencil" content="Please provide a reason for cancellation" as="h6" />
        <Modal.Content>
          <Form.Input
            required
            type="text"
            placeholder="Cancellation cause"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button positive type="submit" icon="save" content="Submit" />
        </Modal.Actions>
      </Modal>
      <Modal basic as={Form} onSubmit={() => navigate('/')} open={showRating} size="small">
        <Header icon="pencil" content="Rate your ride!" as="h3" />
        <Modal.Content>
          <Form.Input
            required
            type="number"
            placeholder="Provide rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button positive type="submit" icon="save" content="Submit" />
        </Modal.Actions>
      </Modal>
      <div className="bgImage">
        <Container>
          <Row>
            <Col className="banner">
              <h1 style={{ fontSize: '5rem' }}>
                <i className="taxi icon"></i> DTaxi
              </h1>
              <h3>
                {started ? (
                  <div className="d-grid gap-2">Ongoing ride</div>
                ) : (
                  <div className="d-grid gap-2">Ride matched!</div>
                )}
              </h3>
            </Col>
            <Col>
              <Card style={{ flex: 1, backgroundColor: 'white' }} text="dark" width="50%" className="my-3 p-3 rounded">
                <Card.Header as="h3" style={{ backgroundColor: '#abd6d0' }}>
                  <Row>
                    <Col>
                      <Icon name="user" /> Avinash Tripathi
                    </Col>
                    <Col>OTP: 1234</Col>
                  </Row>
                </Card.Header>
                <Card.Img variant="top" src={map} />
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Text as="h4">
                        {' '}
                        <Icon name="point" />
                        {loc.state.source[0].toUpperCase() + loc.state.source.substring(1)}{' '}
                      </Card.Text>
                      <Card.Text as="h4">
                        {' '}
                        <Icon name="ellipsis vertical" />{' '}
                      </Card.Text>
                      <Card.Text as="h4">
                        {' '}
                        <Icon name="point" />
                        {loc.state.destination[0].toUpperCase() + loc.state.destination.substring(1)}{' '}
                      </Card.Text>
                    </Col>
                    <Col>
                      <Card.Text as="h4">
                        <Icon name="road" /> {loc.state.distance.toFixed(2)} km
                      </Card.Text>
                      <Card.Text as="h4">
                        <Icon name="ethereum" /> {loc.state.bidAmount}
                      </Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <Row>
                    <Col lg={4}>
                      <Button style={{ marginBottom: '1%' }} color="teal" fluid size="large" onClick={handleStartRide}>
                        {' '}
                        Start Ride{' '}
                      </Button>
                    </Col>
                    <Col lg={4}>
                      <Button style={{ marginBottom: '1%' }} color="teal" fluid size="large" onClick={handleEndRide}>
                        {' '}
                        End Ride{' '}
                      </Button>
                    </Col>
                    <Col lg={4}>
                      <Button style={{ marginBottom: '1%' }} color="teal" fluid size="large" onClick={handleCancelRide}>
                        {' '}
                        Cancel Ride{' '}
                      </Button>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default RideScreen
