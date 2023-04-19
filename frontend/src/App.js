import logo from './logo.svg';
import React from 'react';
import { BrowserRouter, Routes, Route } from  "react-router-dom";
import {useState, useEffect} from 'react'
import './App.css';
import { Login } from "./Login";
import { Register } from "./Register";
import { Reset } from './Reset';
import { Settings } from './Settings';
import {Map } from './Map';
import { CreateEvent } from './CreateEvent';
import { OpenClass } from './OpenClass';
// import FullCalendarApp, { Calender } from "./Calender";
import FullCalendarApp from "./Calender";
import { ChangeEvent } from './ChangeEvent';
import Layout from './Layout';
import { ChangeEmail } from './ChangeEmail';
import { Friends } from './Friends';
import { ChangePrivacy } from './ChangePrivacy'
import ChangeStatus from './ChangeStatus';
import { ChangeMealTime } from './ChangeMealTime';
import { ChangeWorkday } from './ChangeWorkday';
import { FriendProfile } from './FriendProfile';
import FileUploadPage from './Import';
import { AcceptEvent } from './AcceptEvent';
import {AddCourse} from './AddCourse';
import {Courses} from "./Courses"
import { AddReview } from './AddReview';
import { ChangeReview } from './ChangeReview';
import { AddNote } from './AddNote';
import { ChangeNote } from './ChangeNote';
import { Chat } from "./Chat"
import {Search}  from './Search';
import {SearchReview}  from './SearchReview';
import  Sidebar  from './Sidebar';
import Settings2 from './Settings2'
import {ChangePassword} from './ChangePassword'

import api from "./apis"
function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  useEffect(() => {
    const handleTabClose = event => {
      event.preventDefault();

      console.log('beforeunload event triggered');

      if (sessionStorage.getItem("user")) {
        api.setStatus({email: sessionStorage.getItem("user"), status: "Offline"});
        // return (event.returnValue ='Are you sure you want to exit?');
      }
      // print()
    };
    if (sessionStorage.getItem("user")) {
      api.setStatus({email : sessionStorage.getItem("user"), status: "Online"});
    }

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);

  return (
    // <div className="App">
    //   {
    //     currentForm === "login" ? <Login onFormSwitch={toggleForm} /> 
    //     : currentForm === "register"  ? <Register onFormSwitch={toggleForm} />
    //     : currentForm === "calender"  ? <FullCalendarApp onFormSwitch={toggleForm} />
    //     : currentForm === "settings"  ? <Settings onFormSwitch={toggleForm} />
    //     : currentForm === "map"  ? <Map onFormSwitch={toggleForm} />
    //     : currentForm === "addEvent"  ? <CreateEvent onFormSwitch={toggleForm} />
    //     : currentForm === "class" ? <OpenClass onFormSwitch={toggleForm} />
    //     : currentForm === "change event" ? <ChangeEvent onFormSwitch={toggleForm} />
    //     : <Reset onFormSwitch={toggleForm} /> 
        
    //   }
      
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {/* <Route path="login" element={<FullCalendarApp />} /> */}
          <Route path="cal" element={<FullCalendarApp />} />
          <Route path="changeEmail" element={<ChangeEmail />} />
          <Route path="friends" element={<Friends />} />
          <Route path="settings" element={<Settings />} />
          <Route path="map" element={<Map />} />
          <Route path="addEvent" element={<CreateEvent />} />
          <Route path="class" element={<OpenClass />} />
          <Route path="changeEvent" element={<ChangeEvent />} />
          <Route path ="reset" element={<Reset />}/>
          <Route path ="changePrivacy" element={<ChangePrivacy />}/>
          <Route path ="changeStatus" element={<ChangeStatus />}/>
          <Route path ="changeWorkday" element={<ChangeWorkday />}/>
          <Route path ="friendProfile" element={<FriendProfile />}/>
          <Route path ="import" element={<FileUploadPage />}/>
          <Route path ="acceptEvent" element={<AcceptEvent />}/>
          <Route path ="addCourse" element={<AddCourse />}/>
          <Route path ="changeMealTime" element={<ChangeMealTime />}/>
          <Route path ="courses" element={<Courses />}/>
          <Route path ="addReview" element={<AddReview />}/>
          <Route path ="changeReview" element={<ChangeReview />}/>
          <Route path ="addNote" element={<AddNote />}/>
          <Route path ="changeNote" element={<ChangeNote />}/>
          <Route path ="search" element={<Search />}/>
          <Route path ="searchReview" element={<SearchReview />}/>
          <Route path ="chat" element={<Chat />}/>
          <Route path ="sidebar" element={<Sidebar />}/>
          <Route path ="settings2" element={<Settings2 />}/>
          <Route path ="changePassword" element={<ChangePassword />}/>








          





        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

