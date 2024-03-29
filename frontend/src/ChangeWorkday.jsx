import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./apis";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
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


export const ChangeWorkday = (props) => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [isValidTime, setIsValidTime] = useState(true);
    const [sidebar, setSidebar] = useState(true);
    const showSidebar = () => setSidebar(!sidebar);

    const navigate = useNavigate();
    useEffect(() => {
      async function fetchData() {
        try {
          //Your async code here
          const pl = {email: sessionStorage.getItem("user")};
          const user = (await api.getUser(pl)).data.user;

          //get the workday and parse it
          // console.log(user);
          // console.log(user.workdayStart);
          // console.log(user.workdayEnd);
          setStartTime(user.workdayStart);
          setEndTime(user.workdayEnd);
      
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    }, []);
    





    const handleSubmit = (e) => {
        e.preventDefault();
    }

    async function setWorkday() {
        const user = sessionStorage.getItem("user");
        if (!user) {
            alert("Please sign in to set your workday!")
        }

        const payload = { email: user, startTime: startTime, endTime: endTime};
        if (payload.startTime > payload.endTime) {
            alert("Start time cannot be after end time")
        }
        else {
            await api.setWorkday(payload)
                .then(res => {
                    alert(`Set your workday successfully`);
                    navigate("../settings");
                });
        }
    }

    return (
        <div className="auth-form-container">
        <h2>Set Workday</h2>
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
      <div></div>
    <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="time">Start Time of Workday</label>
        <input size="45" value={startTime} onChange={(e) => setStartTime(e.target.value)} type="time" placeholder="Start Time" id="time" name="time" />
        <label htmlFor="time">End Time of Workday</label>
        <input size="45" value={endTime} onChange={(e) => setEndTime(e.target.value)} type="time" placeholder="End Time" id="time" name="time" />
        {/* <button type="submit" onClick={() => props.onFormSwitch('calender')}>Submit Changes</button> */}
        <button type="submit" onClick={setWorkday} >Submit</button>
    </form>
    {/* <button className="link-btn" onClick={() => props.onFormSwitch('calender')}>Go back to Calender</button> */}
    <Link to="/settings">
        <button size="45" className="reset-btn" type="submit">Cancel</button>
    </Link>
</div>
    )
}