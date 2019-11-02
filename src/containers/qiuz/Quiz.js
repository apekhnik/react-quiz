import React, {Component} from 'react';
import './Quiz.css';
import ActiveQuiz from '../../components/activeQuiz/ActiveQuiz'


class Quiz extends Component {
    state ={
        activeQuestion: 0,
        quiz: [
            {
                question: 'Какого цвета небо?',
                rightAnswerId: 4,
                id:1,
                answers:[
                    {text: 'green', id :1},
                    {text: 'red', id :2},
                    {text: 'black', id :3},
                    {text: 'blue', id :4}
                ]
            },
            {
                question: 'Почем у вас банчат?',
                rightAnswerId: 4,
                id:2,
                answers:[
                    {text: 'по 500', id :1},
                    {text: 'по 400', id :2},
                    {text: 'по 300', id :3},
                    {text: 'по 1000', id :4}
                ]
            }
        ]
    }

    onAnswerClick = (answerId) =>{
        console.log('answerId : ', answerId);
        this.setState({
            activeQuestion: this.state.activeQuestion +1
        })
    }
    render(){
      return(
          <div className="Quiz">
              <div className="quizWrapper">
              <h1>Ответьте на мои вопросы</h1>
                  <ActiveQuiz
                    question={this.state.quiz[this.state.activeQuestion].question}
                    answers={this.state.quiz[this.state.activeQuestion].answers}
                    onAnswerClick={this.onAnswerClick}
                    quizLength={this.state.quiz.length}
                    activeQuestion={this.state.activeQuestion + 1}
                  />
              </div>
          </div>
      )
    }
  }
  export default Quiz