import React, {useState} from "react"
import api from "./apis"
import ICAL from 'ical.js'
import { Link, useNavigate } from "react-router-dom";
// export const Import = (props) => {
    // const [email, setEmail] = useState('');
    // const [pass, setPass] = useState('');
    // const navigate = useNavigate();

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    // }

    // const login = async () => {
       
    // }

    // return (
    //     <div className="auth-form-container">
    //         <h2>Import</h2>
    //         <form className="login-form" onSubmit={handleSubmit}>
                

    //         </form>
           
            
    //         <Link to="/cal">
    //             <button size="45" className="reset-btn" type="submit">Weekly View</button>
    //         </Link>
    //         <Link to="/register">
    //             <button size="45" className="reg-btn">Import Calendr</button>
    //         </Link>
            
 
    //     </div>
    // )
// }
function FileUploadPage(){
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
	var [parseError, setParseError] = useState(false)
	var [events, setEvents] = useState([])


	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
		setParseError(false);
		let fileText = '';
		var reader = new FileReader()
		reader.onload = async (e) => {
			fileText = (e.target.result)
			try {
				var jcalData = ICAL.parse(fileText)
				var comp = new ICAL.Component(jcalData)
				var properties = comp.getAllSubcomponents("vevent")
				const eventsList = []
				for (let i = 0; i < properties.length; i++) {
					const temp = Object.values(properties[i])[0][1]
					console.log(temp)
					const eventInfo = {}
					for (let j = 0; j < temp.length; j++) {
						switch(temp[j][0]) {
							case "description":
								eventInfo.note = temp[j][3]
								break;
							case "dtend":
								eventInfo.endTime = temp[j][3]
								break;
							case "dtstart":
								eventInfo.startTime = temp[j][3];
								break;
							case "location":
								eventInfo.location = temp[j][3];
								break;
							case "summary":
								eventInfo.title = temp[j][3];
								break;
						}
					}
					eventsList.push(eventInfo)
				}
				setEvents(eventsList)
			} catch (error) {
				console.log(error)
				if (event.target.files[0].name.split('.')[1] === 'ics' ) {
					setParseError(true);
				}
			}
		};
		reader.readAsText(event.target.files[0])
	};

	const submit = async () => {
		if (events.length === 0) {
			alert("Please select a file!")
		}
		else {
			if (sessionStorage.getItem("user") == null) {
				alert("User not logged in")
			}
			const pl = {
				email: sessionStorage.getItem("user")
			}
			const userData = await api.getUserID(pl);
			const userID = userData.data.id;
			console.log(userID)
			const userList = [];
			userList.push(userID)
			const selectedOptions = [];
			for (let i = 0; i < events.length; i++) {
				const payload = {
					title: events[i].title,
					startTime: events[i].startTime,
					endTime: events[i].endTime,
					location: events[i].location,
					// objectId: userID,
					users: userList,
					req_users: [],
					note: events[i].note
				}
				await api.insertEvent(payload)
				.then(res => {
					console.log("inserted")
				}).catch (err => {
					if (err.response) {
						console.log(err.response.data);
					}
				})
			}
			alert("Imported!")
		}
	}

	return(
   <div>
			<input type="file" name="file" onChange={changeHandler} />
			{isFilePicked ? (
				selectedFile.name.split('.').pop() === "ics" ? (
					parseError ? (
						<div>
							<p>Error parsing ical file!</p>
						</div>
					) : (
						<div>
							<p>Correct file</p>
						</div>
					)
				) : (
					<p>Please select a .ics file!</p>
				)
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button type="submit" onClick={submit} >Import</button>
			</div>
			<div>
				<Link to="/cal">
					<button size="45" className="reset-btn">Back to Calendar</button>
				</Link>
			</div>
			
		</div>
	)
}

export default FileUploadPage;