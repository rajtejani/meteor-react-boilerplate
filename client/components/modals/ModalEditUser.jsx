import React, {Component} from 'react';
import FormFactory from "../../factories/FormFactory";
import PartialModalHeader from "../partials/PartialModalHeader";

export default class ModalEditUser extends Component {
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

	mapFormData = () => {
		const {user} = this.props;

		return {
			userEmail: user.emails[0].address,
			banUser: !!user.isBanned
		}
	};

	submitCallback = (err, res) => {
		if(err) {
			switch(err.error) {
				case 'no-user':
				case 'no-permission':
					return alert(err.reason);
				default:
					return alert('There was an issue updating this user');
			}
		}
		else {
			UTILS.modal.closeModal();
		}
	};

	render() {
		const {user} = this.props;

		return (
			<div className="modalAdmin ModalStyle ModalEditUser">
				<PartialModalHeader title={"Edit User"} />
				<p>{MODEL.users.getUserName(user)}</p>
				<FormFactory formData={UTILS.forms.getFormDefinition('editUser')} externalData={this.mapFormData()} nonFormData={{userId: user._id}} methodName={'adminUpdateUser'} submitText={'Update'} parentContext={this}/>
			</div>
		);
	}
}