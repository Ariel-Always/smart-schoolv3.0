import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';

import './css/index.scss';
/*import '../common/index.scss'*/
import App from './js/containers/App';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

import * as serviceWorker from '../serviceWorker';
moment.locale('zh-cn');
ReactDOM.render(<LocaleProvider locale={zhCN}><App /></LocaleProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
