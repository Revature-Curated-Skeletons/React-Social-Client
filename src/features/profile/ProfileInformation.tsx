import React, { useEffect, useState } from "react";
import { Button, Card, Stack } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import { getProfileAsync, getProfileByIdAsync, selectProfile } from "./profileSlice";
import { checkProfileOwnership } from "./profile.api";
import Image from 'react-bootstrap/Image'
import { reverbClient, reverbClientWithAuth } from "../../remote/reverb-api/reverbClient";
import { Profile } from "../profile/profile";
import { get } from "@reduxjs/toolkit/node_modules/immer/dist/internal";
import { followUser, getUserFollowers, getUserFollowings, getUserIdFromProfileId, unfollowUser } from "../follow/followers.api";


export default function ProfileInformation(props: any) {
    const [doneLoading, setDoneLoading] = React.useState(false);
    const profile = useSelector(selectProfile);
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const [showEditButton, setShowEditButton] = React.useState(false);

    // Initial states for our constants
    let initialFollowerNum:number = 0;
    let initalUserId:string = "";
    let buttonName = "Follow";
    let initialFollowingNum:number = 0;

    // Constants to be manipulated within .then statements
    const [followButton, setButton] = React.useState(buttonName);
    const [followerNum, setFollowerNum] = React.useState(initialFollowerNum);
    const [toggleButton, setToggleButton] = React.useState(true);
    const [followingNum, setFollowingNum] = React.useState(initialFollowingNum);


    function updateNum() {
        updateFollowerNumber();
        updateFollowingNumber();
    }

    // Updates the followr number using the API and the user's ID.
    function updateFollowerNumber() {
        getUserFollowers(profile.user_id)
            .then(
                async (data) => { 
                    setFollowerNum(data)
                }
            );

    }

    // Updates the following number
    function updateFollowingNumber() {
        getUserFollowings(profile.user_id)
            .then(
                async (data) => {
                    setFollowingNum(data)
                }
            );
    }

    // Toggles the follow button and handles the follow api calls.
    function toggleFollowButton() {
        if (toggleButton === true){
            setToggleButton(false);
            followUser(profile.user_id).then(async () => {
                setFollowerNum(followerNum+1);
            })
            buttonName = "Unfollow"
            setButton(buttonName);
            
        } else 
        {
            setToggleButton(true);
            unfollowUser(profile.user_id).then(async () => {
                setFollowerNum(followerNum -1);
            })

            buttonName = "Follow"
            setButton(buttonName);
        }
    }

    
    useEffect(() => {
        setDoneLoading(false);
        updateNum();
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
                <Card.Title 
                id = "ProfileName">{profile.first_name} {profile.last_name}
                <div>
                    <h6 id="followers-num">followers: {followerNum}</h6>
                    <h6 id="following-num">following: {followingNum}</h6>
                </div>
                </Card.Title>
                
                <Button variant="success" id="follow-btn" type="button" onClick={() =>toggleFollowButton()} > {followButton} </Button>
                
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