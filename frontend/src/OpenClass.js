import React, {useState} from "react"
import api from "./apis"
export const OpenClass = (props) => {
    const [classroom, setClassroom] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="auth-form-container">
            <h2>Classroom Search</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="text">Enter Classroom</label>
                <input size="45" value={classroom} onChange={(e) => setClassroom(e.target.value)} type="text" placeholder="SMTH 108" id="email" name="email" />
                <button type="submit" >Submit</button>

            </form>
            <button type="submit" onClick={() => props.onFormSwitch('calender')}>Weekly View</button>

        </div>
    )
}