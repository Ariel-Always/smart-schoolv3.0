import { combineReducers } from 'redux';

import DataState from './DataState';

import UIState from './UIState';

import RouterSet from './RouterSet';

export let initialState = {};

let rootReducers = combineReducers({

    DataState,

    UIState,

    RouterSet

});

export default rootReducers;
