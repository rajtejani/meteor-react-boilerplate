import {Meteor} from "meteor/meteor";
import ReactGA from "react-ga";

UTILS.ui = {
	unprotectedRoutes(pathName) {
		const unprotectedRoutes = [
			//TODO: Add routes that do not need limitedAccessController ran on them here
			'/register',
			'/admin',
			'/reset-pass'
		];

		return unprotectedRoutes.find((routeName) => {
			return routeName === pathName;
		});
	},

	limitedAccessController(data) {
		let redirectRoute = '';
		const currentPathName = data.location.pathname;

		// Send an event to Google Analytics to announce the page change
		//TODO: Uncomment when we get Analytics ID
		// UTILS.ui.reportGA(currentPathName);

		const doNotReroute = UTILS.ui.unprotectedRoutes(currentPathName);

		if(doNotReroute || !data.ready || data.canAccessFunc !== undefined && typeof data.canAccessFunc !== 'function') {
			return false;
		}
		else {
			const userDoc = MODEL.users.getCurrentUser();
			const canAccess = data.canAccessFunc ? data.canAccessFunc(userDoc) : true;

			if(!canAccess || !userDoc) {
				redirectRoute = '/';
			}
			else if(userDoc.isBanned) {
				Meteor.logout();
				redirectRoute = '/';
			}
			else if(typeof canAccess === 'number') {
				if(canAccess === 2 && currentPathName === '/')
					redirectRoute = '/home';
				else if(canAccess === 2 && currentPathName !== '/home')
					redirectRoute = currentPathName;
			}
		}

		return redirectRoute && redirectRoute !== currentPathName ? redirectRoute : false;
	},

	goBack() {
		this.props.history.goBack()
	},

	initializeGA() {
		const gaKey = Meteor.settings.public.ga;
		ReactGA.initialize(gaKey);
	},

	reportGA(currentPathName) {
		ReactGA.set({page: currentPathName}); //updates user's current page
		ReactGA.pageview(currentPathName); //record pageview
	}
};