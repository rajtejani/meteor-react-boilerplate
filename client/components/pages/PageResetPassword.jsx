import React, {Component} from 'react';
import FormFactory from "../../factories/FormFactory";
import {Redirect} from "react-router-dom";

export default class PageResetPassword extends Component {
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

		const passwordInput = params.passwordInputOne;
		const rePasswordInput = params.passwordInputTwo;
		const token = this.props.match.params.token;

		if(passwordInput !== rePasswordInput)
			return alert('Make sure your passwords match first.');

		this.setState({isSubmitting: true});

		Accounts.resetPassword(token, passwordInput, (err) => {
			this.setState({isSubmitting: false});

			if(err) {
				if(err.reason === 'Token expired')
					return alert('This link has expired. Please submit the "Reset Password" form again to request a new link.');
				else if(typeof err.error === 'string')
					return alert(err.reason);
				else
					return alert('There was a problem saving your password. Please refresh and try again.');
			}
			else {
				alert('Your password has been reset! Now you can now log into the app.');
				// Logging user out to minimize potential confusion among app users when viewing the browser interface.
				Meteor.logout();
				this.setState({redirect: '/'});
			}
		});
	};

	renderRedirect = () => {
		if(this.state.redirect) {
			return <Redirect push to={`${this.state.redirect}`}/>
		}
	};

	render() {
		return (
			<div className="page PageResetPassword">
				<h1>Password Reset</h1>
				<FormFactory formData={UTILS.forms.getFormDefinition('passwordReset')} submitText={'Submit'} parentContext={this}/>
				{this.renderRedirect()}
			</div>
		);
	}
}