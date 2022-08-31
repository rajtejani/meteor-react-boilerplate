import React, {useState} from 'react';
import {Route, Redirect, NavLink} from 'react-router-dom';
import {withTracker} from "meteor/react-meteor-data";

const ExternalAdmin = ({component: Component, ...rest}) => {
	const [modalState, setModal] = useState(null);
	UTILS.modal.setSetModal(setModal);
	const redirectRoute = UTILS.ui.limitedAccessController(rest);

	return (
		<Route {...rest} render={matchProps => (
			redirectRoute ?
				<Redirect push to={redirectRoute} /> :
				<div className={"layout ExternalAdminLayout"}>
					<div className="content">
						<Component {...matchProps} />
					</div>
					{
						modalState &&
						<div className={'modalWrap'}>
							<div className={'modalContent'}>
								<div className={"modalUnderlay"} onClick={UTILS.modal.close}></div>
								<modalState.Component {...modalState.data}/>
							</div>
						</div>
					}
				</div>
		)} />
	)
};

export default ExternalAdminContainer = withTracker(() => {
	const subscription = Meteor.subscribe('adminUserData');

	if(subscription.ready()) {
		return {
			canAccessFunc: () => {} //TODO: Add function to keep non admin out of view
		};
	}
})(ExternalAdmin);