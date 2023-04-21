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
  const [name, setName] = useState("");
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);



  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <h2>Find Reviews</h2>
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
        {/* <Link to="/courses">
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
        </Link> */}
      </div>
    </div>
  );
};
