import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class PartialPasswordReset extends Component {
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
			<div className="partial PartialPasswordReset">
				<Link className={"button"} to={'/request-reset'}>Reset Password</Link>
			</div>
		);
	}
}