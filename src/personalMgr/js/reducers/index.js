import { combineReducers } from 'redux';

import AppAlert from './AppAlert';

import AppLoading from './AppLoading';

import LoginUser from './LoginUser';

import ModuleCommonInfo from './ModuleCommonInfo';

import BaseSetting from './BaseSetting';

import SafeSetting from './SafeSetting';






export let initialState = {};

let rootReducers = combineReducers({

    AppAlert,

    AppLoading,

    LoginUser,

    ModuleCommonInfo,

    BaseSetting,

    SafeSetting

});

export default rootReducers;
