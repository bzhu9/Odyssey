import React, { useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export const CreateEvent = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [seq, setSeq] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="auth-form-container">
        <h2>Add Event</h2>
    <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="text">Email</label>
        <input size="45" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="alexsmith@gmail.com" id="email" name="email" />
        <button type="submit" onClick={() => props.onFormSwitch('calender')}>Reset Password</button>
    </form>
    <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Go back to login screen</button>
</div>
    )
}