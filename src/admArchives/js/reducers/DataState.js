import {combineReducers} from 'redux';
import LoginUser from './data/LoginUser';
import AllUserPreview from './data/AllUserPreview';
import SchoolLeaderPreview from './data/SchoolLeaderPreview'
import SubjectTeacherPreview from './data/SubjectTeacherPreview'
import GradeStudentPreview from './data/GradeStudentPreview'
import GradeClassMsg from './data/GradeClassMsg';
import SubjectTeacherMsg from './data/SubjectTeacherMsg';
import SetStudentMsg from './data/SetStudentMsg';
import SetTeacherMsg from './data/SetTeacherMsg';
import TeacherTitleMsg from './data/TeacherTitleMsg';
import GetSignUpLog from './data/GetSignUpLog';
const DataState=combineReducers(
    {
        LoginUser,
        AllUserPreview,
        SchoolLeaderPreview,
        SubjectTeacherPreview,
        GradeStudentPreview,
        GradeClassMsg,
        SubjectTeacherMsg,
        SetStudentMsg,
        SetTeacherMsg,
        TeacherTitleMsg,
        GetSignUpLog
    });
export default DataState;