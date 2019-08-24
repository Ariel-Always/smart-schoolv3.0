import {combineReducers} from 'redux';
import LoginUser from './data/LoginUser';
import AllUserPreview from './data/AllUserPreview';
import SchoolLeaderPreview from './data/SchoolLeaderPreview'
import SubjectTeacherPreview from './data/SubjectTeacherPreview'
import GradeStudentPreview from './data/GradeStudentPreview'
import GradeClassMsg from './data/GradeClassMsg';
import SubjectTeacherMsg from './data/SubjectTeacherMsg';
const DataState=combineReducers(
    {
        LoginUser,
        AllUserPreview,
        SchoolLeaderPreview,
        SubjectTeacherPreview,
        GradeStudentPreview,
        GradeClassMsg,
        SubjectTeacherMsg
    });
export default DataState;