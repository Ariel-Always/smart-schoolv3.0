import { combineReducers } from 'redux';


import DataUpdate from './DataUpdate'
import AppAlert from './AppAlert'
let rootReducers = combineReducers({


    DataUpdate,
    AppAlert
})
export let initialState = {

};

export default rootReducers;