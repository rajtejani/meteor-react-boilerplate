import {Accounts} from "meteor/accounts-base";
import {check, Match} from 'meteor/check';

Meteor.methods({
	requestPasswordReset({emailInput}) {
		emailInput = UTILS.strings.sanitizeEmail(emailInput);

		const matchingUser = Accounts.findUserByEmail(emailInput);

		if(!matchingUser)
			throw new Meteor.Error('no-match', 'That email doesn\'t belong to any user in our system.');

		Accounts.sendResetPasswordEmail(matchingUser._id, emailInput);
		console.warn('A password reset was initiated for ' + emailInput + '.');

		return true;
	},

	adminUpdateUser({userId, userEmail, banUser}) {
		const userDoc = MODEL.users.getCurrentUser();

		//TODO: Consider how to implement permissions gateway
		if(!userDoc)
			throw new Meteor.Error('no-user', 'You must be logged in to perform this action.');
		if(!MODEL.users.isAdmin(userDoc))
			throw new Meteor.Error('no-permission', 'Only Admins can update a user in this way.');

		const userObj = {
			userId: userId,
			email: userEmail,
			ban: banUser
		};

		return MODEL.users.adminUpdateUser(userObj);
	}
});

Accounts.onCreateUser((options, user) => {
	check(options,
		{
			email: String,
			password: String,
			profile: Object
		}
	);
	check(options.profile,
		{
			firstName: String,
			lastName: String,
			zip: String,
			country: String,
			profileImage: Match.Maybe(String)
		}
	);

	//TODO: Add logic for onboarding if there are multiple steps and Admin needs to be seeded at final value

	const {profile} = options;

	return {...user, profile};
});