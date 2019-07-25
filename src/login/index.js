import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
/*import '../common/index.css';
import "./css/index.scss";*/
import "./css/index.scss";
import App from './js/containers/App';
import Preview from "./js/containers/Preview";
import {HashRouter as Router,Route} from 'react-router-dom';
import * as serviceWorker from '../serviceWorker';

ReactDOM.render(<Router>
    <App>
        <Route path="/" exact component={Preview}></Route>
    </App>

</Router>, document.getElementById('root'));
serviceWorker.register();