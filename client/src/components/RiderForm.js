import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import { getDTaxiContract, setRide } from '../web3'

function RiderForm() {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  let history = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()

    const contract = getDTaxiContract()
    const receipt = await contract.methods.requestRide(1, 1, 2, 2).send()
    // console.log(receipt)
    setRide(receipt.events.RideRequested.returnValues[0])

    history('/bids')
  }
  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form size="large" onSubmit={submitHandler}>
          <Segment stacked>
            <Form.Input fluid icon="location arrow" iconPosition="left" placeholder="Enter pickup location" />
            <Form.Input fluid icon="location arrow" iconPosition="left" placeholder="Enter destination" />
            <Button type="submit" color="teal" fluid size="large">
              Request Now
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  )
}

export default RiderForm
