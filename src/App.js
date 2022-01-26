import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Project from './Projects';
import User from './Users';
import Task from './Tasks';
import Login from './Login';
import DeveloperTaskDetails from './DeveloperTaskDetais';

class App extends Component {
  
  render() {
    
    return (
      <div className="App container">
        <Switch>
          <Route path="/Tasks" component={Task}  />
          <Route path="/Users" component={User}  />
          <Route path="/DeveloperTaskDetails" component={DeveloperTaskDetails}/>
          <Route path="/Projects" component={Project}  />
          <Route path="/" component={Login}  />
        </Switch>
      </div>
    );
  }
}

export default App;
