import { combineReducers } from 'redux';

import DataState from './DataState';

import UIState from './UIState';

import RouterSet from './RouterSet';

import ModuleSetting from './ModuleSettings';

import Teacher from './Teacher';

export let initialState = {};

let rootReducers = combineReducers({

    DataState,

    UIState,

    RouterSet,

    ModuleSetting,

    Teacher

});

export default rootReducers;
