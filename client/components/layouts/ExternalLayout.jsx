import React, {useState} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {withTracker} from "meteor/react-meteor-data";
import {Accounts} from "meteor/accounts-base";

const External = ({component: Component, ...rest}) => {
	const [modalState, setModal] = useState(null);
	UTILS.modal.setSetModal(setModal);
	const redirectRoute = UTILS.ui.limitedAccessController(rest);

	return (
		<Route {...rest} render={matchProps => (
			redirectRoute ?
				<Redirect push to={redirectRoute} /> :
				<div className={"layout ExternalLayout"}>
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

export default ExternalContainer = withTracker(() => {
	const subscription = Meteor.subscribe('ownUserData');

	if(subscription.ready()) {
		return {
			canAccessFunc: () => {} //TODO: Add what a public users Access function should be
		};
	}
})(External);