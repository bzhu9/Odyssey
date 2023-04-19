import React from "react";
import { useState, useEffect } from "react";
import api from "./apis"
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



  function ChangeStatus(props) {
    const [currentStatus, setCurrentStatus] = useState('');
    const [status, setStatus] = useState('');
    const [sidebar, setSidebar] = useState(true);
    const showSidebar = () => setSidebar(!sidebar);
 
    async function getStatus() {
      const payload = { email: sessionStorage.getItem("user")};
      const user = await api.getStatus(payload);
      const stat = user.data.status;
      setCurrentStatus(stat);
    }
    
    async function changeStatus() {
      if (status === currentStatus) {
        return;
      }
      const payload = { email: sessionStorage.getItem("user"), status: status};
      const user = await api.setStatus(payload)
      .then(res => {
        alert(`Changed status to ${status} successfully`);
        const stat = res.data.status;
        setCurrentStatus(stat);
      });
    }

    // called when loading page
    useEffect (() => {
      let ignore = false;
      if (!ignore) {
        getStatus();
        setStatus("Online");
      }
      return () => {ignore = true;}
    }, []);
  
    return (
      <div className="auth-form-container">
      <h2>Status Settings</h2>
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
      <h3>Your current status is: {currentStatus}</h3>
      <select className="dropdown" onChange={(e) => setStatus(e.target.value)}  id="colours">
        <option className="dropdown" value="Online">Online</option>
        <option className="dropdown" value="Offline">Offline</option>
      </select>
      <h3>You selected...{status} </h3>
      <button type="submit" onClick={() => changeStatus()}>Submit Changes</button>
      <Link to="/cal">
            <button size="45" className="reset-btn" type="submit">Weekly View</button>
        </Link>
        <Link to="/settings">
            <button size="45" className="reset-btn" >Go back to Profile Settings</button>
        </Link>


      </div>
    );
  
}

export default ChangeStatus;
