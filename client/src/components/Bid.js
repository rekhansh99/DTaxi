import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Rating } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import { getRide } from '../web3'

function Bid({ driver }) {
  const history = useNavigate()

  const submitHandler = async (e) => {
    const ride = getRide()
    const acceptedBid = await ride.methods.acceptBid(driver.walletAddress).send()
    console.log(ride)
    console.log(acceptedBid)

    history(`/ongoingRide/${ride.options.address}`)
  }

  return (
    <Card style={{ flex: 1, backgroundColor: '#48a897' }} text="light" width="50%" className="my-3 p-3 rounded">
      <Card.Header as="h3" style={{ backgroundColor: '#abd6d0' }}>
        Name: {driver.name}
      </Card.Header>
      <Card.Body>
        <Card.Text as="h3"> Vehicle no: {driver.vehicle_no} </Card.Text>
        <Card.Text as="h6">
          {/* TODO: Calculate distance */}
          <strong>Driver distance: 2 km</strong>
        </Card.Text>
        <Card.Text as="h6">
          <strong>Fare: ₹ {driver.bidAmount}</strong>
        </Card.Text>
        <Card.Text as="h6">
          <strong>
            Rating:
            <Rating icon="star" disabled defaultRating={driver.rating} maxRating={5} />
          </strong>
        </Card.Text>

        <Card.Text as="div">
          <Button onClick={submitHandler}>Choose</Button>
        </Card.Text>
      </Card.Body>
    </Card>
    // <Card
    //   style={{ flex: 1, backgroundColor: '#48a897' }}
    //   text='light'
    //   width='50%'
    //   className='my-3 p-3 rounded'
    // >
    //   <Card.Header as='h3' style={{ backgroundColor: '#abd6d0' }}>
    //     Driver address: {bid.returnValues._driver}
    //   </Card.Header>
    //   <Card.Body>
    //   <Card.Text as='h6'>
    //       <strong>bid Address: {bid.address}</strong>
    //     </Card.Text>
    //     <Card.Text as='h6'>
    //       <strong>Fare: {bid.returnValues._amount}</strong>
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
  )
}

export default Bid
