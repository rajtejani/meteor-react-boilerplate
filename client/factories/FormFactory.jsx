import React, {Component} from 'react';
import FieldTextareaInput from "../components/fields/FieldTextareaInput";
import FieldSelectInput from "../components/fields/FieldSelectInput";
import FieldCheckbox from "../components/fields/FieldCheckbox";
import FieldTextInput from "../components/fields/FieldTextInput";
import { Random } from 'meteor/random';

//TODO: Figure out how to allow people to manipulate a text field in the middle without cursor moving to the end
export default class FormFactory extends Component {
	//FormFactory accepts 6 props
	//Prop 1: FormData (required), this is an array of Field attributes defined in utils.forms.js
	//Prop 2: submitText (required), the text to display in the form submit <button>
	//Prop 3: externalData, this is an optional field of data that is from external source like DB and must be mapped in parent controller to correlate with field classNames
	//Prop 4: nonFormData, this is external data that does not correlate to any fields but is necessary for submission of form (userId is a great example)
	//Prop 5: parentContext (required), reference to 'this' from component calling FormFactory
	//Prop 6: methodName (optional), this is a String of the method name to call, if it isn't provided the component calling FormFactory must have a function called 'method'
	constructor(props) {
		super(props);
		this.state = {
			isSubmitting: false
		};
		//Create new array in memory to avoid altering original array
		this.formData = JSON.parse(JSON.stringify(props.formData));

		//Create React Refs for focusing after render
		this.createRefs(this.formData);
	}

	createRefs(formData) {
		formData.forEach((formField) => {
			//Only text and textarea fields needs refs
			if(formField.fieldType === 'text' || formField.fieldType === 'textarea')
				this[formField.name] = React.createRef();
		});
	}

	componentDidUpdate(nextProps, nextState, nextContext) {
		//Focus the field that was being focused after update, text and textarea only
		if(this.state.focus && this[this.state.focus]) {
			this[this.state.focus].current.focus();
		}
	}

	componentDidMount() {
		//Build the form
		this.setState({formMap: this.buildForm()});
	}

	componentWillUnmount() {
	}

	onFocus = () => {
		//TODO: Put focus logic here
	};

	onBlur = () => {
		//TODO: Put Blur logic here
	};

	//This method toggles a boolean state value named after the id of the checkbox, it removes label so you can click the label as well
	onClick = (event) => {
		const target = event.target;
		const stateName = target.name ? target.name : target.dataset.click;

		this.setState({[stateName]: !this.state[stateName], focus: undefined});
	};

	//This method sets a string state value named after the id of the field
	onChange = (event) => {
		const stateName = event.target.name;

		this.setState({[stateName]: event.target.value, focus: stateName});
	};

	//Text and Textareas get a onFocus and onBlur event for styling purposes. They also get onChange
	bindTextFields = (fieldParams) => {
		fieldParams.onFocus = this.onFocus;
		fieldParams.onBlur = this.onBlur;
		fieldParams.reactReference = this[fieldParams.name];
		fieldParams = this.bindOnChange(fieldParams);

		return fieldParams;
	};

	//OnClick events are for text, textarea, select fields to keep state up to date with defaultValues
	bindOnChange = (fieldParams) => {
		fieldParams.onChange = this.onChange;
		const defaultValueFromState = this.state[fieldParams.name];
		fieldParams.defaultValue = typeof defaultValueFromState === 'string' ? defaultValueFromState : fieldParams.defaultValue;

		return fieldParams;
	};

	//OnClick events are for checkboxes and this binds the event and sets the stateful defaultValue
	bindOnClick = (fieldParams) => {
		fieldParams.onClick = this.onClick;
		fieldParams.defaultValue = typeof this.state[fieldParams.name] === 'boolean' ? this.state[fieldParams.name] : fieldParams.defaultValue;

		return fieldParams;
	};

	//This sets the defaultValues to the fields from an external source like Database
	setDefaultValues = (fieldParams) => {
		const externalData = this.props.externalData;

		if(externalData && typeof externalData === 'object') {
			const externalValue = externalData[fieldParams.className];
			fieldParams.defaultValue = externalValue;
			this.setState({[fieldParams.name]: externalValue})
		}
	};

	//This returns the different types of fields and appends the stateful functions to them
	appendField = (fieldParams) => {
			this.setDefaultValues(fieldParams);
			switch (fieldParams.fieldType) {
				case 'textarea':
					this.bindTextFields(fieldParams);
					return <FieldTextareaInput {...fieldParams} key={Random.id(8)}/>;
				case 'select':
					this.bindOnChange(fieldParams);
					return <FieldSelectInput {...fieldParams} key={Random.id(8)}/>;
				case 'checkbox':
					this.bindOnClick(fieldParams);
					return <FieldCheckbox {...fieldParams} key={Random.id(8)}/>;
				case 'text':
				default:
					this.bindTextFields(fieldParams);
					return <FieldTextInput {...fieldParams} key={Random.id(8)}/>;
			}
	};

	//The form is rebuilt every state change, which happens every onChange
	buildForm = () => {
		return this.formData.map(this.appendField)
	};

	//Submit Method creates a params object that is the pattern {fieldName: fieldValue}
	submitFormFactory = (e) => {
		e.preventDefault();

		const {methodName, parentContext} = this.props;
		const form = e.currentTarget;
		//Params are always equal to nonFormData or an empty object.
		const params = this.props.nonFormData || {};

		this.formData.forEach((fieldParams) => {
			const fieldClassName = fieldParams.className;
			const fieldName = fieldParams.name;

			switch (fieldParams.fieldType) {
				case 'checkbox':
					const checkedValue = fieldParams.value;
					params[checkedValue] = this.state[fieldName] || form.querySelector(`.${fieldClassName}`).checked;
					break;
				default:
					params[fieldClassName] = this.state[fieldName] || form.querySelector(`.${fieldClassName}`).value;
					break;
			}
		});

		//If a methodName is passed it will call a dynamic Meteor method and then a callback from parent component called submitCallback
		//Otherwise it calls a function by the name 'formSubmission' from parent component
		if(methodName)
			Meteor.call(methodName, params, parentContext.submitCallback);
		else if(parentContext.formSubmission && typeof parentContext.formSubmission === 'function')
			parentContext.formSubmission(params);
	};

	render() {
		return (
			<form className="FormFactory" onSubmit={this.submitFormFactory}>
				{this.state.formMap}
				<div className={"buttonWrap"}>
					<button>{this.props.submitText}</button>
				</div>
			</form>
		);
	}
}