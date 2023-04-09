import React, { useState, useEffect } from "react";
import api from "./apis"
import {FaCheck, FaTimes} from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom";

export const Reviews = (props) => {
    const navigate = useNavigate();
    const [friend, setFriend] = useState('');
    const [friendList, setFriendList] = useState([]);
    const [reqList, setReqList] = useState([]);
    const [recList, setRecList] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
    }
return (
    <div>
        
  
    <div >
        <h2 >Reviews</h2>
        {/* FRIEND LIST ----------------------------------------------*/}
        <h4 className="friendsTitle">Current Reviews</h4>
        <ul className="friendsList">
        {friendList.map(item => {
        const ref = React.createRef();
        return (
            <li key={item.id} ref={ref} >
              {/* <button onClick={() => navigate("../friendProfile", {state: {email: item.email, name: item.name, status: item.status, privacy: item.privacy}})}> */}
              <button onClick={() => redirectToProfile(item)}>
                {item.name} | {item.status} | {item.privacy}
                </button>
            {/* <div>{item.firstname} {item.lastname} {item.id}</div> */}
            </li>
            );
         })}
     </ul>
     {/* FRIEND RECCOMENDATIONS ----------------------------------------------*/}
     <h4 className="recTitle"> Suggested Friends</h4>
        <ul className="recList">
        {recList.map(item => {
        const ref = React.createRef();
        return (
            <li key={item.id} ref={ref} >
            {/* <a href="localhost:3500/login">{item.name} {item.status} {item.privacy}</a> */}
            <button onClick={() => redirectToProfile(item)}>
                {item.name} {item.privacy}
            </button>
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