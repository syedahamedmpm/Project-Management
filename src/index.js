import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import DeveloperTaskDetails from './DeveloperTaskDetais';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
