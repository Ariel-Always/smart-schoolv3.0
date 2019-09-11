import {combineReducers} from 'redux';
import LoginUser from './data/LoginUser';
import GetCoureClassAllMsg from './data/GetCoureClassAllMsg';
import GetSubjectAllMsg from './data/GetSubjectAllMsg';
import GetClassAllMsg from './data/GetClassAllMsg';


const DataState=combineReducers(
    {
        LoginUser,
        GetCoureClassAllMsg,
        GetSubjectAllMsg,
        GetClassAllMsg
        
    });
export default DataState;