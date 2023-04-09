import React, { useState, useEffect } from "react";
import api from "./apis"
import { Link, useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    }

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
            c.push(rawCourses[i].name);
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
            <button size="45" className="reset-btn2">Set Courses</button>
        </Link>
        <Link to="/cal">
            <button size="45" className="reset-btn2" type="submit">Weekly View</button>
        </Link>
        <div className="prof" >
        <br />
        { sessionStorage.getItem("user") == null ? 
        <>
        <br />
        <br />
        <br />
        <br />
        <br />
        <h3>Please login to see your profile!</h3>
        </>
        :
        <>
        <p> <b>Name:</b> {name}</p>
        <p> <b>Email:</b> {email}</p>
        <p> <b>Privacy:</b> {privacy}</p>
        <p> <b>Status:</b> {status}</p>
        { workdayStart && workdayStart.length > 0 ? 
        <>
        <p> <b>Workday Start:</b> {workdayStart}</p>
        <p> <b>Workday End:</b> {workdayEnd}</p>
        </> :
        <> </>
        }
        { courses.length > 0 ?
            <>
            <p> <b>Courses: </b></p>
            <ul>
            {courses.map(c => (
                <li>{c}</li>
            ))}
            </ul>
            </>
            :
            <>
            </>
        }
        </>
        }
        </div>
    
    </div>
    )
}