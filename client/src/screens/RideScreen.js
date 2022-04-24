import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const RideScreen = () => {

    return (
        <Container>
            <Row>
                <h1>Placeholder for ride tracking</h1>
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
                    Driver's name:
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
        </Container>
    )
}

export default RideScreen