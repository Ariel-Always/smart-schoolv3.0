import { combineReducers } from 'redux';

import LoginUser from "./LoginUser";

import AppLoading from "./AppLoading";

import ModuleSetting from "./ModuleSetting";

import Manager from './Manager/index';

import Teacher from './Teacher/index';

import PeriodWeekTerm from "./PeriodWeekTerm";


export let initialState = {};

let rootReducers = combineReducers({

    LoginUser,

    AppLoading,

    ModuleSetting,

    Manager,

    Teacher,

    PeriodWeekTerm

});

export default rootReducers;
