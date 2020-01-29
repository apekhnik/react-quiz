import React, {Component} from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/qiuz/Quiz'
import {Route, Switch} from 'react-router-dom'
import Auth from './containers/Auth/Auth'
import QuizList from './containers/QuizList/QuizList'
import QuizCreator from './containers/QuizCreator/QuizCreator'



class App extends Component {
  render(){
    return (
      <Layout>
        <Switch>
          <Route path="/Auth" component={Auth}/>
          <Route path="/QuizCreator" component={QuizCreator}/>
          <Route path="/quiz/:id" component={Quiz}/>
          <Route path="/" component={QuizList}/>
        </Switch>
      </Layout>
      
    );
  }
}

export default App;
