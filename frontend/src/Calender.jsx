import { useState } from "react";
import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';



const events = [
  //add in an events array instead of this constant here
  {
    id: 1,
    title: 'CS 307 Lecture\nHAAS G040',
    start: '2023-02-22T10:00:00',
    end: '2023-02-22T12:00:00',
    eventColor: "blue",
    editable:true,
  },
  {
    id: 2,
    title: 'CS 307 Lecture\nSmith 108 ',
    start: '2023-02-23T13:00:00',
    end: '2023-02-23T18:00:00',
    eventColor: "red",
    editable:true,



  },
];




function FullCalendarApp(props) {
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
            click: () => props.onFormSwitch('addEvent'),
          },
          new: {
            text: 'add event',
            click: () => props.onFormSwitch('addEvent'),
          },
          map: {
            text: 'map view',
            click: () => props.onFormSwitch('map'),
          },
          settings: {
            text: 'settings',
            click: () => props.onFormSwitch('settings'),
          },
          classSearch: {
            text: 'search',
            click: () => props.onFormSwitch('class'),
          },
        }}
        events={events}
        eventDurationEditable
        nowIndicator
        dateClick={(e) => console.log(e.dateStr)}
        // eventClick= {
        //   props.onFormSwitch('calender')
        // }
        eventClick={(e) => console.log(e.event.id)}

        // eventClick={props.onFormSwitch('addEvent')}
      />
      <button type="button" onClick={() => props.onFormSwitch('login')}>Go back to login</button>
      <br></br>
    </div>
    
  );
}



export default FullCalendarApp;
