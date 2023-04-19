import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
	{
		title: "View Profile",
		path: "/settings",
		icon: <FaIcons.FaUser /> ,
	},

{
	title: "Change Email",
	path: "/changeEmail",
	icon: <FaIcons.FaEnvelope /> ,
},
{
	title: "Change Password",
	path: "/changePassword",
	icon: <FaIcons.FaKey />,

	


},
{
	title: "Change Privacy",
	path: "/changePrivacy",
	icon: <FaIcons.FaLock />,

	

},


{
	title: "Change Workday",
	path: "/changeWorkday",
	icon: <FaIcons.FaCalendar/>, 
	

	


},
{
	title: "Change Meal Times",
	path: "/changeMealTime",
	icon: <FaIcons.FaUtensils /> ,

	


},
{
	title: "Change Status",
	path: "/changeStatus",
	icon: <FaIcons.FaBan />,
},
];
