import React, { useState } from "react";
import api from "./apis"
import { Link, useNavigate } from "react-router-dom";

const friendList = [
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

  const recList = [
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
    const [pass, setPass] = useState('');
    const [seq, setSeq] = useState('');
    const navigate = useNavigate();
    const [friend, setFriend] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    
    

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
         <div className="auth-form-container">
            <h3>Add Friend</h3>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="text">Enter user's name to add as friend</label>
                <input size="45" value={friend} onChange={(e) => setFriend(e.target.value)} type="text" placeholder="Mary Ann" />
                 <button type="submit" >Submit</button> 

            </form>

            {/* <ul>
                {openClassrooms.map((item) => (
                    <li>{item.name}</li>
                ))}
            </ul> */}


            {/* <button type="submit" onClick={() => props.onFormSwitch('calender')}>Weekly View</button> */}
          

        </div>
         
        <Link to="/cal">
            <button size="45" className="reset-btn" type="submit">Weekly View</button>
        </Link>
        <Link to="/cal">
            <button size="45" className="reset-btn" type="submit">Add Friend</button>
        </Link>

    </div>
    </div>
    )
}