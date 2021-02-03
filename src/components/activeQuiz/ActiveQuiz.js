import React from 'react'
import './ActiveQuiz.css'
import AnswerList from './AnswerList/AnswerList'


const ActiveQuiz = (props) =>(
    const {activeQuestion,quizLength,state,onAnswerClick,answers,question} = props
    <div className="activeQuiz">
        <p className="question">
            <span>
                <strong>{activeQuestion}.</strong>&nbsp;
                {question}
                
            </span>

            <small> {activeQuestion} of {quizLength}</small>
        </p>
        <AnswerList
            state={state}
            onAnswerClick={onAnswerClick}
            answers={answers}
            
        />
    </div>
)
export default ActiveQuiz
