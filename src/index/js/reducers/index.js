import {combineReducers} from 'redux';

import LoginUser from './LoginUser';

import AppAlert from "./AppAlert";

import AppLoading from  './AppLoading';

import Manager from './Manager/Index';

import Teacher from './Teacher/Index';



const Index = combineReducers({

    LoginUser,

    AppAlert,

    AppLoading,

    Manager,

    Teacher

});


export let initialState = {



};



export default Index