import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import { getWeb3, deployContract } from '../web3'

function RiderForm() {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  let history = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()

    const accounts = await getWeb3().eth.getAccounts()

    const contract = await deployContract(accounts[0], 1, 1, 2, 2)
    console.log(contract)

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
