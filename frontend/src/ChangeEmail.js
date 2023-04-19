import React, { useState } from "react";
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

export const ChangeEmail = (props) => {
    const [email, setEmail] = useState('');
    const [emailNew, setEmailNew] = useState('');
    const [emailNew2, setEmailNew2] = useState('');
    const [sidebar, setSidebar] = useState(true);
    const showSidebar = () => setSidebar(!sidebar);
  

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const changeEmail = async () => {
        console.log("inside");
        if (sessionStorage.getItem("user") == null) {
            //console.log("wtf?")
            console.log("user is null wtf");
            window.alert("Please login to change your email!");
        }
        else if (email !== sessionStorage.getItem("user")){
            console.log("email is not the same");
            window.alert("Please provide the email associated to your account");
        }
        else {
            //check if new email is identical to new email confirm
            console.log("inside else");
            if (emailNew === emailNew2) {
                //make the payload object
                console.log("making payload");
                const payload = {
                    oldEmail: email,
                    newEmail: emailNew
                };

                //send the post api
                console.log("api call");
                await api.changeEmail(payload).then( async res => {
                    sessionStorage.setItem("user", emailNew);
                    console.log("email changed")
                    window.alert("email changed!");
                    navigate("../cal");
                }).catch(function (error) {
                    console.log("there was an error changing");
                    if (error.reponse) {
                        console.log("displaying error");
                        window.alert(error.response.data.message);
                    }
                })

                //show the response to the user
            }
            else {
                console.log("email is the same as another user");
                window.alert("please make sure new email is the same");
            }

            
        }

    }

   
    return (
        <div className="auth-form-container">
            <h2>Change Email</h2>
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
</div>
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input size="45" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="alexsmith@gmail.com" id="email" name="email" />
            <label htmlFor="email">New Email</label>
            <input size="45" value={emailNew} onChange={(e) => setEmailNew(e.target.value)} type="email" placeholder="alexsmith2@gmail.com" id="email" name="email" />
            <label htmlFor="email">Confirm New Email</label>
            <input size="45" value={emailNew2} onChange={(e) => setEmailNew2(e.target.value)} type="email" placeholder="alexsmith2@gmail.com" id="email" name="email" />
            {/* <label htmlFor="password"> Password</label>
            <input size="45" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" /> */}
            <button type="submit" onClick={changeEmail}>Change Email</button>
        </form>
        {/* <button className="link-btn" onClick={() => props.onFormSwitch('reset')}>Change Password</button> */}
        {/* <button className="link-btn" onClick={() => props.onFormSwitch('calender')}>Go back to Calender</button> */}
        <Link to="/settings">
            <button size="45" className="reset-btn" type="submit">Profile Settings</button>
        </Link>
        <Link to="/cal">
            <button size="45" className="reset-btn" type="submit">Weekly View</button>
        </Link>
        

    </div>
    )
}