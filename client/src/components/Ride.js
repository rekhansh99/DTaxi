import React, {useState} from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Rating } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux';
import { raiseBid } from '../store/actions/bidActions';

function Ride({ ride }) {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  
  /*function handleSubmit(e) {
    console.log('Ride');
    
    e.preventDefault();
    dispatch(raiseBid(bid.fare, walletAddress)).then((status) => {
      if(status === 200)
      {
        navigate(`/rideConfirmed/${bid.id}`)
      }
      else{
        setMessage('An error occurred. Please try again.');
      }
    })
     
  };*/
  return (
    <Card
      style={{ flex: 1, backgroundColor: '#48a897' }}
      text='light'
      className='my-3 p-3 rounded'
    >
      
      <Card.Body>
        <Card.Text as='h3'> Pickup distance: {ride.pickup_distance} </Card.Text>
        <Card.Text as='h3'>
          
            Destination distance: {ride.destination_distance}
          
        </Card.Text>
        <Card.Text as='h6'>
          <strong>
            Rating: <Rating icon='star' defaultRating={5} maxRating={5} />
          </strong>
        </Card.Text>
        <Link to={`/ride/${ride.id}`} style={{ color: '#FFF' }}>
          <Card.Text as='div'>
            <div className='my-3'>Raise a bid</div>
          </Card.Text>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default Ride;
