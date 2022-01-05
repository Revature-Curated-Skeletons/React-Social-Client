import React, { useState } from 'react'

import {Nav, NavLink } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import Logo from '../../assets/images/reverb_logo_final_light.png'
import { Link, useHistory } from 'react-router-dom'
import './navbar.css';

// The props that are allowed to be passed to this.
interface NavigationBarProps {
    loggedIn: string
}


// The function component typed as well as its props defined and typed
// through destructuring.

const NavigationBar: React.FC<NavigationBarProps> = ({ loggedIn }: { loggedIn: string }) => {
    //font family and style for the links
    const fontStyle = {
        fontFamily: ''
    }

    // The state of the input typed in the search field.
    // Used later when calling the searchHandler.
    const [search, setSearch] = useState("")
    const history = useHistory();

    let sideNavBar = <></>;
    if (!loggedIn) {
        sideNavBar = <div style={{ float: "left" }}>
            <Navbar style={{
                backgroundColor: "#474C55",
                width: 150, height: "100vh", minHeight: "450px", lineHeight: "30px", color: "#FFFFF", fontSize: "38"
            }}
                className="justify-content-center" id="navbar">
                <Nav className="mr-auto"></Nav>
                <Nav defaultActiveKey="home"
                    className="flex-column justify-content-center text-center"
                    style={{ position: "absolute", top: "0px", height: "100vh" }}>


                    {/* The Home button that is the logo.*/}
                    <Nav.Link data-testid="logolink" as={Link} to={"/"} className="justify-content-center" id="homeLink" eventKey="home">
                        <img
                            alt=""
                            src={Logo}
                            width="100%"
                            height=""
                            className="d-inline-block align-top"
                        />
                    </Nav.Link>
                    <ul className="nav flex-column mb-auto text-center" id="testingNav" style={{ color: "#FFFFF", fontSize: "38" }}>

                        {/* The link to the Login page. */}
                        <Nav.Link as={Link} to={"/login"} id="loginLink" onClick={() => history.push("/login")}
                            className="justify-content-center" eventKey="login-link"
                        >
                            Login
                        </Nav.Link>

                        {/* The link to the Register page. */}
                        <Nav.Link as={Link} to={"/register"} id="registerLink" onClick={() => history.push("/register")} eventKey="register-link">
                            Register
                        </Nav.Link>

                    </ul>
                </Nav>
            </Navbar>
        </div>
    }
    else {
        // Assigning the navbar to a variable to make it easier to use with the return later.
        // Float left is needed to keep the other content right of the navbar instead of 
        // below it.
        sideNavBar = <div style={{ float: "left" }} >
            <Navbar style={{
                backgroundColor: "#474C55",
                width: 150, height: "100vh", minHeight: "450px", lineHeight: "30px", color: "#FFFFF", fontSize: "38"
            }}
                className="justify-content-center" id="navbar">
                <Nav className="mr-auto" ></Nav>
                {/* The  100vh is used to make it the entire screen height.
            the top:0px is used to keep the content attached to the top of the screen.*/}
                <Nav defaultActiveKey="home"
                    className="flex-column justify-content-center text-center"
                    style={{ position: "absolute", top: "0px", height: "100vh" }}>


                    {/* The Home button that is the logo.*/}
                    <Nav.Link as={Link} to={"/"} className="justify-content-center" id="homeLink" eventKey="home">
                        <img
                            alt=""
                            src={Logo}
                            width="100%"
                            className="d-inline-block align-top"
                        />
                    </Nav.Link>
                    <ul className="nav flex-column mb-auto text-center">

                        {/* The link to the profile page */}
                        <Nav.Link as={Link} to={"/profile"} onClick={() => history.push("/profile")}
                            className="justify-content-center" id="profileLink" eventKey="profile-link">
                            Profile
                        </Nav.Link>

                        <NavLink as={Link} to={"/logout"}
                            id="logoutLink"
                            eventKey="logout-link"
                            style={{ bottom: "0px" }}>
                            Logout
                        </NavLink>

                    </ul>

                    {/* These elements are instead attached to the bottom. */}

                    {/* The link to logout. */}

                </Nav>
            </Navbar>
        </div>
    }

    return (
        <div>
            {sideNavBar}
        </div>
    )
}

export default NavigationBar;