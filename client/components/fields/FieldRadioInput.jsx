import React, {useState} from 'react';

const FieldRadioInput = ({className, id, label, labelHasHtml = false, name, value, defaultChecked, onChange = () => {}}) => {
    return (
        <div className={`field FieldRadioInput ${className}`}>
            {defaultChecked ?
                <input type={"radio"} className={`${className}Input`} id={id} name={name} value={value} defaultChecked={`defaultChecked`} onChange={onChange} />
                :
                <input type={"radio"} className={`${className}Input`} id={id} name={name} value={value} onChange={onChange} />
            }

            { !!label &&
                !!labelHasHtml ?
                <label htmlFor={id} dangerouslySetInnerHTML={{__html: label}}/>
                :
                <label htmlFor={id}>{label}</label>
            }
        </div>
    );
};

export default FieldRadioInput;