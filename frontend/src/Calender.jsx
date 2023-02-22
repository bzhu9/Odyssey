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
            text: 'Add Event',
            click: () => console.log('new event'),
          },
          map: {
            text: 'Map View',
            click: () => console.log('map view'),
          },
          settings: {
            text: 'Settings',
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
