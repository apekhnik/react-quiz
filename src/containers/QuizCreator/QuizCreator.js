import React, {Component} from 'react'
import './QuizCreator.css'
import Button from '../../components/UI/Button/Button'
import {createControl, validate, formValidate} from '../../form/formFramewor'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import axios from 'axios'

const createOptionControl = numb => {
    return createControl({
        label: `Вариант ${numb}`,
        errorMessage: 'Значение не может быть пустым', 
        id: numb
    },{required: true})
}
function createFormControl () {
    return {
        question: createControl({
            label: 'Ведите вопрос',
            errorMessage: 'Впрос не может быть пустым'
        },{required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}


export default class QuizCreator extends Component {
    state= {
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControl()
    }
    renderControls (){
        
            return Object.keys(this.state.formControls).map((controlName, index)=>{
               const control = this.state.formControls[controlName]
               
                return(
              <>
                 <Input 
                    label={control.label} 
                    errorMessage={control.errorMessage}
                    id={control.id}
                    value={control.value}
                    valid={control.valid}
                    shouldValidate={!!control.validation}
                    touched={control.touched}
                    onChange={e=> this.onChangeHandler(e.target.value, controlName)}
                />
                {index === 0 ? <hr/> : null}
              </>
                )
            })
        
    }
    onChangeHandler = (value, controlName)=>{
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}
        
        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)
       
        formControls[controlName] = control



        this.setState({
            formControls,
            isFormValid: formValidate(formControls)
        })
       
    }
    selectChangeHandler = e => {
        
        this.setState({
            rightAnswerId: +e.target.value
        })
       
    }
    submitHandler = e => {
        e.preventDefault()
    }
    addQustionHandler = (e) => {
            e.preventDefault()
            const quiz = this.state.quiz.concat()
            console.log(quiz);
            const index = quiz.length + 1
            const {question, option1, option2, option3, option4,} = this.state.formControls
            const qusetionItem = {
                question: question.value,
                id: index,
                rightAnswerId: this.state.rightAnswerId,
                answers: [
                    {text: option1.value, id: option1.id},
                    {text: option2.value, id: option2.id},
                    {text: option3.value, id: option3.id},
                    {text: option4.value, id: option4.id},
                ]

            }
            quiz.push(qusetionItem)
            this.setState({
                quiz,
                isFormValid: false,
                rightAnswerId: 1,
                formControls: createFormControl()
            })
    }
    createQuizHandler = async(e) =>{
            e.preventDefault()
            
            try{
                await axios.post('https://react-quiz-6bcfa.firebaseio.com/quizex.json', this.state.quiz)
                console.log(this.state.quiz.name);
                this.setState({
                    quiz: [],
                    isFormValid: false,
                    rightAnswerId: 1,
                    formControls: createFormControl()
                })
            }catch(e){
                console.log(e);
            }
           
    }
    render(){
        const select = <Select
                label="выбери правильный ответ"
                value={this.state.rightAnswerId}
                onChange={this.selectChangeHandler}
                options ={ [
                    {text: 1, value: 1},
                    {text: 2, value: 2},
                    {text: 3, value: 3},
                    {text: 4, value: 4},
                ]}
                      />
        return(
            <div className="QuizCreator">
               <div>
                    <h1>Создание теста</h1>
                    <form action="" onSubmit={this.submitHandler}>
                {this.renderControls()}
                {select}
                    <Button type='primary' onClick={this.addQustionHandler} children='создать вопрос'disabled={!this.state.isFormValid}/>
                    <Button type='succes' onClick={this.createQuizHandler} children='создать тест' disabled={this.state.quiz.length === 0}/>
                    </form>
               </div>
            </div>
        )
    }
}