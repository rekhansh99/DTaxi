import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, Message } from 'semantic-ui-react';
import Loader from '../components/Loader';
import RiderForm from '../components/RiderForm';
import DriverForm from '../components/DriverForm';
import { Tabs, Tab } from 'react-bootstrap';

function BookingScreen() {
  let location = useLocation();
  const [key, setKey] = useState('rider');
  let history = useNavigate();
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history(redirect);
    }
  }, [history, userInfo, redirect]);
  
  return (
    <>
      {error && <Message negative>{error}</Message>}
      <Grid
        textAlign='center'
        style={{ height: '100vh' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          {loading && <Loader />}

          <Tabs
            id='controlled-tab-example'
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className='mb-3'
          >
            <Tab eventKey='rider' title='Ride'>
              <RiderForm />
            </Tab>
            <Tab eventKey='driver' title='Drive'>
              <DriverForm />
            </Tab>
          </Tabs>
        </Grid.Column>
      </Grid>
    </>
  );
}
export default BookingScreen;
