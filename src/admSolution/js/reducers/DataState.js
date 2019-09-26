import {combineReducers} from 'redux';
import LoginUser from './data/LoginUser';


const DataState=combineReducers(
    {
        LoginUser,
        
    });
export default DataState;