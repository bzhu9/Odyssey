import React, { useState, useEffect } from "react";
import api from "./apis";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
//import { useParams } from "react-router-dom";
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
const myCourses = [
  { value: "option 1", label: "option 1" },
  { value: "option 2", label: "option 2" },
  { value: "option 3", label: "option 3" },
  { value: "option 4", label: "option 4" },
];

async function getCourse(courseID) {
  const courseObj = await api.getSingleCourse(courseID);
  console.log(courseObj.data);
  return courseObj.data;
}

export const CoursePage = (props) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [note, setNote] = useState("");
  const [avgRating, setAvgRating] = useState("");
  const [reviews, setReviews] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");


  const courseID = sessionStorage.getItem("courseId");
  console.log(courseID);
  const [courseObj, setCourseObj] = useState({});
  const navigate = useNavigate();
  //get the course object given the course id
  useEffect(() => {
    const fetchObject = async () => {
      const response = await getCourse(courseID);
      //console.log("response: ");
      //console.log(response);
      setCourseObj(response);
    };
    fetchObject();
  }, [courseID]);

  useEffect(() => {
    //preload all of the needed information
    if (!courseObj) {
      console.log("course is empty");
    } else {
    let name = courseObj.subject + " " + courseObj.number + " with " + courseObj.professor;
    setCourseTitle(name);

    //get the average rating
    if (courseObj.reviewcount === 0) {
      //no reviews so the rating should say N/A
      setAvgRating("--");
    } else {
      //rating up to 2 decimal points
      const score = (courseObj.totalscore / courseObj.reviewcount).toFixed(2);
      // console.log("tof score")
      // console.log(typeof courseObj.totalscore);
      // console.log(typeof courseObj.reviewcount);

      setAvgRating(score);
    }

    //get the reviews
    //get review list
    async function getReviews() {
      let r = [];

      const rawReviews = (await api.getMyReviews({ id: courseID})).data;
      //data has nothing
      //console.log(rawReviews);
      for (let i = 0; i < rawReviews.length; i++) {
        //get the course object
        r.push({
          id: rawReviews[i]._id,
          rating: rawReviews[i].stars,
          text: rawReviews[i].text,
          user: rawReviews[i].user, //idk if we need this but added it just in case
        })
      }
      // console.log("rev")
      // console.log(r);
      // console.log(r[0].text);
      setReviews(r);
    }

    //call getReviews
    getReviews();
    //console.log("revs");
    //console.log(reviews);
  }


 }, [courseObj]);
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
    <Navbar courseID={courseID}/>
    <div>

   <h2  style={{
             
              position: "absolute",
              marginTop: "-230px",
              marginLeft: "-97px",
             
            }}>{courseTitle}</h2>  
    <p>{"\n"}</p>
   <p style={{
             
             position: "absolute",
             marginTop: "-180px",
             marginLeft: "0px",
            
           }}>Average rating: {avgRating}/5 </p>
               <p>{"\n"}</p>

   <h3 style={{
             
             position: "absolute",
             marginTop: "-150px",
             marginLeft: "45px",
             borderWidth: "1px",
             
            
           }}>Reviews </h3>

   <ul  style={{
              overflow: "auto",
              position: "absolute",
              width: "700px",
              marginTop: "-110px",
              height: "350px",
              borderRadius: "10px",
              marginLeft: "-305px",
              backgroundColor:"#CEB888",
              color:"black",
              


            }}>
            {reviews.map(review => (
              <li key={review.id}>
                <p>Rating: {review.rating}/5</p>
                <p>Comments: {review.text}</p>
                {/* <p>User: {review.user}</p> */}
                ----------------------------------------
              </li>
            ))}            
         </ul>
   </div>
   {/* <Link to="/courses" style={{
              
              position: "absolute",
              marginTop: "310px",
              marginLeft: "-1105px",
              width: "200px",

             
              


            }}>
          <button  >
           Go back to courses
          </button>
        </Link> */}

    </>
  );
};
