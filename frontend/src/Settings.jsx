import React, { useState } from "react";
import api from "./apis"
import { Link, useNavigate } from "react-router-dom";

export const Settings = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [pass2, setPass2] = useState('');
    const [seq, setSeq] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const deleteUser = async () => {
        console.log("USER: ");
        console.log(sessionStorage.getItem("user"));
        if (sessionStorage.getItem("user") == null) {
            console.log("wtf?")
            window.alert("Please login delete your account!");
        }
        else if (email !== sessionStorage.getItem("user")){
            window.alert("Please provide the email associated to your account");
        }
        else if (pass !== pass2) {
            window.alert("Passwords do not match");
        }
        else {
            // console.log(sessionStorage.getItem("user"));
            const payload = {
                email: sessionStorage.getItem("user"),
                password: pass,
                seq: seq,
            };
            // const formEmail = email;
            await api.deleteUser(payload).then( async res => {
                // console.log(res);
                alert("Account deleted successfully");
                sessionStorage.removeItem("user");
                navigate("../login");
            }).catch (function (error) {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })
            // props.onFormSwitch('login');
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
        {/* <button className="link-btn" onClick={() => props.onFormSwitch('reset')}>Change Password</button> */}
        {/* <button className="link-btn" onClick={() => props.onFormSwitch('calender')}>Go back to Calender</button> */}
        <Link to="/reset">
            <button size="45" className="reset-btn">Change Password</button>
        </Link>
        <Link to="/cal">
            <button size="45" className="reset-btn" type="submit">Weekly View</button>
        </Link>

    </div>
    )
}