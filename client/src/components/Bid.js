import React, {useState} from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Rating } from 'semantic-ui-react';
import {getRide} from '../web3'
import { getWeb3 } from '../web3'

function Bid({ bid }) {
  
  const submitHandler = async (e) => {
     const web3 = await getWeb3()

    //   // Use web3 to get the user's accounts.
    const accounts = await web3.eth.getAccounts()
    const ride = await getRide()
    const acceptedBid = await ride.methods.acceptBid(bid.returnValues._driver).send({from:accounts[0]})
    console.log(ride)
    console.log(acceptedBid)

  }
  return (
    // <Card
    //   style={{ flex: 1, backgroundColor: '#48a897' }}
    //   text='light'
    //   width='50%'
    //   className='my-3 p-3 rounded'
    // >
    //   <Card.Header as='h3' style={{ backgroundColor: '#abd6d0' }}>
    //     Name: {bid.name}
    //   </Card.Header>
    //   <Card.Body>
    //     <Card.Text as='h3'> Vehicle no: {bid.vehicle} </Card.Text>
    //     <Card.Text as='h6'>
    //       <strong>Driver distance: {bid.distance}</strong>
    //     </Card.Text>
    //     <Card.Text as='h6'>
    //       <strong>Fare: {bid.fare}</strong>
    //     </Card.Text>
    //     <Card.Text as='h6'>
    //       <strong>
    //         Rating:
    //         <Rating icon='star' defaultRating={3} maxRating={5} />
    //       </strong>
    //     </Card.Text>
        
    //       <Card.Text as='div'>
    //         <Button onClick={submitHandler}>Choose</Button>
    //       </Card.Text>
        
    //   </Card.Body>
    // </Card>
    <Card
      style={{ flex: 1, backgroundColor: '#48a897' }}
      text='light'
      width='50%'
      className='my-3 p-3 rounded'
    >
      <Card.Header as='h3' style={{ backgroundColor: '#abd6d0' }}>
        Driver address: {bid.returnValues._driver}
      </Card.Header>
      <Card.Body>
      <Card.Text as='h6'>
          <strong>bid Address: {bid.address}</strong>
        </Card.Text>
        <Card.Text as='h6'>
          <strong>Fare: {bid.returnValues._amount}</strong>
        </Card.Text>
        <Card.Text as='h6'>
          <strong>
            Rating:
            <Rating icon='star' defaultRating={3} maxRating={5} />
          </strong>
        </Card.Text>
        
          <Card.Text as='div'>
            <Button onClick={submitHandler}>Choose</Button>
          </Card.Text>
        
      </Card.Body>
    </Card>
  );
}

export default Bid;
