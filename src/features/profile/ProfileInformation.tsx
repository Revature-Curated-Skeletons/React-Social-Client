import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAsync, getProfileByIdAsync, selectProfile } from "./profileSlice";
import { checkProfileOwnership } from "./profile.api";
import Image from 'react-bootstrap/Image'
import { canFollow, followUser, getUserFollowers, getUserFollowings, getUserIdFromProfileId, unfollowUser } from "../follow/followers.api";
import React from "react";


/*
    Welcome to the profile information page. 
    This page controls the profiles that appear when you click on a user's name in comments or posts.

*/
export default function ProfileInformation(props: any) {
  const [doneLoading, setDoneLoading] = useState(false);
  const profile = useSelector(selectProfile);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [showEditButton, setShowEditButton] = useState(false);

  //attempting follow button hide
  //added followbutton state similar to showEd
  const [showFollowButton, setShowFollowButton] = React.useState(false);
  

  // Initial states for our constants
  let initialFollowState = false;

  // Constants to be manipulated within .then statements
  const [isFollowing, setIsFollowing] = React.useState(initialFollowState);

  // Fetches a fresh profile
  function updateProfile() {
    if (id === undefined)
    {
        // After a delay, get the profile of the current user.
        setTimeout(() => dispatch(getProfileAsync(profile)), 100);
    }
    // After a delay, get the profile of a user from a given ID.
    else setTimeout(() => dispatch(getProfileByIdAsync(id)), 100);
  }


  // Toggles the follow button and handles the follow api calls.
  function toggleFollowButton() {

    // If the user is NOT currently following the page, then they have just decided to follow them.
    if (!isFollowing){ 
    
        // Perform an API call that sets the user as a follower.
        followUser(profile.user_id).then( async () => { 
            // Once the call is done, update the page and call a new profile with the accurate number.
            setIsFollowing(true);
            updateProfile();
        })

    } 

    // If the user IS currently following the page, then they have just decided to unfollow them.
    else {
        // Perform an API call that removes the user from the followers table.
        unfollowUser(profile.user_id).then(async () => {
            // After the call completes, set is following appropriately and update the profile to get the accurate count.
            setIsFollowing(false);
            updateProfile();
        })
    }


  }
  


  useEffect(() => {
    // Set the doneLoading boolean to false so that we keep them on the loading screen until things are done.
    setDoneLoading(false);

    // Load the page
    if(id === undefined) { // If there's no id in the path variable then we go to the logged in user's profile

        // Gets their profile from the stored profile for the user.
        dispatch(getProfileAsync(profile)); 

        // Show the edit button and hide the follow
        setShowEditButton(true); 
        setShowFollowButton(false);
        
        // Set a timeout for any API calls to finish, and when it finishes, tell the page it is ready to be loaded which swaps us off the loading page.
        setTimeout(() => setDoneLoading(true), 200);
    } else { // If there is an id in the path, then we load the corrosponding profile.
        // Make an api call for the appropriate profile
        dispatch(getProfileByIdAsync(id));

        // Check if the profile is owned by the user who navigated into it.
        checkProfileOwnership(id).then((owns) => {
            // Set the buttons appropriately to the ownership rights.
            setShowEditButton(owns);
            setShowFollowButton(!owns);

            if (!owns) { // If they don't own it, check if they can follow it.
                // Checks if the user can follow with an api call
                canFollow(profile.user_id).then((data) => {
                    // Stores the data from the fetch properly which will rerender the button.
                    setIsFollowing(data);
                });
            }
            
            // Give the API time to respond before we show our page.
            setTimeout(() => setDoneLoading(true), 300);
        })
    }
    
  }, [props.beep]); // beep beep :^) (Not sure why this is here. Possibly some sort of ownership parsing?)

  const goToEditProfile = () => {
    history.push("/editProfile");
  }
  return(
    doneLoading ? (
      <div>
        <div id="ProfilePage">
          <img src={profile.profile_img} id="ProfileImg" />
          <img src={profile.header_img} id="HeaderImg" />
          <Card.Body id="profileBody">
            <Card.Title id = "ProfileName">
              {profile.first_name} {profile.last_name} 
              <div>
                <h6 id="followers-num">followers: {profile.follower_num}</h6>
                <h6 id="following-num">following: {profile.following_num}</h6>
              </div>
            </Card.Title>
            
                {showFollowButton ? <Button variant="success" className="follow-btn" type="button" onClick={() =>toggleFollowButton()} > {isFollowing ? "Unfollow" : "Follow"} </Button> : <></>}

            <Card.Text id="AboutMe">
              <h5>About Me</h5>
              {profile.about_me}
            </Card.Text>
            <Card.Text id="AboutMe">
              <h5>Fast Facts</h5>
              Birthday: {profile.birthday}
              <br />
              Hobbies: {profile.hobby}
              <br />
              Location: {profile.location}
            </Card.Text>
          </Card.Body>
        </div>
        {showEditButton ? <Button id="EditProfileButton" onClick={goToEditProfile}>Edit Profile</Button> : <></>}
      </div>
    ) : (
      <Image
        id="LoadingImg"
        src = {"https://app.revature.com/assets/images/ajax-loader-logo.0cd555cc.gif"} 
        style={{height:'192px', width: '300px'}}
        fluid data-testid="gif"
      />
    )
  )
}
