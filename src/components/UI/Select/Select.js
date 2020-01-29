import React from 'react'
import './Select.css'


const Select = ({label, value, onChange, options}) => {
    const htmlFor = `${label} - ${Math.random()}`
    return(
        <div className="Select">
        <label htmlFor="">{label}</label>
            <select 
            id={htmlFor}
            onChange={onChange}
            value={value}
            >
                {options.map((option, index)=>{
                    return(
                       <option value={option.value} key={option.value + index}>
                           {option.text}
                       </option>
                    )
                })}
            </select>
        </div>
    )
}
export default Select