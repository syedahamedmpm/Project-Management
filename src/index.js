import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import Project from './Projects';
import User from './Users';
import Task from './Tasks';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Task />, document.getElementById('root'));
registerServiceWorker();
