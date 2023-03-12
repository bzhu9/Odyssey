import logo from './logo.svg';
import React from 'react';
import { BrowserRouter, Routes, Route } from  "react-router-dom";
import {useState} from 'react'
import './App.css';
import { Login } from "./Login";
import { Register } from "./Register";
import { Reset } from './Reset';
import { Settings } from './Settings';
import { Map } from './Map';
import { CreateEvent } from './CreateEvent';
import { OpenClass } from './OpenClass';
// import FullCalendarApp, { Calender } from "./Calender";
import FullCalendarApp from "./Calender";
import { ChangeEvent } from './ChangeEvent';
import Layout from './Layout';
import { ChangeEmail } from './ChangeEmail';
import { Friends } from './Friends';


function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    // <div className="App">
    //   {
    //     currentForm === "login" ? <Login onFormSwitch={toggleForm} /> 
    //     : currentForm === "register"  ? <Register onFormSwitch={toggleForm} />
    //     : currentForm === "calender"  ? <FullCalendarApp onFormSwitch={toggleForm} />
    //     : currentForm === "settings"  ? <Settings onFormSwitch={toggleForm} />
    //     : currentForm === "map"  ? <Map onFormSwitch={toggleForm} />
    //     : currentForm === "addEvent"  ? <CreateEvent onFormSwitch={toggleForm} />
    //     : currentForm === "class" ? <OpenClass onFormSwitch={toggleForm} />
    //     : currentForm === "change event" ? <ChangeEvent onFormSwitch={toggleForm} />
    //     : <Reset onFormSwitch={toggleForm} /> 
        
    //   }
      
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {/* <Route path="login" element={<FullCalendarApp />} /> */}
          <Route path="cal" element={<FullCalendarApp />} />
          <Route path="changeEmail" element={<ChangeEmail />} />
          <Route path="friends" element={<Friends />} />
          <Route path="settings" element={<Settings />} />
          <Route path="map" element={<Map />} />
          <Route path="addEvent" element={<CreateEvent />} />
          <Route path="class" element={<OpenClass />} />
          <Route path="changeEvent" element={<ChangeEvent />} />
          <Route path ="reset" element={<Reset />}/>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

