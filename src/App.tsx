import React, { useState } from 'react';
import './styling/App.css';
import { Stack } from 'react-bootstrap';
import MainRouter from './router/MainRouter';
import Navbar from './features/navbar/Navbar';
import { useAppSelector } from './app/hooks';



const App = () => {

  //const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const [theme, setTheme] = useState('light');


function switchTheme () {
  console.log("SwitchTheme Invoked")
  console.log(theme);
  let newTheme;
  if (theme == 'light'){
    newTheme = 'dark';
  }
  else{
    newTheme = 'light';
  }
  console.log(theme);
  setTheme(newTheme);
  console.log(theme);
  //<button onClick={() => switchTheme()}>ThemeSwitcher</button>
}

  const loggedIn = useAppSelector(state => state.auth[0].token);
  return (
    <div className="App" data-theme={theme}>
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
