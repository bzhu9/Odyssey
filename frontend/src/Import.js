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
	var {parseError} = useState('imported!')


	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
		let fileText = '';
		var reader = new FileReader()
		reader.onload = async (e) => {
			fileText = (e.target.result)
			try {
				var jcalData = ICAL.parse(fileText)
				var comp = new ICAL.Component(jcalData)
				var vevent = comp.getFirstSubcomponent("vevent")
				var summary = vevent.getFirstPropertyValue("summary");
				console.log(summary)
			} catch (error) {
				console.log(error)
				parseError = 'parsing failed'
			}
		};
		reader.readAsText(event.target.files[0])
	};

	return(
   <div>
			<input type="file" name="file" onChange={changeHandler} />
			{isFilePicked ? (
				selectedFile.name.split('.').pop() === "ics" ? (
					<div>
						<p>{parseError}</p>
					</div>
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