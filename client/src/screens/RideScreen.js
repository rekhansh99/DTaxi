import React from 'react'
import { getRide } from '../web3'
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Button,Icon } from 'semantic-ui-react';
import './centerAlign.css'
import map from './map.jpg'

const RideScreen = () => {


    const navigate = useNavigate();
    const ride = getRide()
    let loc = useLocation()
    const handleStartRide = async () => {
       const data= await ride.methods.startRide().send({value:loc.state.bidAmount})
        console.log("start request")
        console.log(data)
    }

    ride.events.RideStarted({}, (error, event) => {
        if (error)
        {
            console.log(error)
            return
        }

        console.log(event)
        console.log("Ride started")
    })

    const handleEndRide = async () => {
       const data = await ride.methods.endRide().send()
        console.log("end request")
        console.log(data)
    }

    ride.events.RideCompleted({},async (error, event) => {
        if (error)
        {
            console.log(error)
            return
        }

        console.log(event)
        console.log("Ride ended")
        // const data = await ride.methods.withdraw().send()
        // console.log(data)
        alert("Your ride has ended!")
        navigate('/')
    })

    const handleCancelRide = async () => {
        const data = await ride.methods.cancelRide().send()
        console.log("cancel request")
        console.log(data)
    }

    ride.events.RideCancelled({}, (error, event) => {
        if (error)
        {
            console.log(error)
            return
        }
        // TODO : show feedback form
        console.log(event)
        console.log("Ride cancelled")
    })

    return (
        <div className='bgImage'>
            <Container>
                <Row>
                    <Col className='banner'>
                        <h1 style={{fontSize: '5rem'}}>
                            <i className='taxi icon' ></i> DTaxi
                        </h1>
                        <h3>
                        <div className="d-grid gap-2">
                            Ongoing Ride...
                        </div>
                        </h3>
                        
                    </Col>
                <Col>
                <Card style={{ flex: 1, backgroundColor: 'white' }} text="dark" width="50%" className="my-3 p-3 rounded">
                    <Card.Header as="h3" style={{ backgroundColor: '#abd6d0' }}>
                        <Row>
                            <Col>
                            <Icon name='user' /> Avinash Tripathi
                            </Col>
                            <Col>
                            OTP: 1234
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Img variant="top" src={map}/>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Card.Text as="h4"> <Icon name='point'/>{loc.state.source} </Card.Text>
                                <Card.Text as="h4"> <Icon name='ellipsis vertical'/> </Card.Text>
                                <Card.Text as="h4"> <Icon name='point'/>{loc.state.destination} </Card.Text>
                            </Col>
                            <Col>
                                <Card.Text as="h4"><Icon name='road'/>  {loc.state.distance.toFixed(2)}Km</Card.Text>
                                <Card.Text as="h4"><Icon name='rupee sign'/> {loc.state.bidAmount}</Card.Text>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <Row>
                            <Col lg={4} >
                                <Button style={{marginBottom:'1%'}} color="teal" fluid size="large" onClick = {handleStartRide}> Start Ride </Button>
                            </Col>
                            <Col lg={4}>
                                <Button style={{marginBottom:'1%'}} color="teal" fluid size="large" onClick = {handleEndRide}> End Ride </Button>
                            </Col>
                            <Col lg={4}>
                                <Button style={{marginBottom:'1%'}} color="teal" fluid size="large" onClick = {handleCancelRide}> Cancel Ride </Button>
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>
                {/* <Row>
                    <h1>Placeholder for ride tracking. {loc.state.source}, {loc.state.destination}</h1>
                </Row>
                <Row>
                    <Col md={8}>
                        <div>
                            Your ride has been confirmed!
                        </div>
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
                    <Col md={6}>
                        Vehicle no:
                    </Col>
                    <Col md={6}>

                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        Distance: {loc.state.distance}
                    </Col>
                    <Col md={6}>

                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        ETA: 
                    </Col>
                    <Col md={6}>
                        5 minutes
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Button color="teal" fluid size="large" onClick = {handleStartRide}> Start Ride </Button>
                    </Col>
                    <Col md={4}>
                        <Button color="teal" fluid size="large" onClick = {handleEndRide}> End Ride </Button>
                    </Col>
                    <Col md={4}>
                        <Button color="teal" fluid size="large" onClick = {handleCancelRide}> Cancel Ride </Button>
                    </Col>
                </Row> */}
                </Col>
          </Row>
        </Container>
        </div>
    )
}

export default RideScreen