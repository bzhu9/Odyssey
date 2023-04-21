import React, { useState, useEffect } from "react";
import api from "./apis";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Select, { components } from "react-select";
import styled from "styled-components";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./CourseSidebarData";
import { IconContext } from "react-icons/lib";
const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;
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
  const [courseList, setCourseList] = useState([]);
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);

  async function getCourses() {

    //making sure the user can only make a review
    //when u send it to the backend it should send an error
    //that it cannot be made
    //and then an alert should be displayed




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
    }
    return () => {
      ignore = true;
    };
  }, []);


  //what happens when the submit button is clicked
  const handleSubmit = (e) => {
    e.preventDefault();
  };


  const submit = async () => {
    //rating and text are not required, but are prefered
    console.log(rating);

     //check a course was selected selectedOptions > 0
     //check if both rating and text are empty [you should be able to set one and not the other

     if (selectedOptions.length < 0) {
        alert("Please select a course");
     } else {
      //console.log("rating:" + rating);
      //console.log(review);

      //get the user ID
      const pl = {email: sessionStorage.getItem("user")};
      const user = await api.getUserID(pl);
      //console.log(user.data.id);

      //make the object
      const payload = {
        "text": review,
        "stars": rating,
        "user": user.data.id,
        "course": selectedOptions,
      };

      //make the api call
      // const rv = (await api.addReview(payload)).data;
      // console.log(rv.message);
      // if (rv.message === "hasReview") {
      //   window.alert("You have already made a review for this course, you cannot make another one!");
      // } else {
      //   window.alert("Review created successfully");
      //   navigate("../courses");

      // }
      await api.addReview(payload)
              .then((rv) => {
                console.log(rv.data);
                if (rv.data.message === "hasReview") {
                  window.alert("You have already made a review for this course, you cannot make another one!");
                } else {
                  window.alert("Review created successfully");
                  navigate("../courses");
                }
            })
            .catch((error) => {
              console.error(error);
              // Handle error here
            });




    //   await api
    //             .addReview(payload)
    //             .then((res) => {
    //               console.log("this is the res message")
    //               console.log(res.message);
    //               window.alert(res.message);
    //               //window.alert("Review created successfully");
    //               navigate("../courses");
    //             })
    //             .catch((err) => {
    //               console.log("yo why are you here");
    //               if (err.response) {
    //                 console.log(err.response.data);
    //                 alert(err.response.data.message);
    //               }
    //             });
      
    }

  }





  return (
    <div>
      <h2>Create Review</h2>
      <IconContext.Provider
        value={{ color: "#fff" }}
        style={{
          textAlign: "center",
          width: "30px",
          height: "30px",
        }}
      >
        <Nav
          style={{
            textAlign: "center",
            position: "absolute",
            left: "30px",
            top: "30px",
            background: "#CEB888",
            border: "1px solid #CEB888",
            borderRadius: "10px",
            width: "100px",
            height: "50px",
          }}
        >
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <h1
            style={{
              textAlign: "left",
              width: "100px",
              marginLeft: "200px",
            }}
          ></h1>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return (
                <div>
                  <Link
                    to={item.path}
                    style={{
                      color: "#CEB888",
                      fontSize: "22px",
                    }}
                  >
                    {item.icon} {item.title}
                    <br />
                    <br />
                  </Link>
                </div>
              );
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
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
              console.log(options);
              console.log(Array.isArray(options));
              console.log(options.value);
              setSelectedOptions(options.value);
              //console.log(selectedOptions);
              // if (Array.isArray(options)) {
              //   console.log("here")
              //   setSelectedOptions(options.map((opt) => opt.value));
              //   console.log(selectedOptions);
              // }
            }}
            options={profOptions}
          /> */}

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
            onChange={(e) => setReview(e.target.value)} size="9000" className="review" style={{
             
              fontFamily: "Arial, sans-serif",
             
            }}>
          </textarea>
        </form>
        {/* <button type="submit" onClick={() => props.onFormSwitch('calender')}>Weekly View</button>
            <button className="reg-btn" onClick={() => props.onFormSwitch('register')}>Create an account</button>
            <button className="reset-btn" onClick={() => props.onFormSwitch('reset')}>Reset Password</button> */}
        {/* not sure why the buttons are small */}
        <button type="submit" className="reset-btn" onClick={submit}>Submit Review</button>
        <div>
        <Link to="/courses">
          <button size="45" className="reset-btn">
           Cancel Review
          </button>
        </Link>
        </div> 
        {/* <Link to="/cal">
          <button size="45" className="reset-btn" >
            Weekly View
          </button>
        </Link> */}
      </div>
    </div>
  );
};
