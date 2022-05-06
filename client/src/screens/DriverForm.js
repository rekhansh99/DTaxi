import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import './centerAlign.css'
import { setDoc, doc } from 'firebase/firestore/lite'
import db from '../firebase'
import { getAccount } from '../web3'

function DriverForm({ setDriver }) {
  const [name, setName] = useState('')
  const [license, setLicense] = useState('')
  const [vehicleNo, setVehicleNo] = useState('')
  let navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    const account = getAccount()

    await setDoc(doc(db, 'drivers', account), {
      name: name,
      license_no: license,
      vehicle_no: vehicleNo,
      rating: 5,
      walletAddress: account
    })

    setDriver()
    navigate('/options')
  }
  return (
    <div className="bgImage">
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 650 }}>
          <Form size="large" onSubmit={submitHandler}>
            <Segment stacked>
              <h1 style={{ fontSize: '5rem' }}>
                <i className="taxi icon"></i> DTaxi
              </h1>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Input
                fluid
                icon="drivers license"
                iconPosition="left"
                placeholder="Driving license number"
                onChange={(e) => setLicense(e.target.value)}
              />
              <Form.Input
                fluid
                icon="car"
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
