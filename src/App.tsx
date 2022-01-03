import React, { useState } from 'react';
import './App.css';
import { Stack } from 'react-bootstrap';
import MainRouter from './router/MainRouter';
import Navbar from './components/Navbar';
import { useAppSelector } from './app/hooks';



const App = () => {

  //const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const loggedIn = useAppSelector(state => state.auth[0].token);
  return (
    <div className="App">
      <Stack direction="horizontal" gap={5}>
        <Navbar loggedIn={loggedIn}/>
        <div className="justify-content-center" style={{width:"100%", height:"100vh", overflowY:"scroll"}} >
          <MainRouter loggedIn={loggedIn}/>
        </div>
      </Stack>
    </div>
  );
}

export default App;
