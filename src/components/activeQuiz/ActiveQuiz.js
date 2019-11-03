import React from 'react'
import './ActiveQuiz.css'
import AnswerList from './AnswerList/AnswerList'


const ActiveQuiz = props =>(
    
    <div className="activeQuiz">
        <p className="question">
            <span>
                <strong>{props.quizLength}.</strong>&nbsp;
                {props.question}
                
            </span>

            <small> {props.activeQuestion} of {props.quizLength}</small>
        </p>
        <AnswerList
            state={props.state}
            onAnswerClick={props.onAnswerClick}
            answers={props.answers}
            
        />
    </div>
)
export default ActiveQuiz