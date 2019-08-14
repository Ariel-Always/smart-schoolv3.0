import { combineReducers } from 'redux';
import LoginUserInfo from './LoginUserInfo';
import UIState from './UIState';

export let initialState = {};

let rootReducers = combineReducers({
    LoginUserInfo,
    UIState
});
export default rootReducers;
