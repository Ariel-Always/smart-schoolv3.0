import { combineReducers } from 'redux';
//教师reducer
import SubjectTeacherSubjectSchedule from './SubjectTeacherSubjectSchedule';

import SubjectCourseGradeClassRoom from './SubjectCourseGradeClassRoom';

import SubjectTeacherTeacherSchedule from './SubjectTeacherTeacherSchedule';

const Teacher = combineReducers({

    SubjectTeacherSubjectSchedule,

    SubjectCourseGradeClassRoom,

    SubjectTeacherTeacherSchedule

});

export default Teacher;