import React, { useState, useEffect } from "react";
import api from "./apis";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Select, { components } from "react-select";

const allOptions = [
  { value: "option 1", label: "option 1" },
  { value: "option 2", label: "option 2" },
  { value: "option 3", label: "option 3" },
  { value: "option 4", label: "option 4" },
];
const profOptions = [
  { value: "prof 1", label: "prof 1" },
  { value: "prof 2", label: "prof 2" },
  { value: "prof 3", label: "prof 3" },
  { value: "prof 4", label: "prof 4" },
];

export const AddReview = (props) => {
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
      <h2>Create Review</h2>
      <div>
        
        <form  onSubmit={handleSubmit}>
          <label htmlFor="text">Select course you want to review</label>
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
            options={allOptions}
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

  {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button 
            id ="rating-btn"
            key={index}
            className={index <= ((rating && hover) || hover) ? "on" : "off"}
            onClick={() => setRating(index)}
            onDoubleClick={() => {
              setRating(0);
              setHover(0);
              }}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
      </div>

<div>
          </div>
          <label htmlFor="text">Write Review</label>

          <p>
           {'\n'} 
        </p>

          <textarea value={review}
            onChange={(e) => setReview(e.target.value)} size="9000" className="review">
          </textarea>
        </form>
        {/* <button type="submit" onClick={() => props.onFormSwitch('calender')}>Weekly View</button>
            <button className="reg-btn" onClick={() => props.onFormSwitch('register')}>Create an account</button>
            <button className="reset-btn" onClick={() => props.onFormSwitch('reset')}>Reset Password</button> */}
        {/* not sure why the buttons are small */}
        <button type="submit" className="reset-btn">Submit Review</button>
        <div>
        <Link to="/courses">
          <button size="45" className="reset-btn">
           Cancel Review
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
