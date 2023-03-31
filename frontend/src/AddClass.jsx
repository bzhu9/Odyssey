import React from "react";
import { useState, useEffect } from "react";
import api from "./apis"
import { Link, useNavigate } from "react-router-dom";
import Select, { components } from "react-select";


const allOptions = [
    { value: "CS 307", label: "CS 307" },
    { value: "EAPS 106", label: "EAPS 106" },
    { value: "COM 217", label: "COM 217" },
    { value: "CS 252", label: "CS 252" },
    { value: "MA 351", label: "MA 351" },
    { value: "CS 252", label: "CS 252" },
    { value: "ENGR 100", label: "ENGR 100" },
    { value: "POL 327", label: "POL 327" },
    { value: "MA 261", label: "MA 261" },
    { value: "PHIL 110", label: "PHIL 110" },
  ];


export const AddClass = (props) => {
 
    
    const [selectedOptions, setSelectedOptions] = useState([]);


    return (
        <div>
        <h3> Add Classes </h3>
        <Select className="friendDropdown"
        defaultValue={[]}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        onChange={(options) => {
          if (Array.isArray(options)) {
            setSelectedOptions(options.map((opt) => opt.value));
          }
        }}
        // options={friendList.map((friend) => ({
        //     value: friend.id,
        //     label: friend.email
        //   }))}
        options={allOptions}
        /> 
        <button className="reset-btn" type="submit" >Add Classes</button>
        <div></div>
        <Link to="/cal">
            <button size="45" className="reset-btn" >Cancel</button>
        </Link>

            </div>

    );
  
}

// export default ChangePrivacy;
