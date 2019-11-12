import ApiActions from '../ApiActions';

import AppAlertActions from "../AppAlertActions";

const SUBJECT_TEACHER_SCHEDULE_INIT = 'SUBJECT_TEACHER_SCHEDULE_INIT';

const SUBJECT_TEACHER_SCHEDULE_TEACHER_COUNT = 'SUBJECT_TEACHER_SCHEDULE_TEACHER_COUNT';

const SUBJECT_TEACHER_SCHEDULE_UPDATE = 'SUBJECT_TEACHER_SCHEDULE_UPDATE';

const STS_SUBJECT_CHANGE = 'STS_SUBJECT_CHANGE';

const STS_NOW_WEEK_CHANGE = 'STS_NOW_WEEK_CHANGE';

const STS_PAGE_ADD = 'STS_PAGE_ADD';

const LOADING_SHOW = 'LOADING_SHOW';

const LOADING_HIDE = 'LOADING_HIDE';

//课程详情弹窗开启和关闭
const MANAGER_STS_SCHEDULE_DETAIL_MODAL_SHOW = 'SCHEDULE_DETAIL_MODAL_SHOW';

const MANAGER_STS_SCHEDULE_DETAIL_MODAL_HIDE = 'SCHEDULE_DETAIL_MODAL_HIDE';

//loading

const MANAGER_STS_SCHEDULE_DETAIL_MODAL_LOADING_SHOW = 'MANAGER_STS_SCHEDULE_DETAIL_MODAL_LOADING_SHOW';

const MANAGER_STS_SCHEDULE_DETAIL_MODAL_LOADING_HIDE = 'MANAGER_STS_SCHEDULE_DETAIL_MODAL_LOADING_HIDE';

const MANAGER_STS_SCHEDULE_DETAIL_MODAL_INIT = 'MANAGER_STS_SCHEDULE_DETAIL_MODAL_INIT';


//调整时间弹窗
const MANAGER_STS_CHANGE_TIME_MODAL_SHOW = 'MANAGER_STS_CHANGE_TIME_MODAL_SHOW';

const MANAGER_STS_CHANGE_TIME_MODAL_HIDE = 'MANAGER_STS_CHANGE_TIME_MODAL_HIDE';

const MANAGER_STS_CHANGE_TIME_MODAL_LOADING_SHOW = 'MANAGER_STS_CHANGE_TIME_MODAL_LOADING_SHOW';

const MANAGER_STS_CHANGE_TIME_MODAL_LOADING_HIDE = 'MANAGER_STS_CHANGE_TIME_MODAL_LOADING_HIDE';

const MANAGER_STS_CHANGE_TIME_MODAL_INIT = 'MANAGER_STS_CHANGE_TIME_MODAL_INIT';

const MANAGER_STS_CHANGE_TIME_MODAL_CLASSHOUR_PICK = 'MANAGER_STS_CHANGE_TIME_MODAL_CLASSHOUR_PICK';

//调整教室弹窗

const MANAGER_STS_ADJUST_CLASSROOM_MODAL_SHOW = 'MANAGER_STS_ADJUST_CLASSROOM_MODAL_SHOW';

const MANAGER_STS_ADJUST_CLASSROOM_MODAL_HIDE = 'MANAGER_STS_ADJUST_CLASSROOM_MODAL_HIDE';

const MANAGER_STS_ADJUST_CLASSROOM_MODAL_LOADING_SHOW = 'MANAGER_STS_ADJUST_CLASSROOM_MODAL_LOADING_SHOW';

const MANAGER_STS_ADJUST_CLASSROOM_MODAL_LOADING_HIDE = 'MANAGER_STS_ADJUST_CLASSROOM_MODAL_LOADING_HIDE';

const MANAGER_STS_ADJUST_CLASSROOM_MODAL_INIT = 'MANAGER_STS_ADJUST_CLASSROOM_MODA_INIT';



//学科教师总表学科课表界面更新
const STSPageUpdate = (opt) => {

    return (dispatch,getState) => {

        dispatch({type:LOADING_SHOW});

        const {PeriodWeekTerm,LoginUser,Manager} = getState();
        //获取需要传递的参数
        let  {SchoolID} = LoginUser;

        let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;

        let {NowWeekNo,ItemSubjectSelect,schedule,pageIndex} = Manager.SubjectTeacherSchedule;

        let SubjectID = '';

        let PageIndex = 1;
        //判断已选中的学科是否为全部学科
        if (ItemSubjectSelect.value!==0){

            SubjectID = ItemSubjectSelect.value;

        }
        //如果是下一页的话
        if (opt&&opt.nextPage){

            PageIndex = pageIndex+1;

        }

        ApiActions.GetAllScheduleOfTeachersBySubjectIDForPage({

            PeriodID,SchoolID,SubjectID,WeekNO:NowWeekNo,PageIndex,PageSize:10,dispatch

        }).then(data => {

            if (data){

                let SubjectTeacherSchedule =  data.ItemTeacher.map((item) => {

                    let teacherObj = {

                        id:item.TeacherID,

                        name:item.TeacherName,

                        active:false

                    };

                    let list = data.ItemSchedule.map((i) => {

                        if (i.TeacherID === item.TeacherID){

                            return {

                                ...i,

                                type:i.ScheduleType,

                                title:(i.ClassName!==''?i.ClassName:i.CourseClassName),

                                titleID:(i.ClassName!==''?i.ClassID:i.CourseClassID),

                                secondTitle:i.SubjectName,

                                secondTitleID:i.SubjectID,

                                thirdTitle:i.ClassRoomName,

                                thirdTitleID:i.ClassRoomID

                            };

                        }else{

                            return;

                        }

                    }).filter(i => {return i!==undefined});

                    teacherObj['list'] = list;

                    return teacherObj;

                });
                //判断操作是否是下一页操作
                if (opt&&opt.nextPage){

                    schedule.push(...SubjectTeacherSchedule);

                    dispatch({type:SUBJECT_TEACHER_SCHEDULE_UPDATE,data:schedule});

                    dispatch({type:STS_PAGE_ADD});

                }else{

                    dispatch({type:SUBJECT_TEACHER_SCHEDULE_UPDATE,data:SubjectTeacherSchedule});

                }

                dispatch({type:SUBJECT_TEACHER_SCHEDULE_TEACHER_COUNT,data:data.TeacherCount});

                dispatch({type:LOADING_HIDE});

            }

        });

    }

};



//课程详情弹窗

const ScheduleDetailShow = (Params) => {

    return (dispatch,getState)=>{

        const { SchoolID } = getState().LoginUser;

        const { TeacherID,ScheduleID,ClassDate,ClassHourNO } = Params;

        dispatch({type:MANAGER_STS_SCHEDULE_DETAIL_MODAL_SHOW});

        ApiActions.GetScheduleDetailByUserID({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO,dispatch}).then(data=>{

            if (data){

                dispatch({type:MANAGER_STS_SCHEDULE_DETAIL_MODAL_INIT,data:data});

            }

            dispatch({type:MANAGER_STS_SCHEDULE_DETAIL_MODAL_LOADING_HIDE});

        })

    }

};

//停课
const StopSchedule = (params) => {

  return (dispatch,getState) => {

        const { SchoolID } = getState().LoginUser;

        const { TeacherID,ClassDate,ClassHourNO,ScheduleID } = params;

        ApiActions.OverScheduleAndGetTea({ScheduleID,SchoolID,TeacherID,ClassDate,ClassHourNO,dispatch}).then(data=>{

           if (data===0){

                dispatch(AppAlertActions.alertSuccess({title:'停课成功!'}));

                dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

           }

        });

    }

};

//恢复停课
const RebackStopSchedule = (params) => {

    return (dispatch,getState) => {

        const { SchoolID } = getState().LoginUser;

        const { TeacherID,ClassDate,ClassHourNO,ScheduleID } = params;

        ApiActions.CancelOverScheduleAndGetTea({ScheduleID,SchoolID,TeacherID,ClassDate,ClassHourNO,dispatch}).then(data=>{

            if (data===0){

                dispatch(AppAlertActions.alertSuccess({title:'恢复上课成功!'}));

                dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

            }

        });

    }

};

//撤销时间调整

const RebackTime = (params) => {

    return (dispatch,getState) => {

        const { SchoolID } = getState().LoginUser;

        const { TeacherID,ClassDate,ClassHourNO,ScheduleID } = params;

        ApiActions.CancelChangeDateAndGetTea({ScheduleID,SchoolID,TeacherID,ClassDate,ClassHourNO,dispatch}).then(data=>{

            if (data===0){

                dispatch(AppAlertActions.alertSuccess({title:'撤销调整时间成功!'}));

                dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

            }

        });

    }

};




//调整时间弹窗出现

const ChangeTimeShow = (params) =>{

    return (dispatch,getState) => {

        const { ClassDate,ClassHourNO,StartEndTime,WeekDay,

            ClassHourName,ClassHourType,TeacherID,ScheduleID,NowClassRoomID,NowClassRoomName

        } = params;

        const { ItemWeek,NowDate } = getState().PeriodWeekTerm;

        const { ItemClassHour,ItemClassHourCount,NowClassHourNO } = getState().Manager.SubjectCourseGradeClassRoom;

        const WeekNO = getState().Manager.SubjectTeacherSchedule.NowWeekNo;

        dispatch({ type:MANAGER_STS_CHANGE_TIME_MODAL_SHOW});

        dispatch({type:MANAGER_STS_CHANGE_TIME_MODAL_INIT,data:{TeacherID,ScheduleID,NowClassRoomID,NowClassRoomName,StartEndTime,ClassHourType,NowDate,WeekDay,ItemClassHourCount,NowClassHourNO,WeekNO,ClassDate,ClassHourNO,ItemClassHour,ItemWeek}});

        dispatch({type:MANAGER_STS_CHANGE_TIME_MODAL_LOADING_HIDE});


    }

};


//点击某一个课时

const SelectClassHour = (params) => {

    return (dispatch,getState) => {

        const { SelectWeekDay,SelectClassHourNO,SelectDate } = params;

        dispatch({type:MANAGER_STS_CHANGE_TIME_MODAL_CLASSHOUR_PICK,data:{SelectWeekDay,SelectClassHourNO,SelectDate}})

    }

};




//调整时间切换周次

const WeekPick = (WeekNO) => {

    return (dispatch,getState) => {

        dispatch({type:MANAGER_STS_CHANGE_TIME_MODAL_INIT,data:{WeekNO}});

    }

};

//点击提交调整时间
const ChangeTimeCommit = () =>{

    return (dispatch,getState)=>{

        const { SelectDate,SelectClassHourNO,TeacherID,ClassDate,ClassHourNO,ScheduleID,NowClassRoomID,NowClassRoomName } = getState().Manager.SubjectTeacherSchedule.ChangeTime;

        if (SelectDate){

            dispatch({type:MANAGER_STS_CHANGE_TIME_MODAL_LOADING_SHOW});

            const { SchoolID } = getState().LoginUser;

            const ScheduleClassDateAndClassHourNO = `${SelectDate},${SelectClassHourNO}`;

            ApiActions.ChangeDateAndGetTea({

                SchoolID,ScheduleID,ScheduleClassDateAndClassHourNO,ClassDate,ClassHourNO,

                NowClassRoomID,NowClassRoomName,TeacherID,dispatch

            }).then(data=>{

                if (data===0){

                    dispatch(AppAlertActions.alertSuccess({title:"调整时间成功！"}));

                    dispatch(ScheduleModalInfoUpdate(SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO));

                }

                dispatch({type:MANAGER_STS_CHANGE_TIME_MODAL_LOADING_HIDE});

            })

        }else {

            dispatch(AppAlertActions.alertWarn({title:"请选择调整的时间！"}));

        }

    }

};



//调整教室弹窗show

const AdjustClassRoomShow = (params) => {

  return (dispatch,getState)=>{

      const { ClassDate,ClassHourNO,TeacherID,ScheduleID,NowClassRoomID,NowClassRoomName } = params;

      const { SchoolID } = getState().LoginUser;

      dispatch({ type:MANAGER_STS_ADJUST_CLASSROOM_MODAL_SHOW});

      let ClassRoomList = [];

      ApiActions.GetAllOptionForAddSchedule({SchoolID,dispatch}).then(data=>{

          if (data){

              ClassRoomList = data.ItemClassRoomType.map(item=>{

               let List = [];

               data.ItemClassRoom.map(i=>{

                   if (i.ClassRoomTypeID===item.ClassRoomTypeID&&i.ClassRoomID!==NowClassRoomID){

                       List.push({ID:i.ClassRoomID,Name:i.ClassRoomName});

                   }

               });

               return {

                   ID:item.ClassRoomTypeID,

                   Name:item.ClassRoomTypeName,

                   List

               }

            });

          }

          dispatch({type:MANAGER_STS_ADJUST_CLASSROOM_MODAL_INIT,data:{ClassDate,ClassHourNO,TeacherID,ScheduleID,NowClassRoomID,ClassRoomList}});

      });

      dispatch({type:MANAGER_STS_ADJUST_CLASSROOM_MODAL_LOADING_HIDE});

  }

};








//更新课程安排详情的内容

const ScheduleModalInfoUpdate = ({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}) => {

  return dispatch => {

      dispatch({type:MANAGER_STS_SCHEDULE_DETAIL_MODAL_LOADING_SHOW});

      ApiActions.GetScheduleDetailByUserID({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO,dispatch}).then(data=>{

          if (data){

              dispatch({type:MANAGER_STS_SCHEDULE_DETAIL_MODAL_INIT,data:data});

          }

          dispatch({type:MANAGER_STS_SCHEDULE_DETAIL_MODAL_LOADING_HIDE});

      })

  }

};


export default {

    SUBJECT_TEACHER_SCHEDULE_INIT,

    SUBJECT_TEACHER_SCHEDULE_TEACHER_COUNT,

    STS_SUBJECT_CHANGE,

    STS_NOW_WEEK_CHANGE,

    SUBJECT_TEACHER_SCHEDULE_UPDATE,

    STS_PAGE_ADD,

    LOADING_SHOW,

    LOADING_HIDE,

    MANAGER_STS_SCHEDULE_DETAIL_MODAL_SHOW,

    MANAGER_STS_SCHEDULE_DETAIL_MODAL_HIDE,

    MANAGER_STS_SCHEDULE_DETAIL_MODAL_LOADING_HIDE,

    MANAGER_STS_SCHEDULE_DETAIL_MODAL_INIT,

    MANAGER_STS_SCHEDULE_DETAIL_MODAL_LOADING_SHOW,

    //调整时间
    MANAGER_STS_CHANGE_TIME_MODAL_SHOW,

    MANAGER_STS_CHANGE_TIME_MODAL_HIDE,

    MANAGER_STS_CHANGE_TIME_MODAL_LOADING_SHOW,

    MANAGER_STS_CHANGE_TIME_MODAL_LOADING_HIDE,

    MANAGER_STS_CHANGE_TIME_MODAL_INIT,

    MANAGER_STS_CHANGE_TIME_MODAL_CLASSHOUR_PICK,

    //调整教室弹窗

    MANAGER_STS_ADJUST_CLASSROOM_MODAL_SHOW,

    MANAGER_STS_ADJUST_CLASSROOM_MODAL_HIDE,

    MANAGER_STS_ADJUST_CLASSROOM_MODAL_LOADING_SHOW,

    MANAGER_STS_ADJUST_CLASSROOM_MODAL_LOADING_HIDE,

    MANAGER_STS_ADJUST_CLASSROOM_MODAL_INIT,

    STSPageUpdate,

    ScheduleDetailShow,

    StopSchedule,

    RebackStopSchedule,

    ChangeTimeShow,

    SelectClassHour,

    WeekPick,

    ChangeTimeCommit,

    RebackTime,

    AdjustClassRoomShow

}