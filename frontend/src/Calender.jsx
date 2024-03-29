import { useState, useEffect, useCallback, useRef } from "react";
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
import { FaPlus, FaCogs, FaComments, FaBook, FaUserFriends, FaRegBookmark, FaSquare} from "react-icons/fa";

// import {IconButton} from '@primer/react'



const checkList = ["friend1", "friend2", "friend3", "friend4", "friend5", "friend6", "friend7",];

function FullCalendarApp(props) {
  const [ownEvents, setOwnEvents] = useState('')
  const [events, setEvents] = useState('');
  const [friendEvents, setFriendEvents] = useState({});
  const [checked, setChecked] = useState([]);
  const [friendList, setFriendList] = useState({});
  const [calRef, setCalRef] = useState();
  const [eventAlerts, setEventAlerts] = useState({});
  const navigate = useNavigate();
  const dataFetchedRef = useRef(false);


  async function triggerEventNotification(eventId) {
    alert(`${eventId} is starting soon.`)
  }
  const addTimeout = (eventId, delay) => {
    const timeoutId = setTimeout(() => {
      // window.alert('Alert!');
      triggerEventNotification(eventId);
      removeTimeout(timeoutId);
    }, delay);
    const ea = eventAlerts;
    ea[eventId] = timeoutId;
    setEventAlerts(ea);
  };

  const removeTimeout = (eventId) => {
    clearTimeout(eventAlerts[eventId]);
    const updatedAlerts = eventAlerts;
    delete updatedAlerts[eventId]
    setEventAlerts(updatedAlerts);
  };

  // get events from DB

  async function getData() {
    // const rawEvents = await api.getAllEvents();
    const userEmail = sessionStorage.getItem("user");
    if (!userEmail) {
      return;
    }
    console.log("hello there");
    const rawEvents = await api.getUsersEvents({userEmail: userEmail});

    const now = new Date();

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

      // check time and add alerts
      // console.log (e.startTime);
      // console.log(new Date(e.startTime));
      if (e.alertTime !== 0) {
        let d = new Date(e.startTime)
        d.setMinutes(d.getMinutes() - e.alertTime);
        if (d > now && !dataFetchedRef.current) {
          const timeRemaining = d - now.getTime();
          // console.log(`${timeRemaining} time remaining`);
          // addTimeout(e._id, timeRemaining);
        }
        // if (alertTime < now) {
          // alertTime.setDate(alertTime.getDate() + 1); // if alert time is in the past, add 1 day to set it for tomorrow
        // }
    
        // const timeRemaining = alertTime.getTime() - now.getTime();
        // addTimeout(e._id, timeRemaining);
      }
    }
    dataFetchedRef.current = true;
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
      setCalRef(React.createRef());
      // console.log("hey");
    }
    return () => {ignore = true;}
  }, []);
  useEffect (() => {
    getEvents();
  }, [ownEvents, friendEvents, checked]);

  useEffect (() => {
    return () => {
      Object.keys(eventAlerts).forEach(key => clearTimeout(eventAlerts[key]));
    };
  }, [eventAlerts]);

  const handleKeyPress = useCallback((event) => {
    // console.log(`Key pressed: ${event.key}`);
    if (event.key == 'c') {
      navigate("../addEvent")
    }
    // if (event.key == 'j') {
    //   let calendarApi = calendarRef.current.getApi()
    //   calendarApi.next()
    // }
    // if (event.key == 'k') {
    //   let calendarApi = calendarRef.current.getApi()
    //   calendarApi.prev()
    // }
  }, []);
  const handleNavigatePress = useCallback((event) => {
    // console.log(`Key pressed: ${event.key}`);

    if (event.key == 'j') {
      let calendarApi = calRef.current.getApi()
      calendarApi.next()
    }
    if (event.key == 'k') {
      let calendarApi = calRef.current.getApi()
      calendarApi.prev()
    }
  }, [calRef]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keydown', handleNavigatePress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keydown', handleNavigatePress);
    }
  });

  async function genClass() {
    // get user workday
    let userEmail = sessionStorage.getItem("user")
    if (userEmail == null) {
      alert("User not logged in")
    }
    const payload = { email: userEmail};
    const workday = await api.getWorkday(payload);
    if (Object.keys(workday.data).length == 0) {
      alert("Workday is not set!")
      return
    }

    const mealTime = await api.getMealTime(payload)

    // get today's events
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

    // convert workdays to to epoch
    let workdayStart = today.setHours(workday.data.workdayStart.split(':')[0])
    workdayStart = today.setMinutes(workday.data.workdayStart.split(':')[1])
    workdayStart = today.setSeconds(0)
    workdayStart = today.setMilliseconds(0)
    let workdayEnd = today.setHours(workday.data.workdayEnd.split(':')[0])
    workdayEnd = today.setMinutes(workday.data.workdayEnd.split(':')[1])
    workdayEnd = today.setSeconds(0)
    workdayEnd = today.setMilliseconds(0)

    let mealTimeStart = today.setHours(mealTime.data.mealTimeStart.split(':')[0])
    mealTimeStart = today.setMinutes(mealTime.data.mealTimeStart.split(':')[1])
    mealTimeStart = today.setSeconds(0)
    mealTimeStart = today.setMilliseconds(0)
    let mealTimeEnd = today.setHours(mealTime.data.mealTimeEnd.split(':')[0])
    mealTimeEnd = today.setMinutes(mealTime.data.mealTimeEnd.split(':')[1])
    mealTimeEnd = today.setSeconds(0)
    mealTimeEnd = today.setMilliseconds(0)

    // push workdays and events to epochlist (epoch list contains starttime and endtime)
    // js uses millisecond epochs so i convert them to seconds
    const epochList = []
    epochList.push([workdayStart/1000, workdayStart/1000])
    epochList.push([workdayEnd/1000, workdayEnd/1000])
    epochList.push([mealTimeStart/1000, mealTimeEnd/1000])
    for (let i = 0; i < todayList.length; i++) {
      epochList.push([Date.parse(todayList[i].start)/1000, Date.parse(todayList[i].end)/1000])
    }

    epochList.sort(function(a,b) {
      if (a < b) {
        return -1
      }
      else if (a > b) {
        return 1
      }
      return 0
    })

    // find list of gaps
    console.log(epochList)
    const openClassList = []
    let tempBuilding = "WALC"
    let tempRoom = "1018"
    for (let i = 1; i < epochList.length; i++) {
      if (i - 1< todayList.length && todayList[i-1].hasOwnProperty('title') && todayList[i - 1].title.split('\n')[1].match(/[A-z]+ B*[0-9]+/)) {
        tempBuilding = todayList[i - 1].title.split('\n')[1].split(' ')[0]
        tempRoom = todayList[i - 1].title.split('\n')[1].split(' ')[1]
      }
      else if (i < todayList.length && todayList[i].hasOwnProperty('title') && todayList[i].title.split('\n')[1].match(/[A-z]+ B*[0-9]+/)) {
        tempBuilding = todayList[i].title.split('\n')[1].split(' ')[0]
        tempRoom = todayList[i].title.split('\n')[1].split(' ')[1]
      }
      const payload = {
        startTime: epochList[i - 1][1],
        endTime: epochList[i][0],
        building: tempBuilding,
        room: tempRoom
      }
      if (payload.startTime >= payload.endTime) {
        continue;
      }
      const openClasses = await api.searchOpenClass(payload);
      if (openClasses.data.length == 0) {
        const midEpoch = (todayList[i - 1][1] + todayList[i][0])/2
        if (todayList[i][0] - midEpoch > 1800) {
          console.log("go back one")
          epochList.splice(i, 0, [midEpoch, midEpoch])
          i -= 1
        }
        continue;
      }
      openClasses.data[0].startTime = epochList[i - 1][1]
      openClasses.data[0].endTime = epochList[i][0]
      openClassList.push(openClasses.data[0])
    }
    console.log(openClassList)
    const pl = {
      email: userEmail
    }
    const userData = await api.getUserID(pl);
    const userID = userData.data.id;
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
        note: "",
        alert: 0
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
    }
    window.location.reload()
  }


  return (
    <div className="App">
      
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        editable
        ref={calRef}
        initialView="dayGridWeek"
        headerToolbar={{
          // right: 'eventReq,classSearch,import,genClass',
          // center: 'timeGridWeek,dayGridMonth,today,prev,next',
          center: 'timeGridWeek,dayGridMonth,eventReq,classSearch,import,genClass',
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
  <button id = "homepage-icon-button" style={{
                      fontSize: "20px",
                      position: "absolute",
                      marginTop: "-380px",
                      background: "#CEB888",
                      color: "black",
                      borderRadius: "100px",
                      marginLeft: "10px"
                    }}><FaPlus/></button>
  </Link>
  {/* <button id = "homepage-icon-button" style={{
                      position: "absolute",
                      color: "#8d1919",
                      fontSize: "120px",
                      borderWidth: "2px",
                      marginTop: "-600px",
                      marginLeft: "1150px",
                      transform: " scaleX(1.1) scaleY(3.5)",
                      // opacity:"0.8",

                     




                    }}><FaSquare/> </button> */}
  <Link to="/settings">
  <button id = "homepage-icon-button" style={{
                      position: "absolute",
                      marginTop: "-380px",
                      marginLeft: "170px"

                    }}><FaCogs/> </button>
  </Link>

  <Link to="/chat">
  <button id = "homepage-icon-button" style={{
                      position: "absolute",
                      marginTop: "-330px",
                      marginLeft: "170px",
                  

                    }}><FaComments/> </button>
  </Link>
  <Link to="/courses">
  <button id = "homepage-icon-button" style={{
                      position: "absolute",
                      marginTop: "-270px",
                      marginLeft: "170px"

                    }}><FaBook/> </button>
  </Link>
  <Link to="/friends">
  <button id = "homepage-icon-button" style={{
                      position: "absolute",
                      marginTop: "-210px",
                      marginLeft: "170px"

                    }}><FaUserFriends/> </button>
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
