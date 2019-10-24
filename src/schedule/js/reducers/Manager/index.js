import { combineReducers } from 'redux';

import SubjectCourseGradeClassRoom from "./SubjectCourseGradeClassRoom";

import SubjectTeacherSchedule from './SubjectTeacherSchedule';

import SubjectTeacherTeacherSchedule from "./SubjectTeacherTeacherSchedule";

import AdjustBtns from "./AdjustBtns";

import AddScheduleModal from "./AddScheduleModal";

import AdjustByTimeModal from './AdjustByTimeModal'

import StopScheduleModal from  './StopScheduleModal';

import DelScheduleModal from  './DelScheduleModal';


import AdjustByTeacherModal from "./AdjustByTeacherModal";

import ClassTotal from './ClassTotal';

import ClassSingle from './ClassSingle';

import ClassRoomTotal from './ClassRoomTotal';

import ClassRoomSingle from './ClassRoomSingle';

import ScheduleSetting from './ScheduleSetting';

//管理员角色的reduce

const Index = combineReducers({

    SubjectCourseGradeClassRoom,

    SubjectTeacherSchedule,

    SubjectTeacherTeacherSchedule,

    AdjustBtns,

    AddScheduleModal,

    AdjustByTimeModal,

    StopScheduleModal,

    DelScheduleModal,

    AdjustByTeacherModal,

    ClassTotal,

    ClassSingle,

    ClassRoomTotal,

    ClassRoomSingle,

    ScheduleSetting

});

export default Index;
