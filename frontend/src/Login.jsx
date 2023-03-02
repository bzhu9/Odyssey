import React, {useState} from "react"
import api from "./apis"
import { Link, useNavigate } from "react-router-dom";
export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const login = async () => {
        // if (sessionStorage.getItem("user") === null) {
        //     console.log("HELLO WORLD");
        // }
        const payload = {email: email, password: pass};
        await api.loginUser(payload).then( res => {
            console.log(res)
            window.alert(`${res.data.user} logged in successfully`);
            setPass("");
            setEmail("");
            // https://www.w3schools.com/html/html5_webstorage.asp
            // set stringified user object in session storage, access using JSON.parse
            // can change just to emails
            sessionStorage.setItem("user", res.data.user);

            if (sessionStorage.getItem("user")) {
                console.log(sessionStorage.getItem("user") + " is logged in");
            }
            // does not work?
            // props.onFormSwitch('calender');
            navigate("../register");

        }).catch(function (error){
            if (error.response) {
                console.log(error.response.data);
                alert(error.response.data.message);
            }
        });
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input size="45" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="alexsmith@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input size="45" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="***********" id="password" name="password" />
                <button type="submit" onClick={login} >Log In</button>

            </form>
            {/* <button type="submit" onClick={() => props.onFormSwitch('calender')}>Weekly View</button>
            <button className="reg-btn" onClick={() => props.onFormSwitch('register')}>Create an account</button>
            <button className="reset-btn" onClick={() => props.onFormSwitch('reset')}>Reset Password</button> */}
            {/* not sure why the buttons are small */}
            
            <Link to="/cal">
                <button size="45" className="reset-btn" type="submit">Weekly View</button>
            </Link>
            <Link to="/register">
                <button size="45" className="reg-btn">Create an account</button>
            </Link>
            <Link to="/reset">
                <button size="45" className="reset-btn">Reset Password</button>
            </Link>

        </div>
    )
}