import React, { useState, useEffect } from "react";
import api from "./apis"
import {FaCheck, FaTimes} from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom";

export const Friends = (props) => {
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

    async function searchProfile() {
      if (friend.length === 0) {
        alert("Please enter a value!");
        return;
      }
      const item = await api.getUser({email: friend})
        .catch(err => {
          if (err.response) {
              alert("User not found!");
          }
          return;
        });
      if  (item?.data.user) {
        redirectToProfile(item.data.user);
      }
      
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
            
       <Link to="/settings">
            <button size="45" className="settingsNav-btn" >Profile</button>
        </Link>
        <Link to="/friends">
            <button size="45" className="friendNav-btn" >Friends</button>
        </Link>
        <div >
            <h2 >Friends Settings</h2>
            {/* FRIEND LIST ----------------------------------------------*/}
            <h4 className="friendsTitle">Current Friends</h4>
            <ul className="friendsList">
            {friendList.map(item => {
            const ref = React.createRef();
            return (
                <li key={item.id} ref={ref} >
                  {/* <button onClick={() => navigate("../friendProfile", {state: {email: item.email, name: item.name, status: item.status, privacy: item.privacy}})}> */}
                  <button onClick={() => redirectToProfile(item)}>
                    {item.name} {item.status} {item.privacy}
                    </button>
                {/* <div>{item.firstname} {item.lastname} {item.id}</div> */}
                </li>
                );
             })}
         </ul>
         {/* FRIEND RECCOMENDATIONS ----------------------------------------------*/}
         <h4 className="recTitle"> Friend Reccs</h4>
            <ul className="recList">
            {recList.map(item => {
            const ref = React.createRef();
            return (
                <li key={item.id} ref={ref} >
                <a href="localhost:3500/login">{item.name} {item.status} {item.privacy}</a>
                </li>
                );
             })}
         </ul>
         {/* SEARCH USER PROFILE ----------------------------------------------------*/}
         <div className="auth-form-container" id="addFriend" >
            {/* <h3>Add Friend</h3> */}
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="text">Search for a user with their email</label>
                <input size="45" value={friend} onChange={(e) => setFriend(e.target.value)} type="text" placeholder="maryann@gmail.com" />
                {/* <button onClick={sendFriendRequest}>Submit</button>  */}
                <button onClick={() => searchProfile()}>Search</button> 


            </form>

            {/* <ul>
                {openClassrooms.map((item) => (
                    <li>{item.name}</li>
                ))}
            </ul> */}


            {/* <button type="submit" onClick={() => props.onFormSwitch('calender')}>Weekly View</button> */}
          

        </div>
        {/* FRIEND REQUESTS ----------------------------------------------*/}
        <p id="friendReqTitle"> Friend Requests </p>
        <div id="friendReq" >
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
    </div>
    )
}