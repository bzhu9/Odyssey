import React, { useState } from "react";
import api from "./apis"
import { Link, useNavigate } from "react-router-dom";

export const ChangeEmail = (props) => {
    const [email, setEmail] = useState('');
    const [emailNew, setEmailNew] = useState('');
    const [emailNew2, setEmailNew2] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const changeEmail = async () => {
        console.log("inside");
        if (sessionStorage.getItem("user") == null) {
            //console.log("wtf?")
            console.log("user is null wtf");
            window.alert("Please login to change your email!");
        }
        else if (email !== sessionStorage.getItem("user")){
            console.log("email is not the same");
            window.alert("Please provide the email associated to your account");
        }
        else {
            //check if new email is identical to new email confirm
            console.log("inside else");
            if (emailNew === emailNew2) {
                //make the payload object
                console.log("making payload");
                const payload = {
                    oldEmail: email,
                    newEmail: emailNew
                };

                //send the post api
                console.log("api call");
                await api.changeEmail(payload).then( async res => {
                    sessionStorage.setItem("user", emailNew);
                    console.log("email changed")
                    window.alert("email changed!");
                    navigate("../cal");
                }).catch(function (error) {
                    console.log("there was an error changing");
                    if (error.reponse) {
                        console.log("displaying error");
                        window.alert(error.response.data.message);
                    }
                })

                //show the response to the user
            }
            else {
                console.log("email is the same as another user");
                window.alert("please make sure new email is the same");
            }

            
        }

    }

   
    return (
        <div className="auth-form-container">
            <h2>Change Email</h2>
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input size="45" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="alexsmith@gmail.com" id="email" name="email" />
            <label htmlFor="email">New Email</label>
            <input size="45" value={emailNew} onChange={(e) => setEmailNew(e.target.value)} type="email" placeholder="alexsmith2@gmail.com" id="email" name="email" />
            <label htmlFor="email">Confirm New Email</label>
            <input size="45" value={emailNew2} onChange={(e) => setEmailNew2(e.target.value)} type="email" placeholder="alexsmith2@gmail.com" id="email" name="email" />
            {/* <label htmlFor="password"> Password</label>
            <input size="45" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" /> */}
            <button type="submit" onClick={changeEmail}>Change Email</button>
        </form>
        {/* <button className="link-btn" onClick={() => props.onFormSwitch('reset')}>Change Password</button> */}
        {/* <button className="link-btn" onClick={() => props.onFormSwitch('calender')}>Go back to Calender</button> */}
        <Link to="/settings">
            <button size="45" className="reset-btn" type="submit">Profile Settings</button>
        </Link>
        <Link to="/cal">
            <button size="45" className="reset-btn" type="submit">Weekly View</button>
        </Link>

    </div>
    )
}