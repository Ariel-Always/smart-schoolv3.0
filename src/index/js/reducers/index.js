import {combineReducers} from 'redux';

import LoginUser from './LoginUser';

import AppAlert from "./AppAlert";

import AppLoading from  './AppLoading';

import Manager from './Manager/Index';



const Index = combineReducers({

    LoginUser,

    AppAlert,

    AppLoading,

    Manager

});


export let initialState = {



};



export default Index