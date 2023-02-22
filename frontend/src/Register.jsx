import React, { useState } from "react";
import api from "./apis"

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [seq1, setSeq1] = useState('');
    const [seq2, setSeq2] = useState('');
    const [seq3, setSeq3] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("HELLO");
        try {
            console.log("HELLO WORLD");
            // f to denote field from form
            // const {fName, fEmail, fPass, fSeq1, fSeq2, fSeq3} = this.state;
            const payload = {name: name, email: email, password: pass, seq1: seq1, seq2: seq2, seq3: seq3};
            await api.insertUser(payload).then(res => {
                window.alert("User created successfully");
                setName("");
                setPass("");
                setEmail("");
                setSeq1("");
                setSeq2("");
                setSeq3("");
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="auth-form-container">
            <h2>Create Account</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input size="45" value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Alex Smith" />
            <label htmlFor="email">Email</label>
            <input size="45" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="alexsmith@gmail.com" id="email" name="email" />
            <label htmlFor="password">Password</label>
            <input size="80" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <label htmlFor="password">Security Question: What is the name of the street of the first house you lived in?</label>
            <input size="90" value={seq1} onChange={(e) => setSeq1(e.target.value)} type="password" placeholder="Main Street" id="seq" name="seq" />
            <label htmlFor="password">Security Question: What is your mother's maiden name?</label>
            <input size="90" value={seq2} onChange={(e) => setSeq2(e.target.value)} type="password" placeholder="Mary" id="seq" name="seq" />
            <label htmlFor="password">Security Question: What is your best friend's first name?</label>
            <input size="90" value={seq3} onChange={(e) => setSeq3(e.target.value)} type="password" placeholder="Jackie" id="seq" name="seq" />
            <button type="submit" onClick={() => props.onFormSwitch('login')}>Log In</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Go back to login screen</button>
    </div>
    )
}