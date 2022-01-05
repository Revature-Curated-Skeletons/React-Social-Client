import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import Logo from '../../assets/images/reverb_logo_final.png'
import RevatureLogo from '../../assets/images/by_rev_logo.png'

const Landing = ()=> {

    return(
        <>
            <Container fluid="md" className="">
                <img
                    alt="Reverb Logo"
                    src={Logo}
                    width="540"
                    height="210"
                    className="d-inline-block align-top"
                />
                <br/>
                <img 
                alt="Revature Logo"
                src={RevatureLogo}
                width="210"
                />
                <Row className="justify-content-md-center">
                    <Col md="8">
                        <Card id="landingCard">
                            <Card.Text>
                            <i>Reverb</i> is social network for Revature Employees!
                            Users can customize their user profiles and view a stream of Revature posts from around the world!
                            If someone’s post "vibes" with a user, they can “ReverB” it! 
                            </Card.Text>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Landing
