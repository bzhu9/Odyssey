import React from "react";
import { useState } from "react";
import api from "./apis"
import { Link, useNavigate } from "react-router-dom";

  function ChangePrivacy(props) {
    const [priv, setPriv] = useState('');
 
  
    return (
      <div className="auth-form-container">
      <h2>Privacy Settings</h2>
      <h3>Your current setting is: </h3>
      <select className="dropdown" onChange={(e) => setPriv(e.target.value)}  id="colours">
        <option className="dropdown" value="private">Private</option>
        <option className="dropdown" value="public">Public</option>
        <option className="dropdown" value="friends-only">Friends-Only</option>
      </select>
      <h3>You selected...{priv} </h3>
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

export default ChangePrivacy;
