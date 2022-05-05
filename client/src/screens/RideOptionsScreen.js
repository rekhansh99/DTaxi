import React, { useState } from 'react'
import { Row, Col, Container, Card } from 'react-bootstrap'
import { getDTaxiContract } from '../web3'
import Ride from '../components/Ride'
import Loader from '../components/Loader';
import './centerAlign.css'

function RideOptionsScreen() {
  const [rideRequests, setRideRequests] = useState({})
  const contract = getDTaxiContract()
  contract.events.RideRequested({}, (error, event) => {
    if (error) {
      console.log(error)
      return
    }

    let key = Object.keys(rideRequests).length
    setRideRequests({ ...rideRequests, [key]: event })
  })

  return (
    <div className='bgImage'>
      { Object.keys(rideRequests).length ?
        <Container>
          <Row>
            <Col className='banner'>
              <h1 style={{fontSize: '5rem'}}>
                <i className='taxi icon' ></i> DTaxi
              </h1>
              <br/>
              <h1 style={{fontSize: '2rem'}}>
                  Ride Requests
              </h1>
            </Col>
            <Col>
            {
              Object.entries(rideRequests).map((ride) => (
                <Row key={ride[0]} className="test"><Ride ride={ride[1]} /> </Row>
              ))
            }
            </Col>
          </Row>
        </Container>
        :<>
          <h1 className='test verticalCenter' style={{fontSize: '3rem', color: 'white'}}>
          <Loader />
          Searching for rides...
          </h1>
        </>
      }
    </div>
  )
}
export default RideOptionsScreen
