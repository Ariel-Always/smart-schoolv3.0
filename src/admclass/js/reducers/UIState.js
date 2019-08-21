import {combineReducers} from 'redux'
import AppLoading from './ui/AppLoading';
import AppAlert from './ui/AppAlert';
import ClassLoading from './ui/ClassLoading';
import GradeLoading from './ui/GradeLoading';
import StudentLoading from './ui/StudentLoading';
import AddClassModal from  './ui/AddClassModal';
import AdjustClassModal from './ui/AdjustClassModal';


const  UIState = combineReducers({
    AppLoading,
    AppAlert,
    ClassLoading,
    GradeLoading,
    StudentLoading,
    AddClassModal,
    AdjustClassModal
});

export default UIState;


