import { useState, useEffect } from "react";
import React, { Component } from 'react'
import { Link, useNavigate } from "react-router-dom";
import api from "./apis"
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';



// const events = [
//   //add in an events array instead of this constant here
//   {
//     id: 1,
//     title: 'CS 307 Lecture\nHAAS G040\nnotes',
//     start: '2023-02-22T10:00:00',
//     end: '2023-02-22T12:00:00',
//     eventColor: "blue",
//     editable:true,
//   },
//   {
//     id: 2,
//     title: 'CS 307 Lecture\nSmith 108 ',
//     start: '2023-02-23T13:00:00',
//     end: '2023-02-23T18:00:00',
//     eventColor: "red",
//     editable:true,



//   },
// ];




function FullCalendarApp(props) {
  const [events, setEvents] = useState('');
  const navigate = useNavigate();
  // get events from DB

  async function getData() {
    const rawEvents = await api.getAllEvents();

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
    // console.log(processedEvents);
    setEvents(processedEvents);
    // console.log(events);
  }

  useEffect (() => {
    let ignore = false;
    if (!ignore) {
      getData()
      // console.log("hey");
    }
    return () => {ignore = true;}
  }, []);

  return (
    <div className="App">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        editable
        initialView="dayGridWeek"
        headerToolbar={{
          center: 'timeGridWeek,dayGridMonth,timeGridDay,new,settings,classSearch',
        }}
        customButtons={{
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
        <button className="link-btn">Go back to login screen</button>
      </Link>
      <br></br>
    </div>
    
  );
}



export default FullCalendarApp;
