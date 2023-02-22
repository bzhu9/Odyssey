import { useState } from "react";
import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

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
      />
      <button type="button" onClick={() => props.onFormSwitch('login')}>Go back to login</button>
      <br></br>
    </div>
    
  );
}


export default FullCalendarApp;
