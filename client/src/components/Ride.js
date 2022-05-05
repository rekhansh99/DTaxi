import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { Rating, Button, Form, Segment } from 'semantic-ui-react'
import { setRide, getRide, addListener } from '../web3'

function Ride({ ride }) {
  const [show, setShow] = useState(false)
  const [bidMade, setBidMade] = useState(false)
  const [bidAmount, setBidAmount] = useState(0)

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    setRide(ride.address)
    const RideContract = getRide()
    await RideContract.methods.makeBid(bidAmount).send()
    addListener("BidAccepted", (error, event) => {
      if (error) {
        console.log(error)
        return
      }

      console.log(event)
      navigate(`/ongoingRide/${event.address}`, { state: { bidAmount: bidAmount } })
    })

    setBidMade(true)
  }

  return (
    <Card style={{ flex: 1, backgroundColor: '#48a897' }} text="light" className="my-3 p-3 rounded">
      <Card.Body>
        {/* <Card.Text as="h3">
          {' '}
          Rider address: <small>{ride.address}</small>{' '}
        </Card.Text> */}
        <Card.Text as="h3"> Pickup: {ride.source_name} </Card.Text>
        <Card.Text as="h3"> Destination: {ride.dest_name} </Card.Text>
        <Card.Text as="h6">
          <strong>
            User Rating: <Rating icon="star" disabled defaultRating={ride.rating} maxRating={5} />
          </strong>
        </Card.Text>
        <Button onClick={() => setShow(true)}>Make Bid</Button>
        <Card.Text as="div">
          {show && (
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="rupee"
                  iconPosition="left"
                  disabled={bidMade}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="Enter bid amount"
                />
                <Button type="submit" color="teal" fluid disabled={bidMade} onClick={submitHandler}>
                  Submit
                </Button>
                <Button
                  onClick={() => {
                    setShow(false)
                  }}
                >
                  Close
                </Button>
              </Segment>
            </Form>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Ride
