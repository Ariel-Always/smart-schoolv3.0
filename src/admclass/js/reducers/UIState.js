import {combineReducers} from 'redux'
import AppLoading from './ui/AppLoading';
import AppAlert from './ui/AppAlert';
import ClassLoading from './ui/ClassLoading';
import GradeLoading from './ui/GradeLoading';
const  UIState = combineReducers({
    AppLoading,
    AppAlert,
    ClassLoading,
    GradeLoading
});

export default UIState;


