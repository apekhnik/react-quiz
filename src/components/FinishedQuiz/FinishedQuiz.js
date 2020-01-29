import React from 'react'
import './FinishedQuiz.css'
import {Link} from 'react-router-dom'
import Button from '../UI/Button/Button'
const FinishedQuiz = props => {
    const succesCount = Object.keys(props.results).reduce((total, key)=>{
        console.log(props.results[key]);
        if(props.results[key] === 'success'){
            total++
        }
        return total
    }, 0)
   
    return(
        <div className="FinishedQuiz">
            <ul>
              
                {props.quiz.map((quizItem, index)=>{
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check'
                    ]
                   
                    return(
                        <li key={index
                        }>
                            <strong>{index + 1 }</strong>.&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')}/>
                        </li>
                    )
                })}
            </ul>
            <p>Угадали {succesCount} из {props.quiz.length}</p>
            <Button
                onClick={props.onRetry}
                type="primary"
            >Повторить</Button>
            <Link to='/'>
            <Button
                type="succes"
            >
                Перейти в список вопросов
            </Button>
            </Link>
            {/* <div>
                <button onClick={props.onRetry}>povtor</button>
            </div> */}
        </div>
    )
}
export default FinishedQuiz