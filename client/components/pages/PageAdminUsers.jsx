import React, {Component} from 'react';
import {withTracker} from "meteor/react-meteor-data";
import BlockAdminUsers from "../blocks/BlockAdminUsers";
import PartialLoadingSpinner from "../partials/PartialLoadingSpinner";

class PageAdminUsers extends Component {
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

	userBlock() {
		const {users} = this.props;

		if(users) {
			if(users.length)
				return <BlockAdminUsers users={users} />;
			else
				return <h3>No Users Found</h3>;
		}
		else {
			return <PartialLoadingSpinner />;
		}
	}

	render() {
		return (
			<div className="page PageAdminUsers">
				<h1>Admin Users</h1>
				{this.userBlock()}
			</div>
		);
	}
}

export default PageAdminUsersContainer = withTracker(() => {
	const subscription = Meteor.subscribe('users');

	if (subscription.ready()) {
		return {
			users: MODEL.users.getAllUsers()
		};
	}
})(PageAdminUsers);