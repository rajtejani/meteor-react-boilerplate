import {Meteor} from "meteor/meteor";

Meteor.startup(() => {
	if (Meteor.settings.public.environment !== 'production') {
		console.warn('Seeding...');

		if (!MODEL.users.getAdmins().length) {
			console.warn('Seeding Admin');
			const adminProfile = {
				email: 'admin@organisations.com',
				password: 'AdmPass',
				profile: {
					firstName: 'Admin',
					lastName: 'User',
					zip: '83702',
					country: 'US'
				}
			};

			const adminId = MODEL.users.createUser(adminProfile);

			MODEL.users.makeAdmin(adminId);
		}
	}
});