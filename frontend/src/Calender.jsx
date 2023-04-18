import { useState, useEffect, useCallback } from "react";
import React, { Component } from 'react'
import { Link, useNavigate } from "react-router-dom";
import api from "./apis"
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
// import { IconButton } from "rsuite";
// import GearIcon from '@rsuite/icons/Gear';
// import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import { FaPlus, FaCogs } from "react-icons/fa";

// import {IconButton} from '@primer/react'



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
      let friendColor = "#" + Math.floor(Math.random()*16777215*(i + 1)).toString(16)
      for (let j = 0; j < rawEvents.data.length; j++) {
        let e = rawEvents.data[j];
        processedEvents.push({
          id: e._id,
          // title: `${e.title}\n${e.location}\n${e.note}`,
          title: `${friendList.data[i].name}'s event`,
          start: e.startTime,
          end: e.endTime,
          // eventColor: "red",
          backgroundColor: friendColor,
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

  const handleKeyPress = useCallback((event) => {
    console.log(`Key pressed: ${event.key}`);
    if (event.key == 'c') {
      navigate("../addEvent")
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    }
  });

  async function genClass() {
    const user = sessionStorage.getItem("user");
    const payload = { email: user};
    const workday = await api.getWorkday(payload);
    console.log(workday.data)
    if (Object.keys(workday.data).length == 0) {
      alert("Workday is not set!")
      return
    }
    const todayList = []
    let today = new Date()
    for (let i = 0; i < ownEvents.length; i++) {
      let year = Number(ownEvents[i].end.substring(0, 4))
      let month = Number(ownEvents[i].end.substring(5, 7))
      let day = Number(ownEvents[i].end.substring(8,10))
      if ((year == today.getFullYear() && month - 1 == today.getMonth()) && day == today.getDate()) {
        ownEvents[i].month = today.getMonth()
        todayList.push(ownEvents[i])
      }
    }
    todayList.sort(function(a,b) {
      return a.start.localeCompare(b.start)
    })

    let workdayStart = today.setHours(workday.data.workdayStart.split(':')[0])
    workdayStart = today.setMinutes(workday.data.workdayStart.split(':')[1])
    workdayStart = today.setSeconds(0)
    workdayStart = today.setMilliseconds(0)
    let workdayEnd = today.setHours(workday.data.workdayEnd.split(':')[0])
    workdayEnd = today.setMinutes(workday.data.workdayEnd.split(':')[1])
    workdayEnd = today.setSeconds(0)
    workdayEnd = today.setMilliseconds(0)
    const epochList = []
    epochList.push([workdayStart, workdayStart])
    for (let i = 0; i < todayList.length; i++) {
      epochList.push([Date.parse(todayList[i].start), Date.parse(todayList[i].end)])
    }
    epochList.push([workdayEnd, workdayEnd])
    // console.log(epochList)
    for (let i = 0; i <epochList.length; i++) {
      epochList[i] = [epochList[i][0] / 1000, epochList[i][1] / 1000]
    }
    const openClassList = []
    // console.log(epochList)
    for (let i = 1; i < epochList.length; i++) {
      if (i == epochList.length - 1) {
        if (!todayList[i - 2].title.split('\n')[1].match(/[A-z]+ B*[0-9]+/)) {
          continue;
        }
        const payload = {
          startTime: epochList[i - 1][1],
          endTime: epochList[i][0],
          building: todayList[i - 2].title.split('\n')[1].split(' ')[0],
          room: todayList[i - 2].title.split('\n')[1].split(' ')[1]
        }
        if (payload.startTime >= payload.endTime) {
          continue;
        }
        const openClasses = await api.searchOpenClass(payload);
        if (openClasses.data.length == 0) {
          continue;
        }
        // console.log(openClasses.data[0])
        openClasses.data[0].startTime = epochList[i - 1][1]
        openClasses.data[0].endTime = epochList[i][0]
        openClassList.push(openClasses.data[0])
      }
      else {
        if (!todayList[i - 1].title.split('\n')[1].match(/[A-z]+ B*[0-9]+/)) {
          continue;
        }
        const payload = {
          startTime: epochList[i - 1][1],
          endTime: epochList[i][0],
          building: todayList[i - 1].title.split('\n')[1].split(' ')[0],
          room: todayList[i - 1].title.split('\n')[1].split(' ')[1]
        }
        if (payload.startTime >= payload.endTime) {
          continue;
        }
        const openClasses = await api.searchOpenClass(payload);
        // console.log(openClasses)
        if (openClasses.data.length == 0) {
          continue;
        }
        // console.log(openClasses.data[0])
        openClasses.data[0].startTime = epochList[i - 1][1]
        openClasses.data[0].endTime = epochList[i][0]
        openClassList.push(openClasses.data[0])
      }
      // window.location.reload()
    }
    console.log(openClassList)
    if (sessionStorage.getItem("user") == null) {
      alert("User not logged in")
    }
    const pl = {
      email: sessionStorage.getItem("user")
    }
    const userData = await api.getUserID(pl);
    const userID = userData.data.id;
    console.log(userID)
    const userList = [];
    userList.push(userID)
    const payloadList = []
    for (let i = 0; i < openClassList.length; i++) {
      const payload = {
        title: "Open Classroom near " + openClassList[i].building + " " + openClassList[i].room,
        startTime: new Date(openClassList[i].startTime * 1000).toISOString(),
        endTime: new Date(openClassList[i].endTime * 1000).toISOString(),
        location: openClassList[i].building + " " + openClassList[i].room,
        users: userList,
        req_users: [],
        note: ""
      }
      payloadList.push(payload)
    }
    console.log(payloadList)
    for (let i = 0; i < payloadList.length; i++) {
      await api.insertEvent(payloadList[i])
				.then(res => {
					console.log(res)
				}).catch (err => {
					if (err.response) {
						console.log(err.response.data);
					}
				})
        console.log(i)
    }
    console.log(workdayEnd)
    // window.location.reload()
  }


  return (
    <div className="App">
      
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        editable
        initialView="dayGridWeek"
        headerToolbar={{
          right: 'eventReq,classSearch,import,genClass,courses,chat,social',
          center: 'timeGridWeek,dayGridMonth,today,prev,next',
          // center: 'timeGridWeek,dayGridMonth,eventReq,classSearch,import,genClass,courses,friends',
        }}
        footerToolbar={{
      
          end: 'today,prev,next'
        }}
        //took out timeGridDay
        customButtons={{
          eventReq: {
            text: 'event requests',
            // click: () => props.onFormSwitch('addEvent'),
            click: () => navigate("../acceptEvent"),
          },
          edit: {
            text: 'edit event',
            // click: () => props.onFormSwitch('addEvent'),
            click: () => navigate("../addEvent"),
          },
         
          social: {
            text: 'friends',
            // click: () => props.onFormSwitch('addEvent'),
            click: () => navigate("../friends"),
          },
          courses: {
            text: 'courses',
            // click: () => props.onFormSwitch('addEvent'),
            click: () => navigate("../courses"),
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
            // icon={<Menu/>},
            // click: () => props.onFormSwitch('settings'),
            click: () => navigate("../settings"),
          },
          classSearch: {
            text: 'open class',
            // click: () => props.onFormSwitch('class'),
            click: () => navigate("../class"),
          },
          import: {
            text: 'import',
            // click: () => props.onFormSwitch('class'),
            click: () => navigate("../import"),
          },
          genClass: {
            text: 'gen class',
            // click: () => props.onFormSwitch('class'),
            click: () => genClass(),
          },
          chat: {
            text: 'chat',
            // click: () => props.onFormSwitch('class'),
            click: () => navigate("../chat"),
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

          if (e.event.backgroundColor !== "blue") {
            return;
          }
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


        

      />
     
  <Link to="/addEvent">
  <button id = "plus-button"><FaPlus/></button>
  </Link>
  <Link to="/settings">
  <button id = "settings-button"><FaCogs/> </button>
  </Link>
  {/* <div className="dropdown" id = "override">
  <button id = "settings-button"><FaCogs/> </button>
  <div className="dropdown-content">
  <Link to="/settings">
  <button className="dropdown-btn">Settings</button>
  </Link>
  <Link to="/friends">
  <button className="dropdown-btn">Friends</button>
  </Link>
  </div>
  </div> */}
  

      {/* <Link to="/import">
        <button className="importButton">Import</button>
      </Link>   */}
      {/* <button className="genClass" onClick={genClass}>Generate Classes</button> */}
    

 
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
