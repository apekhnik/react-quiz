import React from 'react'
import './AnswerItem.css'

const AnswerItem = props => {
            const cls = ['AnswerItem']
            // eslint-disable-next-line
            if(props.state=="success"){
                cls.push('succes')
            // eslint-disable-next-line
            }else if(props.state=="error"){
                cls.push('wrong')
            }
    return(
        <li className={cls.join(' ')}
            onClick={()=>{props.onAnswerClick(props.answer.id)}}
        >
            {props.answer.text}
        </li>
    )
}

export default AnswerItem