import React, { useState, useEffect } from "react";
import api from "./apis";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Select, { components } from "react-select";
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';
import Navbar from "./Navbar";

async function getCourse(courseID) {
  const courseObj = await api.getSingleCourse(courseID);
  console.log(courseObj.data);
  return courseObj.data;
}

export const ChangeNote = (props) => {
  const navigate = useNavigate();
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");
  const [courseObj, setCourseObj] = useState({});
  const [reviewObj, setReviewObj] = useState({});
  const [userObj, setUserObj] = useState({});
  const [hasDisplayedAlert, setHasDisplayedAlert] = useState(false);
  const [courseID, setCourseID] = useState("");
  const [noteObj, setNoteObj] = useState({});


  // const courseID = sessionStorage.getItem("courseId");
  //this use effect will only run once
  useEffect(() => {
    //const courseID = sessionStorage.getItem("courseId");
    setCourseID(sessionStorage.getItem("courseId"));
  }, []);

  //this useEffect will run only when the dependencies are changed (courseID)
  useEffect(() => {
    const fetchData = async () => {
      const courseResponse = await getCourse(courseID);
      setCourseObj(courseResponse);
  
      const userResponse = await api.getUser({email: sessionStorage.getItem("user")});
      setUserObj(userResponse.data.user);
      const uObj = userResponse.data.user;
  
      let name = "Change Note for " + courseResponse.subject + " " + courseResponse.number + " with " + courseResponse.professor;
      setTitle(name);
  
      let note;
      let hasReview = false;
      let n;
  
      const rawNotes = uObj.personalNotes;
      for (let i = 0; i < rawNotes.length; i++) {
        //const pl = {noteID: rawNotes[i]}
        n = await api.getSingleNote(rawNotes[i]);
        console.log("single note:")
        console.log(n.data);
        //console.log(typeof rawNotes[i].course);
        console.log(typeof n.data.course)
        console.log(typeof courseID);
        console.log(typeof courseResponse._id);
        if (n.data.course === courseResponse._id) {
          hasReview = true;
          note = n.data;
          setNoteObj(note);
        }
        if (hasReview === true) {
          i = rawNotes.length;
        }
      }
      if (hasReview === true) {
        setNote(note.text);
        //setRating(r.stars);
      } else {
        //if no then show a message that says review has not been made
        //keep the nav bar
        console.log("no rev found");
        console.log(uObj._id);
        console.log(note);
        if (!hasDisplayedAlert) {
          setHasDisplayedAlert(true);
          alert("You have not made a note for this course, please make a note first");
          navigate("../coursePage");
        }
      }
    };
    fetchData();
  }, [courseID]);

  const submit = async () => {
    //rating and text are not required, but are prefered
    //make the object
    //console.log("text: " + note);
    //console.log("id: " + noteObj._id);
    //console.log("course: " + courseID);

      const payload = {
        "text": note,
        "noteID": noteObj._id,
        "course": courseID,
      };

      //make the api call
      await api
                .editNote(payload)
                .then((res) => {
                  window.alert("Review Successfully Changed");
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





  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
    <Navbar />

    <div>
      <h2>{title}</h2>
   
      <div>
        
        <form  onSubmit={handleSubmit}>
          <p>
 {'\n'} 
</p>
         

{/* <label htmlFor="text">Create review</label> */}

<p>
 {'\n'} 
</p>

<div>
<label htmlFor="text">Change Note</label>

<p>
 {'\n'} 
</p>
          </div>
          <textarea value={note}
            onChange={(e) => setNote(e.target.value)} size="9000" className="review"  style={{
             
              fontFamily: "Arial, sans-serif",
             
            }}>
          </textarea>
        </form>
        {/* <button type="submit" onClick={() => props.onFormSwitch('calender')}>Weekly View</button>
            <button className="reg-btn" onClick={() => props.onFormSwitch('register')}>Create an account</button>
            <button className="reset-btn" onClick={() => props.onFormSwitch('reset')}>Reset Password</button> */}
        {/* not sure why the buttons are small */}
        <button type="submit" className="reset-btn" onClick={submit}>Submit change to note</button>
        <div>
        <Link to="/courses">
          <button size="45" className="reset-btn">
           Cancel change to note
          </button>
        </Link>
        </div> 
        {/* <Link to="/courses">
          <button size="45" className="reset-btn" >
           Go back to courses
          </button>
        </Link> */}
      </div>
    </div>
    </>
  );
};
