import React, { useState, useEffect } from "react";
import api from "./apis";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
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

export const Settings = (props) => {
  // const [email, setEmail] = useState('');
  // const [emailNew, setEmailNew] = useState('');
  // const [emailNew2, setEmailNew2] = useState('');
  const [pass, setPass] = useState("");
  const [seq, setSeq] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [workdayStart, setWorkdayStart] = useState("");
  const [workdayEnd, setWorkdayEnd] = useState("");
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  async function getUserData() {
    const email = sessionStorage.getItem("user");
    const payload = { email: email };
    const user = await api.getUser(payload);
    setEmail(user.data.user.email);
    setName(user.data.user.name);
    setStatus(user.data.user.status);
    setPrivacy(user.data.user.privacy);
    setWorkdayStart(user.data.user.workdayStart);
    setWorkdayEnd(user.data.user.workdayEnd);
    let c = [];
    let rawCourses = (await api.getMyCourses({ email: email })).data;
    for (let i = 0; i < rawCourses.length; i++) {
      c.push(rawCourses[i].name);
    }
    setCourses(c);
  }

  const deleteUser = async () => {
    if (sessionStorage.getItem("user") == null) {
      console.log("wtf?");
      window.alert("Please login delete your account!");
    } else if (
      window.confirm("Are you sure you want to delete your account?")
    ) {
      console.log(sessionStorage.getItem("user"));
      const payload = {
        email: sessionStorage.getItem("user"),
        //password: pass,
        //seq: seq,
      };
      // const formEmail = email;
      await api
        .deleteUser(payload)
        .then(async (res) => {
          // console.log(res);
          alert("Account deleted successfully");
          sessionStorage.removeItem("user");
          navigate("../login");
        })
        .catch(function (error) {
          if (error.response) {
            alert(error.response.data.message);
          }
        });
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
  };

  function logout() {
    api.setStatus({ email: sessionStorage.getItem("user"), status: "Offline" });
    sessionStorage.removeItem("user");
  }

  // called when loading page
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if (sessionStorage.getItem("user") != null) {
        getUserData();
      }
    }
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
    <h2 style={{
            textAlign: "center",
            position: "absolute",
            border: "3px solid #CEB888",
            padding: "10px",
            borderRadius: "10px",
            left: "500px",
            top: "10px",
          
            
          }}>Profile Settings</h2>

    <div>
      {/* <Link to="/settings">
            <button size="45" className="settingsNav-btn" >Profile</button>
        </Link>
        <Link to="/friends">
            <button size="45" className="friendNav-btn" >Friends</button>
        </Link> */}
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

      {/* <div className='set-btn'> */}
     
        <div className="prof">
          <br />
          {sessionStorage.getItem("user") == null ? (
            <>
              <br />
              <br />
              <br />
              <br />
              <br />
              <h3>Please login to see your profile!</h3>
            </>
          ) : (
            <>
              <p>
                {" "}
                <b>Name:</b> {name}
              </p>
              <p>
                {" "}
                <b>Email:</b> {email}
              </p>
              <p>
                {" "}
                <b>Privacy:</b> {privacy}
              </p>
              <p>
                {" "}
                <b>Status:</b> {status}
              </p>
              {workdayStart && workdayStart.length > 0 ? (
                <>
                  <p>
                    {" "}
                    <b>Workday Start:</b> {workdayStart}
                  </p>
                  <p>
                    {" "}
                    <b>Workday End:</b> {workdayEnd}
                  </p>
                </>
              ) : (
                <> </>
              )}
              {/* {courses.length > 0 ? (
                <>
                  <p>
                    {" "}
                    <b>Courses: </b>
                  </p>
                  <ul>
                    {courses.map((c) => (
                      <li>{c}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <></>
              )} */}
            </>
          )}
        </div>
        <div>
        <form onSubmit={handleSubmit}>
          <button
            style={{
              width: "200px",
              display: "block",
              align: "right",
              position: "relative",
              marginLeft: "100%",
            }}
            onClick={deleteUser}
          >
            Delete Account
          </button>
        </form>

        <Link to="/login">
          <button
            style={{
              width: "200px",
              display: "block",
              align: "right",
              position: "relative",
              marginLeft: "100%",
            }}
            size="45"
            onClick={logout}
          >
            Log Out
          </button>
        </Link>
        {/* <Link to="/cal">
          <button
            style={{
              width: "200px",
              display: "block",
              align: "right",
              position: "relative",
              marginLeft: "100%",
            }}
            size="45"
          >
            Weekly View
          </button>
        </Link> */}
      </div>
    </div>
    </>
  );
};
