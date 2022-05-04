import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import background from '../background.jpg'

function DriverForm() {
  const [license, setLicense] = useState('')
  const [vehicleNo, setVehicleNo] = useState('')
  let history = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    history('/options')
  }
  return (
    <div
      style={{
          backgroundImage: `url(${background})`,
          height: '100vh',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',}}>
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 650}}>
          <Form size="large"  onSubmit={submitHandler}>
            <Segment stacked>
              <h1 style={{fontSize: '5rem'}}><i className='taxi icon'></i> DTaxi</h1>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Driving license number"
                onChange={(e) => setLicense(e.target.value)}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Enter vehicle number"
                onChange={(e) => setVehicleNo(e.target.value)}
              />
              <Button color="teal" fluid size="large">
                Register as a driver
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default DriverForm
