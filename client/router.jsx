import React from 'react';
import { Router, Switch, Route, Redirect} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import '/imports/utils/utils.js';
import '/imports/utils/utils.ui.js';
//Import components
import pages from '/client/components/pages/import.pages.js';
import layouts from '/client/components/layouts/import.layouts.js';

export const browserHistory = createBrowserHistory();
//TODO: Uncomment when we get Analytics ID
//UTILS.ui.intializeGA();

export const renderRoutes = () => (
	<Router history={browserHistory}>
		<Switch>
			<layouts.External exact path="/" component={pages.PageLogin} />
			<layouts.External exact path="/register" component={pages.PageRegister} />
			<layouts.Internal exact path="/home" component={pages.PageHome} />
			<layouts.Internal exact path="/request-reset" component={pages.PageRequestReset} />
			<layouts.External path="/reset-pass/:token" component={pages.PageResetPassword} />
			<layouts.ExternalAdmin exact path="/admin" component={pages.PageAdminLogin} />
			<layouts.InternalAdmin exact path="/admin/dashboard" component={pages.PageAdminDashboard} />
			<layouts.InternalAdmin exact path="/admin/users" component={pages.PageAdminUsers} />
			<Route path='/' render={() => (
				<Redirect push to="/" />
			)}/>
		</Switch>
	</Router>
);