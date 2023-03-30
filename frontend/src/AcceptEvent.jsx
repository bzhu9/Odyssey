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

    // need to clarify friendList fields
    async function getFriends() {
      const payload = { email: sessionStorage.getItem("user")}
      const rawFriendList = await api.getFriends(payload);
      let processedFriendList = []
      console.log(rawFriendList);
      for (let i = 0; i < rawFriendList.data.length; i++) {
        let f = rawFriendList.data[i];
        processedFriendList.push({
          // firstname: f.name,
          // lastname: f.status, // can change later
          // id: f.publicity // can change later, gets console error for unique ids
          name: f.name,
          status: f.status,
          privacy: f.privacy,
          email: f.email
        });
      }
      setFriendList(processedFriendList);
    }

    async function getRecs() {

    }

    async function getFriendRequests() {
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
    }

    async function sendFriendRequest() {
      const email = sessionStorage.getItem("user");
      if (friend.length === 0) {
        alert("Please enter a value!");
        return;
      }
      if (!email) {
        alert("You must be logged in to send a friend request!");
        return;
      }
      const payload = {email: email, friend: friend};
      await api.sendFriendRequest(payload)
      .catch (err => {
        if (err.response) {
            alert(err.response.data);
        }
      });
    }

    async function acceptFriendRequest(friendEmail, friendName) {
      const email = sessionStorage.getItem("user");
      const payload = {email: email, friendEmail: friendEmail};
      await api.acceptFriendRequest(payload);
      await getFriends();
      await getFriendRequests();
      alert(`${friendName} is your new friend!`);
    }

    async function deleteFriendRequest(friendEmail) {
      const email = sessionStorage.getItem("user");
      const payload = {email: email, friendEmail: friendEmail};
      await api.deleteFriendRequest(payload);
      await getFriendRequests();
      alert(`${friendEmail} deleted!`);
    }

    function redirectToProfile(item) {
      navigate("../friendProfile", {state: {email: item.email, name: item.name, status: item.status, privacy: item.privacy}});
    }
    
    // called when loading page
    useEffect (() => {
      let ignore = false;
      if (!ignore) {
        getFriends();
        getFriendRequests();
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