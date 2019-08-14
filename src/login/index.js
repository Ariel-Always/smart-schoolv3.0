import React from 'react';
import ReactDOM from 'react-dom';
import '../common/index.scss';
import App from './js/containers/App'
import * as serviceWorker from '../serviceWorker';


ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.register();