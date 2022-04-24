import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react';
import Loader from '../components/Loader';

function RiderForm() {
  let location = useLocation();
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
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
  const submitHandler = (e) => {
    e.preventDefault();
    history('/bids');
    // dispatch(showBids(pickup, destination));
    // show all available bids
  };
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
          <Form size='large' onSubmit={submitHandler}>
            <Segment stacked>
              <Form.Input
                fluid
                icon='location arrow'
                iconPosition='left'
                placeholder='Enter pickup location'
              />
              <Form.Input
                fluid
                icon='location arrow'
                iconPosition='left'
                placeholder='Enter destination'
              />
              <Button color='teal' fluid size='large'>
                Request Now
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default RiderForm;
