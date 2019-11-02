import React from 'react'
import './AnswerList.css'
import AnswerItem from './AnswerItem/AnswerItem'


const AnswerList = props => (
    <ul className="AnswerList">
        {
            props.answers.map((answer, index)=>{
                return (
                    <AnswerItem
                        key={index}
                        answer={answer}
                        onAnswerClick={props.onAnswerClick}
                    />
                )
            })
        }
    </ul>
)

export default AnswerList