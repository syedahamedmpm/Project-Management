import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import Project from './Projects';
import User from './Users';
import Task from './Tasks';
import DeveloperTaskDetails from './DeveloperTaskDetais';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<DeveloperTaskDetails />, document.getElementById('root'));
registerServiceWorker();
