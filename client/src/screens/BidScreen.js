import React, { useState } from 'react'
import { Row, Container, Col } from 'react-bootstrap'
import { getDoc, doc } from 'firebase/firestore/lite'
import Bid from '../components/Bid'
import { getRide } from '../web3'
import { db } from '../firebase'
import './centerAlign.css'

function BidScreen() {
  const [bids, setBids] = useState({})
  const ride = getRide()
  ride.events.BidReceived({}, async (error, event) => {
    if (error) {
      console.log(error)
      return
    }

    console.log(event)
    const driverSnap = await getDoc(doc(db, 'drivers', event.returnValues._driver))
    if (!driverSnap.exists()) {
      console.log('Driver does not exist')
      const driver = {
        name: 'XYZ',
        vehicle_no: 'driver.vehicle_no',
        bidAmount: event.returnValues._amount,
        rating: 3,
        walletAddress: event.returnValues._driver
      }
      let key = Object.keys(bids).length
      setBids({
        ...bids,
        [key]: {
          name: driver.name,
          vehicle_no: driver.vehicle_no,
          bidAmount: event.returnValues._amount,
          rating: driver.rating,
          walletAddress: driver.walletAddress
        }
      })
    }
    else{
    const driver = driverSnap.data()
    console.log(driver)
    let key = Object.keys(bids).length
    setBids({
      ...bids,
      [key]: {
        name: driver.name,
        vehicle_no: driver.vehicle_no,
        bidAmount: event.returnValues._amount,
        rating: driver.rating,
        walletAddress: driver.walletAddress
      }
    })
  }
  })

  return (
    <div className = 'bgImage'>
      {
        Object.keys(bids).length ?
        <Container>
          <Row>
            <Col className='banner'>
              <h1 style={{fontSize: '5rem'}}>
                <i className='taxi icon' ></i> DTaxi
              </h1>
              <div className="d-grid gap-2">
                  Ride Requests
              </div>
            </Col>
            <Col>
            {
              Object.entries(bids).map((bid) => (
                <Row key={bid[0]} className="test"><Bid driver={bid[1]} /> </Row>
              ))
            }
            </Col>
          </Row>
        </Container>
        : <>
          <h1 className='test verticalCenter' style={{fontSize: '3rem', color: 'white'}}> Oops! No bids for the requested ride yet. </h1>
        </>
      
      }
    </div>
    
  )
}
export default BidScreen
