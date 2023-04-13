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

const levelOptions = [
    { value: "100", label: "100" },
    { value: "200", label: "200" },
    { value: "300", label: "300" },
    { value: "400", label: "400" },
    { value: "500", label: "500" },

  ];



export const Search = (props) => {
  const navigate = useNavigate();

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [review, setReview] = useState("");
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);



  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <h2>Search for course</h2>
      <div>
        
        <form  onSubmit={handleSubmit}>
          <label htmlFor="text">Select department of course</label>
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
            options={deptOptions}
          />
          <p>
           {'\n'} 
           </p>
          <label htmlFor="text">Select level for that course</label>
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
            options={levelOptions}
          />
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

{/* <label htmlFor="text">Create review</label> */}

        <div>

  
      </div>

<div>
          </div>
          <p>
           {'\n'} 
        </p>
         <h3>Results</h3>

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
        <Link to="/cal">
          <button size="45" className="reset-btn" >
            Weekly View
          </button>
        </Link>
      </div>
    </div>
  );
};
