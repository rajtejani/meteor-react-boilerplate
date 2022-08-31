/*    model._______.js
    Models are the only place in the whole system where we're allowed to directly invoke MongoDB calls (create, remove, update, upsert, find, findOne, etc).
    The restricted MODEL object is exposed to global scope so that users can interact with the database through functions you define here.
 */

import {Model} from '/imports/models/model.js';
import { Enum } from 'meteor/jagi:astronomy';
import {check, Match} from 'meteor/check'
import {Accounts} from "meteor/accounts-base";

const PERMS = Enum.create({
	name: 'PERMS',
	identifiers: {
		'User': 10,
		'Admin': 15,
		'SysAdmin': 20,
		'Banned': 30
	}
});

const STATUS = Enum.create({
	name: 'STATUS',
	identifiers: {
		'Pending': 10,
		'In Progress': 15,
		'Complete': 20
	}
});

/*    DEFINE COLLECTION.
    Define an instance of Model and a schema for a collection in the DB.
    This will be private to this file.
 */
MODEL.users = new Model({
	name: 'users',
	collection: Meteor.users,
	fields: {
		emails: [Object],
		perms: {
			type: PERMS,
			default: PERMS['User']
		},
		profile: {
			type: Object,
			fields: {
				firstName: String,
				lastName: String,
				zip: String,
				country: String,
				profileImage: {
					type: String,
					optional: true
				}
			}
		},
		onboarding: {
			type: STATUS,
			default: STATUS['Pending']
		},
		createdAt: Date,
		updatedAt: {
			type: Date,
			optional: true
		}
	},
});

/*  PUBLISH DATA FROM SERVER.
    Publish data from server to client.
    Exactly the same as Meteor.publish(), except `this.DB` is how you access the relevant collection and you don't have to wrap it in Meteor.isServer.
 */
MODEL.users.publish({
	'ownUserData': function () {
		check(this.userId, String);

		return this.DB.find({
			_id: this.userId,
		}, {
			fields: {
				profile: 1,
				emails: 1,
				onboarding: 1
			}
		});
	},

	'adminUserData': function () {
		check(this.userId, String);

		return this.DB.find({
			_id: this.userId,
		}, {
			fields: {
				profile: 1,
				emails: 1,
				perms: 1
			}
		});
	},

	'usersById': function (userIds) {
		check(userIds, [String]);

		return this.DB.find({_id: {$in: userIds}});
	},

	'userById': function (userId) {
		check(userId, String);

		return this.DB.find({_id: userId});
	},

	'users': function () {
		check(this.userId, String);

		if(!MODEL.users.isAdmin())
			return;

		return this.DB.find({_id: {$ne: this.userId}});
	}
});
/*  SUBSCRIBE CLIENT TO PUBLISHED DATA FROM SERVER.
    (Discouraged in most cases. Usually you should subscribe to data when you need it, not just when the page loads.)
    Subscribe to publications if you want their data available system-wide on the Client.
    Does not require Meteor.isClient or Tracker.autorun. If you want to disable Tracker.autorun, use MODEL.subscribeWithoutAutorun(...)
 */

/*  SHARED FUNCTIONS (CLIENT + SERVER).
    Define functions to _retrieve_ data. Subscribe first
    The MODEL object can be accessed anywhere and so will shared functions.
 */
MODEL.users.defineSharedFunctions({
	createUser({email, password, profile}, callback = undefined) {
		check({email, password}, {email: String, password: String});
		check(profile,
			{
				firstName: String,
				lastName: String,
				zip: String,
				country: String,
				profileImage: Match.Maybe(String)
			}
		);

		return Accounts.createUser({email, password, profile}, callback);
	},

	getUserOnboarding(userDoc) {
		userDoc = userDoc || MODEL.users.getCurrentUser();

		if(userDoc)
			return userDoc.onboarding;
	},

	getCurrentUser() {
		return Meteor.user();
	},

	getCurrentUserId() {
		return Meteor.userId();
	},

	isAdmin(userDoc) {
		userDoc = userDoc || MODEL.users.getCurrentUser();

		if(userDoc)
			return userDoc.perms === PERMS['Admin'] || userDoc.perms === PERMS['SysAdmin'];
	},

	getUserName(userDoc, abbreviate = false) {
		userDoc = userDoc || MODEL.users.getCurrentUser();

		if(userDoc) {
			const profile = userDoc.profile;

			if(abbreviate)
				return `${profile.firstName} ${profile.lastName[0]}.`;
			else
				return `${profile.firstName} ${profile.lastName}`;
		}
	},

	getUsersById(userIds) {
		return this.DB.find({_id: {$in: userIds}}).fetch();
	},

	getUserById(userId) {
		return this.DB.findOne({_id: userId});
	},

	getAllUsers() {
		const userDoc = MODEL.users.getCurrentUser();

		if(userDoc) {
			const userId = userDoc._id;

			return this.DB.find({_id: {$ne: userId}}).fetch()
		}
	},

	getUserEmail(userDoc) {
		userDoc = userDoc || MODEL.users.getCurrentUser();

		return userDoc.emails[0].address;
	},

	logout() {
		Meteor.logout();
	},

	getAdmins() {
		return this.DB.find({perms: {$in: [PERMS['Admin'], PERMS['SysAdmin']]}}).fetch();
	},
});

/*  SERVER-ONLY FUNCTIONS.
    Define functions to _modify_ data. This is "trusted" code, meaning that it is protected from users (until you create a Meteor method, that is).
    The MODEL object can be accessed anywhere, but these functions will only be available on the server.
 */
MODEL.users.defineServerOnlyFunctions({
	updateUserProfileImage(imgUrl) {
		const userId = Meteor.userId();

		return this.DB.update({_id: userId}, {$set: {'profile.profileImage': imgUrl}});
	},

	makeAdmin(userId) {
		return this.DB.update({_id: userId}, {$set: {perms: PERMS['Admin']}});
	},

	adminUpdateUser({userId, email, ban}) {
		return this.DB.update({_id: userId}, {$set: {'emails.0.address': email, isBanned: ban}});
	}
});