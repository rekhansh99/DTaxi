import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import { login } from '../store/actions/userActions';

function LoginScreen() {
  let location = useLocation();
  const [wallet, setWallet] = useState('');
  const [password, setPassword] = useState('');
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
    dispatch(login(wallet, password));
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
          <Header as='h2' color='teal' textAlign='center'>
            Log-in to your account
          </Header>
          <Form size='large' onSubmit={submitHandler}>
            <Segment stacked>
              <Form.Input
                fluid
                icon='ethereum'
                iconPosition='left'
                placeholder='Wallet address'
                onChange={(e) => setWallet(e.target.value)}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button color='teal' fluid size='large'>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New user? <Link to='/signup'>Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
}
export default LoginScreen;
