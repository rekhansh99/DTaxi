import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import { getDTaxiContract, setRide } from '../web3'
import './centerAlign.css'

function toSeconds(coordinate) {
  var absolute = Math.abs(coordinate)
  var degrees = Math.floor(absolute)
  var minutesNotTruncated = (absolute - degrees) * 60
  var minutes = Math.floor(minutesNotTruncated)
  var seconds = Math.floor((minutesNotTruncated - minutes) * 60)

  return degrees * 3600 + minutes * 60 + seconds
}

function convertDMS(lat, lng) {
  var latitude = toSeconds(lat)
  var longitude = toSeconds(lng)

  return [latitude, longitude]
}

async function getCoordinates(loc) {
  let coords = []
  const data = await (
    await fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=G6WNiN78hofxPRgeQEs8T6IYKFZ0MDuY&location=${loc}`)
  ).json()
  coords[0] = data.results[0].locations[0].displayLatLng.lat
  coords[1] = data.results[0].locations[0].displayLatLng.lng
  console.log(coords)
  return convertDMS(coords[0], coords[1])
}

function RiderForm() {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  let history = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()

    const source = await getCoordinates(pickup)
    const dest = await getCoordinates(destination)

    console.log(source)
    console.log(dest)
    const contract = getDTaxiContract()
    const receipt = await contract.methods
      .requestRide(pickup, source[0], source[1], destination, dest[0], dest[1])
      .send()
    console.log(receipt)
    setRide(receipt.events.RideRequested.returnValues[0])
    history('/bids')
  }
  return (
    <div className='bgImage'>
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 650 }}>
        <Form size="large" onSubmit={submitHandler}>
          <Segment stacked>
          <h1 style={{fontSize: '5rem'}}><i className='taxi icon'></i> DTaxi</h1>
            <Form.Input
              fluid
              icon="location arrow"
              iconPosition="left"
              placeholder="Enter pickup location"
              onChange={(e) => setPickup(e.target.value)}
            />
            <Form.Input
              fluid
              icon="location arrow"
              iconPosition="left"
              placeholder="Enter destination"
              onChange={(e) => setDestination(e.target.value)}
            />
            <Button type="submit" color="teal" fluid size="large">
              Request Now
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
    </div>
    
  )
}

export default RiderForm
