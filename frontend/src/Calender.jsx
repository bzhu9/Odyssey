import { useState } from "react";
import React from "react";
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
  },
  {
    id: 2,
    title: 'CS 307 Lecture\nSmith 108 ',
    start: '2023-02-23T13:00:00',
    end: '2023-02-23T18:00:00',
    eventColor: "red",


  },
];

function FullCalendarApp(props) {
  return (
    <div className="App">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridWeek"
        headerToolbar={{
          center: 'timeGridWeek,dayGridMonth,timeGridDay,new,map,settings',
        }}
        customButtons={{
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
        }}
        events={events}
        nowIndicator
        dateClick={(e) => console.log(e.dateStr)}
        eventClick={(e) => console.log(e.event.id)}
      />
      <button type="button" onClick={() => props.onFormSwitch('login')}>Go back to login</button>
      <br></br>
    </div>
    
  );
}


export default FullCalendarApp;
