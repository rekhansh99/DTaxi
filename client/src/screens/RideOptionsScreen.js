import React, { useState, useEffect } from 'react';
import rides from '../ridesRaw';
import { Row, Container, Col } from 'react-bootstrap';
import Ride from '../components/Ride';
import './centerAlign.css';

function RideOptionsScreen() {
  return (
    <>
      {rides.map((ride) => (
        <Row key={ride.id} className='test'>
          <Col md={3}>
            <Ride ride={ride} />
          </Col>
        </Row>
      ))}
    </>
  );
}
export default RideOptionsScreen;
