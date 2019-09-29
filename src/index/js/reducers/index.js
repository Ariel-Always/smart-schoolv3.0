import {combineReducers} from 'redux';

import LoginUser from './LoginUser';

import AppAlert from "./AppAlert";



const Index = combineReducers({

    LoginUser,

    AppAlert

});


export let initialState = {



};



export default Index