import Method from "../Method";

import ApiActions from '../ApiActions';

const STT_SCHEDULE_INIT = 'STT_SCHEDULE_INIT';

const STT_NOW_WEEK_CHANGE = 'STT_NOW_WEEK_CHANGE';

const SCHEDULE_LOADING_SHOW = 'SCHEDULE_LOADING_SHOW';

const SCHEDULE_LOADING_HIDE = 'SCHEDULE_LOADING_HIDE';

const TEACHER_LIST_UPDATE = 'TEACHER_LIST_UPDATE';

const STT_SCHEDULE_CHANGE = 'STT_SCHEDULE_CHANGE';

const  SEARCH_TEACHER_RESULT_UPDATE = 'SEARCH_TEACHER_RESULT_UPDATE';

const SEARCH_TEACHER_RESULT_SHOW = 'SEARCH_TEACHER_RESULT_SHOW';

const SEARCH_TEACHER_RESULT_HIDE = 'SEARCH_TEACHER_RESULT_HIDE';

const SEARCH_LOADING_SHOW = 'SEARCH_LOADING_SHOW';

const SEARCH_LOADING_HIDE = 'SEARCH_LOADING_HIDE';

const SEARCH_TITLE_SHOW = 'SEARCH_TITLE_SHOW';

const SEARCH_TITLE_HIDE = 'SEARCH_TITLE_HIDE';




//学科教师总表教师课表，教师更改
const STTTeacherUpdate = (pickInfo) => {

    return (dispatch,getState) => {

        const { LoginUser,Teacher,PeriodWeekTerm } = getState();

        let {SchoolID} = LoginUser;

        let UserID = pickInfo.catChildrenId;

        let UserType = 1;

        let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;

        let NowWeekNo = Teacher.SubjectTeacherTeacherSchedule.NowWeekNo;


        ApiActions.GetScheduleByUserID({

            PeriodID,SchoolID,UserType,UserID,WeekNO:NowWeekNo,dispatch

        }).then(data => {

            if (data){

                let { ScheduleCount} = data;

                let schedule = data.ItemSchedule.map((item) => {

                    return {

                        title:item.SubjectName,

                        titleID:item.SubjectID,

                        secondTitle:(item.ClassName===''?item.CourseClassName:item.ClassName),

                        secondTitleID:(item.ClassName===''?item.CourseClassID:item.ClassID),

                        thirdTitle:item.ClassRoomName,

                        thirdTitleID:item.ClassRoomID,

                        WeekDay:item.WeekDay,

                        ClassHourNO:item.ClassHourNO,

                        ScheduleType:item.ScheduleType

                    }


                });

                dispatch({type:STT_SCHEDULE_CHANGE,data:{ScheduleCount,schedule,pickTeacher:pickInfo.catChildrenName,pickTeacherID:pickInfo.catChildrenId}});

                dispatch({type:SCHEDULE_LOADING_HIDE});

            }

        });

    }

};
//学科教师总表教师课表，周次变更
const STTWeekUpdate = () => {

    return (dispatch,getState) => {

        const { Teacher,LoginUser,PeriodWeekTerm } = getState();

        const { pickTeacher,pickTeacherID } = Teacher.SubjectTeacherTeacherSchedule;
        //当没有选择教师的时候就不请求后台接口。
        if (pickTeacher === ''){

            dispatch({type:STT_SCHEDULE_CHANGE,data:{schedule:[]}});

            dispatch({type:SCHEDULE_LOADING_HIDE});

        }else{

            let {SchoolID} = LoginUser;

            let UserID = pickTeacherID;

            let UserType = 1;

            let NowWeekNo = Teacher.SubjectTeacherTeacherSchedule.NowWeekNo;

            let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;

            ApiActions.GetScheduleByUserID({

            SchoolID,UserID,UserType,WeekNO:NowWeekNo,PeriodID,dispatch

            }).then(data => {

                if (data){

                    let { ScheduleCount} = data;

                    let schedule = data.ItemSchedule.map((item) => {

                        return {

                            title:item.SubjectName,

                            titleID:item.SubjectID,

                            secondTitle:(item.ClassName===''?item.CourseClassName:item.ClassName),

                            secondTitleID:(item.ClassName===''?item.CourseClassID:item.ClassID),

                            thirdTitle:item.ClassRoomName,

                            thirdTitleID:item.ClassRoomID,

                            WeekDay:item.WeekDay,

                            ClassHourNO:item.ClassHourNO,

                            ScheduleType:item.ScheduleType

                        }


                    });

                    dispatch({type:STT_SCHEDULE_CHANGE,data:{ScheduleCount,schedule}});

                    dispatch({type:SCHEDULE_LOADING_HIDE});

                }

            });

        }

    }

};

//科教师总表教师课表，搜索教师
const STTTeacherSearch = (val) => {

    return (dispatch,getState) => {

        dispatch({type:SEARCH_LOADING_SHOW});

        dispatch({type:SEARCH_TEACHER_RESULT_SHOW});

        let { LoginUser,Teacher,PeriodWeekTerm } = getState();

        let SchoolID = LoginUser.SchoolID;

        let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;

        let SubjectID ='';

        let Key = val;

        ApiActions.GetTeacherBySubjectIDAndKey({

            SchoolID,PeriodID,SubjectID,Key,dispatch

        }).then(data => {

           if (data){

               const result = data.map((item) => {

                  return {

                      id:item.Teacher,

                      name:item.TeacherName

                  }

               });

                dispatch({type:SEARCH_TEACHER_RESULT_UPDATE,data:result})

                dispatch({type:SEARCH_LOADING_HIDE});

           }

        });

    };

};
//教师端取消搜索
const cancelSearch = () => {

    return (dispatch,getState) => {

        const { Teacher,LoginUser,PeriodWeekTerm } = getState();

        const { SubjectTeacherTeacherSchedule } = Teacher;

        let SchoolID = LoginUser.SchoolID;

        let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;

        if (SubjectTeacherTeacherSchedule.searchTitleShow){

            dispatch({type:SEARCH_LOADING_SHOW});

            //如果学科提示语存在,重新请求后台接口。
            let getSTTMenuPromise = Method.getGetData(`/scheduleSubjectTeacherTeacher-teacher?SchoolID=${SchoolID}&PeriodID=${PeriodID}`);

            ApiActions.GetTeacherBySubjectIDAndKey({

                SchoolID,PeriodID

            }).then(data => {

                if (data){

                    let list = data.map((i) => {

                        return {

                            id:i.Teacher,

                            name:i.TeacherName

                        }

                    });

                    dispatch({type:SEARCH_TEACHER_RESULT_UPDATE,data:list});

                    dispatch({type:SEARCH_LOADING_HIDE});

                }

            });

        }else {

            dispatch({type:SEARCH_TEACHER_RESULT_HIDE});

        }





    }

};

export default {

    STT_NOW_WEEK_CHANGE,

    TEACHER_LIST_UPDATE,

    STT_SCHEDULE_CHANGE,

    SCHEDULE_LOADING_HIDE,

    SCHEDULE_LOADING_SHOW,

    SEARCH_TEACHER_RESULT_UPDATE,

    SEARCH_TEACHER_RESULT_SHOW,

    SEARCH_TEACHER_RESULT_HIDE,

    SEARCH_LOADING_HIDE,

    SEARCH_LOADING_SHOW,

    SEARCH_TITLE_HIDE,

    SEARCH_TITLE_SHOW,

    STT_SCHEDULE_INIT,

    STTTeacherUpdate,

    STTWeekUpdate,

    STTTeacherSearch,

    cancelSearch

}