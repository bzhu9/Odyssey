import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import api from "./apis";


async function getEvent(eventID) {
    const eventObj = await api.getSingleEvent(eventID);
    console.log(eventObj);
    console.log(eventObj.data.note);
    //setTitle(eventObj.data.title);
    return eventObj.data
}

export const ChangeEvent = (props) => {
        // const eventID = localStorage.getItem('eventID');
        // const eventObj = getEvent(eventID);

        
        // const [title, setTitle] = useState('');
        // console.log(eventObj.title);
        // setTitle(eventObj.title);
        const eventID = localStorage.getItem('eventID');
        const [eventObj, setEventObj] = useState({});

        const navigate = useNavigate();
      
        useEffect(() => {
          const fetchEvent = async () => {
            const response = await getEvent(eventID);
            setEventObj(response);
          };
          fetchEvent();
        }, [eventID]);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [location, setLocation] = useState('');
    const [note, setNote] = useState('');

    useEffect(() => {
        setTitle(eventObj.title);
        setDate(eventObj.date);
        setStartTime(eventObj.startTime);
        setEndTime(eventObj.endTime);
        setLocation(eventObj.location);
        setNote(eventObj.note);
      }, [eventObj]);

    //setTitle(eventObj.title);


    //get the eventID
    //const eventtitle = localStorage.getItem('eventTitle');
    //console.log(eventObj);

    //get the event from the database

    //update the textboxes to show the value from the eventobject

    /*
        once u get the event object
        you can repopulate the texboxes
        and then when the submit changes button has been clicked
        use /edit post route to update the object  
            make sure that the cal view changes accordingly
        
        if the delete button is clicked
        use /delete post route to update hte object
            make sure that the call view no longer shows that event

    */

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    
    const update = async () => {
        try {
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
                _id: eventObj._id,
                title: title,
                startTime: startDate.toISOString(),
                endTime: endDate.toISOString(),
                location: location,
                note: note
            };
            const response = await api.editEvent(payload);
            console.log(response.data);
            window.alert("Event modified successfully!");
            navigate("../cal");

        } catch (error) {
            console.log(error);
            window.alert(error.repsonse.data.message);
        }
    }

    const deleteEvent = async () => {
        const payload = {_id: eventObj._id};
        await api.deleteEvent(payload).then( async res => {
            // console.log(res);
            alert("Event deleted successfully");
            navigate("../cal");
        }).catch (function (error) {
            if (error.response) {
                alert(error.response.data.message);
            }
        })
    }

    return (
        <div className="auth-form-container">
        <h2>Change Event</h2>
    <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="text">Title</label>
        <input size="45" value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" id="text" name="text" />
        <label htmlFor="date">Date of Event</label>
        <input size="45" value={date} onChange={(e) => setDate(e.target.value)} type="date" placeholder="Date" id="date" name="date" />
        <label htmlFor="time">Start Time of Event</label>
        <input size="45" value={startTime} onChange={(e) => setStartTime(e.target.value)} type="time" placeholder="Start time" id="time" name="time" />
        <label htmlFor="time">End Time of Event</label>
        <input size="45" value={endTime} onChange={(e) => setEndTime(e.target.value)} type="time" placeholder="End time" id="time" name="time" />
        <label htmlFor="text">Location</label>
        <input size="45" value={location} onChange={(e) => setLocation(e.target.value)} type="text" placeholder="Location" id="text" name="text" />
        <label htmlFor="text">Event Notes</label>
        <input size="65" value={note} onChange={(e) => setNote(e.target.value)} type="text" placeholder="Notes" id="text" name="text" />
        <button type="submit" onClick={update}>Submit Changes</button>
        <button onClick={() => {
            if (window.confirm('Are you sure you want to delete this event?')) {
            deleteEvent();
        }
        }}>Delete Event</button>
        {/* <button type="submit" onClick={deleteEvent}>Delete Event</button> */}

    </form>
    {/* <button className="link-btn" onClick={() => props.onFormSwitch('calender')}>Go back to Calender</button> */}
    <Link to="/cal">
        <button size="45" className="reset-btn" type="submit">Cancel Changes</button>
    </Link>
</div>
    )
}