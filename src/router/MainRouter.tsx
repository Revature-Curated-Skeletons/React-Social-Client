import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Feed from "../features/feed/Feed";
import Login from "../features/login/Login";
import Register from "../features/register/Register";
import Landing from "../features/landing/Landing";
import { useAppDispatch } from "../app/hooks";
import { logout } from '../features/login/authSlice'
import ProfilePage from "../features/profile/ProfilePage";
import EditProfilePage from "../features/profile/EditProfilePage";
import GroupPage from "../features/group/GroupPage";
import { CreateGroupPage } from "../features/group/CreateGroupPage";
import { EditGroupPage } from "../features/group/EditGroupPage"
import FollowingFeed from "../features/feed/FollowingFeed";


interface MainRouterProps{
  loggedIn:string
}

const MainRouter:React.FC<MainRouterProps> = ({loggedIn}:{loggedIn:string}) => {
  const dispatch = useAppDispatch();

  // Logout now dispatching to store to update state
  const doLogout = () => {
    dispatch(logout());
  }

  // Login is now handled in the Login page component.

  let toReturn = <></>;
  if (loggedIn) {
    toReturn =
      <div id="container-to-remove">
        <Switch>
          <Route path="/feed/following">
            <FollowingFeed/>
          </Route>
          <Route path="/profile/:id">
            <ProfilePage beep={false}/>
          </Route>
          <Route path="/profile">
            <ProfilePage beep={true}/>
          </Route>
          <Route path="/editProfile">
            <EditProfilePage/>
          </Route>
          <Route path="/createGroup">
            <CreateGroupPage/>
          </Route>
          <Route path="/group/:groupName">
            <GroupPage/>
          </Route>
          <Route path="/editGroup/:groupName">
            <EditGroupPage/>
          </Route>
          <Route path="/logout">
            {doLogout}
          </Route>
          <Route path="/feed">
            <Feed isGroup={false}/>
          </Route>
          
        </Switch>
      </div>
  }
  else {
    toReturn =
      <div>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </div>
  }
  return (
    <>
      {toReturn}
    </>
  )
}

export default MainRouter
