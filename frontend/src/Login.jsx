import React, {useState} from "react"
import api from "./apis"
export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const login = async () => {
        const payload = {email: email, password: pass};
        await api.loginUser(payload).then( res => {
            console.log(res)
            window.alert("User logged in successfully");
            setPass("");
            setEmail("");
            // https://www.w3schools.com/html/html5_webstorage.asp
            // set stringified user object in session storage, access using JSON.parse
            // can change just to emails
            sessionStorage.setItem("user", JSON.stringify(res.data.user));

            if (sessionStorage.getItem("user")) {
                console.log(JSON.parse(sessionStorage.getItem("user"))?.name + " is logged in");
            }
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
            <button type="submit" onClick={() => props.onFormSwitch('calender')}>Weekly View</button>
            <button className="reg-btn" onClick={() => props.onFormSwitch('register')}>Create an account</button>
            <button className="reset-btn" onClick={() => props.onFormSwitch('reset')}>Reset Password</button>

        </div>
    )
}