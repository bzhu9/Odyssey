import React from "react";
import { useState, useEffect } from "react";
import api from "./apis"
import { Link, useNavigate } from "react-router-dom";

export const ChangePrivacy = (props) => {
    const [currentPriv, setCurrentPriv] = useState('')
    const [priv, setPriv] = useState('');
 
    async function getPrivacy() {
      const payload = { email: sessionStorage.getItem("user")};
      const user = await api.getPrivacy(payload);
      const privacy = user.data.privacy;
      setCurrentPriv(privacy);
    }
    
    async function setPrivacy() {
      const payload = { email: sessionStorage.getItem("user"), priv: priv};
      const user = await api.setPrivacy(payload);
      const privacy = user.data.privacy;
      setCurrentPriv(privacy);
    }


    // called when loading page
    useEffect (() => {
      let ignore = false;
      if (!ignore) {
        getPrivacy();
        setPriv("None");
      }
      return () => {ignore = true;}
    }, []);

    return (
      <div className="auth-form-container">
      <h2>Privacy Settings</h2>
      <h3>Your current setting is: {currentPriv}</h3>
      <select className="dropdown" onChange={(e) => setPriv(e.target.value)}  id="colours">
        <option className="dropdown" value="private">Private</option>
        <option className="dropdown" value="public">Public</option>
        <option className="dropdown" value="friends-only">Friends-Only</option>
      </select>
      <h3>You selected...{priv} </h3>
      <button type="submit" onClick={setPrivacy}>Submit Changes</button>
      <Link to="/cal">
            <button size="45" className="reset-btn" type="submit">Weekly View</button>
        </Link>
        <Link to="/settings">
            <button size="45" className="reset-btn" >Go back to Profile Settings</button>
        </Link>


      </div>
    );
  
}

// export default ChangePrivacy;
