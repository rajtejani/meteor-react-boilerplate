import React, {Component} from 'react';
import {withTracker} from "meteor/react-meteor-data";
import FormFactory from "../../factories/FormFactory";
import {Link, Redirect} from "react-router-dom";

export default class PageLogin extends Component {
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
			this.setState({redirect: '/home'})
		}
	};

	renderRedirect = () => {
		if(this.state.redirect) {
			return <Redirect push to={`${this.state.redirect}`}/>
		}
	};

	render() {
		return (
			<div className="page PageLogin">
				<h1>Login</h1>
				<FormFactory formData={UTILS.forms.getFormDefinition('login')} submitText={'Login'} parentContext={this}/>
				<Link className={"button"} to={'/register'}>Register</Link>
				{this.renderRedirect()}
			</div>
		);
	}
}