import { combineReducers } from 'redux';

import HeaderSetting from './HeaderSetting';

import Modules from './Modules';

import TeacherCustomModalShow from './TeacherCustomModalShow';

import TeacherCustomData from './TeacherCustomData';



const Index  = combineReducers({

    HeaderSetting,

    Modules,

    TeacherCustomModalShow,

    TeacherCustomData,

});

export default Index;