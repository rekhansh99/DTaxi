import React from 'react'
import './centerAlign.css'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import background from '../background.jpg';
import { Button, Grid} from 'semantic-ui-react'

const Home = () => {
    const history = useNavigate()
    return (
        <div
            style={{
                backgroundImage: `url(${background})`,
                height: '100vh',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                    
            }}>
            <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 650}}>
            <Card className="text-center" style={{ width: '40rem', padding: '5%', borderRadius: '2%' }}>
                <Card.Body>
                    <Card.Title style={{paddingBottom: '5%', fontSize: '5rem'}}> <i className='taxi icon'></i> DTaxi</Card.Title>
                    <div className="d-grid gap-2">
                        <Button color="teal" onClick={() => history('/ride')}>Book a Ride</Button>
                        <Button size="large" onClick={() => history('/drive')}>Drive</Button>
                    </div>
                </Card.Body>
            </Card>        
            </Grid.Column>
            </Grid>
        </div>
        
    );
}
export default Home