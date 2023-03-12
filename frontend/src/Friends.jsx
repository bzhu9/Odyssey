import React, { useState } from "react";
import api from "./apis"
import { Link, useNavigate } from "react-router-dom";

const list = [
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
            {list.map(item => {
            const ref = React.createRef();
            return (
                <li key={item.id} ref={ref} >
                <div>{item.firstname} {item.lastname} {item.id}</div>
                </li>
                );
             })}
         </ul>
         
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