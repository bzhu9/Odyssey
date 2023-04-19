import React, { useState, useEffect } from "react";
import api from "./apis";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Select, { components } from "react-select";
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';
import Navbar from "./Navbar";
const myCourses = [
  { value: "option 1", label: "option 1" },
  { value: "option 2", label: "option 2" },
  { value: "option 3", label: "option 3" },
  { value: "option 4", label: "option 4" },
];

export const CoursePage = (props) => {
  const navigate = useNavigate();

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [note, setNote] = useState("");



  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
    <Navbar />
    <div>

   <h2  style={{
             
              position: "absolute",
              marginTop: "-230px",
              marginLeft: "-175px",
             
            }}>Course Reviews for CS 307 with Turkstra</h2>  
    <p>{"\n"}</p>
   <p style={{
             
             position: "absolute",
             marginTop: "-180px",
             marginLeft: "-60px",
            
           }}>Average rating: </p>
               <p>{"\n"}</p>

   <h3 style={{
             
             position: "absolute",
             marginTop: "-150px",
             marginLeft: "10px",
             borderWidth: "1px",
             
            
           }}>Reviews </h3>

   <ul  style={{
              overflow: "auto",
              position: "absolute",
              width: "700px",
              marginTop: "-110px",
              height: "350px",
              borderRadius: "10px",
              marginLeft: "-305px",
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
                
                   {item.value} 
                  
                </li>

                );
             })}
         </ul>
   </div>

    </>
  );
};
