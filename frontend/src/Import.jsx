import React, {useState} from "react"
import api from "./apis"
import { Link, useNavigate } from "react-router-dom";
export const Import = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const login = async () => {
       
    }

    return (
        <div className="auth-form-container">
            <h2>Import</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                

            </form>
           
            
            <Link to="/cal">
                <button size="45" className="reset-btn" type="submit">Weekly View</button>
            </Link>
            <Link to="/register">
                <button size="45" className="reg-btn">Import Calender</button>
            </Link>
            

        </div>
    )
}