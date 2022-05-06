import React, { useEffect, useState } from 'react'
import { Row, Container, Col } from 'react-bootstrap'
import { getDoc, doc } from 'firebase/firestore/lite'
import Bid from '../components/Bid'
import { addListener, removeListener } from '../web3'
import db from '../firebase'
import './centerAlign.css'

function BidScreen() {
  const [bids, setBids] = useState({})

  useEffect(() => {
    const bidReceivedListener = async (error, event) => {
      if (error) {
        console.log(error)
        return
      }

      console.log(event)
      const driver = {
        name: 'name',
        vehicle_no: 'vehicle_no',
        rating: 3
      }

      const driverSnap = await getDoc(doc(db, 'drivers', event.returnValues._driver))
      if (!driverSnap.exists()) {
        console.log('Driver does not exist')
        // return
      } else {
        const driverData = driverSnap.data()
        driver.name = driverData.name
        driver.vehicle_no = driverData.vehicle_no
        driver.rating = driverData.rating
        console.log(driver)
      }

      setBids((b) => {
        const key = Object.keys(b).length
        return {
          ...b,
          [key]: {
            name: driver.name,
            vehicle_no: driver.vehicle_no,
            bidAmount: event.returnValues._amount,
            rating: driver.rating,
            walletAddress: event.returnValues._driver
          }
        }
      })
    }

    addListener('BidReceived', bidReceivedListener)

    return () => removeListener('BidReceived', bidReceivedListener)
  }, [])

  return (
    <div className="bgImage">
      {Object.keys(bids).length ? (
        <Container>
          <Row>
            <Col className="banner">
              <h1 style={{ fontSize: '5rem' }}>
                <i className="taxi icon"></i> DTaxi
              </h1>
              <br />
              <h1 style={{ fontSize: '2rem' }}>Available bids</h1>
            </Col>
            <Col>
              {Object.entries(bids).map((bid) => (
                <Row key={bid[0]} className="test">
                  <Bid driver={bid[1]} />{' '}
                </Row>
              ))}
            </Col>
          </Row>
        </Container>
      ) : (
        <>
          <h1 className="test verticalCenter" style={{ fontSize: '3rem', color: 'white' }}>
            {' '}
            Oops! No bids for the requested ride yet.{' '}
          </h1>
        </>
      )}
    </div>
  )
}
export default BidScreen
