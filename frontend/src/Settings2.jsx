import React, { useState } from 'react';
import styled from 'styled-components';

const SideNav = styled.div`
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;

  & a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
  }

  & a:hover {
    color: #f1f1f1;
  }

  & .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
  }

  @media screen and (max-height: 450px) {
    padding-top: 15px;
    & a {
      font-size: 18px;
    }
  }
`;

const OpenButton = styled.button`
  font-size: 20px;
  cursor: pointer;
  background-color: #111;
  color: white;
  padding: 10px 15px;
  border: none;

  &:hover {
    background-color: #444;
  }
`;

const MainContent = styled.div`
  transition: margin-left 0.5s;
  padding: 16px;
`;

const Settings2 = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openNav = () => {
    setIsOpen(true);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  return (
    <>
      <SideNav style={{ width: isOpen ? '250px' : '0' }}>
        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
          &times;
        </a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </SideNav>
      <MainContent style={{ marginLeft: isOpen ? '250px' : '0' }}>
        <OpenButton onClick={openNav}>☰ Open Sidebar</OpenButton>
        <h2>Collapsed Sidebar</h2>
        <p>
          Click on the hamburger menu/bar icon to open the sidebar, and push
          this content to the right.
        </p>
      </MainContent>
    </>
  );
};

export default Settings2;
