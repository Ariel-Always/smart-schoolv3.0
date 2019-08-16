import {combineReducers} from 'redux';
import LoginUser from './data/LoginUser';
import AllGradePreview from './data/AllGradePreview';
const DataState=combineReducers(
    {
        LoginUser,
        AllGradePreview
    });
export default DataState;