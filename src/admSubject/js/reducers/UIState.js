import {combineReducers} from 'redux'
import AppLoading from './ui/AppLoading';
import AppAlert from './ui/AppAlert';
const  UIState = combineReducers({
    AppLoading,
    AppAlert
});

export default UIState;


