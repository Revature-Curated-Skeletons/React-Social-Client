import React, { useEffect, useState } from "react";
import { Button, Card, Stack } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import { getProfileAsync, getProfileByIdAsync, selectProfile } from "./profileSlice";
import { checkProfileOwnership } from "./profile.api";
import Image from 'react-bootstrap/Image'
import { reverbClientWithAuth } from "../../remote/reverb-api/reverbClient";


export default function ProfileInformation(props: any) {
    const [doneLoading, setDoneLoading] = React.useState(false);
    const profile = useSelector(selectProfile);
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const [showEditButton, setShowEditButton] = React.useState(false);

    let buttonName = "Follow user";
    const [follow, setButton] = useState(buttonName);
    let toggleButton:boolean = true;

    function getFollowers() {
        reverbClientWithAuth.get("/get-followers/{userId}");
    }

    function toggleFollowButton() {

        getFollowers();
        
        if (toggleButton === true){
            toggleButton = false;
            buttonName = "Unfollow user"
            setButton(buttonName);
            
        } else 
        {
            toggleButton = true;
            buttonName = "follow user"
            setButton(buttonName);
        }
    }
    
    useEffect(() => {
        setDoneLoading(false);
        if(id === undefined) {
            dispatch(getProfileAsync(profile));
            setShowEditButton(true);
            setTimeout(() => setDoneLoading(true), 200);
        } else {
            dispatch(getProfileByIdAsync(id));
            checkProfileOwnership(id).then((owns) => {
                setShowEditButton(owns);
                setTimeout(() => setDoneLoading(true), 200);
            })
        }
      }, [props.beep]); // beep beep :^)

    const goToEditProfile = () => {
        history.push("/editProfile");
    }
    return(
        doneLoading ? (
        <Grid container direction="column" alignItems="center" justify="center">
        <Card id="ProfilePage">
            <Stack id="ProfileImageHeader">
                <Card.Img src={profile.profile_img} id="ProfileImg" />
                <Card.Img src={profile.header_img} id="HeaderImg" />
            </Stack>
            <Card.Body id="profileBody">
                <Card.Title id = "ProfileName">{profile.first_name} {profile.last_name}</Card.Title>
                
                {/* <button type="button" onClick={() =>toggleFollowButton()} > {follow} </button>
                <br></br>
                <text>followers: </text>
                <br></br>
                <text>following: </text>
                <br /><br /> */}
               
                <Card.Text id="AboutMe">
                    <h4>About Me</h4>
                    <hr></hr>
                    <h5>{profile.about_me}</h5>
                </Card.Text>
                <br />
                <Card.Text id="AboutMe">
                    <h4>Fast Facts</h4>
                    <hr></hr>
                    <h5>Birthday: {profile.birthday}</h5>
                    <br />
                    <h5>Hobbies: {profile.hobby}</h5>
                    <br />
                    <h5>Location: {profile.location}</h5>
                </Card.Text>
            </Card.Body>
        </Card>
        {showEditButton ? <Button id="EditProfileButton" onClick={goToEditProfile}>Edit Profile</Button> : <></>}
        </Grid>) : (<Image id="LoadingImg" src = {"https://app.revature.com/assets/images/ajax-loader-logo.0cd555cc.gif"} 
        style={{height:'192px', width: '300px'}} fluid data-testid="gif"/>)
    )
}