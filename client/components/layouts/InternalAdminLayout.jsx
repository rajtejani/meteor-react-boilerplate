import React, {useState} from 'react';
import {Route, Redirect, NavLink} from 'react-router-dom';
import {withTracker} from "meteor/react-meteor-data";
import BlockAdminNav from "../blocks/BlockAdminNav";

const InternalAdmin = ({component: Component, ...rest}) => {
	const [modalState, setModal] = useState(null);
	UTILS.modal.setSetModal(setModal);
	const redirectRoute = UTILS.ui.limitedAccessController(rest);

	return (
		<Route {...rest} render={matchProps => (
			redirectRoute ?
				<Redirect push to={redirectRoute} /> :
				<div className={"layout InternalAdminLayout"}>
					<BlockAdminNav />
					<div className="content">
						<Component {...matchProps} />
					</div>

					{ modalState &&
						<div className={'modalWrap'}>
							<div className={'modalContent'}>
								<div className={"modalUnderlay"} onClick={UTILS.modal.close}/>
								<modalState.Component {...modalState.data}/>
							</div>
						</div>
					}
				</div>
		)} />
	)
};

export default InternalAdminContainer = withTracker(() => {
	const subscription = Meteor.subscribe('adminUserData');

	if(subscription.ready()) {
		return {
			ready: true,
			canAccessFunc: MODEL.users.isAdmin
		};
	}
})(InternalAdmin);