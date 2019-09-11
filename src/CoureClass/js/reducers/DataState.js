import {combineReducers} from 'redux';
import LoginUser from './data/LoginUser';
import GetCoureClassAllMsg from './data/GetCoureClassAllMsg';
import GetSubjectAllMsg from './data/GetSubjectAllMsg';


const DataState=combineReducers(
    {
        LoginUser,
        GetCoureClassAllMsg,
        GetSubjectAllMsg
        
    });
export default DataState;