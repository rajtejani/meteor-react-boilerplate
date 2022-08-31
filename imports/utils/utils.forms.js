import { Random } from 'meteor/random';

UTILS.forms = {
	//Guarantees unique Ids for all fields, especially when same form is in DOM multiple times
	getFormDefinition(formName) {
		const formWithoutIds = JSON.parse(JSON.stringify(UTILS.forms[formName]));

		return formWithoutIds.map((formField) => {
			formField.id = Random.id(17);

			return formField;
		});
	},
	
	login: [
		{
			fieldType: 'text',
			name: 'loginEmailInput',
			className: 'emailInput',
			label: 'Email',
			type: 'email',
			required: true,
			autocomplete: 'email'
		},
		{
			fieldType: 'text',
			name: 'loginPasswordInput',
			className: 'passwordInput',
			label: 'Password',
			type: 'password',
			required: true,
			autocomplete: 'current-password'
		},
	],

	register: [
		{
			fieldType: 'text',
			name: 'registerFirstNameInput',
			className: 'firstNameInput',
			label: 'First Name',
			type: 'text',
			required: true,
			autocomplete: 'given-name'
		},
		{
			fieldType: 'text',
			name: 'registerLastNameInput',
			className: 'lastNameInput',
			label: 'Last Name',
			type: 'text',
			required: true,
			autocomplete: 'family-name'
		},
		{
			fieldType: 'text',
			name: 'registerEmailInput',
			className: 'emailInput',
			label: 'Email',
			type: 'email',
			required: true,
			autocomplete: 'email'
		},
		{
			fieldType: 'text',
			name: 'registerPasswordInput',
			className: 'passwordInput',
			label: 'Password',
			type: 'password',
			required: true,
			autocomplete: 'new-password'
		},
		{
			fieldType: 'select',
			options: UTILS.users.getCountrySelectOptions(),
			defaultValue: 'US',
			name: 'registerCountrySelect',
			className: 'countrySelect',
			label: 'Country',
			required: true,
		},
		{
			fieldType: 'checkbox',
			name: 'registerTermsCheckbox',
			className: 'termAndServiceCheckbox',
			label: 'Agree to Terms and Service',
			value: 'termsAndService',
			required: true,
		},
	],

	requestReset: [
		{
			fieldType: 'text',
			name: 'resetEmailInput',
			className: 'emailInput',
			label: 'Email',
			type: 'email',
			required: true,
			autocomplete: 'email'
		}
	],

	passwordReset: [
		{
			fieldType: 'text',
			name: 'resetPasswordInputOne',
			className: 'passwordInputOne',
			label: 'Password',
			type: 'password',
			required: true,
			autocomplete: 'new-password'
		},
		{
			fieldType: 'text',
			name: 'resetPasswordInputTwo',
			className: 'passwordInputTwo',
			label: 'Confirm Password',
			type: 'password',
			required: true,
			autocomplete: 'new-password'
		},
	],

	editUser: [
		{
			fieldType: 'text',
			name: 'changeUserEmail',
			className: 'userEmail',
			label: 'User Email',
			type: 'email',
			required: false,
			autocomplete: 'off'
		},
		{
			fieldType: 'checkbox',
			name: 'banUserCheckbox',
			className: 'banUser',
			label: 'Ban User',
			value: 'banUser',
			required: false,
		},
	]
};