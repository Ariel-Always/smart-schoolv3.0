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
import SetLeaderMsg from './data/SetLeaderMsg';
import GetGraduateGradeClassMsg from './data/GetGraduateGradeClassMsg';
import GetGraduatePreview from './data/GetGraduatePreview';
import GetGraduateMsg from './data/GetGraduateMsg';
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
        GetSignUpLog,
        SetLeaderMsg,
        GetGraduateGradeClassMsg,
        GetGraduatePreview,
        GetGraduateMsg
    });
export default DataState;