import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./apis";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export const ChangeWorkday = (props) => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [isValidTime, setIsValidTime] = useState(true);

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    async function setWorkday() {
        const user = sessionStorage.getItem("user");
        if (!user) {
            alert("Please sign in to change your workda!")
        }

        const payload = { email: user, startTime: startTime, endTime: endTime};
        if (payload.startTime > payload.endTime) {
            alert("Start time cannot be after end time")
        }
        else {
            await api.setWorkday(payload)
                .then(res => {
                    alert(`Changed your workday successfully`);
                    navigate("../settings");
                });
        }
    }

    return (
        <div className="auth-form-container">
        <h2>Change Workday</h2>
    <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="time">Start Time of Workday</label>
        <input size="45" value={startTime} onChange={(e) => setStartTime(e.target.value)} type="time" placeholder="Start Time" id="time" name="time" />
        <label htmlFor="time">End Time of Workday</label>
        <input size="45" value={endTime} onChange={(e) => setEndTime(e.target.value)} type="time" placeholder="End Time" id="time" name="time" />
        {/* <button type="submit" onClick={() => props.onFormSwitch('calender')}>Submit Changes</button> */}
        <button type="submit" onClick={setWorkday} >Submit workday change</button>
    </form>
    {/* <button className="link-btn" onClick={() => props.onFormSwitch('calender')}>Go back to Calender</button> */}
    <Link to="/settings">
        <button size="45" className="reset-btn" type="submit">Cancel</button>
    </Link>
</div>
    )
}