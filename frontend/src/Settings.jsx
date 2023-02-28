import React, { useState } from "react";
import api from "./apis"

export const Settings = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [pass2, setPass2] = useState('');
    const [seq, setSeq] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const deleteUser = async () => {
        if (sessionStorage.getItem("user") === null) {
            window.alert("Please login delete your account!");
        }
        else {
            console.log(sessionStorage.getItem("user"));
            const email = {email: sessionStorage.getItem("user")};
            await api.deleteUser(email).then( async res => {
                console.log(res);
                sessionStorage.setItem("user", null);
            })

        }
    }

    return (
        <div className="auth-form-container">
            <h2>Profile Settings</h2>
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input size="45" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="alexsmith@gmail.com" id="email" name="email" />
            <label htmlFor="seq">Security Question: What is the name of the street of the first house you lived in?</label>
            <input size="90" value={seq} onChange={(e) => setSeq(e.target.value)} type="seq" placeholder="Main Street" id="seq" name="seq" />
            <label htmlFor="password"> Password</label>
            <input size="45" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <label htmlFor="password">Confirm Password</label>
            <input size="80" value={pass2} onChange={(e) => setPass2(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit" onClick={deleteUser}>Delete Account</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('calender')}>Go back to Calender</button>
    </div>
    )
}