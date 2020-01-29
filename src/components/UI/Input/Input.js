import React from 'react'
import PropTypes from 'react-dom'
import cl from 'classnames'
import './Input.css'

const isInvalid = (valid, touched, shouldValidate)=> {
    return !valid && shouldValidate && touched
}

const Input = ({type, label, value, onChange, errorMessage,valid, touched, shouldValidate})=> {
    // const invalid = errorMessage&&'invalid'

    const invalid = isInvalid(valid, touched, shouldValidate)&&'invalid'
    const classes = cl(
        'Input',
        invalid
    )
    
    const htmlFor = `${type}-${Math.random()}`
    return(
        <div className={classes}>   
        <label htmlFor={htmlFor}>{label}</label>
             <input 
             type={type}
             id={htmlFor}
             value={value}
             onChange={onChange}
             />
            {invalid&&<span>{errorMessage}</span>}
        </div>
     )
}
Input.defaultProps = {
    type: 'text'
}
export default Input