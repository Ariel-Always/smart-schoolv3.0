import { combineReducers } from 'redux';

import AppAlert from './AppAlert';

import AppLoading from './AppLoading';

import LoginUser from './LoginUser';

import ModuleCommonInfo from './ModuleCommonInfo';

import Manager from './Manager';






export let initialState = {};

let rootReducers = combineReducers({

    AppAlert,

    AppLoading,

    LoginUser,

    ModuleCommonInfo,

    Manager

});

export default rootReducers;
