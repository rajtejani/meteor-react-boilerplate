import React, {Component} from 'react';
import ListingAdminUser from "../listings/ListingAdminUser";

export default class BlockAdminUsers extends Component {
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
		const {users} = this.props;

		return (
			<ul className="block BlockAdminUsers">
				{
					users.map((user) => {
						return <ListingAdminUser user={user} key={user._id} />
					})
				}
			</ul>
		);
	}
}