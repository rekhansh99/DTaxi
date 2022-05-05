import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { Rating, Button, Form, Segment } from 'semantic-ui-react'
import { setRide, getRide } from '../web3'

function calcDistance() {
  var coords = Array.prototype.map.call(arguments, function(deg) { return deg/180.0 * Math.PI; });
  var lat1 = (coords[0])/3600, lon1 = (coords[1])/3600, lat2 = (coords[2])/3600, lon2 = (coords[3])/3600;
  var R = 6372.8; 
  var dLat = lat2 - lat1;
  var dLon = lon2 - lon1;
  var a = Math.sin(dLat / 2) * Math.sin(dLat /2) + Math.sin(dLon / 2) * Math.sin(dLon /2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.asin(Math.sqrt(a));
  return R * c * 1.852;
}

function Ride({ ride }) {
  const [show, setShow] = useState(false)
  const [bidMade, setBidMade] = useState(false)
  const [bidAmount, setBidAmount] = useState(0)

  let navigate = useNavigate()

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

      const distance = calcDistance(event.returnValues.source.lat, event.returnValues.source.long, event.returnValues.dest.lat, event.returnValues.dest.long)

      navigate(`/ongoingRide/${event.address}`,
      {
        state:{
          bidAmount:bidAmount, 
          source: event.returnValues.source.name, 
          destination: event.returnValues.dest.name,
          distance: distance 
        }})
    })
  }

  return (
    <Card style={{ flex: 1, backgroundColor: '#48a897' }} text="light" className="my-3 p-3 rounded">
      <Card.Body>
        <Card.Text as="h3">
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
                  icon="ethereum"
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
