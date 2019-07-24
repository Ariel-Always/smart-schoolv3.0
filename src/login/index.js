import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
/*import '../common/index.css';
import "./css/index.scss";*/
import "./css/index.scss";
import App from './js/containers/App';
import Preview from "./js/containers/Preview";
import Grade from './js/containers/Grade';
import Class from './js/containers/Class';
import {HashRouter as Router,Route} from 'react-router-dom';
import * as serviceWorker from '../serviceWorker';

ReactDOM.render(<Router>
    <App>
        <Route path="/" exact component={Preview}></Route>
        <Route path="/grade/:id" exact component={Grade}></Route>
        <Route path="/grade/class/:id" component={Class}></Route>
    </App>

</Router>, document.getElementById('root'));
serviceWorker.register();