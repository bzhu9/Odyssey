import React, {useState} from "react"
import { Link } from "react-router-dom";
import api from "./apis"

export const OpenClass = (props) => {
    const [classroom, setClassroom] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const submit = async () => {
        if (!classroom.match(/[A-z]+ [0-9]+/)) {
            alert("Invalid classroom")
        }
        else {
            const startTime = new Date()
            const endTime = new Date()
            console.log(endTime.getHours())
            endTime.setHours(endTime.getHours() + 1)
            console.log(endTime.getHours())
            const building = classroom.split(' ')[0]
            const room = classroom.split(' ')[1]
            
            const payload = {
                startTime: startTime,
                endTime: endTime,
                building: building,
                room: room
            }

            await api.searchOpenClass(payload).then(res => {
                window.alert(res);
            }).catch (err => {
                if (err.response) {
                    console.log(err.response.data);
                    alert(err.response.data.message);
                }
            })
        }
    }


    return (
        <div className="auth-form-container">
            <h2>Classroom Search</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="text">Enter Classroom</label>
                <input size="45" value={classroom} onChange={(e) => setClassroom(e.target.value)} type="text" placeholder="SMTH 108" id="email" name="email" />
                <button type="submit" onClick={submit} >Submit</button>

            </form>
            {/* <button type="submit" onClick={() => props.onFormSwitch('calender')}>Weekly View</button> */}
            <Link to="/cal">
                <button size="45" className="reset-btn" type="submit">Weekly View</button>
            </Link>

        </div>
    )
}