import React from 'react'
import './centerAlign.css'
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import background from '../background.jpg';

const Home = () => {
    const history = useNavigate()
    return (
        <div
            style={{
                backgroundImage: `url(${background})`,
                height: '100vh',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',}}>
            <div className='verticalCenter' >
            <Card className="text-center" style={{ width: '40rem', padding: '5%' }}>
                <Card.Body>
                    <Card.Title style={{paddingBottom: '5%', fontSize: '5rem'}}> <i className='taxi icon'></i> DTaxi</Card.Title>
                    <div className="d-grid gap-2">
                        <Button variant="primary" size="lg" onClick={() => history('/ride')}>Book a Ride</Button>
                        <Button variant="secondary" size="lg" onClick={() => history('/drive')}>Drive</Button>
                    </div>
                </Card.Body>
            </Card>        
            </div>
        </div>
        
    );
}
export default Home