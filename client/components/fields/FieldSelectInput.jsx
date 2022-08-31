import React from 'react';
import { Random } from 'meteor/random';

const FieldSelectInput = ({options = [], name, defaultValue, className, id, required, label, labelHasHtml = false, onChange = () => {}}) => {
	const isRequired = required ? 'required' : '';

	return (
		<div className={`field FieldSelectInput ${className}-ClassWrap`} id={`${id}Wrap`}>
			{ !!label &&
				!!labelHasHtml ?
				<label htmlFor={id} dangerouslySetInnerHTML={{__html: label}}/>
				:
				<label htmlFor={id}>{label}</label>
			}
			<div className={'selectWrap'}>
				<select id={id} name={name} className={className} required={(isRequired)} value={defaultValue} onChange={onChange}>
					{
						[...options].map(option => {
							return <option key={Random.id(8)} value={option.value} id={option.name} disabled={!option.value ? 'disabled' : ''}>
								{option.name}
							</option>
						})
					}
				</select>
			</div>
		</div>
	);
};

export default FieldSelectInput;

//Implementation Notes
//options - Array of Select Objects with a Name and Value field
//name - Required String to denote name for FormFactory
//defaultValue - Used to have an option selected
//className - String for styling Select field and the wrapper
//id - String for targeting wrapper and Select element
//required - Boolean for HTML form Validation
//label - Optional String if the select field has a Label
//onChange - Function passed from Parent that updates the defaultValue field