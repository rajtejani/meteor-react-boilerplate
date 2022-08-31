import React from 'react';

const FieldTextInput = ({id, name, className, label, labelHasHtml = false, type = 'text', required, defaultValue, onChange = ()=>{}, onBlur = ()=>{}, onFocus = ()=>{}, autocomplete = 'off', focused, reactReference}) => {
	const isRequired = required ? 'required' : '';
	autocomplete = autocomplete || 'off';

	return (
		<div id={`${id}Wrap`} className={`field inputGroup FieldTextInput ${focused === id ? "focus" : ""}`}>
			{ !!label &&
				!!labelHasHtml ?
				<label htmlFor={id} dangerouslySetInnerHTML={{__html: label}}/>
				:
				<label htmlFor={id}>{label}</label>
			}
			<div className={"inputWrap"}>
				<input id={id} name={name} className={className} type={type} required={(isRequired)} onFocus={onFocus} onBlur={onBlur} onChange={onChange} defaultValue={defaultValue} autoComplete={autocomplete} min={UTILS.limits.text.min} max={UTILS.limits.text.max} ref={reactReference}/>
			</div>
		</div>
	);
};

export default FieldTextInput;

//Implementation Notes
//id - String for targeting wrapper and input element
//name - Required String to denote name for FormFactory
//className - String for styling input field and the wrapper
//label - Optional String if the input field has a Label
//type - String for what type of input field HTML form fill
//required - Boolean for HTML form Validation
//defaultValue - String for the value provided to the Field
//onChange - Function passed from Parent when input field is changed
//onBlur - Function passed from Parent for Blur event
//onFocus - Function passed from Parent for Focus event
//autocomplete - Boolean for standard autocomplete
//focused - String to pass and if it matches id it adds 'focus' class for styling
//reactReference - React ref added by using React.createRef() handled by FormFactory