import React, {Component} from 'react';
import FormFactory from "../../factories/FormFactory";
import {Redirect} from "react-router-dom";

export default class PageAdminLogin extends Component {
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

	formSubmission = (params) => {
		if(this.state.isSubmitting)
			return;

		const email = params.emailInput;
		const password = params.passwordInput;

		this.setState({isSubmitting: true});

		Meteor.loginWithPassword(email, password, this.loginCallback);
	};

	loginCallback = (err, res) => {
		this.setState({isSubmitting: false});

		if(err) {
			alert('There was an issue logging in. Please try again.');
		}
		else {
			this.setState({redirect: '/admin/dashboard'})
		}
	};

	renderRedirect = () => {
		if(this.state.redirect) {
			return <Redirect push to={`${this.state.redirect}`}/>
		}
	};

	render() {
		return (
			<div className="page PageAdminLogin">
				<h1>Admin Login</h1>
				<FormFactory formData={UTILS.forms.getFormDefinition('login')} submitText={'Login'} parentContext={this}/>
				{this.renderRedirect()}
			</div>
		);
	}
}