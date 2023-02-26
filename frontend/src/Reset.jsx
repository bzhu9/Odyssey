import React, { useState } from "react";
import api from "./apis"

export const Reset = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [pass2, setPass2] = useState('');
    const [seq, setSeq] = useState('');
    const [seq2, setSeq2] = useState('');
    const [seq3, setSeq3] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const reset = async () => {
        try {
          const payload = {email: email, password: pass, seq1: seq, seq2: seq2, seq3: seq3};
          const response = await api.resetUser(payload);
          console.log(response.data);
          // Display a success message to the user
          window.alert("Password reset successful!");
          props.onFormSwitch('login')
        } catch (error) {
          console.log(error);
          // Display an error message to the user
          window.alert(error.response.data.message);
          //window.alert("Password reset failed. Please try again.");
        }
      };

    return (
        <div className="auth-form-container">
            <h2>Reset Password</h2>
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input size="45" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="alexsmith@gmail.com" id="email" name="email" />
            <label htmlFor="seq">Security Question: What is the name of the street of the first house you lived in?</label>
            <input size="90" value={seq} onChange={(e) => setSeq(e.target.value)} type="seq" placeholder="Main Street" id="seq" name="seq" />
            <label htmlFor="password">Security Question: What is your mother's maiden name?</label>
            <input size="90" value={seq2} onChange={(e) => setSeq2(e.target.value)} type="text" placeholder="Mary" id="seq" name="seq" />
            <label htmlFor="password">Security Question: What is your best friend's first name?</label>
            <input size="90" value={seq3} onChange={(e) => setSeq3(e.target.value)} type="text" placeholder="Jackie" id="seq" name="seq" />
            <label htmlFor="password">New Password</label>
            <input size="45" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <label htmlFor="password">Confirm Password</label>
            <input size="80" value={pass2} onChange={(e) => setPass2(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit" onClick={reset} >Reset Password</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Go back to login screen</button>
    </div>
    )
}