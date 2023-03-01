import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    const [notes, setNotes] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
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
        <input size="40" value={notes} onChange={(e) => setNotes(e.target.value)} type="email" placeholder="previous notes" id="email" name="email" />
        <button type="submit" onClick={() => props.onFormSwitch('calender')}>Submit Changes</button>
    </form>
    {/* <button className="link-btn" onClick={() => props.onFormSwitch('calender')}>Go back to Calender</button> */}
    <Link to="/cal">
        <button size="45" className="reset-btn" type="submit">Weekly View</button>
    </Link>
</div>
    )
}