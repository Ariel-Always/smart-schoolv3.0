import {combineReducers} from 'redux'
import AppLoading from './ui/AppLoading';
import AppAlert from './ui/AppAlert';
import ClassLoading from './ui/ClassLoading'
const  UIState = combineReducers({
    AppLoading,
    AppAlert,
    ClassLoading
});

export default UIState;


