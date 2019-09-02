import {combineReducers} from 'redux';
import LoginUser from './data/LoginUser';
// import AllUserPreview from './data/AllUserPreview';
// import SchoolLeaderPreview from './data/SchoolLeaderPreview'
// import SubjectTeacherPreview from './data/SubjectTeacherPreview'
import GradeStudentPreview from './data/GradeStudentPreview'
import GradeClassMsg from './data/GradeClassMsg';
import ChangeInputValue from './data/ChangeInputValue'
import SubjectTeacherMsg from './data/SubjectTeacherMsg';
const DataState=combineReducers(
    {
        LoginUser,
        // AllUserPreview,
        // SchoolLeaderPreview,
        // SubjectTeacherPreview,
        GradeStudentPreview,
        GradeClassMsg,
        ChangeInputValue,
        SubjectTeacherMsg
    });
export default DataState;