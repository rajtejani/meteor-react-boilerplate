import React, {Component} from 'react';
import {withTracker} from "meteor/react-meteor-data";
import PartialLogout from "../partials/PartialLogout";
import PartialPasswordReset from "../partials/PartialPasswordReset";

class PageHome extends Component {
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
			<div className="page PageHome">
				<h1>Home</h1>
				<PartialLogout/>
				<PartialPasswordReset />
			</div>
		);
	}
}

export default PageHomeContainer = withTracker(() => {
	//TODO: Add necessary subscription for home

	// const subscription = Meteor.subscribe();
	//
	// if (subscription.ready()) {
	// 	return {
	// 		//Return to props
	// 	};
	// }
})(PageHome);