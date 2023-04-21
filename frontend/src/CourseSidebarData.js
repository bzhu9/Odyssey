import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";


export const SidebarData = [
	{
		title: "View Courses",
		path: "/courses",
		icon: <FaIcons.FaBook /> ,
	},

{
	title: "Search Course",
	path: "/search",
	icon: <FaIcons.FaSearch /> ,
},
// {
// 	title: "Course Reviews",
// 	path: "/searchReview",
// 	icon: <FaIcons.FaStar />,

	


// },
{
	title: "Add Review",
	path: "/addReview",
	icon: <FaIcons.FaStar />,

	


},
{
	title: "Add Note",
	path: "/addNote",
	icon: <FaIcons.FaStickyNote />,

	


},
{
	title: "Back to Calendar",
	path: "/Cal",
	icon: <FaIcons.FaCalendar />,

	


},

];
