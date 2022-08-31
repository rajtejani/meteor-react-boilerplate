import React, {Component} from 'react';

export default class ListingAdminUser extends Component {
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

	editUser = () => {
		const {user} = this.props;

		UTILS.modal.open('ModalEditUser', {user: user});
	};

	render() {
		const {user} = this.props;

		return (
			<li className="listing ListingAdminUser">
				<p>{MODEL.users.getUserName(user)}</p>
				<div className={"buttonWrap"}>
					<button onClick={this.editUser}>Edit</button>
				</div>
			</li>
		);
	}
}