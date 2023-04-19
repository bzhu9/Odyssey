import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';


const Navbar = () => {
return (
	<>
	<Nav>
		<Bars />

		<NavMenu>
		<NavLink to='/coursePage' activeStyle>
			Course Reviews
		</NavLink>
		<NavLink to='/changeNote' activeStyle>
			Note
		</NavLink>
		<NavLink to='/changeReview' activeStyle>
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
