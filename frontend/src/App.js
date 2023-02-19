import logo from './logo.svg';
import React from 'react';
import {useState} from 'react'
import './App.css';
import { Login } from "./Login";
import { Register } from "./Register";
import { Reset } from './Reset';
import FullCalendarApp, { Calender } from "./Calender"

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> 
        : currentForm === "register"  ? <Register onFormSwitch={toggleForm} />
        : currentForm === "calender"  ? <FullCalendarApp onFormSwitch={toggleForm} />
        : <Reset onFormSwitch={toggleForm} /> 
        
      }
      
    </div>
  );
}

export default App;

