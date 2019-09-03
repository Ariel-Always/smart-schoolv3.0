import {combineReducers} from 'redux';
import LoginUser from './data/LoginUser';
import SubjectMsg from './data/SubjectMsg';
import PeriodMsg from './data/PeriodMsg';

const DataState=combineReducers(
    {
        LoginUser,
        SubjectMsg,
        PeriodMsg
    });
export default DataState;