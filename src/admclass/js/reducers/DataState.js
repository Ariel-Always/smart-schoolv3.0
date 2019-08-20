import {combineReducers} from 'redux';
import LoginUser from './data/LoginUser';
import AllGradePreview from './data/AllGradePreview';
import SchoolGradeClasses from './data/SchoolGradeClasses';
import TheGradePreview from "./data/TheGradePreview";
import TheStudentList from "./data/TheStudentList";
import TheTeachersList from './data/TheTeachersList';
import StudentsCheckList from './data/StudentsCheckList';
import StudentsCheckAll from './data/StudentsCheckAll';
import StudentsPlainOptions from "./data/StudentsPlainOptions";
const DataState=combineReducers(
    {
        LoginUser,
        AllGradePreview,
        SchoolGradeClasses,
        TheGradePreview,
        TheStudentList,
        TheTeachersList,
        StudentsCheckList,
        StudentsCheckAll,
        StudentsPlainOptions
    });
export default DataState;