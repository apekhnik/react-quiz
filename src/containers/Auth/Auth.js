import React, {Component} from 'react'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import cl from 'classnames'
import './Auth.css'
import axios from 'axios'

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
export default class Auth extends Component {
    state ={
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'email',
                errorMessage: 'Enter correct email',
                valid: false,
                touched: false,
                validation: {
                    requreid: true,
                    email: true
                }
            },
            password:{
                value: '',
                type: 'password',
                label: 'password',
                errorMessage: 'Enter correct password',
                valid: false,
                touched: false,
                validation: {
                    requreid: true,
                    minLength: 6
                }
            }
        }
    }
    validateControl (value, validation) {
        if(!validation) {
            return true
        }
        let isValid = true
        if(validation.requreid){
            isValid = value.trim() !== '' && isValid
        }
        if(validation.email){
            isValid = validateEmail(value) && isValid
        }
        if(validation.minLength){
            isValid = value.length >= validation.minLength && isValid
        }
        return isValid
        
    }
    onChangeHandler = (e, controlName, validation)=>{
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}
        control.value =  e.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)
        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name=>{
            
            isFormValid = formControls[name].valid && isFormValid;
        })
        console.log(isFormValid&&'forva validna');
        this.setState({
            formControls, isFormValid
        })
        
    }
    renderInputs(){
        return Object.keys(this.state.formControls).map((controlName, index)=>{
            const {type, value, valid, label, touched, errorMessage, validation} = this.state.formControls[controlName]
            
            return(
                
                <Input
                    type={type}
                    key={controlName + index}
                    value={value}
                    valid={valid}
                    touched={touched}
                    label={label}
                    errorMessage={errorMessage}
                    shouldValidate={validation.requreid}
                    onChange={(e)=>this.onChangeHandler(e, controlName, validation.requreid )}
                />
            )
        })
    }
    submitHandler = e => {
        e.preventDefault()
    }
    registerHandler = async ( ) => {
        const authData ={
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        try{
            const respone = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDKRSWkGxTboI89LZ8sRB2p6-CftoLNJhk', authData)
            console.log(respone.data);
        }catch(e){
            console.log(e);
        }
       
    }
    loginHandler = async () => {
        const authData ={
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        try{
            const respone = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDKRSWkGxTboI89LZ8sRB2p6-CftoLNJhk', authData)
            console.log(respone.data);
        }catch(e){
            console.log(e);
        }
    }
    render(){
        return(
            <div className="Auth">
                <div>
                <h1>Auth</h1>
                <form action="" onSubmit={this.submitHandler} className="AuthForm">
                    {this.renderInputs()}
                    <Button
                        children="loGIn"
                        type="succes"
                        onClick={this.loginHandler}
                        disabled={!this.state.isFormValid}
                    />
                    <Button
                        children="registration"
                        type="primary"
                        onClick={this.registerHandler}
                    />
                </form>
                </div>
            </div>
        )
    }
}