import React, { useState } from "react";
import api from "./apis"
import { Link, useNavigate } from "react-router-dom";

export const Friends = (props) => {
    // const [email, setEmail] = useState('');
    // const [emailNew, setEmailNew] = useState('');
    // const [emailNew2, setEmailNew2] = useState('');
    const [pass, setPass] = useState('');
    const [seq, setSeq] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    }


    return (
        <div>
       <Link to="/settings">
            <button size="45" className="settingsNav-btn" >Profile</button>
        </Link>
        <Link to="/friends">
            <button size="45" className="friendNav-btn" >Friends</button>
        </Link>
        <div className="auth-form-container">
            <h2>Friends Settings</h2>
        
        {/* <button className="link-btn" onClick={() => props.onFormSwitch('reset')}>Change Password</button> */}
        {/* <button className="link-btn" onClick={() => props.onFormSwitch('calender')}>Go back to Calender</button> */}
        <Link to="/cal">
            <button size="45" className="reset-btn" type="submit">Weekly View</button>
        </Link>

    </div>
    </div>
    )
}