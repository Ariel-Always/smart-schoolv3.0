import {combineReducers} from 'redux';
import LoginUser from './data/LoginUser';
import GetCoureClassAllMsg from './data/GetCoureClassAllMsg';
import GetSubjectAllMsg from './data/GetSubjectAllMsg';
import GetClassAllMsg from './data/GetClassAllMsg';
import GetCourseClassDetailsMsg from './data/GetCourseClassDetailsMsg';
import TeacherMsg from './data/TeacherMsg';
import GetCourseClassDetailsHandleClassMsg from './data/GetCourseClassDetailsHandleClassMsg';
import GetSubjectTeacherMsg from './data/GetSubjectTeacherMsg';
import GetStudentClassMsg from './data/GetStudentClassMsg';


const DataState=combineReducers(
    {
        LoginUser,
        GetCoureClassAllMsg,
        GetSubjectAllMsg,
        GetClassAllMsg,
        GetCourseClassDetailsMsg,
        TeacherMsg,
        GetCourseClassDetailsHandleClassMsg,
        GetSubjectTeacherMsg,
        GetStudentClassMsg
        
    });
export default DataState;