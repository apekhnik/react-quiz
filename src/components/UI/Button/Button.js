import React from 'react'
import  './Button.css'
import PropTypes from 'react-dom'
const Button = ({onClick, disabled,type, children}) => {
    const cls= [
        
    ]
    return(
        <button
        onClick={onClick}
        disabled={disabled}
        className={'Button '+type}
        >
            {children}
        </button>
    )
}
Button.defaultProps = {
    children : 'test',
    disabled: false
}
export default Button