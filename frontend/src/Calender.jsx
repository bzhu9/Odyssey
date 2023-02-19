import { useState } from "react";
import React from "react";
export const Calender = (props) => {
  
  return (
    <div className="App">
      <h1>Week View Calendar</h1>

      <button className="reg-btn" onClick={() => props.onFormSwitch('login')}>Go back to login</button>
    </div>
    
  );
}


