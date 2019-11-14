import { combineReducers } from 'redux';
//教师reducer
import SubjectTeacherSubjectSchedule from './SubjectTeacherSubjectSchedule';

import SubjectCourseGradeClassRoom from './SubjectCourseGradeClassRoom';

import SubjectTeacherTeacherSchedule from './SubjectTeacherTeacherSchedule';

import PersonalSchedule from "./PersonalSchedule";

import AdjustByTeacherModal from './AdjustByTeacherModal';

import ClassTotal from './ClassTotal';

import ClassStudent from './ClassStudent';

import AddTempScheduleModal from './AddTempScheduleModal';

const Teacher = combineReducers({

    SubjectTeacherSubjectSchedule,

    SubjectCourseGradeClassRoom,

    SubjectTeacherTeacherSchedule,

    PersonalSchedule,

    AdjustByTeacherModal,

    ClassTotal,

    ClassStudent,

    AddTempScheduleModal

});

export default Teacher;