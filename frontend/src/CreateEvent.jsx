import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./apis";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Select, { components } from "react-select";



const allOptions = [
    { value: "option 1", label: "option 1" },
    { value: "option 2", label: "option 2" },
    { value: "option 3", label: "option 3" },
    { value: "option 4", label: "option 4" }
  ];




export const CreateEvent = (props) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [location, setLocation] = useState('');
    const [note, setNote] = useState('');
    const [isValidTime, setIsValidTime] = useState(true);
    // const [friend, setFriend] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);



    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        const start = new Date(`${date}T${startTime}:00`);
        const end = new Date(`${date}T${endTime}:00`);
        setIsValidTime(start <= end);
    }, [date, startTime, endTime]);

    const submit = async () => {
        if (title === "" || date === "" || startTime === "" || endTime === "") {
            alert("Please fill out all fields");
        }
        else if (note.length > 50) {
            window.alert("Personal note can not be more than 50 characters");
        }
        else if (!isValidTime) {
            window.alert("The start time must be before the end time")
        }
        else {
            // store dates using ISO 8061 format
            const startDate = new Date(date);
            startDate.setDate(startDate.getDate() + 1)
            const startTimeSplit = startTime.split(':');
            startDate.setHours(startTimeSplit[0]);
            startDate.setMinutes(startTimeSplit[1]);

            const endDate = new Date(date);
            endDate.setDate(endDate.getDate() + 1)
            const endTimeSplit = endTime.split(':');
            endDate.setHours(endTimeSplit[0]);
            endDate.setMinutes(endTimeSplit[1]);

            const payload = {
                title: title,
                startTime: startDate.toISOString(),
                endTime: endDate.toISOString(),
                location: location,
                note: note
            };

            await api.insertEvent(payload).then(res => {
                window.alert("Event created successfully");
                navigate("../cal");

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
        <input size="45" value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" id="text" name="text" />
        <label htmlFor="date">Date of Event</label>
        <input size="45" value={date} onChange={(e) => setDate(e.target.value)} type="date" placeholder="Date" id="date" name="date" />
        <label htmlFor="time">Start Time of Event</label>
        <input size="45" value={startTime} onChange={(e) => setStartTime(e.target.value)} type="time" placeholder="Start Time" id="time" name="time" />
        <label htmlFor="time">End Time of Event</label>
        <input size="45" value={endTime} onChange={(e) => setEndTime(e.target.value)} type="time" placeholder="End Time" id="time" name="time" />
        <label htmlFor="text">Location</label>
        <input size="45" value={location} onChange={(e) => setLocation(e.target.value)} type="text" placeholder="Location" id="text" name="text" />
        {/* <select onChange={(e) => setFriend(e.target.value)}  id="colours">
        <option input type="checkbox" className="dropdown" value="brian">brian</option>
        <option input type="checkbox" className="dropdown" value="sean">sean</option>
        <option input type="checkbox" className="dropdown" value="arnav">arnav</option>
        <option type="checkbox" className="dropdown" value="gargi">gargi</option>
        </select>
        <p>Event is shared with: {friend} </p> */}
        <label htmlFor="text">Share Event</label>

        <Select className="friendDropdown"
        defaultValue={[]}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        onChange={(options) => {
          if (Array.isArray(options)) {
            setSelectedOptions(options.map((opt) => opt.value));
          }
        }}
        options={allOptions}
        /> 
        {/* // components={{
        //   Option: InputOption
        // }} */}
   
      {/* <pre>{JSON.stringify({ selected: selectedOptions }, null, 2)}</pre> */}
    
        <label htmlFor="text">Event Notes</label>
        <input size="40" value={note} onChange={(e) => setNote(e.target.value)} type="text" placeholder="Notes" id="text" name="text" />
        {/* <button type="submit" onClick={() => props.onFormSwitch('calender')}>Submit Changes</button> */}
        <button type="submit" onClick={submit} >Create Event</button>
    </form>
    {/* <button className="link-btn" onClick={() => props.onFormSwitch('calender')}>Go back to Calender</button> */}
    <Link to="/cal">
        <button size="45" className="reset-btn" type="submit">Cancel</button>
    </Link>
</div>
    )
}