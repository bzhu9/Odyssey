import React, { useState, useEffect } from "react";
import api, { setCourses } from "./apis";
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

/*
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

const levelOptions = [
    { value: "1", label: "100" },
    { value: "2", label: "200" },
    { value: "3", label: "300" },
    { value: "4", label: "400" },
    { value: "5", label: "500" },
    { value: "6", label: "600"},
];
*/

const c = [
  { value: "pls", label: "work" },
  { value: "pls", label: "work" },
  { value: "pls", label: "work" },
  { value: "hi", label: "1" },
  { value: "test", label: "2" },

];



export const Search = (props) => {
  const navigate = useNavigate();

  //const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState([]);
  const [selectedRating, setSelectedRating] = useState([]);
  // const [review, setReview] = useState("");
  // const [hover, setHover] = useState(0);
  // const [rating, setRating] = useState(0);
  const [sidebar, setSidebar] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [levelOpt, setLevelOpt] = useState([]);
  const [professorOpt, setProfessorOpt] = useState([]);
  const showSidebar = () => setSidebar(!sidebar);
  const [courses, setCourses] = useState([]);
  const [ratingOpt, setRatingOpt] = useState([]);


  //get all the course subjects
  //get all the course
  useEffect(() => {
    const fetchData = async () => {
      //get all the subjects
      const allSubjects = (await api.getAllSubjects()).data.subjects;
      setDepartments(allSubjects);
      //set the default levels
      const defaultLvlOptions = [
        { value: "1", label: "100" },
        { value: "2", label: "200" },
        { value: "3", label: "300" },
        { value: "4", label: "400" },
        { value: "5", label: "500" },
        { value: "6", label: "600" },
      ];
      setLevelOpt(defaultLvlOptions);

      const defaultRatingOptions = [
        { value: "0", label: "0" },
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
      ];
      setRatingOpt(defaultRatingOptions);
      setSelectedRating(null);

      //get all the profs
      const defaultProfs = (await api.getAllProfessors()).data.professor;
      //const defaultProfs = ["hi", "bye", "lmfao"];
      //console.log(defaultProfs);
      setProfessorOpt(defaultProfs);
    }
    console.log("preload")
    fetchData();
    console.log("selectedNull");
    console.log(ratingOpt)
    //setSelectedRatingOpt(defaultRatingOptions[0].label)
    setSelectedDepartment(null);
    setSelectedLevel(null);
    setSelectedProfessor(null);
  }, []);

  useEffect(() => {
    const fetchNullEverything = async () => {
      //get all the subjects
      const allSubjects = (await api.getAllSubjects()).data.subjects;
      setDepartments(allSubjects);
      //set the default levels
      const defaultLvlOptions = [
        { value: "1", label: "100" },
        { value: "2", label: "200" },
        { value: "3", label: "300" },
        { value: "4", label: "400" },
        { value: "5", label: "500" },
        { value: "6", label: "600" },
      ];
      setLevelOpt(defaultLvlOptions);

      //get all the profs
      const defaultProfs = (await api.getAllProfessors()).data.professor;
      //const defaultProfs = ["hi", "bye", "lmfao"];
      //console.log(defaultProfs);
      setProfessorOpt(defaultProfs);
    }
    const fetchDept = async () => {
      //update boxes based on department chosen

      //update the levels
      const response = (await api.getLevelRange(selectedDepartment)).data;
      //console.log(response);
      const newOpt = [];
      for (let i = response.minLevel; i <= response.maxLevel; i++) {
        newOpt.push({
          value: i,
          label: i * 100
        });
      }
      setLevelOpt(newOpt);
      //update the professors
      const res = (await api.getProfsbySubject(selectedDepartment)).data;
      //console.log(res);
      setProfessorOpt(res);
    }
    const fetchLevel = async () => {
      //level is filled
      //update the dept
      const response = (await api.getSubjectbyLevel(selectedLevel)).data;
      //console.log(response);
      setDepartments(response);
      
      //update the professors
      // console.log("level: " + selectedLevel)
      // console.log(typeof selectedLevel);
      const res = (await api.getProfsbyLevel(selectedLevel)).data;
      //console.log(res);
      setProfessorOpt(res);

    }

    const fetchProf = async () => {
      //prof is filled
      //update the dept
      const pl = {professor: selectedProfessor}
      const response = (await api.getSubjectbyProf(pl)).data;
      //console.log(response);
      setDepartments(response);
      //update the levels
      const res = (await api.getLevelbyProf(pl)).data;
      const newOpt = [];
      for (let i = res.minLevel; i <= res.maxLevel; i++) {
        newOpt.push({
          value: i,
          label: i * 100
        });
      }
      setLevelOpt(newOpt);
    }
    const fetchDeptLevel = async () => {
      //given the department and the level

      //update the professors
      const pl = {subject: selectedDepartment, level: selectedLevel};
      const response = (await api.getProfbySubjectLevel(pl)).data;
      //console.log(response);
      setProfessorOpt(response);
    }
    const fetchDeptProf = async () => {
      //given the department and the prof
      
      //update the levels
      const pl = {subject: selectedDepartment, professor: selectedProfessor};
      const res = (await api.getLevelbySubjectProf(pl)).data;
      //console.log(res);
      const newOpt = [];
      for (let i = res.minLevel; i <= res.maxLevel; i++) {
        newOpt.push({
          value: i,
          label: i * 100
        });
      }
      setLevelOpt(newOpt);
    }

    const fetchDeptLevelProf = async () => {
      //dept & level & prof
      
    }

    const fetchLevelProf = async () => {
      //given the level and the prof

      //update the type
      const pl = {professor: selectedProfessor, level: selectedLevel};
      const res = (await api.getSubjectbyLevelProf(pl)).data;
      setDepartments(res);
    }
    const fetchRating = async () => {
      //rating
    }
    const fetchRatingDept = async () => {
      //rating & dept
    }
    const fetchRatingLevel = async () => {
      //rating & lvl
    }
    const fetchRatingProf = async () => {
      //rating & prof
    }
    const fetchRatingDeptLevel = async () => {
      //rating dept level
    }
    const fetchRatingDeptProf = async () => {
      //rating dept prof
    }
    const fetchRatingLevelProf = async () => {
      //rating level prof
    }
    const fetchEverything = async () => {
      //everything
    }



    console.log("---------------------");
    console.log("NEW CALL");
    console.log(selectedDepartment);
    console.log(selectedLevel);
    console.log(selectedProfessor);
    // && (selectedRating === null)
    if ((selectedDepartment === null) && (selectedLevel === null) && (selectedProfessor === null) ){//&& (selectedRating === null)) {
      console.log("null everything");
      fetchNullEverything();
    } else if ((selectedDepartment !== null) && (selectedLevel === null) && (selectedProfessor === null)){// && (selectedRating === null)) {
      //department only has values
      console.log("dept");
      fetchDept();
    } else if ((selectedDepartment !== null) && (selectedLevel !== null) && (selectedProfessor === null) ){//&& (selectedRating === null)) {
      //department & level
      console.log("dept + level");
      fetchDeptLevel();
    } else if ((selectedDepartment !== null) && (selectedLevel === null) && (selectedProfessor !== null) ){//&& (selectedRating === null)) {
      //department & prof
      console.log("dept + prof");
      fetchDeptProf();
    } else if ((selectedDepartment !== null) && (selectedLevel !== null) && (selectedProfessor !== null) ){//&& (selectedRating === null) ) {
      //department & level & prof
      console.log("dept + level + prof");
      fetchDeptLevelProf();
    } else if ((selectedDepartment === null) && (selectedLevel !== null) && (selectedProfessor === null) ){//&& (selectedRating === null)) {
      //level
      console.log("fetchlvl");
      fetchLevel();
    } else if ((selectedDepartment === null) && (selectedLevel !== null) && (selectedProfessor !== null) ){//&& (selectedRating === null)) {
      //level & prof
      console.log("level + prof");
      fetchLevelProf();
    } else if ((selectedDepartment === null) && (selectedLevel === null) && (selectedProfessor !== null) ){//&& (selectedRating === null)) {
      //prof
      console.log("prof");
      fetchProf();
    } else if ((selectedDepartment === null) && (selectedLevel === null) && (selectedProfessor === null) && (selectedRating !== null)) {
      //rating
      console.log("rating");
      fetchRating()
    }  else if ((selectedDepartment !== null) && (selectedLevel === null) && (selectedProfessor === null) && (selectedRating !== null)) {
      //rating & dept
      console.log("rating");
      fetchRatingDept();
    } else if ((selectedDepartment === null) && (selectedLevel !== null) && (selectedProfessor === null) && (selectedRating !== null)) {
      //rating & level
      console.log("rating");
      fetchRatingLevel()
    }  else if ((selectedDepartment === null) && (selectedLevel === null) && (selectedProfessor !== null) && (selectedRating !== null)) {
      //rating & prof
      console.log("rating");
      fetchRatingProf();
    }  else if ((selectedDepartment !== null) && (selectedLevel !== null) && (selectedProfessor === null) && (selectedRating !== null)) {
      //rating dept level
      console.log("rating");
      fetchRatingDeptLevel();
    }  else if ((selectedDepartment !== null) && (selectedLevel === null) && (selectedProfessor !== null) && (selectedRating !== null)) {
      //rating dept prof
      console.log("rating");
      fetchRatingDeptProf();
    }  else if ((selectedDepartment === null) && (selectedLevel !== null) && (selectedProfessor !== null) && (selectedRating !== null)) {
      //rating level prof
      console.log("rating");
      fetchRatingLevelProf();
    } else if ((selectedDepartment !== null) && (selectedLevel !== null) && (selectedProfessor !== null) && (selectedRating !== null)) {
      //everything
      console.log("everything");
      fetchEverything();
    } else {
      //nothing
      //();
      console.log("else???");
    }
  }, [selectedDepartment, selectedLevel, selectedProfessor]);

  useEffect(() => {
    const fetchData = async () => {
      //update the department

      //update the level
    }
    fetchData();
  }, [selectedProfessor]);

  useEffect(() => {
    const fetchData = async () => {
      //update the department

      //update the professors
    }
    fetchData();
  }, [selectedLevel]);




  const submit = async () => {
    //check if all the boxes are empty
    //if so then display an error
    if (selectedLevel === null && selectedProfessor === null && selectedDepartment === null && selectedRating === null) {
      alert("Please sort by a category");
    } else {
      const pl = {
        level: selectedLevel, 
        subject: selectedDepartment,
        professor: selectedProfessor,
        rating: selectedRating
      };
      const c = (await api.getSearchCourses(pl)).data;
      console.log(c);
      setCourses(c);
      
    }
  }











  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <h2>Search for course</h2>
      <div>
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
        <form onSubmit={handleSubmit}>
          <label htmlFor="text">Select department of course</label>
          <p>
            {'\n'}
          </p>
          <Select
            defaultValue={[]}
            isClearable={true}
            isMulti={false}
            closeMenuOnSelect={true}
            hideSelectedOptions={false}
            onChange={(options) => {
              if (options === null) {
                setSelectedDepartment(null);
              } else {
                //console.log("is this an array?");
                //console.log(options);
                //console.log(options.value);
                setSelectedDepartment(options.value);
              }

              // if (Array.isArray(options)) {
              //   setSelectedDepartment(options.map((opt) => opt.value));
              // }
            }}
            options={departments.map((dept) => ({ value: dept, label: dept }))}
          />
          <p>
            {'\n'}
          </p>
          <label htmlFor="text">Select level for that course</label>
          <p>
            {'\n'}
          </p>
          <Select
            defaultValue={[]}
            isClearable={true}
            isMulti={false}
            closeMenuOnSelect={true}
            hideSelectedOptions={false}
            onChange={(options) => {
              console.log(options);
              if (options === null) {
                setSelectedLevel(null);
              } else {
                setSelectedLevel(options.value);
              }
              // console.log(Array.isArray(options));
              // if (Array.isArray(options)) {
              //   setSelectedLevel(options.map((opt) => opt.value));
              // }
            }}
            options={levelOpt}
          />
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
            isClearable={true}
            closeMenuOnSelect={true}
            hideSelectedOptions={false}
            onChange={(options) => {
              console.log(options);
              if (options === null) {
                setSelectedProfessor(null);
              } else {
                setSelectedProfessor(options.value);
              }
              // if (Array.isArray(options)) {
              //   setSelectedOptions(options.map((opt) => opt.value));
              // }
            }}
            options={professorOpt.map((professor) => ({ value: professor, label: professor }))}
          />
          <p>
            {'\n'}
          </p>
          <label htmlFor="text">Select a minimum rating</label>
          <p>
            {'\n'}
          </p>
          <Select
            defaultValue={[]}
            isClearable={true}
            isMulti={false}
            closeMenuOnSelect={true}
            hideSelectedOptions={false}
            onChange={(options) => {
              console.log(options);
              if (options === null) {
                setSelectedRating(null);
              } else {
                setSelectedRating(options.value);
              }
              // console.log(Array.isArray(options));
              // if (Array.isArray(options)) {
              //   setSelectedLevel(options.map((opt) => opt.value));
              // }
            }}
            options={ratingOpt}
          />
          <p>
            {'\n'}
          </p>

          {/* <label htmlFor="text">Create review</label> */}

          <div>


          </div>
          <button size="45" className="reset-btn" onClick={submit} >Search</button>

          <div>
          </div>
          <p>
            {'\n'}
          </p>
          <h3>Results</h3>
          <ul style={{
            overflow: "auto",
            // position: "absolute",
            width: "500px",
            // marginTop: "100px",
            // height: "350px",
            borderRadius: "10px",
            // marginLeft: "-305px",

            backgroundColor: "#CEB888",
            color: "black",



          }}>
            {/* {courses.map(c => (
              <li key={c._id}>
                <p>{c.subject + " " + c.number + " with " + c.professor}</p>

              </li>
            ))} */}
            {courses.map(c => {
            const ref = React.createRef();
            return (
                <li key={c._id} ref={ref} >
                {/* <a href="localhost:3500/login">{item.name} {item.status} {item.privacy}</a> */}
                {/* <button onClick={() => redirectToProfile(item)}> */}
                {/*have this show add review page if there's no review yet */}
                <Link to="/coursePage">                
                {/* <button> */}
                <button onClick={() => {
                  sessionStorage.setItem('courseId', c._id);
                }}>
                    {c.subject + " " + c.number + " with " + c.professor}
                </button>
                </Link>
                </li>
                );
             })}
          </ul>
          <p>
            {'\n'}
          </p>


        </form>



      </div>
    </div>
  );
};
