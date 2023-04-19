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

export const AddNote = (props) => {
  const navigate = useNavigate();

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [note, setNote] = useState("");
  const [courseList, setCourseList] = useState([]);



  async function getCourses() {
    //get all the courses of the given user
    const pload = { email: sessionStorage.getItem("user") };
    const rawCourseList = await api.getMyCourses(pload);
    
      let processedCourseList = [];
      console.log(rawCourseList);
      for (let i = 0; i < rawCourseList.data.length; i++) {
        let f = rawCourseList.data[i];
        //each object will contain the email and the id of the friend
        console.log(f.subject);
        processedCourseList.push({
          name: f.subject + " " + f.number,
          id: f._id,
        });
      }
      //set the friendList
      setCourseList(processedCourseList);
  }
  
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      getCourses();
      //console.log(friendList);
    }
    return () => {
      ignore = true;
    };
  }, []);





  const submit = async () => {
     //check a course was selected selectedOptions > 0
     //check that there is text written for the course

     if (selectedOptions.length <= 0) {
        alert("Please select a course");
     } else if (note.trim() === "") {
        alert("Please add a note");
     } else {
      //get the user ID
      const pl = {email: sessionStorage.getItem("user")};
      const user = await api.getUserID(pl);

      //make the object
      const payload = {
        "text": note,
        "user": user.data.id,
        "course": selectedOptions,
      };

      //check if a note already exists

      //make the api call
      await api
                .addNote(payload)
                .then((res) => {
                  window.alert("Note created successfully");
                  navigate("../courses");
                })
                .catch((err) => {
                  console.log("yo why are you here");
                  if (err.response) {
                    console.log(err.response.data);
                    alert(err.response.data.message);
                  }
                });
     }

  }  





  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <h2>Add Note to Class</h2>
      <div>
        
        <form  onSubmit={handleSubmit}>
          <label htmlFor="text">Select course you want to add note for</label>
          <p>
 {'\n'} 
</p>
          <Select
            defaultValue={[]}
            isMulti={false}
            closeMenuOnSelect={true}
            hideSelectedOptions={false}
            onChange={(options) => {
              console.log(options);
              console.log(Array.isArray(options));
              console.log(options.value);
              setSelectedOptions(options.value);
              // if (Array.isArray(options)) {
              //   setSelectedOptions(options.map((opt) => opt.value));
              // }
            }}
            options={courseList.map((course) => ({
              value: course.id,
              label: course.name,
            }))}
          />
          <p>
          {'\n'} 
          </p>
            {/* <label htmlFor="text">Select professor for that course</label> */}
          <p>
          {'\n'} 
          </p>
            {/* <Select
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
            /> */}

{/* <label htmlFor="text">Create review</label> */}

<p>
 {'\n'} 
</p>

<div>
<label htmlFor="text">Write Note</label>

<p>
 {'\n'} 
</p>
          </div>
          <textarea value={note}
            onChange={(e) => setNote(e.target.value)} size="9000" className="review">
          </textarea>
        </form>
        {/* <button type="submit" onClick={() => props.onFormSwitch('calender')}>Weekly View</button>
            <button className="reg-btn" onClick={() => props.onFormSwitch('register')}>Create an account</button>
            <button className="reset-btn" onClick={() => props.onFormSwitch('reset')}>Reset Password</button> */}
        {/* not sure why the buttons are small */}
        <button type="submit" className="reset-btn" onClick={submit}>Submit Note</button>
        <div>
        <Link to="/courses">
          <button size="45" className="reset-btn">
           Cancel Note
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
