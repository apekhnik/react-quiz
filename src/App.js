import React, {Component} from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/qiuz/Quiz'



class App extends Component {
  render(){
    return (
      <Layout>
        <Quiz></Quiz>
      </Layout>
      
    );
  }
}

export default App;
