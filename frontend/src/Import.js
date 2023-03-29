import React, {useState} from "react"
import api from "./apis"
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


	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	return(
   <div>
			<input type="file" name="file" onChange={changeHandler} />
			{isFilePicked ? (
				selectedFile.name.split('.').pop() === "ics" ? (
					<div>
						<div>
							<p>Filename: {selectedFile.name}</p>
							<p>Filetype: {selectedFile.type}</p>
							<p>Size in bytes: {selectedFile.size}</p>
							<p>
							lastModifiedDate:{' '}
							{selectedFile.lastModifiedDate.toLocaleDateString()}
							</p>
						</div>
					</div>
				) : (
					<p>bad</p>
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