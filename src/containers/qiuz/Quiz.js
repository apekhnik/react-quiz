import React, {Component} from 'react';
import './Quiz.css';
import ActiveQuiz from '../../components/activeQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import axios from 'axios'
import Loader from '../../components/UI/Loader/Loader'
class Quiz extends Component {
    state ={
        isFinished: false,
        results: {},
        activeQuestion: 0,
        answerState: null,
        quiz: [],
        loading: true
    }

    onAnswerClick = (answerId) =>{
        if(this.state.answerState){
            const key = Object.keys(this.state.answerState)[0]
            if(this.state.answerState[key] === 'succes'){
                return
            }
        }
        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results
        const timeout = window.setTimeout(()=>{
            if(this.quizFinish()){
                this.setState({
                    isFinished: true
                })
            }else{
                this.setState({
                    activeQuestion: this.state.activeQuestion +1, 
                    answerState: null
                })
            }
            window.clearInterval(timeout)
        }, 1000)
        
        if(question.rightAnswerId === answerId){
            if(!results[question.id]){
                results[question.id] = 'success'
            }
            
            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })
            console.log(results[answerId]);
            
            
            
        }else{
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results: results
            })
            console.log(results[answerId]);
        }
       
    }
    async componentDidMount(){
        try{
            const response = await axios.get(`https://react-quiz-6bcfa.firebaseio.com/quizex/${this.props.match.params.id}.json`)
            const quiz = response.data
            console.log(quiz);
            this.setState({
                quiz,
                loading: false
            })

        }catch(e){
            console.log(e);
        }
        console.log(`quizID = ${this.props.match.params.id}`);
    }
    quizFinish(){
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }
    retryHandler=()=>{
        this.setState({
            isFinished: false,
            results: {},
            activeQuestion: 0,
            answerState: null
        })
    }
    render(){
      return(
          <div className="Quiz">
              <div className="quizWrapper">
              <h1>Ответьте на мои вопросы</h1>
              {this.state.loading ?
                <Loader/> :
                this.state.isFinished 
                ? <FinishedQuiz
                     results={this.state.results}
                     quiz={this.state.quiz}
                     onRetry={this.retryHandler}
                 />
                : <ActiveQuiz
                question={this.state.quiz[this.state.activeQuestion].question}
                answers={this.state.quiz[this.state.activeQuestion].answers}
                onAnswerClick={this.onAnswerClick}
                quizLength={this.state.quiz.length}
                activeQuestion={this.state.activeQuestion + 1}
                state={this.state.answerState}
                 />
                  
            }
              
                  
              </div>
          </div>
      )
    }
  }
  export default Quiz