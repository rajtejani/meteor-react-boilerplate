import React from 'react';

const FieldCheckbox = ({id, name, title = '', value, className, label, labelHasHtml = false, defaultValue = false, onClick = ()=>{}, required, nonForm = false}) => {
	const styleClass = nonForm ? 'nonForm' : 'form';
	const isChecked = defaultValue ? 'checked' : '';
	const isRequired = required ? 'required' : '';

	return (
		<div id={`${id}Wrap`} className={`field inputGroup FieldCheckbox ${className}-ClassWrap ${styleClass} ${defaultValue ? "active" : ""}`} onClick={onClick}>
			{title &&
				<p className={"title"}>{title}</p>
			}
			<span className={`fauxCheck ${isChecked} ${className}Wrap`}>
				<input id={id} name={name} className={className} type={'checkbox'} defaultChecked={(isChecked)} required={(isRequired)} />
				{ !!label &&
					!!labelHasHtml ?
					<label htmlFor={id} data-click={`${name}`} dangerouslySetInnerHTML={{__html: label}}/>
					:
					<label htmlFor={id} data-click={`${name}`}>{label}</label>
				}
			</span>
		</div>
	);
};

export default FieldCheckbox;

//Implementation Notes
//id - Used to query Checkbox on form submission and target the entire wrapper as id + Wrap
//name - Required String to denote name for FormFactory
//title - Optional String parameter if there needs to more information provided beyond label
//value - An optional value provided to give context to why the checkbox was clicked
//className - Styling class for checkbox and used for styling entire div with className + ClassWrap
//label - String used for Checkbox information
//defaultValue - Boolean parameter for input checked, defaultChecked allows it to be changed
//onClick - Function passed from parent template to toggle the checked attribute
//required -  Optional Boolean for HTML form Validation
//nonForm - Optional Boolean for Styling purposes if there are multiple checkbox styling in app