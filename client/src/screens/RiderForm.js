import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import Autocomplete from 'react-autocomplete'
import { getDTaxiContract, setRide } from '../web3'
import './centerAlign.css'

function toSeconds(coordinate) {
  const absolute = Math.abs(coordinate)
  const degrees = Math.floor(absolute)
  const minutesNotTruncated = (absolute - degrees) * 60
  const minutes = Math.floor(minutesNotTruncated)
  const seconds = Math.floor((minutesNotTruncated - minutes) * 60)

  return degrees * 3600 + minutes * 60 + seconds
}

function convertDMS(lat, lng) {
  const latitude = toSeconds(lat)
  const longitude = toSeconds(lng)

  return [latitude, longitude]
}

async function getCoordinates(loc) {
  const coords = []
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
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destSuggestions, setDestSuggestions] = useState([])
  const navigate = useNavigate()

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
    setRide(receipt.events.RideRequested.returnValues._rider)
    navigate('/bids')
  }

  useEffect(() => {
    const fetchData = async (setSuggestions) => {
      const data = await (
        await fetch(
          `https://api.locationiq.com/v1/autocomplete.php?key=pk.f2d07b3a42a97028ed2f39cc7a20eaf2&q=${pickup}`
        )
      ).json()

      console.log(data)

      const places = {}
      data.forEach((place) => {
        places[place.place_id] = {
          name: place.display_name,
          lat: place.lat,
          long: place.long
        }
      })

      setSuggestions(Object.values(places))
    }

    if (pickup.length >= 3) fetchData(setPickupSuggestions)
    if (destination.length >= 3) fetchData(setDestSuggestions)
  }, [pickup, destination])

  return (
    <div className="bgImage">
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 650 }}>
          <Form size="large" onSubmit={submitHandler}>
            <Segment stacked>
              <h1 style={{ fontSize: '5rem' }}>
                <i className="taxi icon"></i> DTaxi
              </h1>
              <div className="field">
                <Autocomplete
                  inputProps={{ placeholder: 'Enter Pickup Location' }}
                  wrapperProps={{ className: 'ui fluid left icon input' }}
                  wrapperStyle={{ width: '100%', zIndex: 10 }}
                  menuStyle={{
                    borderRadius: '3px',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                    background: '#fff',
                    padding: '2px 0',
                    fontSize: '90%',
                    position: 'fixed',
                    overflow: 'auto',
                    maxHeight: '50%'
                  }}
                  items={pickupSuggestions}
                  getItemValue={(item) => item.name}
                  renderItem={(item, isHighlighted) => (
                    <div key={item.name} style={{ backgroundColor: isHighlighted ? '#ddd' : 'transparent' }}>
                      <span style={{ fontWeight: isHighlighted ? 'bold' : 'normal' }}>{item.name}</span>
                    </div>
                  )}
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  onSelect={(val) => setPickup(val)}
                />
              </div>
              <div className="field">
                <Autocomplete
                  inputProps={{ placeholder: 'Enter Destination Location' }}
                  wrapperProps={{ className: 'ui fluid left icon input' }}
                  wrapperStyle={{ width: '100%' }}
                  menuStyle={{
                    zIndex: '5',
                    borderRadius: '3px',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                    background: '#fff',
                    padding: '2px 0',
                    fontSize: '90%',
                    position: 'fixed',
                    overflow: 'auto',
                    maxHeight: '50%'
                  }}
                  items={destSuggestions}
                  getItemValue={(item) => item.name}
                  renderItem={(item, isHighlighted) => (
                    <div key={item.name} style={{ backgroundColor: isHighlighted ? '#ddd' : 'transparent' }}>
                      <span style={{ fontWeight: isHighlighted ? 'bold' : 'normal' }}>{item.name}</span>
                    </div>
                  )}
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  onSelect={(val) => setDestination(val)}
                />
              </div>
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
