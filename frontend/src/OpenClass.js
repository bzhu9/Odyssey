import React, {useState} from "react"
import { Link } from "react-router-dom";
import api from "./apis"

export const OpenClass = (props) => {
    const [classroom, setClassroom] = useState('');
    const [openClassrooms, setOpenClassrooms] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const submit = async () => {
        if (!classroom.match(/[A-z]+ B*[0-9]+/)) {
            alert("Invalid classroom")
        }
        else {
            const zeroPad = (num, places) => String(num).padStart(places, '0')
            const now = new Date()
            const hour = Number(now.getHours())
            const nextHour = hour + 1
            const minute = Number(now.getMinutes())
            const startTime = `${zeroPad(hour, 2)}:${zeroPad(minute, 2)}`
            const endTime = `${zeroPad(nextHour, 2)}:${zeroPad(minute, 2)}`
            
            const building = classroom.split(' ')[0]
            const room = classroom.split(' ')[1]
            console.log(startTime)
            console.log(endTime)
            console.log(building)
            console.log(room)
            const payload = {
                startTime: startTime,
                endTime: endTime,
                building: building,
                room: room
            }
            console.log(payload)
            const openClasses = await api.searchOpenClass(payload);
            var processedClassrooms = [];
            var classes = [];
            var set = new Set();
            
            for (let i = 0; i < openClasses.data.length; i++) {
                if (!set.has(`${openClasses.data[i].building} ${openClasses.data[i].room}`)) {
                    set.add(`${openClasses.data[i].building} ${openClasses.data[i].room}`);
                    classes.push(`${openClasses.data[i].building} ${openClasses.data[i].room} Closes at: ${openClasses.data[i].endTime}`);
                }
                // processedClassrooms.push({name: `${openClasses.data[i].building} ${openClasses.data[i].room}`});
            }
            var set = new Set(classes);
            classes = Array.from(set);
            for (let i = 0; i < classes.length; i++) {
                processedClassrooms.push({name: classes[i]})
            }
            if (openClasses.data.length === 0) {
                processedClassrooms.push({name: "No matching classrooms"});
            }
            // var set = new Set(processedClassrooms);

            // setOpenClassrooms(processedClassrooms);

            setOpenClassrooms(processedClassrooms);
            // await api.searchOpenClass(payload).then(res => {
            //     console.log("hi")
            //     console.log(res);
            //     console.log(res.data)
            //     return (
            //         res
            //       );
            // }).catch (err => {
            //     if (err.response) {
            //         console.log(err.response.data);
            //         alert(err.response.data.message);
            //     }
            // })
        }
    }


    return (
        <div className="auth-form-container">
            <h2>Classroom Search</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="text">Enter Classroom</label>
                <input size="45" value={classroom} onChange={(e) => setClassroom(e.target.value)} type="text" placeholder="SMTH 108" id="email" name="email" />
                <button type="submit" onClick={submit} >Submit</button>

            </form>

            <ul>
                {openClassrooms.map((item) => (
                    <li>{item.name}</li>
                ))}
            </ul>

            {/* <button type="submit" onClick={() => props.onFormSwitch('calender')}>Weekly View</button> */}
            <Link to="/cal">
                <button size="45" className="reset-btn" type="submit">Weekly View</button>
            </Link>

        </div>
    )
}