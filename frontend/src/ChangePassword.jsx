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

export const ChangePassword = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [pass2, setPass2] = useState('');
    const [seq, setSeq] = useState('');
    const [seq2, setSeq2] = useState('');
    const [seq3, setSeq3] = useState('');
    const [sidebar, setSidebar] = useState(true);
    const showSidebar = () => setSidebar(!sidebar);


    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const reset = async () => {
        try {
          if (pass !== pass2) {
            window.alert("Passwords do not match. Please try again");
            return;
          }
          const payload = {email: email, password: pass, seq1: seq, seq2: seq2, seq3: seq3};
          const response = await api.resetUser(payload);
          console.log(response.data);
          // Display a success message to the user
          window.alert("Password reset successful!");
          navigate('../login');
        } catch (error) {
          console.log(error);
          // Display an error message to the user
          window.alert(error.response.data.message);
          //window.alert("Password reset failed. Please try again.");
        }
      };

    return (
        <div className="auth-form-container">
            <h2>Reset Password</h2>
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
        <form className="login-form" onSubmit={handleSubmit}>
            <label style = {{width:"450px",alignSelf:"left",}} htmlFor="email">Email</label>
            <input style = {{width:"450px",alignSelf:"center",}} size="45" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="alexsmith@gmail.com"  />
            <label style = {{width:"450px",alignSelf:"left",}} htmlFor="seq">Security Question: What is the name of the street of the first house you lived in?</label>
            <input style = {{width:"450px",alignSelf:"center",}} size="90" value={seq} onChange={(e) => setSeq(e.target.value)} type="seq" placeholder="Main Street"  />
            <label style = {{width:"450px",alignSelf:"left",}} htmlFor="password">Security Question: What is your mother's maiden name?</label>
            <input style = {{width:"450px",alignSelf:"center",}} size="90" value={seq2} onChange={(e) => setSeq2(e.target.value)} type="text" placeholder="Mary"  />
            <label style = {{width:"450px",alignSelf:"left",}} htmlFor="password">Security Question: What is your best friend's first name?</label>
            <input style = {{width:"450px",alignSelf:"center",}} size="90" value={seq3} onChange={(e) => setSeq3(e.target.value)} type="text" placeholder="Jackie"  />
            <label style = {{width:"450px",alignSelf:"left",}} htmlFor="password">New Password</label>
            <input style = {{width:"450px",alignSelf:"center",}} size="45" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********"  />
            <label style = {{width:"450px",alignSelf:"left",}} htmlFor="password">Confirm Password</label>
            <input style = {{width:"450px", alignSelf:"center",}} size="80" value={pass2} onChange={(e) => setPass2(e.target.value)} type="password" placeholder="********"/>
            <button className="reset-btn" type="submit"  onClick={reset} style = {{width:"480px", alignSelf:"center",}}>Reset Password</button>
        </form>
        <Link to="/settings">
        <button className="reset-btn" type="submit"  style = {{width:"480px", alignSelf:"center",}}>Cancel Changes</button>
        </Link>
        {/* <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Go back to login screen</button> */}
 
    </div>
    )
}