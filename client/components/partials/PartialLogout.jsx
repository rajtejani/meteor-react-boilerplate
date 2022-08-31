import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

export default class PartialLogout extends Component {
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

	logout = () => {
		MODEL.users.logout();

		this.setState({redirect: '/'});
	};

	renderRedirect = () => {
		if(this.state.redirect) {
			return <Redirect push to={`${this.state.redirect}`}/>
		}
	};

	render() {
		return (
			<div className="partial PartialLogout">
				<div className={"buttonWrap"}>
					<button onClick={this.logout}>Logout</button>
				</div>
				{this.renderRedirect()}
			</div>
		);
	}
}