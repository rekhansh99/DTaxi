import React, { useState } from 'react'
import { Grid } from 'semantic-ui-react'
import RiderForm from '../components/RiderForm'
import DriverForm from '../components/DriverForm'
import { Tabs, Tab } from 'react-bootstrap'

function BookingScreen() {
  const [key, setKey] = useState('rider')

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
          <Tab eventKey="rider" title="Ride">
            <RiderForm />
          </Tab>
          <Tab eventKey="driver" title="Drive">
            <DriverForm />
          </Tab>
        </Tabs>
      </Grid.Column>
    </Grid>
  )
}

export default BookingScreen
