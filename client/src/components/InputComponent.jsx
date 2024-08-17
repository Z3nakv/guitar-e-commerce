import React from 'react';

const InputComponent = ({ htmlFor, section, value, defaultChecked }) => {
    return (
        <div className="inputDiv">
            <label htmlFor={htmlFor}>{value}</label>
            <input 
            type='radio' 
            name={section}
            id={htmlFor} 
            value={value} 
            defaultChecked={defaultChecked} 
            />
        </div>
    )
}

export default InputComponent;
