import React from 'react'
import { getRide } from '../web3'
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'
import { Button } from 'semantic-ui-react';

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
        <Container>
            <Row>
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
            </Row>
        </Container>
    )
}

export default RideScreen