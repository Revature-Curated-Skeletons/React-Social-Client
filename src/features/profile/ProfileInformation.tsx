import React, { useEffect } from "react";
import { Button, Card, Stack } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import { getProfileAsync, getProfileByIdAsync, selectProfile } from "./profileSlice";
import { checkProfileOwnership } from "./profile.api";
import Image from 'react-bootstrap/Image'


export default function ProfileInformation(props: any) {
    const [doneLoading, setDoneLoading] = React.useState(false);
    const profile = useSelector(selectProfile);
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const [showEditButton, setShowEditButton] = React.useState(false);
    
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
            <Stack >
                <Card.Img src={profile.profile_img} id="ProfileImg" />
                <Card.Img src={profile.header_img} id="HeaderImg" />
            </Stack>
            <br />
            <Card.Body id="profileBody">
                <Card.Title id = "ProfileName">{profile.first_name} {profile.last_name}</Card.Title>
                <br /><br />
                <Card.Text id="AboutMe">
                    <h5>About Me</h5>
                    {profile.about_me}
                </Card.Text>
                <br />
                <Card.Text id="AboutMe">
                    <h5>Fast Facts</h5>
                    Birthday: {profile.birthday}
                    <br />
                    Hobbies: {profile.hobby}
                    <br />
                    Location: {profile.location}
                </Card.Text>
            </Card.Body>
        </Card>
        {showEditButton ? <Button id="EditProfileButton" onClick={goToEditProfile}>Edit Profile</Button> : <></>}
        </Grid>) : (<Image id="LoadingImg" src = {"https://app.revature.com/assets/images/ajax-loader-logo.0cd555cc.gif"} 
        style={{height:'192px', width: '300px'}} fluid data-testid="gif"/>)
    )
}