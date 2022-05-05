import React, { useEffect, useState } from 'react'
import { Row, Container, Col } from 'react-bootstrap'
import { getDoc, doc } from 'firebase/firestore/lite'
import Bid from '../components/Bid'
import { addListener, removeListener } from '../web3'
import { db } from '../firebase'
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

    addListener("BidReceived", bidReceivedListener)

    return () => removeListener("BidReceived", bidReceivedListener)
  }, [])

  return (
    <Container>
      {Object.entries(bids).map((bid) => (
        <Row key={bid[0]} className="test">
          <Col md={3}>
            <Bid driver={bid[1]} />
          </Col>
        </Row>
      ))}
    </Container>
  )
}
export default BidScreen
