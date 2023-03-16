import React from "react";
import { useState } from "react";
import api from "./apis"
import { Link, useNavigate } from "react-router-dom";

  function ChangeStatus(props) {
    const [status, setStatus] = useState('');
 
  
    return (
      <div className="auth-form-container">
      <h2>Status Settings</h2>
      <h3>Your current status is: </h3>
      <select className="dropdown" onChange={(e) => setStatus(e.target.value)}  id="colours">
        <option className="dropdown" value="Online">Online</option>
        <option className="dropdown" value="Not Online">Not Online</option>
      </select>
      <h3>You selected...{status} </h3>
      <button type="submit">Submit Changes</button>
      <Link to="/cal">
            <button size="45" className="reset-btn" type="submit">Weekly View</button>
        </Link>
        <Link to="/settings">
            <button size="45" className="reset-btn" >Go back to Profile Settings</button>
        </Link>


      </div>
    );
  
}

export default ChangeStatus;
