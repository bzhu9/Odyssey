import React, {useState} from "react"
import api from "./apis"
import { Link, useNavigate } from "react-router-dom";
export const FriendProfile = (props) => {
   
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    }

   

    return (
        <div className="auth-form-container">
            <h2>Friend's Profile</h2>
            <form  >
                <h4 className="friendProfile">Friend's Name: </h4><p>Alex Smith</p>
                <h4 className="friendProfile">Friend's Email: </h4> <p>alexsmith@gmail.com</p>
                <h4 className="friendProfile">Friend's Status: </h4> <p>Friends Only</p>


            </form>
            {/* <button type="submit" onClick={() => props.onFormSwitch('calender')}>Weekly View</button>
            <button className="reg-btn" onClick={() => props.onFormSwitch('register')}>Create an account</button>
            <button className="reset-btn" onClick={() => props.onFormSwitch('reset')}>Reset Password</button> */}
            {/* not sure why the buttons are small */}
            <Link to="/friends">
                <button size="45" className="reg-btn">Friends</button>
            </Link>
            <Link to="/cal">
                <button size="45" className="reset-btn" type="submit">Weekly View</button>
            </Link>
            
           

        </div>
    )
}