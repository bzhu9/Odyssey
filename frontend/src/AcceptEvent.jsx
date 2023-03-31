import React, { useState, useEffect } from "react";
import api from "./apis"
import {FaCheck, FaTimes} from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom";

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
      console.log(rawEventList);
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

    async function acceptEvent() {
      //get the event ID
      //remove it from req List
      //add it to event list


    }

    async function deleteEvent() {
      //get the event ID
      //remove it from req List
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
        getFriends();
        getEventRequests();
      }
      return () => {ignore = true;}
    }, []);

    return (
        <div>
            
       
       
        {/* FRIEND REQUESTS ----------------------------------------------*/}
        <h2 >Event Requests</h2>
        <div id="eventReq" >
        <ul>
            {reqList.map(item => {
            const ref = React.createRef();
            return (
                <li key={item.id} ref={ref} >
                <div>{item.name} {item.status} {item.privacy}
                &nbsp;
                <button type="submit" onClick={() => acceptFriendRequest(item.email, item.name)}><FaCheck color="green"/> </button>
                <button type="submit" onClick={() => deleteFriendRequest(item.email)}><FaTimes color="red"/> </button>
                </div>
                </li>
                );
             })}
         </ul>        

        </div>
         
        <Link to="/cal">
            <button size="45" className="reset-btn" type="submit">Weekly View</button>
        </Link>
        {/* <Link to="/cal">
            <button size="45" className="reset-btn" type="submit">Add Friend</button>
        </Link> */}

 
    </div>
    )
}