import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import bids from '../bidsRaw';
import { Row, Container, Col } from 'react-bootstrap';
import Bid from '../components/Bid';
import './centerAlign.css';

function BidScreen() {
  // const { bids, loading, error } = useSelector(state => state.listBids)
  return (
    <Container>
      {bids.map((bid) => (
        <Row key={bid.id} className='test'>
          <Col md={3}>
            <Bid bid={bid} />
          </Col>
        </Row>
      ))}
    </Container>
  );
}
export default BidScreen;
