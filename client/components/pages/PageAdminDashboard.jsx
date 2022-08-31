import React, {Component} from 'react';
import {withTracker} from "meteor/react-meteor-data";
import PartialLogout from "../partials/PartialLogout";

class PageAdminDashboard extends Component {
	constructor() {
		super();
		this.state = {
			isSubmitting: false
		}
	}

	componentDidMount() {
	}

	componentWillUnmount() {
	}

	render() {

		return (
			<div className="PageAdminDashboard">
				<h1>Admin Dashboard</h1>
				<PartialLogout/>
			</div>
		);
	}
}

export default PageAdminDashboardContainer = withTracker(() => {
	//TODO: Add subscription for Admin Dashboard

	// const subscription = Meteor.subscribe();
	//
	// if (subscription.ready()) {
	// 	return {
	// 		//Return to props
	// 	};
	// }
})(PageAdminDashboard);