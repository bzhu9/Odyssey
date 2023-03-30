import React from "react";
import { useState, useEffect } from "react";
import api from "./apis"
import { Link, useNavigate } from "react-router-dom";

  function ChangeStatus(props) {
    const [currentStatus, setCurrentStatus] = useState('');
    const [status, setStatus] = useState('');
 
    async function getStatus() {
      const payload = { email: sessionStorage.getItem("user")};
      const user = await api.getStatus(payload);
      const stat = user.data.status;
      setCurrentStatus(stat);
    }
    
    async function changeStatus() {
      if (status === currentStatus) {
        return;
      }
      const payload = { email: sessionStorage.getItem("user"), status: status};
      const user = await api.setStatus(payload)
      .then(res => {
        alert(`Changed status to ${status} successfully`);
        const stat = res.data.status;
        setCurrentStatus(stat);
      });
    }

    // called when loading page
    useEffect (() => {
      let ignore = false;
      if (!ignore) {
        getStatus();
        setStatus("Online");
      }
      return () => {ignore = true;}
    }, []);
  
    return (
      <div className="auth-form-container">
      <h2>Status Settings</h2>
      <h3>Your current status is: {currentStatus}</h3>
      <select className="dropdown" onChange={(e) => setStatus(e.target.value)}  id="colours">
        <option className="dropdown" value="Online">Online</option>
        <option className="dropdown" value="Offline">Offline</option>
      </select>
      <h3>You selected...{status} </h3>
      <button type="submit" onClick={() => changeStatus()}>Submit Changes</button>
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
