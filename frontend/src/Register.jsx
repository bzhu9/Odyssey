import React, { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
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
            <input size="45" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit" onClick={() => props.onFormSwitch('login')}>Log In</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Go back to login screen</button>
    </div>
    )
}