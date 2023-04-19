import React, { useState, useEffect } from "react";
import api from "./apis"
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
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
const courseList = [
    { value: "option 1", label: "option 1" },
    { value: "option 2", label: "option 2" },
    { value: "option 3", label: "option 3" },
    { value: "option 4", label: "option 4" },
  ];

export const Courses = (props) => {
    // const [email, setEmail] = useState('');
    // const [emailNew, setEmailNew] = useState('');
    // const [emailNew2, setEmailNew2] = useState('');
    const [pass, setPass] = useState('');
    const [seq, setSeq] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [privacy, setPrivacy] = useState('');
    const [workdayStart, setWorkdayStart] = useState("");
    const [workdayEnd, setWorkdayEnd] = useState("");
    const [courses, setCourses] = useState([]);
    const [sidebar, setSidebar] = useState(true);
    const showSidebar = () => setSidebar(!sidebar);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    }

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

    async function getUserData() {
        const email = sessionStorage.getItem("user");
        const payload = {email: email};
        const user = await api.getUser(payload);
        setEmail(user.data.user.email);
        setName(user.data.user.name);
        setStatus(user.data.user.status);
        setPrivacy(user.data.user.privacy);
        setWorkdayStart(user.data.user.workdayStart);
        setWorkdayEnd(user.data.user.workdayEnd);
        let c = [];
        let rawCourses = (await api.getMyCourses({ email: email})).data;
        for (let i = 0; i < rawCourses.length; i++) {
            //console.log(rawCourses[i].subject + " " + rawCourses[i].number);
            c.push(rawCourses[i].subject + " " + rawCourses[i].number);
        }
        setCourses(c);
    }

    const deleteUser = async () => {
        if (sessionStorage.getItem("user") == null) {
            console.log("wtf?")
            window.alert("Please login delete your account!");
        }
        else if (window.confirm('Are you sure you want to delete your account?')) {
            console.log(sessionStorage.getItem("user"));
            const payload = {
                email: sessionStorage.getItem("user"),
                //password: pass,
                //seq: seq,
            };
            // const formEmail = email;
            await api.deleteUser(payload).then( async res => {
                // console.log(res);
                alert("Account deleted successfully");
                sessionStorage.removeItem("user");
                navigate("../login");
            }).catch (function (error) {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })
        }
        // else if (email !== sessionStorage.getItem("user")){
        //     window.alert("Please provide the email associated to your account");
        // }
        // else if (pass !== pass2) {
        //     window.alert("Passwords do not match");
        // }
        // else {
        //     // console.log(sessionStorage.getItem("user"));
        //     const payload = {
        //         email: sessionStorage.getItem("user"),
        //         password: pass,
        //         seq: seq,
        //     };
        //     // const formEmail = email;
        //     await api.deleteUser(payload).then( async res => {
        //         // console.log(res);
        //         alert("Account deleted successfully");
        //         sessionStorage.removeItem("user");
        //         navigate("../login");
        //     }).catch (function (error) {
        //         if (error.response) {
        //             alert(error.response.data.message);
        //         }
        //     })
        //     // props.onFormSwitch('login');
        // }
    }

    // called when loading page
    useEffect (() => {
        let ignore = false;
        if (!ignore) {
            if (sessionStorage.getItem("user") != null) {
                getUserData();
            }
        }
        return () => {ignore = true;}
        }, []);


    return (
        <div>
        <Link to="/addCourse">
        <button id = "addCourse-button" style={{
              
              position: "absolute",
              marginTop: "-140px",
              marginLeft: "300px",
             


            }}><FaPlus/> </button>
      </Link>
        <div>
      
    
        {/* <Link to="/searchReview">
            <button size="45" className="reset-btn2">Search Review</button>
        </Link>
        <Link to="/addReview">
            <button size="45" className="reset-btn2">Add Review</button>
        </Link>
        <Link to="/search">
            <button size="45" className="reset-btn2">Search Course</button>
        </Link>

        <Link to="/addNote">
            <button size="45" className="reset-btn2">Add note to course</button>
        </Link>
        <Link to="/cal">
            <button size="45" className="reset-btn2" type="submit">Weekly View</button>
        </Link> */}
       
        <h4 className="recTitle"> My current courses</h4>
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
      <h1 style={{
             
              position: "absolute",
              marginTop: "-180px",
              marginLeft: "-10px",
              


            }}>My Courses</h1>
            <ul  style={{
              overflow: "auto",
              position: "absolute",
              width: "280px",
              marginTop: "-100px",
              height: "300px",
              borderRadius: "10px",
              marginLeft: "-80px",
              backgroundColor:"#CEB888",
              color:"black",


            }}>
            {myCourses.map(item => {
            const ref = React.createRef();
            return (
                <li key={item.id} ref={ref} >
                {/* <a href="localhost:3500/login">{item.name} {item.status} {item.privacy}</a> */}
                {/* <button onClick={() => redirectToProfile(item)}> */}
                {/*have this show add review page if there's no review yet */}
                <Link to="/changeReview">                
                <button>
                    {item.id} {item.firstname} {item.lastname}
                </button>
                </Link>
                </li>
                );
             })}
         </ul>
        </div>
      
    
    </div>
    )
}