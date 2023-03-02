import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "./apis";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export const CreateEvent = (props) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [location, setLocation] = useState('');
    const [note, setNote] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const submit = async () => {
        if (title === "" || date === "" || startTime === "" || endTime === "") {
            alert("Please fill out all fields");
        }
        else {
            // store dates using ISO 8061 format
            const startDate = new Date(date);
            const startTimeSplit = startTime.split(':');
            startDate.setHours(startTimeSplit[0]);
            startDate.setMinutes(startTimeSplit[1]);

            const endDate = new Date(date);
            const endTimeSplit = startTime.split(':');
            endDate.setHours(endTimeSplit[0]);
            endDate.setMinutes(endTimeSplit[1]);
            console.log(endDate.toISOString());

            const payload = {
                title: title,
                startTime: startDate,
                endTime: endDate,
                location: location,
                note: note
            };

            await api.insertEvent(payload).then(res => {
                window.alert("Event created successfully");
            }).catch (err => {
                if (err.response) {
                    console.log(err.response.data);
                    alert(err.response.data.message);
                }
            });
        }


    }

    return (
        <div className="auth-form-container">
        <h2>Add Event</h2>
    <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="text">Title</label>
        <input size="45" value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="previous title" id="email" name="email" />
        <label htmlFor="date">Date of Event</label>
        <input size="45" value={date} onChange={(e) => setDate(e.target.value)} type="date" placeholder="previous date" id="email" name="email" />
        <label htmlFor="time">Start Time of Event</label>
        <input size="45" value={startTime} onChange={(e) => setStartTime(e.target.value)} type="time" placeholder="previous start time" id="email" name="email" />
        <label htmlFor="time">End Time of Event</label>
        <input size="45" value={endTime} onChange={(e) => setEndTime(e.target.value)} type="time" placeholder="previous start time" id="email" name="email" />
        <label htmlFor="text">Location</label>
        <input size="45" value={location} onChange={(e) => setLocation(e.target.value)} type="email" placeholder="previous location" id="email" name="email" />
        <label htmlFor="text">Event Notes</label>
        <input size="40" value={note} onChange={(e) => setNote(e.target.value)} type="email" placeholder="previous notes" id="email" name="email" />
        {/* <button type="submit" onClick={() => props.onFormSwitch('calender')}>Submit Changes</button> */}
        <button type="submit" onClick={submit} >Create Event</button>
    </form>
    {/* <button className="link-btn" onClick={() => props.onFormSwitch('calender')}>Go back to Calender</button> */}
    <Link to="/cal">
        <button size="45" className="reset-btn" type="submit">Weekly View</button>
    </Link>
</div>
    )
}