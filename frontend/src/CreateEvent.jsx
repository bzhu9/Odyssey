import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./apis";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Select, { components } from "react-select";
import { array } from "i/lib/util";
// import { TimeDurationInput } from "react-time-duration-input";

const allOptions = [
  { value: "option 1", label: "option 1" },
  { value: "option 2", label: "option 2" },
  { value: "option 3", label: "option 3" },
  { value: "option 4", label: "option 4" },
];



export const CreateEvent = (props) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");
  const [isValidTime, setIsValidTime] = useState(true);
  // const [friend, setFriend] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [notifTime, setNotifTime] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const start = new Date(`${date}T${startTime}:00`);
    const end = new Date(`${date}T${endTime}:00`);
    setIsValidTime(start <= end);
  }, [date, startTime, endTime]);

  async function getFriends() {
    //get the user's friend list
    const pload = { email: sessionStorage.getItem("user") };
    const rawFriendList = await api.getFriends(pload);
    let processedFriendList = [];
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

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      getFriends();
      //console.log(friendList);
    }
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    console.log(friendList);
  }, [friendList]);

  const submit = async () => {
    if (title === "" || date === "" || startTime === "" || endTime === "") {
      alert("Please fill out all fields");
    } else if (note.length > 50) {
      window.alert("Personal note can not be more than 50 characters");
    } else if (!isValidTime) {
      window.alert("The start time must be before the end time");
    } else {
      // store dates using ISO 8061 format
      const startDate = new Date(date);
      startDate.setDate(startDate.getDate() + 1);
      const startTimeSplit = startTime.split(":");
      startDate.setHours(startTimeSplit[0]);
      startDate.setMinutes(startTimeSplit[1]);

      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      const endTimeSplit = endTime.split(":");
      endDate.setHours(endTimeSplit[0]);
      endDate.setMinutes(endTimeSplit[1]);

      if (sessionStorage.getItem("user") == null) {
        console.log("wtf? user not in session storage");
      }
      //get  the user id of the user making the event

      const pl = {
        email: sessionStorage.getItem("user"),
      };

      //contains the userID of the user who created the new event
      const userData = await api.getUserID(pl);
      const userID = userData.data.id;
      const u = await api.getUser(pl);
      //console.log(u.data);
      const user = u.data.user;
      //console.log("data.user?");
      //console.log(u.data.user);

      //creating the list of users
      const userList = [];
      userList.push(userID);

      //go through the user and make sure it is in the work time
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
      //console.clear();
      if (user.workdayStart) {
        let wkdays = user.workdayStart;
        const [hourStart, minuteEnd] = wkdays.split(":");
        let workdayStart = new Date(0, 0, 0, hourStart, minuteEnd);
        //end of workday
        let wkdaye = user.workdayEnd;
        const [hourStart2, minuteEnd2] = wkdaye.split(":");
        let workdayEnd = new Date(0, 0, 0, hourStart2, minuteEnd2);

        if (startEvent.getTime() < workdayStart.getTime()) {
          //starts before the workday, return an alert
          if (!window.confirm(`The event starts before your workday starts.`)) {
            return;
          }
        } else if (startEvent.getTime() > workdayEnd.getTime()) {
          if (!window.confirm(`The event starts after your workday ends.`)) {
            return;
          }
        } else if (endEvent.getTime() > workdayEnd.getTime()) {
          if (!window.confirm(`The event ends after your workday ends.`)) {
            return;
          }
        }
      }
      //creating the list of requested users
      const reqList = selectedOptions;
      if (reqList) {
        for (let i = 0; i < reqList.length; i++) {
          let pload = {
            id: reqList[i],
          };
          let u = await api.getUserWithID(pload);
          let user = u.data.user;
          if (user.workdayStart) {
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
              window.alert(
                `The event starts before ${user.name}'s workday starts. Please change the time!`
              );
              return;
            } else if (startEvent.getTime() > workdayEnd.getTime()) {
              window.alert(
                `The event starts after ${user.name}'s workday ends. Please change the time!`
              );
              return;
            } else if (endEvent.getTime() > workdayEnd.getTime()) {
              window.alert(
                `The event ends after ${user.name}'s workday ends. Please change the time!`
              );
              return;
            }
          }
        }
      }

      //go through the reqLIst and make sure it is in the work time

      //selectedOptions
      // is a list of user objects

      const payload = {
        title: title,
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
        location: location,
        objectId: userID,
        users: userList,
        req_users: selectedOptions,
        note: note,
      };
      console.log("there");

      await api
        .insertEvent(payload)
        .then((res) => {
          window.alert("Event created successfully");
          navigate("../cal");
        })
        .catch((err) => {
          console.log("yo why are you here");
          if (err.response) {
            console.log(err.response.data);
            alert(err.response.data.message);
          }
        });
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Add Event</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="text">Title</label>
        <input
          size="45"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          id="text"
          name="text"
        />
        <label htmlFor="date">Date of Event</label>
        <input
          size="45"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
          placeholder="Date"
          id="date"
          name="date"
        />
        <label htmlFor="time">Start Time of Event</label>
        <input
          size="45"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          type="time"
          placeholder="Start Time"
          id="time"
          name="time"
        />
        <label htmlFor="time">End Time of Event</label>
        <input
          size="45"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          type="time"
          placeholder="End Time"
          id="time"
          name="time"
        />
        {/* <label htmlFor="text">Event Type</label>
        <select className="friendDropdown">                                             
            <option value="virtual">Virtual</option>
            <option value="inperson">In-Person</option>
        </select>  */}
        <label htmlFor="text">Location</label>
        <input
          size="45"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          placeholder="Location"
          id="text"
          name="text"
        />
        {/* <select onChange={(e) => setFriend(e.target.value)}  id="colours">
        <option input type="checkbox" className="dropdown" value="brian">brian</option>
        <option input type="checkbox" className="dropdown" value="sean">sean</option>
        <option input type="checkbox" className="dropdown" value="arnav">arnav</option>
        <option type="checkbox" className="dropdown" value="gargi">gargi</option>
        </select>
        <p>Event is shared with: {friend} </p> */}
        <label htmlFor="text">Share Event</label>

        <Select
          className="friendDropdown"
          defaultValue={[]}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          onChange={(options) => {
            if (Array.isArray(options)) {
              setSelectedOptions(options.map((opt) => opt.value));
            }
          }}
          options={friendList.map((friend) => ({
            value: friend.id,
            label: friend.email,
          }))}
          //options={allOptions}
        />
        {/* // components={{
        //   Option: InputOption
        // }} */}

        {/* <pre>{JSON.stringify({ selected: selectedOptions }, null, 2)}</pre> */}
        <label htmlFor="time">Set notification time prior to event</label>
        <select
          className="notif-dropdown"
          onChange={(e) => setNotifTime(e.target.value)}
          id="colours"
        >
            <option className="dropdown" value="0">
            Don't notify me
          </option>
          <option className="dropdown" value="5">
            5 minutes before event
          </option>
          <option className="dropdown" value="10">
            10 minutes before event
          </option>
          <option className="dropdown" value="15">
            15 minutes before event
          </option>
          <option className="dropdown" selected="selected" value="30">
            30 minutes before event
          </option>
          <option className="dropdown" value="60">
            1 hour before event
          </option>
        </select>
        <label htmlFor="text">Event Notes</label>
        <input
          size="40"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          type="text"
          placeholder="Notes"
          id="text"
          name="text"
        />
        {/* <button type="submit" onClick={() => props.onFormSwitch('calender')}>Submit Changes</button> */}
        <button type="submit" onClick={submit}>
          Create Event
        </button>
      </form>
      {/* <button className="link-btn" onClick={() => props.onFormSwitch('calender')}>Go back to Calender</button> */}
      <Link to="/cal">
        <button size="45" className="reset-btn" type="submit">
          Cancel
        </button>
      </Link>
    </div>
  );
};
