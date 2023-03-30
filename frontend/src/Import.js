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
	var {imported} = useState(false)


	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
		setParseError(false);
		let fileText = '';
		var reader = new FileReader()
		var jcalData;
		var comp;
		var read = false;
		reader.onload = async (e) => {
			fileText = (e.target.result)
			try {
				var jcalData = ICAL.parse(fileText)
				comp = new ICAL.Component(jcalData)
				read = true;
			} catch (error) {
				if (event.target.files[0].name.split('.')[1] === 'ics' ) {
					setParseError(true);
					console.log("hi")
				}
			}
		};
		reader.readAsText(event.target.files[0])
		if (read) {
			var vevent = comp.getFirstSubcomponent("vevent")
			var summary = vevent.getFirstPropertyValue("summary");
			console.log(summary)
		}
	};

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
			<Link to="/cal">
                <button size="45" className="reset-btn">Back to Calendar</button>
            </Link>
		</div>
	)
}

export default FileUploadPage;