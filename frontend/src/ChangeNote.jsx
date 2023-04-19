import React, { useState, useEffect } from "react";
import api from "./apis";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Select, { components } from "react-select";
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';
import Navbar from "./Navbar";


export const ChangeNote = (props) => {
  const navigate = useNavigate();

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [note, setNote] = useState("");



  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
    <Navbar />

    <div>
      <h2>Change note for cs307 with Prof Turkstra</h2>
   
      <div>
        
        <form  onSubmit={handleSubmit}>
          <p>
 {'\n'} 
</p>
         

{/* <label htmlFor="text">Create review</label> */}

<p>
 {'\n'} 
</p>

<div>
<label htmlFor="text">Change Note</label>

<p>
 {'\n'} 
</p>
          </div>
          <textarea value={note}
            onChange={(e) => setNote(e.target.value)} size="9000" className="review">
          </textarea>
        </form>
        {/* <button type="submit" onClick={() => props.onFormSwitch('calender')}>Weekly View</button>
            <button className="reg-btn" onClick={() => props.onFormSwitch('register')}>Create an account</button>
            <button className="reset-btn" onClick={() => props.onFormSwitch('reset')}>Reset Password</button> */}
        {/* not sure why the buttons are small */}
        <button type="submit" className="reset-btn">Submit change to note</button>
        <div>
        <Link to="/courses">
          <button size="45" className="reset-btn">
           Cancel change to note
          </button>
        </Link>
        </div> 
        <Link to="/cal">
          <button size="45" className="reset-btn" >
            Weekly View
          </button>
        </Link>
      </div>
    </div>
    </>
  );
};
