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
    title: 'CS 307 Lecture',
    start: '2023-02-22T10:00:00',
    end: '2023-02-22T12:00:00',
  },
  {
    id: 2,
    title: 'CS 307 Meeting',
    start: '2023-02-23T13:00:00',
    end: '2023-02-23T18:00:00',

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
            click: () => console.log('new event'),
          },
          map: {
            text: 'map view',
            click: () => console.log('map view'),
          },
          settings: {
            text: 'settings',
            click: () => console.log('settings'),
          },
        }}
        events={events}
        eventColor="red"
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
