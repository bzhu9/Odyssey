import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./apis";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export const ChangeWorkday = (props) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [isValidTime, setIsValidTime] = useState(true);

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    // useEffect(() => {
    //     const start = new Date(`${date}T${startTime}:00`);
    //     const end = new Date(`${date}T${endTime}:00`);
    //     setIsValidTime(start <= end);
    // }, [date, startTime, endTime]);

    // const submit = async () => {
    //     if (title === "" || date === "" || startTime === "" || endTime === "") {
    //         alert("Please fill out all fields");
    //     }
    //     else if (note.length > 50) {
    //         window.alert("Personal note can not be more than 50 characters");
    //     }
    //     else if (!isValidTime) {
    //         window.alert("The start time must be before the end time")
    //     }
    //     else {
    //         // store dates using ISO 8061 format
    //         const startDate = new Date(date);
    //         startDate.setDate(startDate.getDate() + 1)
    //         const startTimeSplit = startTime.split(':');
    //         startDate.setHours(startTimeSplit[0]);
    //         startDate.setMinutes(startTimeSplit[1]);

    //         const endDate = new Date(date);
    //         endDate.setDate(endDate.getDate() + 1)
    //         const endTimeSplit = endTime.split(':');
    //         endDate.setHours(endTimeSplit[0]);
    //         endDate.setMinutes(endTimeSplit[1]);

    //         const payload = {
    //             title: title,
    //             startTime: startDate.toISOString(),
    //             endTime: endDate.toISOString(),
    //             location: location,
    //             note: note
    //         };

    //         await api.insertEvent(payload).then(res => {
    //             window.alert("Event created successfully");
    //             navigate("../cal");

    //         }).catch (err => {
    //             if (err.response) {
    //                 console.log(err.response.data);
    //                 alert(err.response.data.message);
    //             }
    //         });
    //     }


    // }

    return (
        <div className="auth-form-container">
        <h2>Change Workday</h2>
    <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="date">Start Date of Workday</label>
        <input size="45" value={startDate} onChange={(e) => setStartDate(e.target.value)} type="text" placeholder="Date" id="date" name="date" />
        <label htmlFor="date">End Date of Workday</label>
        <input size="45" value={endDate} onChange={(e) => setEndDate(e.target.value)} type="date" placeholder="Date" id="date" name="date" />
        <label htmlFor="time">Start Time of WorkDay</label>
        <input size="45" value={startTime} onChange={(e) => setStartTime(e.target.value)} type="time" placeholder="Start Time" id="time" name="time" />
        <label htmlFor="time">End Time of Workday</label>
        <input size="45" value={endTime} onChange={(e) => setEndTime(e.target.value)} type="time" placeholder="End Time" id="time" name="time" />
        {/* <button type="submit" onClick={() => props.onFormSwitch('calender')}>Submit Changes</button> */}
        <button type="submit"  >Submit workday change</button>
    </form>
    {/* <button className="link-btn" onClick={() => props.onFormSwitch('calender')}>Go back to Calender</button> */}
    <Link to="/settings">
        <button size="45" className="reset-btn" type="submit">Cancel</button>
    </Link>
</div>
    )
}