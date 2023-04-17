import React, { useState, useEffect } from "react";
import api from "./apis";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Select, { components } from "react-select";

const deptOptions = [
  { value: "CS", label: "CS" },
  { value: "EAPS", label: "EAPS" },
  { value: "ENGR", label: "ENGR" },
  { value: "COM", label: "COM" },
];
const profOptions = [
  { value: "prof 1", label: "prof 1" },
  { value: "prof 2", label: "prof 2" },
  { value: "prof 3", label: "prof 3" },
  { value: "prof 4", label: "prof 4" },
];


const myCourses = [
    {
      id: '1232',
      firstname: 'CS 252',
      lastname: 'Reviewed',

    },
    {
      id: '12323',
      firstname: 'COM 217',
      lastname: 'Not Reviewed',
      //can make last name a unique number for identifying like in discord
      //can make id their status
    
    },
   
      {
        id: 'idk',
        firstname: 'CS 307',
        lastname: 'Reviewed',
      },
      
   
    
  ];


export const SearchReview = (props) => {
  const navigate = useNavigate();

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [review, setReview] = useState("");
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);
  const [name, setName] = useState(0);



  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <h2>Find Reviews</h2>
    
        
        <form  onSubmit={handleSubmit}>
          <label htmlFor="text">What course do you want reviews for?</label>
          <p>
           {'\n'} 
        </p>
        <input size="50" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="CS 307"  />

         
        <p>
           {'\n'} 
        </p>
       
          <label htmlFor="text">Select professor for that course</label>
          <p>
           {'\n'} 
        </p>
          <Select
            defaultValue={[]}
            isMulti={false}
            closeMenuOnSelect={true}
            hideSelectedOptions={false}
            onChange={(options) => {
              if (Array.isArray(options)) {
                setSelectedOptions(options.map((opt) => opt.value));
              }
            }}
            options={profOptions}
          />


    

  

          <p>
           {'\n'} 
        </p>
        <button size="45" className="reset-btn" >Search</button>
         <h3>Results</h3>
            <ul >
            {myCourses.map(item => {
            const ref = React.createRef();
            return (
                <li key={item.id} ref={ref} >
                {/* <a href="localhost:3500/login">{item.name} {item.status} {item.privacy}</a> */}
                {/* <button onClick={() => redirectToProfile(item)}> */}
                {/*have this show add review page if there's no review yet */}
                {/* <Link to="/changeReview">                
                <button> */}
                    {item.id} {item.firstname} {item.lastname}
                {/* </button> */}
                {/* </Link> */}
                </li>
                );
             })}
         </ul>
          <p>
           {'\n'} 
        </p>

         
        </form>
      
        <div>
        <Link to="/courses">
          <button size="45" className="reset-btn">
           Go back to courses
          </button>
        </Link>
        </div> 
        <div>
        <Link to="/cal">
          <button size="45" className="reset-btn" >
            Weekly View
          </button>
        </Link>
      </div>
    </div>
  );
};
