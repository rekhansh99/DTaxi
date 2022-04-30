import React, {useState} from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Rating } from 'semantic-ui-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { acceptBid } from '../store/actions/bidActions';

function Bid({ bid }) {
  // const dispatch = useDispatch();
  // const [message, setMessage] = useState('');
  
  function handleSubmit(e) {
    console.log('Ride');
    /*
    e.preventDefault();
    dispatch(acceptBid(walletAddress)).then((status) => {
      if(status === 200)
      {
        navigate(`/rideConfirmed/${bid.id}`)
      }
      else{
        setMessage('An error occurred. Please try again.');
      }
    })
    */ 
  };
  return (
    <Card
      style={{ flex: 1, backgroundColor: '#48a897' }}
      text='light'
      width='50%'
      className='my-3 p-3 rounded'
    >
      <Card.Header as='h3' style={{ backgroundColor: '#abd6d0' }}>
        Name: {bid.name}
      </Card.Header>
      <Card.Body>
        <Card.Text as='h3'> Vehicle no: {bid.vehicle} </Card.Text>
        <Card.Text as='h6'>
          <strong>Driver distance: {bid.distance}</strong>
        </Card.Text>
        <Card.Text as='h6'>
          <strong>Fare: {bid.fare}</strong>
        </Card.Text>
        <Card.Text as='h6'>
          <strong>
            Rating:
            <Rating icon='star' defaultRating={3} maxRating={5} />
          </strong>
        </Card.Text>
        <Link to={`/rideConfirmed/${bid.id}`} style={{ color: '#FFF' }}>
          <Card.Text as='div'>
            <Button onClick={(e) => handleSubmit(e)}>Choose</Button>
          </Card.Text>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default Bid;
