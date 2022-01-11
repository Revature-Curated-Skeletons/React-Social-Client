import React, { useState } from 'react';
import './styling/App.css';
import { Stack } from 'react-bootstrap';
import MainRouter from './router/MainRouter';
import Navbar from './features/navbar/Navbar';
import { useAppSelector } from './app/hooks';



const App = () => {

  //const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const loggedIn = useAppSelector(state => state.auth[0].token);
  return (
    <div id="app">
      {/* <Stack direction="horizontal" gap={5}> */}
        <Navbar loggedIn={loggedIn}/>
        <div id="main-router-container">
          <MainRouter loggedIn={loggedIn}/>
        </div>
      {/* </Stack> */}
    </div>
  );
}

export default App;
