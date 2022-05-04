import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form, Grid, Segment } from 'semantic-ui-react'

function DriverForm() {
  const [license, setLicense] = useState('')
  const [vehicleNo, setVehicleNo] = useState('')
  let history = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    history('/options')
    //dispatch(registerAsDriver(license, vehicleNo));
  }
  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        {/* TODO: check if user is already registered as a driver.  */}

        <Form size="large" onSubmit={submitHandler}>
          <Segment stacked>
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
  )
}

export default DriverForm
