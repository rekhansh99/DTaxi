import React, { useState, useEffect } from 'react';
import bids from '../bidsRaw';
import { Row, Container, Col } from 'react-bootstrap';
import Bid from '../components/Bid';
import { getRide } from '../web3';
import './centerAlign.css';

function BidScreen() {
  const [bids,setBids] = useState({});
  const ride =  getRide()
  ride.events.BidReceived({},(error,event)=>{
    console.log(event)
    let key = Object.keys(bids).length
    setBids({...bids, [key]: event});
  })

  return (
    <Container>
      {Object.entries(bids).map((bid) => (
        <Row key={bid[0]} className="test">
          <Col md={3}>
            <Bid bid={bid[1]} />
          </Col>
        </Row>
      ))}
      {/* {bids.map((bid) => (
        <Row key={bid.id} className='test'>
          <Col md={3}>
            <Bid bid={bid} />
          </Col>
        </Row>
      ))} */}
    </Container>
  );
}
export default BidScreen;
