import { useState, useEffect } from "react";
import React, { Component } from 'react'
import { Link, useNavigate } from "react-router-dom";
import api from "./apis"
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';


const checkList = ["friend1", "friend2", "friend3", "friend4", "friend5", "friend6", "friend7",];

function FullCalendarApp(props) {
  const [ownEvents, setOwnEvents] = useState('')
  const [events, setEvents] = useState('');
  const [friendEvents, setFriendEvents] = useState({});
  const [checked, setChecked] = useState([]);
  const [friendList, setFriendList] = useState({});
  const navigate = useNavigate();
  // get events from DB

  async function getData() {
    // const rawEvents = await api.getAllEvents();
    const userEmail = sessionStorage.getItem("user");
    if (!userEmail) {
      return;
    }
    console.log("hello there");
    const rawEvents = await api.getUsersEvents({userEmail: userEmail});

    // https://fullcalendar.io/docs/event-object
    let processedEvents = []
    for (let i = 0; i < rawEvents.data.length; i++) {
      let e = rawEvents.data[i]
      processedEvents.push({
        id: e._id,
        title: `${e.title}\n${e.location}\n${e.note}`,
        start: e.startTime,
        end: e.endTime,
        // eventColor: "red",
        backgroundColor: e.location.toLowerCase() === "virtual" ? "green" : "blue",
        editable: true
      })
    }
    setOwnEvents(processedEvents);
  }

  async function getFriendsEvents() {
    const user = sessionStorage.getItem("user");
    const payload = { email: user};
    const friendList = await api.getFriends(payload);

    let friendEventDict = {};
    let friends = {};
    for (let i = 0; i < friendList.data.length; i++) {
      let rawEvents = await api.getUsersEvents({ userEmail: friendList.data[i].email });
      let processedEvents = []
      for (let i = 0; i < rawEvents.data.length; i++) {
        let e = rawEvents.data[i]
        processedEvents.push({
          id: e._id,
          title: `${e.title}\n${e.location}\n${e.note}`,
          start: e.startTime,
          end: e.endTime,
          // eventColor: "red",
          backgroundColor: "#" + Math.floor(Math.random()*16777215*(i + 1)).toString(16),
          editable: true
        })
      }
      friends[friendList.data[i].name] = friendList.data[i].email;
      friendEventDict[friendList.data[i].email] = processedEvents;
    }

    setFriendList(friends);
    setFriendEvents(friendEventDict);
  }

  async function getEvents() {
    let events = ownEvents;
    for (let i = 0; i < checked.length; i++) {
      events = events.concat(friendEvents[checked[i]]);
    }
    setEvents(events);
  }

  // Add/Remove checked item from list
  const handleCheck = async (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
    await getEvents();
  };

  useEffect (() => {
    let ignore = false;
    if (!ignore) {
      // refresh();
      getData();
      getFriendsEvents();
      // console.log("hey");
    }
    return () => {ignore = true;}
  }, []);
  useEffect (() => {
    getEvents();
  }, [ownEvents, friendEvents, checked]);


  return (
    <div className="App">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        editable
        initialView="dayGridWeek"
        headerToolbar={{
          center: 'timeGridWeek,dayGridMonth,new,eventReq,settings,classSearch',
        }}
        //took out timeGridDay
        customButtons={{
          eventReq: {
            text: 'event req',
            // click: () => props.onFormSwitch('addEvent'),
            click: () => navigate("../acceptEvent"),
          },
          edit: {
            text: 'edit event',
            // click: () => props.onFormSwitch('addEvent'),
            click: () => navigate("../addEvent"),
          },
          new: {
            text: 'add event',
            // click: () => props.onFormSwitch('addEvent'),
            click: () => navigate("../addEvent"),
          },
          map: {
            text: 'map view',
            // click: () => props.onFormSwitch('map'),
            click: () => navigate("../map"),
          },
          settings: {
            text: 'settings',
            // click: () => props.onFormSwitch('settings'),
            click: () => navigate("../settings"),
          },
          classSearch: {
            text: 'search',
            // click: () => props.onFormSwitch('class'),
            click: () => navigate("../class"),
          },
        }}
        events={events}
        eventDurationEditable
        nowIndicator
        // dateClick={(e) => console.log(e.dateStr)}
        dateClick={(e) => console.log(events)}
        // eventClick= {
        //   props.onFormSwitch('calender')
        // }
        // eventClick={(e) => console.log(e.event.id)}
        // eventClick={(e) => props.onFormSwitch('change event')}
        //eventClick={(e) => navigate("../changeEvent")}
        eventClick={(e) => {
          //console.log(e.title);
          //console.log(e.event.id);
          localStorage.setItem('eventID', e.event.id);
          //localStorage.setItem('eventTitle', e.event.eventTitle);
          navigate({
          pathname: "../changeEvent",
          /*
          state: {
            eventID: e.event.id,
            eventTitle: e.event.title
          }
          */
         
        })}
      }


        

        // eventClick={props.onFormSwitch('addEvent')}
      />
      {/* <button type="button" onClick={() => props.onFormSwitch('login')}>Go back to login</button> */}
      <Link to="/login">
        <button>Go back to login screen</button>
      </Link>
      <Link to="/import">
        <button className="importButton">Import</button>
      </Link>     
       <div className="viewSchedule">
    <h4 className="friendCheckboxTitle">View Friend(s) schedule:</h4>
    <div className="friendCheckbox">
    {/* {checkList.map((item, index) => ( */}
    {/* { friendList.map (() => (
   <li key={index}>
     <input value={item} type="checkbox" onChange={handleCheck}/>
     <span>{item}</span>
   </li>
))} */}
    {
      Object.keys(friendList).map( (key) => (
        <li key={friendList[key]}>
          <input value={friendList[key]} type="checkbox" onChange={handleCheck}/>
          <span>{key}</span>
        </li>
      ))
    }

    </div>
  </div>
      <br></br>
    </div>
    
  );
}



export default FullCalendarApp;
