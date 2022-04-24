import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  Form,
  Grid,
  Message,
  Segment,
} from 'semantic-ui-react';
import Loader from '../components/Loader';

function DriverForm() {
  
  const [license, setLicense] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
 


  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch(registerAsDriver(license, vehicleNo));
  };
  return (
    <>
      
      <Grid
        textAlign='center'
        style={{ height: '100vh' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          

          {/* TODO: check if user is already registered as a driver.  */}
          
          <Form size='large' onSubmit={submitHandler}>
            <Segment stacked>
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='Driving license number'
                onChange={(e) => setLicense(e.target.value)}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Enter vehicle number'
                onChange={(e) => setVehicleNo(e.target.value)}
              />

              <Button color='teal' fluid size='large'>
                Register as a driver
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
}
export default DriverForm;
