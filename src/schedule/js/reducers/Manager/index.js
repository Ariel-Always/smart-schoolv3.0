import { combineReducers } from 'redux';

import SubjectCourseGradeClassRoom from "./SubjectCourseGradeClassRoom";

import SubjectTeacherSchedule from './SubjectTeacherSchedule';

import SubjectTeacherTeacherSchedule from "./SubjectTeacherTeacherSchedule";

import AdjustBtns from "./AdjustBtns";

import AddScheduleModal from "./AddScheduleModal";

//管理员角色的reduce

const Index = combineReducers({

    SubjectCourseGradeClassRoom,

    SubjectTeacherSchedule,

    SubjectTeacherTeacherSchedule,

    AdjustBtns,

    AddScheduleModal

});

export default Index;
