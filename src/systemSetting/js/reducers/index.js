import { combineReducers } from 'redux';

// import ToggleActive from './ToggleActive'
import DataUpdate from './DataUpdate'
import AppAlert from './AppAlert'
let rootReducers = combineReducers({

    // ToggleActive,
    DataUpdate,
    AppAlert
})
export let initialState = {

};

export default rootReducers;