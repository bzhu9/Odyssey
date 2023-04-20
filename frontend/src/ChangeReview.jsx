import React, { useState, useEffect } from "react";
import api, { getUserID } from "./apis";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Select, { components } from "react-select";
import Navbar from "./Navbar";

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

async function getCourse(courseID) {
  const courseObj = await api.getSingleCourse(courseID);
  console.log(courseObj.data);
  return courseObj.data;
}

export const ChangeReview = (props) => {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [review, setReview] = useState("");
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [courseObj, setCourseObj] = useState({});
  const [reviewObj, setReviewObj] = useState({});
  const [userObj, setUserObj] = useState({});
  const [hasDisplayedAlert, setHasDisplayedAlert] = useState(false);
  const [courseID, setCourseID] = useState("");


  // const courseID = sessionStorage.getItem("courseId");
  //this use effect will only run once
  useEffect(() => {
    //const courseID = sessionStorage.getItem("courseId");
    setCourseID(sessionStorage.getItem("courseId"));
  }, []);

  //this useEffect will run only when the dependencies are changed
  useEffect(() => {
    const fetchData = async () => {
      const courseResponse = await getCourse(courseID);
      setCourseObj(courseResponse);
  
      const userResponse = await api.getUser({email: sessionStorage.getItem("user")});
      setUserObj(userResponse.data.user);
      const uObj = userResponse.data.user;
  
      let name = "Change Review for " + courseResponse.subject + " " + courseResponse.number + " with " + courseResponse.professor;
      setTitle(name);
  
      let r;
      let hasReview = false;
      let index = -1;
  
      const rawReviews = (await api.getMyReviews({ id: courseID})).data;
      for (let i = 0; i < rawReviews.length; i++) {
        if (rawReviews[0].user === uObj._id) {
          hasReview = true;
          r = rawReviews[i];
          setReviewObj(rawReviews[i]);
        }
        if (hasReview === true) {
          i = rawReviews.length;
        }
      }
      if (hasReview === true) {
        setReview(r.text);
        setRating(r.stars);
      } else {
        //if no then show a message that says review has not been made
        //keep the nav bar
        console.log("no rev found");
        console.log(uObj._id);
        console.log(r);
        if (!hasDisplayedAlert) {

          setHasDisplayedAlert(true);
          alert("You have not made a review for this course, please make a review first");
          navigate("../courses");
        }
      }
    };
    fetchData();
  }, [courseID]);
  
  
  // //get the course object
  // useEffect(() => {
  //   const fetchObject = async () => {
  //     const response = await getCourse(courseID);
  //     setCourseObj(response);
  //   };
  //   fetchObject();

  //   const fetchUserObj = async () => {
  //     const pl = {email: sessionStorage.getItem("user")};
  //     const response = await api.getUser(pl);
  //     setUserObj(response.data.user);
  //   }
  //   fetchUserObj();
  // }, [courseID]);

  // //get the review objects
  // useEffect(() => {
  //   //get the title 
  //   let name = "Change Review for " + courseObj.subject + " " + courseObj.number + " with " + courseObj.professor;
  //   setTitle(name);
  //   //get the review
  //   async function getReviews() {
  //     let r;
  //     let hasReview = false;
  //     let index = -1;

  //     const rawReviews = (await api.getMyReviews({ id: courseID})).data;
  //     //data has nothing
  //     //console.log(rawReviews[0].user);
  //     //console.log(typeof rawReviews[0].user);
  //     //console.log(typeof userObj._id);
  //     for (let i = 0; i < rawReviews.length; i++) {
  //       //check if the review is the same as the user
  //       let usr = rawReviews[i].user;
  //       let usrId = userObj._id;
  //       //if (usr.toString() === usrId.toString()) {
  //       if (rawReviews[0].user === userObj._id) {
  //         hasReview = true;
  //         r = rawReviews[i];
  //         setReviewObj(rawReviews[i]);
  //       }
  //       if (hasReview === true) {
  //         i = rawReviews.length;
  //       }
  //     }
  //     //if yes then repopulate the data with that review
  //     if (hasReview === true) {
  //       //set the text
  //       setReview(r.text);
  //       //set the rating
  //       setRating(r.stars);

  //     } else {
  //       //if no then show a message that says review has not been made
  //       //keep the nav bar

  //     }
  //   }

  //   //call getReviews
  //   getReviews();
  //   //console.log("revs");
  //   //console.log(reviews);


  // }, [courseObj]);
  //find the review with the exact user





  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const submit = async () => {
    //rating and text are not required, but are prefered
    //make the object
    console.log("text: " + review);
    console.log("id: " + reviewObj._id);
    console.log("stars: " + rating);

      const payload = {
        "text": review,
        "reviewID": reviewObj._id,
        "stars": rating,
      };

      //make the api call
      await api
                .editReview(payload)
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













  return (
    <>
    <Navbar />

    <div>

      <h2>Change Review</h2>
      <div>
        
        <form  onSubmit={handleSubmit}>

          

{/* <label htmlFor="text">Create review</label> */}

        <div>
        <p>{title}</p>


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
            {/* <span className="star">&#9733;</span> */}
            <span className="star">
                    { index <= ((rating && hover) || rating)
                      ? "\u2605"
                      :  "\u2606"
                    }
            </span>
          </button>
        );
      })}
      </div>

<div>
          </div>
          
          <textarea value={review}
            onChange={(e) => setReview(e.target.value)} size="9000" className="review" style={{
             
              fontFamily: "Arial, sans-serif",
             
            }}>
          </textarea>
        </form>
        {/* <button type="submit" onClick={() => props.onFormSwitch('calender')}>Weekly View</button>
            <button className="reg-btn" onClick={() => props.onFormSwitch('register')}>Create an account</button>
            <button className="reset-btn" onClick={() => props.onFormSwitch('reset')}>Reset Password</button> */}
        {/* not sure why the buttons are small */}
        <button type="submit" className="reset-btn" onClick={submit}>Submit change</button>
        <div>
        <Link to="/courses">
          <button size="45" className="reset-btn">
           Cancel change
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
    </>
  );
};
