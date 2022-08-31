import React, {Component} from 'react';
import FormFactory from "../../factories/FormFactory";
import {Link, Redirect} from "react-router-dom";

export default class PageRegister extends Component {
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

		const userObj = {
			email: UTILS.strings.sanitizeEmail(params.emailInput),
			password: params.passwordInput,
			profile: {
				firstName: params.firstNameInput,
				lastName: params.lastNameInput,
				country: params.countrySelect
			}
		};

		this.setState({isSubmitting: true});

		MODEL.users.createUser(userObj, this.registrationCallback);
	};

	registrationCallback = (err, res) => {
		this.setState({isSubmitting: false});

		if(err) {
			switch(err.error) {
				case 403:
					return alert('Someone has already created an account with that email. Choose another email address and please try again.');
				default:
					return alert(`There was an issue creating your account, ${err.reason}`);
			}
		}
		else {
			this.setState({redirect: '/home'});
		}
	};

	renderRedirect = () => {
		if(this.state.redirect) {
			return <Redirect push to={`${this.state.redirect}`}/>
		}
	};

	render() {
		return (
			<div className="page PageRegister">
				<h1>Register</h1>
				<FormFactory formData={UTILS.forms.getFormDefinition('register')} submitText={'Register'} parentContext={this}/>
				<Link className={"button"} to={'/'}>Back to Log In</Link>
				{this.renderRedirect()}
			</div>
		);
	}
}