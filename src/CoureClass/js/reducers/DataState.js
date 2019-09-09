import {combineReducers} from 'redux';
import LoginUser from './data/LoginUser';
import GetCoureClassAllMsg from './data/GetCoureClassAllMsg';


const DataState=combineReducers(
    {
        LoginUser,
        GetCoureClassAllMsg
        
    });
export default DataState;