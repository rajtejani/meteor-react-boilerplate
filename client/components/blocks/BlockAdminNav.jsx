import React from 'react';
import {NavLink} from "react-router-dom";

const BlockAdminNav = () => {
	return (
		<div className={"block BlockAdminNav"}>
			<NavLink className={"homeLink"} exact to="/admin/dashboard" activeClassName="selected">
				Home
			</NavLink>
			<NavLink className={"navLink"} strict to="/admin/users" activeClassName="selected">
				Users
			</NavLink>
		</div>
	)

};

export default BlockAdminNav;