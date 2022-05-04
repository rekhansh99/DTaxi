import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Rating } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import { getRide } from '../web3'

function calcDistance() {
  var coords = Array.prototype.map.call(arguments, function(deg) { return deg/180.0 * Math.PI; });
  var lat1 = (coords[0])/3600, lon1 = (coords[1])/3600, lat2 = (coords[2])/3600, lon2 = (coords[3])/3600;
  var R = 6372.8; // km
  var dLat = lat2 - lat1;
  var dLon = lon2 - lon1;
  var a = Math.sin(dLat / 2) * Math.sin(dLat /2) + Math.sin(dLon / 2) * Math.sin(dLon /2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.asin(Math.sqrt(a));
  return R * c * 1.852;
}

function Bid({ driver }) {
  const navigate = useNavigate()
  const ride = getRide()
  const submitHandler = async () => {
    const acceptedBid = await ride.methods.acceptBid(driver.walletAddress).send()
  }

  ride.events.BidAccepted({}, (error, event) => {
    if (error) {
      console.log(error)
      return
    }

    console.log(event)
    const distance = calcDistance(event.returnValues.source.lat, event.returnValues.source.long, event.returnValues.dest.lat, event.returnValues.dest.long)

    navigate(`/ongoingRide/${event.address}`,
      {
        state:{
          bidAmount:driver.bidAmount, 
          source: event.returnValues.source.name, 
          destination: event.returnValues.dest.name,
          distance: distance 
        }})
  })
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
    
  )
}

export default Bid
