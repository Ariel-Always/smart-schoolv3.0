import {combineReducers} from 'redux';
import LoginUser from './data/LoginUser';
import AllGradePreview from './data/AllGradePreview';
import SchoolGradeClasses from './data/SchoolGradeClasses';
import TheGradePreview from "./data/TheGradePreview";
const DataState=combineReducers(
    {
        LoginUser,
        AllGradePreview,
        SchoolGradeClasses,
        TheGradePreview
    });
export default DataState;