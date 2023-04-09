import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import api from "./apis";
import Select, { components } from "react-select";
//import { set } from "mongoose";


async function getEvent(eventID) {
    const eventObj = await api.getSingleEvent(eventID);
    console.log(eventObj);
    console.log(eventObj.data.note);
    //setTitle(eventObj.data.title);
    return eventObj.data
}

const allOptions = [
    { value: "option 1", label: "option 1" },
    { value: "option 2", label: "option 2" },
    { value: "option 3", label: "option 3" },
    { value: "option 4", label: "option 4" }
  ];

export const ChangeEvent = (props) => {
    //get the object ID from local storage
    const eventID = localStorage.getItem('eventID');

    const [eventObj, setEventObj] = useState({});
    const navigate = useNavigate();
    //get the event object given the object id
    useEffect(() => {
      const fetchEvent = async () => {
        const response = await getEvent(eventID);
        setEventObj(response);
      };
      fetchEvent();
    }, [eventID]);
    const [isValidTime, setIsValidTime] = useState(true);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [location, setLocation] = useState('');
    const [note, setNote] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [friendList, setFriendList] = useState([]);
    const [eventReqList, setEventReqList] = useState([]);
    const [preSelectedOptions, setPreSelectedOptions] = useState([]);




    useEffect(() => {
        //preload the textboxes
        setTitle(eventObj.title);
        let d = new Date(eventObj.startTime);
        var dateFormat = d.getFullYear() + "-" +((d.getMonth()+1) < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth()+1)) + "-" + (d.getDate() < 10 ? "0" + d.getDate() : d.getDate());        console.log(dateFormat);

        setDate(dateFormat);
        setStartTime(((d.getHours() < 10) ? "0" : "") + d.getHours() + ":" + ((d.getMinutes() < 10) ? "0" : "") + d.getMinutes());
        const endDay = new Date(eventObj.endTime);
        setEndTime(((endDay.getHours() < 10) ? "0" : "") + endDay.getHours() + ":" + ((endDay.getMinutes() < 10) ? "0" : "") + endDay.getMinutes());
        setLocation(eventObj.location);
        setNote(eventObj.note);
        //console.log(eventObj.req_users)
        setEventReqList(eventObj.req_users);        
     }, [eventObj]);


    async function userReqObj() {
        //get the user object
        let userReqObj = [];
        if (eventReqList) {
            for (let i = 0; i < eventReqList.length; i++) {
                //convert it to an object
                //add it to the list
                let pload = {
                    id: eventReqList[i]
                };
                let obj = await api.getUserWithID(pload);
                userReqObj.push({
                    email: obj.data.user.email,
                    id: obj.data.user._id,
                })
                //console.log(userReqObj);
                //console.log(obj.data);
                //console.log(obj.data.name);
                //console.log(obj.data.user._id);
                //console.log(obj.data.user.email);
            }
        }
        //add it to a list
        //create the pre selected options
        //set the pre selected options
        setPreSelectedOptions(userReqObj);
    }

    const fetchEvent = async () => {
        try {
          //get event
          const eventID = localStorage.getItem('eventID');
          const response = await api.getSingleEvent(eventID);
          const eObj = response.data;
          //get the list of all the users by combining the req users and actual usrs
          let allUsers = eObj.req_users.concat(eObj.users);
          //get the current user and remove (we do not want to show this user)
          let currentUser = sessionStorage.getItem("user");
          allUsers.splice(allUsers.indexOf(currentUser), 1);
          //value checking
          console.log("ALL USERS");
          console.log(allUsers);
          //set the list
          setEventReqList(allUsers);
        } catch (error) {
          console.log(error);
        }
    };

    useEffect(() => {
        //sets the events
        fetchEvent();
      }, []);
    
      useEffect(() => {
        //value checking
        console.log("eventReqList");
        console.log(eventReqList);
    }, [eventReqList]);

    useEffect(() => {
        console.log(eventReqList); //convert this to objects with ID and email
        userReqObj();
     }, [eventReqList]);

    useEffect(() => {
        console.log("HERE");
        setSelectedOptions(preSelectedOptions.map((friend) => ({
            key: friend.id,
            value: friend.id,
            label: friend.email
        })))
        console.log(preSelectedOptions.map((friend) => ({
            value: friend.id,
            label: friend.email
        })))
        
    }, [preSelectedOptions]);


    async function getFriends() {
        //get the user's friend list
        const pload = { email: sessionStorage.getItem("user")}
        const rawFriendList = await api.getFriends(pload);
        let processedFriendList = []
        //console.log(rawFriendList);
        for (let i = 0; i < rawFriendList.data.length; i++) {
          let f = rawFriendList.data[i];
          //each object will contain the email and the id of the friend
          processedFriendList.push({
            email: f.email,
            id: f.id, 
          });
        }
        //set the friendList
        setFriendList(processedFriendList);
    }

    useEffect (() => {
        let ignore = false;
        if (!ignore) {
          getFriends();
          //console.log(friendList);
        }
        return () => {ignore = true;}
      }, []);

    // useEffect(() => {
    //     console.log(friendList);
    // }, [friendList]);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    //check if the time is valid
    useEffect(() => {
        const start = new Date(`${date}T${startTime}:00`);
        const end = new Date(`${date}T${endTime}:00`);
        setIsValidTime(start <= end);
    }, [date, startTime, endTime]);



    
    const update = async () => {
        try {
            if (title === "" || date === "" || startTime === "" || endTime === "") {
                alert("Please fill out all required fields");
                return;
            }
            if (!isValidTime) {
                window.alert("Start time must be before end time!");
                return;
            }
            else if (note.length > 50) {
                window.alert("Personal note can not be more than 50 characters");
                return;
            }
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

            //go through every accepted user and check if outside of working day
                //alert + return if there are more users than the owner
            const obj = await api.getSingleEvent(eventID);
            const eobj = obj.data;

            //console.log("users:");
            //console.log(eobj.users);
            //console.log(eObj);

            const startHr = startTimeSplit[0];
            const startMin = startTimeSplit[1];
            const start = `${startHr}:${startMin}`;
            //console.log(start);
            const endHr = endTimeSplit[0];
            const endMin = endTimeSplit[1];
            const end = `${endHr}:${endMin}`;
            //console.log(end);


            const [hour1, minute1] = start.split(":");
            const [hour2, minute2] = end.split(":");
            const startEvent = new Date(0, 0, 0, hour1, minute1);
            const endEvent = new Date(0, 0, 0, hour2, minute2);
            
            //clear the console for debugging reasons.
            console.clear();
            const userList = eobj.users;
            console.log(userList[0]);
            for (let i = 0; i < userList.length; i++) {
                let pload = {
                    id: userList[i]
                };
                let u = await api.getUserWithID(pload);
                let user = u.data.user;
                //start of workday
                let wkdays = user.workdayStart;
                const [hourStart, minuteEnd] = wkdays.split(":");
                let workdayStart = new Date(0, 0, 0, hourStart, minuteEnd);
                //end of workday
                let wkdaye = user.workdayEnd;
                const [hourStart2, minuteEnd2] = wkdaye.split(":");
                let workdayEnd = new Date(0, 0, 0, hourStart2, minuteEnd2);
                if (startEvent.getTime() < workdayStart.getTime()) {
                    //starts before the workday, return an alert
                    window.alert(`The event starts before ${user.name}'s workday starts. Please change the time!`);
                    return;
                } else if (startEvent.getTime() > workdayEnd.getTime()) {
                    window.alert(`The event starts after ${user.name}'s workday ends. Please change the time!`);
                    return;
                } else if (endEvent.getTime() > workdayEnd.getTime()) {
                    window.alert(`The event ends after ${user.name}'s workday ends. Please change the time!`);
                    return;
                }
            }
            //go through every req user and check if it is outside of working day
                //alert and not go through
            const reqList = eobj.req_users;
            if (reqList) {
                for (let i = 0; i < reqList.length; i++) {
                    let pload = {
                        id: reqList[i]
                    };
                    let u = await api.getUserWithID(pload);
                    let user = u.data.user;
                    //start of workday
                    let wkdays = user.workdayStart;
                    const [hourStart, minuteEnd] = wkdays.split(":");
                    let workdayStart = new Date(0, 0, 0, hourStart, minuteEnd);
                    //end of workday
                    let wkdaye = user.workdayEnd;
                    const [hourStart2, minuteEnd2] = wkdaye.split(":");
                    let workdayEnd = new Date(0, 0, 0, hourStart2, minuteEnd2);
                    if (startEvent.getTime() < workdayStart.getTime()) {
                        //starts before the workday, return an alert
                        window.alert(`The event starts before ${user.name}'s workday starts. Please change the time!`);
                        return;
                    } else if (startEvent.getTime() > workdayEnd.getTime()) {
                        window.alert(`The event starts after ${user.name}'s workday ends. Please change the time!`);
                        return;
                    } else if (endEvent.getTime() > workdayEnd.getTime()) {
                        window.alert(`The event ends after ${user.name}'s workday ends. Please change the time!`);
                        return;
                    }
                }

            }

            //console.log(selectedOptions);
            const values = selectedOptions.map(obj => obj.value);
            console.log("this is what values is");
            console.log(values);
            // console.log("after selected");
            // console.log(values);

            const payload = {
                _id: eventObj._id,
                title: title,
                startTime: startDate.toISOString(),
                endTime: endDate.toISOString(),
                location: location,
                req_users: values,
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
        <label htmlFor="text">Share Event</label>

        <Select className="friendDropdown"
        value={selectedOptions}
        isMulti={true}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        // onChange={(options) => {
        //   if (Array.isArray(options)) {
        //     setSelectedOptions(options.map((opt) => ({
        //         key: opt.id,
        //         value: opt.id,
        //         label: opt.email
        //     })));
        //     console.log("asjldhfvkasdjhfvkasdhj")
        //     console.log(selectedOptions);
        //   }
        // }}
        onChange={(options) => setSelectedOptions(options)}
        options={friendList.map((friend) => ({
            key: friend.id,
            value: friend.id,
            label: friend.email
        }))}
        /> 
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