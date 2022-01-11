import { Container, Row, Card } from 'react-bootstrap'
import Logo from '../../assets/images/reverb_logo_final.png'
import ByRevatureLogo from '../../assets/images/by_rev_logo.png'
import RevatureLogo from '../../assets/images/rev-logo.png'

const Landing = ()=> {
    return(
        <Container >
            <img
                id="logo-reverb"
                alt="Reverb Logo"
                src={Logo}
            />
            <br/>
            <img
                id="logo-revature"
                alt="Revature Logo"
                src={RevatureLogo}
            />
            <Row className="justify-content-md-center">
                <Card id="landingCard">
                    <Card.Text>
                    <i>Reverb</i> is a social network for Revature Employees!
                    You can customize your user profile and view a stream of Revature posts from around the world!
                    If someone’s post "vibes" with you, you can “ReverB” it! 
                    </Card.Text>
                </Card>
            </Row>
        </Container>
    )
}

export default Landing
