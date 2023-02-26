import React, { useState } from "react";
import api from "./apis"

export const Reset = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [pass2, setPass2] = useState('');
    const [seq, setSeq] = useState('');

    
    const handleSubmit = async (e) => {
        e.preventDefault();
    }
    

/*
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("hi");
        try {
            console.log("hi hi hi");
            // f to denote field from form
            // const {fName, fEmail, fPass, fSeq1, fSeq2, fSeq3} = this.state;
            const payload = {email: email, password: pass, securityA: seq};
            await api.resetUser(payload).then(res => {
                window.alert("User reset successfully");
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    const reset = async (email, securityA, newPassword) => {
        try {
          const response = await api.resetUser(email, securityA, newPassword);
          console.log(response.data);
          // Display a success message to the user
          window.alert("Password reset successful!");
        } catch (error) {
          console.log(error);
          // Display an error message to the user
          window.alert("Password reset failed. Please try again.");
        }
      };
     */

    return (
        <div className="auth-form-container">
            <h2>Reset Password</h2>
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input size="45" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="alexsmith@gmail.com" id="email" name="email" />
            <label htmlFor="seq">Security Question: What is the name of the street of the first house you lived in?</label>
            <input size="90" value={seq} onChange={(e) => setSeq(e.target.value)} type="seq" placeholder="Main Street" id="seq" name="seq" />
            <label htmlFor="password">New Password</label>
            <input size="45" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <label htmlFor="password">Confirm Password</label>
            <input size="80" value={pass2} onChange={(e) => setPass2(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit" onClick={() => props.onFormSwitch('login')}>Reset Password</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Go back to login screen</button>
    </div>
    )
}