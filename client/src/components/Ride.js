import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { Rating, Button, Form, Segment } from 'semantic-ui-react'
import { setRide, getRide } from '../web3'

function Ride({ ride }) {
  const [show, setShow] = useState(false)
  const [bidMade, setBidMade] = useState(false)
  const [bidAmount, setBidAmount] = useState(0)

  let history = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    setRide(ride.returnValues[0])
    const RideContract = getRide()
    await RideContract.methods.makeBid(bidAmount).send()

    setShow(false)
    setBidMade(true)
  }

  if (bidMade) {
    const RideContract = getRide()
    RideContract.events.BidAccepted({}, (error, event) => {
      if (error) {
        console.log(error)
        return
      }

      console.log(event)
      history(`/ongoingRide/${event.address}`,{state:{bidAmount:bidAmount}})
    })
  }

  return (
    <Card style={{ flex: 1, backgroundColor: '#48a897' }} text="light" className="my-3 p-3 rounded">
      <Card.Body>
        <Card.Text as="h3">
          {' '}
          Rider address: <small>{ride.returnValues._rider}</small>{' '}
        </Card.Text>
        <Card.Text as="h3"> Pickup: {ride.returnValues._source_name} </Card.Text>
        <Card.Text as="h3"> Destination: {ride.returnValues._dest_name} </Card.Text>
        <Card.Text as="h6">
          <strong>
            User Rating: <Rating icon="star" disabled defaultRating={5} maxRating={5} />
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
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="Enter bid amount"
                />
                <Button type="submit" color="teal" fluid onClick={submitHandler}>
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
