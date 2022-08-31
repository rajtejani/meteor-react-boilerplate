import React from 'react';

const FieldTextareaInput = ({id, name, className, label, labelHasHtml = false, required, defaultValue, onChange = ()=>{}, onBlur = ()=>{}, onFocus = ()=>{}, autocomplete = 'off', focused, reactReference}) => {
	const isRequired = required ? 'required' : '';
	autocomplete = autocomplete || 'off';

	return (
		<div id={`${id}Wrap`} className={`field inputGroup FieldTextareaInput ${className}-ClassWrap ${focused === id ? "focus" : ""}`}>
			{ !!label &&
				!!labelHasHtml ?
				<label htmlFor={id} dangerouslySetInnerHTML={{__html: label}}/>
				:
				<label htmlFor={id}>{label}</label>
			}
			<div className={"inputWrap"}>
				<textarea id={id} name={name} className={className} required={(isRequired)} onFocus={onFocus} onBlur={onBlur} onChange={onChange} defaultValue={defaultValue} autoComplete={autocomplete} minLength={UTILS.limits.textarea.min} maxLength={UTILS.limits.textarea.max} ref={reactReference}/>
			</div>
		</div>
	);
};

export default FieldTextareaInput;

//Implementation Notes
//id - String for targeting wrapper and textarea element
//name - Required String to denote name for FormFactory
//className - String for styling textarea field and the wrapper
//label - Optional String if the textarea field has a Label
//required - Boolean for HTML form Validation
//defaultValue - String for the value provided to the Field
//onChange - Function passed from Parent when textarea is changed
//onBlur - Function passed from Parent for Blur event
//onFocus - Function passed from Parent for Focus event
//autocomplete - Boolean for standard autocomplete
//focused - String to pass and if it matches id it adds 'focus' class for styling
//reactReference - React ref added by using React.createRef() handled by FormFactory
