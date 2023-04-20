import React from "react";
import { useState, useEffect } from "react";
import api from "./apis"
import { Link, useNavigate } from "react-router-dom";
import Select, { components } from "react-select";

export const AddCourse = (props) => {
 
    
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [courseList, setCourseList] = useState([]);
    const navigate = useNavigate();

    async function getCourses() {
        //get the user's friend list
        const rawCourseList = await api.getAllCourses();
        let processedCourseList = []
        //console.log(rawFriendList);
        for (let i = 0; i < rawCourseList.data.length; i++) {
          let c = rawCourseList.data[i];
          //each object will contain the email and the id of the friend
          processedCourseList.push({
            //value: c.subject + " " + c.number,
            value: c._id,
            label: c.subject + " " + c.number + " with " + c.professor, 
            id: c._id
          });
        }
        console.log(processedCourseList);
        //set the friendList
        setCourseList(processedCourseList);
    }

    async function getMyCourses() {
      //get the user object
      const user = sessionStorage.getItem("user");
      if (!user) {
        return;
      }
      const rawCourseList = await api.getMyCourses({ email: user});
      let processedCourseList = []
      //console.log(rawFriendList);
      for (let i = 0; i < rawCourseList.data.length; i++) {
        let c = rawCourseList.data[i];
        //each object will contain the email and the id of the friend
        processedCourseList.push({
          //value: c.subject + " " + c.number,
          value: c._id,
          label: c.subject + " " + c.number + " with " + c.professor, 
          id: c._id
        });
      }
      setSelectedOptions(processedCourseList);
    }

    async function setMyCourses() {
      const user = sessionStorage.getItem("user");
      if (!user) {
        alert("You must be signed in to select courses!");
        return;
      }
      let courseNames = [];
      for (let i = 0; i < selectedOptions.length; i++) {
        console.log(selectedOptions[i])
        courseNames.push(selectedOptions[i].value);
      }
      const payload = {email: user, courseID: courseNames};
      api.setCourses(payload)
      .then( async res => {
          // console.log(res);
          alert("Courses set successfully");
          navigate("../settings");
      }).catch (function (error) {
          if (error.response) {
              alert(error.response.data.message);
          }
      });
      }

    useEffect (() => {
      let ignore = false;
      if (!ignore) {
        getCourses();
        getMyCourses();
      }
      return () => {ignore = true;}
    }, []);

    return (
        <div>
        <h3> Set Courses </h3>
        <Select 
        defaultValue={[]}
        value={selectedOptions}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        onChange={(options) => setSelectedOptions(options)}
        options={courseList}
        /> 
        <button className="reset-btn" type="submit" onClick={() => setMyCourses()}>Set Courses</button>
        <div></div>
        <Link to="/courses">
            <button size="45" className="reset-btn" >Cancel</button>
        </Link>

            </div>

    );
  
}

// export default ChangePrivacy;
