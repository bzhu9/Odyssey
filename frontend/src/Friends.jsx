import React, { useState, useEffect } from "react";
import api from "./apis"
import { Link, useNavigate } from "react-router-dom";

const friendList = [
    {
      id: '1232',
      firstname: 'Daniel M',
      lastname: 'not online right now',
    },
    {
      id: 'available',
      firstname: 'Olga R',
      lastname: '2342',
      //can make last name a unique number for identifying like in discord
      //can make id their status
    
    },
    {
        id: 'not online',
        firstname: 'Olga R',
        lastname: '5453',
      },
      {
        id: 'b',
        firstname: 'Olga R',
        lastname: 'Gibson',
      },
      {
        id: 'b',
        firstname: 'Olga R',
        lastname: 'Gibson',
      },
      {
        id: 'b',
        firstname: 'Olga R',
        lastname: 'Gibson',
      },
      {
        id: 'b',
        firstname: 'Olga R',
        lastname: 'Gibson',
      },
      {
        id: 'b',
        firstname: 'Olga R',
        lastname: 'Gibson',
      },
      {
        id: 'b',
        firstname: 'Olga R',
        lastname: 'Gibson',
      },
    
  ];

  const reqList = [
    {
      id: '1',
      firstname: 'Daniel',
      lastname: 'McConnell',
    },
    {
      id: 'b',
      firstname: 'Olga R',
      lastname: 'Gibson',
    },
    {
        id: 'b',
        firstname: 'Olga R',
        lastname: 'Gibson',
      },
      {
        id: 'b',
        firstname: 'Olga R',
        lastname: 'Gibson',
      },
      {
        id: 'b',
        firstname: 'Olga R',
        lastname: 'Gibson',
      },
    
  ];

export const Friends = (props) => {
    // const [email, setEmail] = useState('');
    // const [emailNew, setEmailNew] = useState('');
    // const [emailNew2, setEmailNew2] = useState('');
    // const [pass, setPass] = useState('');
    // const [seq, setSeq] = useState('');
    const navigate = useNavigate();
    const [friend, setFriend] = useState('');
    const [friendList, setFriendList] = useState([]);
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
          firstname: f.name,
          lastname: f.status, // can change later
          id: f.publicity // can change later, gets console error for unique ids
        });
      }
      setFriendList(processedFriendList);
    }

    async function getRecs() {

    }

    async function sendFriendRequest() {
      const email = sessionStorage.getItem("user");
      if (!email) {
        alert("You must be logged in to send a friend request!");
        return;
      }
      const payload = {email: email, friend: friend};
      console.log(`This is the friend ${friend}`);
      await api.sendFriendRequest(payload);
      // alert("request sent!");
    }
    
    // called when loading page
    useEffect (() => {
      let ignore = false;
      if (!ignore) {
        getFriends();
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
            <h4 className="friendsTitle">Current Friends</h4>
            <ul className="friendsList">
            {friendList.map(item => {
            const ref = React.createRef();
            return (
                <li key={item.id} ref={ref} >
                <div>{item.firstname} {item.lastname} {item.id}</div>
                </li>
                );
             })}
         </ul>
         <h4 className="recTitle"> Friend Reccs</h4>
            <ul className="recList">
            {recList.map(item => {
            const ref = React.createRef();
            return (
                <li key={item.id} ref={ref} >
                <div>{item.firstname} {item.lastname} {item.id}</div>
                </li>
                );
             })}
         </ul>
         <div className="auth-form-container" id="addFriend" >
            {/* <h3>Add Friend</h3> */}
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="text">Enter user's name to add as friend</label>
                <input size="45" value={friend} onChange={(e) => setFriend(e.target.value)} type="text" placeholder="Mary Ann" />
                 <button type="submit" onClick={sendFriendRequest} >Submit</button> 

            </form>

            {/* <ul>
                {openClassrooms.map((item) => (
                    <li>{item.name}</li>
                ))}
            </ul> */}


            {/* <button type="submit" onClick={() => props.onFormSwitch('calender')}>Weekly View</button> */}
          

        </div>
        <p id="friendReqTitle"> Friend Requests </p>
        <div id="friendReq" >
        <ul>
            {reqList.map(item => {
            const ref = React.createRef();
            return (
                <li key={item.id} ref={ref} >
                <div>{item.firstname} {item.lastname} {item.id}</div>
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