import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';
import { FaArrowLeft } from 'react-icons/fa';


const Navbar = ({courseID}) => {


	const handleMyReviewClick = () => {
		console.log(courseID);
		sessionStorage.setItem("courseId", courseID);
	};
	return (
		<>
		<Nav>
			<Bars />

			<NavMenu>
			<NavLink to='/courses' activeStyle>
			
  <button  style={{
					  fontSize: "20px",
                      color:"black",
					  background: "none",

                    }}><FaArrowLeft/> </button>
  			</NavLink>
			<NavLink to='/coursePage' activeStyle>
				Course Reviews
			</NavLink>
			<NavLink to='/changeNote' activeStyle>
				Note
			</NavLink>
			<NavLink to='/changeReview' activeStyle onClick={handleMyReviewClick}>
				My Review
			</NavLink>
		
			
			{/* Second Nav */}
			{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
			</NavMenu>
			
		</Nav>
		</>
	);
};

export default Navbar;
