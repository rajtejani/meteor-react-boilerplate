import React, {Component} from 'react';
import FormFactory from "../../factories/FormFactory";
import {Link} from "react-router-dom";

export default class PageRequestReset extends Component {
	constructor() {
		super();
		this.state = {
			isSubmitting: false,
			initiated: false
		}
	}

	componentDidMount() {
	}

	componentWillUnmount() {
	}

	submitCallback = () => {
		this.setState({initiated: true})
	};

	render() {
		return (
			<div className="page PageRequestReset">
				{
					this.state.initiated ?
						<div className={"resetSent"}>
							<h3>A password reset link has been sent to your email!</h3>
							<Link className={"button"} to={'/'}>Back to Log In</Link>
						</div>
						:
						<div>
							<h1>Request Reset</h1>
							<FormFactory formData={UTILS.forms.getFormDefinition('requestReset')} methodName={'requestPasswordReset'} submitText={'Reset'} parentContext={this}/>
						</div>
				}
			</div>
		);
	}
}