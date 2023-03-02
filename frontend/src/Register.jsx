import React, { useState } from "react";
import api from "./apis"
import { Link, useNavigate } from "react-router-dom";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [pass2, setPass2] = useState('');
    const [name, setName] = useState('');
    const [seq1, setSeq1] = useState('');
    const [seq2, setSeq2] = useState('');
    const [seq3, setSeq3] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("HELLO");
        try {
            console.log("HELLO WORLD");
            // f to denote field from form
            // const {fName, fEmail, fPass, fSeq1, fSeq2, fSeq3} = this.state;
            if (pass !== pass2) {
                window.alert("Passwords do not match. Please try again");
                return;
            }
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
            // props.onFormSwitch('login');
            navigate("../login");
        }
        catch (error) {
            if (error.response) {
                console.log(error.response.data);
                alert(error.response.data.message);
            }
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
            <label htmlFor="password">Confirm Password</label>
            <input size="80" value={pass2} onChange={(e) => setPass2(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <label htmlFor="password">Security Question: What is the name of the street of the first house you lived in?</label>
            <input size="90" value={seq1} onChange={(e) => setSeq1(e.target.value)} type="text" placeholder="Main Street" id="seq" name="seq" />
            <label htmlFor="password">Security Question: What is your mother's maiden name?</label>
            <input size="90" value={seq2} onChange={(e) => setSeq2(e.target.value)} type="text" placeholder="Mary" id="seq" name="seq" />
            <label htmlFor="password">Security Question: What is your best friend's first name?</label>
            <input size="90" value={seq3} onChange={(e) => setSeq3(e.target.value)} type="text" placeholder="Jackie" id="seq" name="seq" />
            <button type="submit">Register</button>
        </form>
        {/* <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Go back to login screen</button> */}
        <Link to="/login">
            <button className="link-btn">Go back to login screen</button>
        </Link>
    </div>
    )
}