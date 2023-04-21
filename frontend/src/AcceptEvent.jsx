import React, { useState, useEffect } from "react";
import api from "./apis"
import {FaCheck, FaTimes} from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';

export const AcceptEvent = (props) => {
    const navigate = useNavigate();
    const [friend, setFriend] = useState('');
    const [friendList, setFriendList] = useState([]);
    const [reqList, setReqList] = useState([]);
    const [recList, setRecList] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
    }


    async function getEventRequests() {
      const payload = { email: sessionStorage.getItem("user")};
      const rawEventList = await api.getEventRequests(payload);
      console.log(rawEventList.data);
      setReqList(rawEventList.data);
      /*
      const payload = { email: sessionStorage.getItem("user")}
      const rawFriendRequestList = await api.getFriendRequests(payload);
      console.log(rawFriendRequestList);
      let processedFriendRequestList = []
      for (let i = 0; i < rawFriendRequestList.data.length; i++) {
        let f = rawFriendRequestList.data[i];
        processedFriendRequestList.push({
          // firstname: f.name,
          // lastname: f.status, // can change later
          // id: f.privacy // can change later, gets console error for unique ids
          name: f.name,
          status: f.status,
          privacy: f.privacy,
          email: f.email
        });
      }
      setReqList(processedFriendRequestList);
      */
    }

    async function acceptEvent(id, name) {
      //get the event ID
      const payload = { 
        email: sessionStorage.getItem("user"),
        id: id
      };
      await api.acceptEventRequest(payload);
      await getEventRequests();
      window.alert(`${name} has been accepted`);
      //remove it from req List
      //add it to event list


    }

    async function deleteEvent(id, title) {
      //get the event ID
      //remove it from req List
      const payload = {
        email: sessionStorage.getItem("user"),
        id: id
      };
      await api.deleteEventRequest(payload);
      await getEventRequests();
      window.alert(`${title} has been deleted`);
    }

    /*
    function redirectToProfile(item) {
      navigate("../friendProfile", {state: {email: item.email, name: item.name, status: item.status, privacy: item.privacy}});
    }
    */
    
    // called when loading page
    useEffect (() => {
      let ignore = false;
      if (!ignore) {
        getEventRequests();
      }
      return () => {ignore = true;}
    }, []);

    return (
        <div>
            
       
       
        {/* Event REQUESTS ----------------------------------------------*/}
        <h2 >Event Requests</h2>
        <div id="eventReq" >
        <ul>
            {reqList.map(item => {
            const ref = React.createRef();
            return (<li key={item.id} ref={ref} >
              <div>{item.title}</div>
              <div> {item.day} </div>
              <div> {item.startTime} {item.endTime} </div>
              <div>
              &nbsp;
                <button type="submit" onClick={() => acceptEvent(item.id, item.title)}><FaCheck color="green"/> </button>
                <button type="submit" onClick={() => deleteEvent(item.id, item.title)}><FaTimes color="red"/> </button>
                </div>
                </li>
                );
             })}
         </ul>        

        </div>
         
        {/* <Link to="/cal">
            <button size="45" className="reset-btn" type="submit">Weekly View</button>
        </Link> */}
        {/* <Link to="/cal">
            <button size="45" className="reset-btn" type="submit">Add Friend</button>
        </Link> */}
          <Link to='/cal' >
			
      <button  style={{
                fontSize: "40px",
                color:"#CEB888",
                background: "none",
                position: "absolute",
                marginLeft: "-600px",
                marginTop: "-400px",
    
                        }}><FaArrowLeft/> </button>
            </Link>

 
    </div>
    )
}