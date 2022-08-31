import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from './router.jsx';

import '/imports/utils/utils.shared.js';
import '/imports/utils/utils.ui.js';
import '/imports/utils/utils.modal.js';

import '/imports/models/model.shared.js';
import {Accounts} from "meteor/accounts-base";

Meteor.startup(() => {
	render(renderRoutes(), document.getElementById('app'));
});

Accounts.onResetPasswordLink((token) => {
	const origin = window.location.origin;

	window.location.href = `${origin}/reset-pass/${token}`;
});

Accounts.onLogout((user) => {
	window.location.href = '/';
});
