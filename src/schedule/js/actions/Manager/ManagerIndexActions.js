import SCGCRActions  from './SCGCRActions'

import AppLoadingActions from '../../actions/AppLoadingActions'

import STSActions from './SubjectTeacherScheduleActions';

import STTActions from './SubjectTeacherTeacherActions';

import CTActions from './ClassTotalActions';

import CSActions from './ClassSingleActions';

import CRTActions from './ClassRoomTotalActions';

import CRSActions from './ClassRoomSingleActions';

import ApiActions from "../ApiActions";




//学科教师总表学科课表界面初始化
const STSPageInit = () => {

    return (dispatch,getState) => {

        dispatch({type:STSActions.LOADING_SHOW});

        let {PeriodWeekTerm,LoginUser} = getState();
        //如果前面获取的周次、学段信息已获得
        if (PeriodWeekTerm&&PeriodWeekTerm.ItemPeriod){

            let {SchoolID,UserID,UserType} =LoginUser;//需要的参数后期加入

            if (PeriodWeekTerm.ItemPeriod.length>0){

                let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数

                let GetAllOptionByPeriodID = ApiActions.GetAllOptionByPeriodID({SchoolID,PeriodID,UserID,UserType,dispatch});

                let GetAllScheduleOfTeachersBySubjectIDForPage = ApiActions.GetAllScheduleOfTeachersBySubjectIDForPage({

                    PeriodID,SchoolID,SubjectID:'',WeekNO:0,PageIndex:1,PageSize:10,dispatch

                });

                Promise.all([GetAllOptionByPeriodID,GetAllScheduleOfTeachersBySubjectIDForPage]).then((res)=>{
                    //将课程、学期、等等放到redux中
                    // res[0].Data['NowWeekNo'] = PeriodWeekTerm.NowWeekNo;

                    let NowWeekNo = PeriodWeekTerm.WeekNO;

                    dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0]});

                    dispatch({type:STSActions.STS_NOW_WEEK_CHANGE,data:NowWeekNo});

                    //组织课表的信息存放到redux中
                    const json = res[1];

                    let SubjectTeacherSchedule = [];

                    if (json.ItemTeacher.length>0){

                        SubjectTeacherSchedule =  json.ItemTeacher.map((item) => {

                            let teacherObj = {

                                id:item.TeacherID,

                                name:item.TeacherName,

                                active:false

                            };

                            let list = json.ItemSchedule.map((i) => {

                                if (i.TeacherID === item.TeacherID){

                                    return {

                                        type:i.ScheduleType,

                                        title:(i.ClassName!==''?i.ClassName:i.CourseClassName),

                                        titleID:(i.ClassName!==''?i.ClassID:i.CourseClassID),

                                        secondTitle:i.SubjectName,

                                        secondTitleID:i.SubjectID,

                                        thirdTitle:i.ClassRoomName,

                                        thirdTitleID:i.ClassRoomID,

                                        WeekDay:i.WeekDay,

                                        ClassHourNO:i.ClassHourNO

                                    };

                                }else {

                                    return ;

                                }

                            }).filter(i => {return i!==undefined});

                            teacherObj['list'] = list;

                            return teacherObj;

                        });

                    }

                    dispatch({type:STSActions.SUBJECT_TEACHER_SCHEDULE_INIT,data:SubjectTeacherSchedule});

                    dispatch({type:STSActions.SUBJECT_TEACHER_SCHEDULE_TEACHER_COUNT,data:json.TeacherCount});

                    dispatch({type:STSActions.LOADING_HIDE});

                    dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                });

            }else{

                window.location.href='/error.aspx';

            }


        }else{//如果前面获取的周次、学段信息没获得跳转到课表首页。

            window.location.href='/html/schedule';

        }

    }

};

//学科教师总表教师课表界面初始化
const STTPageInit = () => {

  return (dispatch,getState) => {

      dispatch({type:STTActions.SCHEDULE_LOADING_SHOW});

      let {PeriodWeekTerm,LoginUser} = getState();
      //如果前面获取的周次、学段信息已获得
      if (PeriodWeekTerm&&PeriodWeekTerm.ItemPeriod&&LoginUser.SchoolID){

          let {SchoolID,UserID,UserType} =LoginUser;//需要的参数后期加入

          let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数

          let GetAllOptionByPeriodID = ApiActions.GetAllOptionByPeriodID({SchoolID,PeriodID,UserID,UserType,dispatch});

          let GetTeacherBySubjectIDAndKey = ApiActions.GetTeacherBySubjectIDAndKey({

              SchoolID,SubjectID:'',PeriodID,Key:'',dispatch

          });


          Promise.all([GetAllOptionByPeriodID,GetTeacherBySubjectIDAndKey]).then(res => {

              let NowWeekNo = PeriodWeekTerm.WeekNO;

              dispatch({type:STTActions.STT_NOW_WEEK_CHANGE,data:NowWeekNo});
              //将课程、学期、等等放到redux中

              if (res[0]){

                  dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0]});

              }

              if (res[1]){

                  //根据获取的学科信息和教师信息组织数据
                  let subjectList = res[0].ItemSubject;

                  let leftMenuData = subjectList.map((item) => {

                      let list = res[1].map((i) => {

                          if (i.SubjectID===item.SubjectID){

                              return {

                                  id:i.TeacherID,

                                  name:i.TeacherName

                              }

                          }else{

                              return;

                          }

                      }).filter((i) =>i!==undefined);

                      return {

                          id:item.SubjectID,

                          name:item.SubjectName,

                          list

                      }

                  });

                  dispatch({type:STTActions.STT_SCHEDULE_INIT,data:leftMenuData});

                  dispatch({type:STTActions.SCHEDULE_LOADING_HIDE});

                  dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

              }

          });


      }else{//如果前面获取的周次、学段信息没获得，等待获得。

          window.location.href='/html/schedule';

      }

  }

};



const ClassTotalInit = () => {

    return (dispatch,getState) => {

        dispatch({type:CTActions.MANAGER_CLASS_TOTAL_LOADING_SHOW});

        let {PeriodWeekTerm,LoginUser} = getState();
        //如果前面获取的周次、学段信息已获得
        if (PeriodWeekTerm&&PeriodWeekTerm.ItemPeriod){

            let {SchoolID,UserID,UserType} =LoginUser;//需要的参数后期加入

            if (PeriodWeekTerm.ItemPeriod.length>0){

                let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数

                let GetAllOptionByPeriodID = ApiActions.GetAllOptionByPeriodID({SchoolID,PeriodID,UserID,UserType,dispatch});

                let GetAllScheduleOfClassByGradeIDForPage = ApiActions.GetAllScheduleOfClassByGradeIDForPage({

                    PeriodID,SchoolID,GradeID:'',WeekNO:0,PageIndex:1,PageSize:10,dispatch

                });

                let WeekList = [];
                //封装获取到的周次
                if (PeriodWeekTerm.ItemWeek.length>0) {

                    WeekList = PeriodWeekTerm.ItemWeek.map((item) => {

                        return {value:item.WeekNO,title:item.WeekNO};

                    });

                }

                dispatch({type:CTActions.MANAGER_CLASS_TOTAL_WEEK_LIST_UPDATE,data:WeekList});

                Promise.all([GetAllOptionByPeriodID,GetAllScheduleOfClassByGradeIDForPage]).then((res)=>{
                    //将课程、学期、等等放到redux中
                    // res[0].Data['NowWeekNo'] = PeriodWeekTerm.NowWeekNo;

                    let NowWeekNo = PeriodWeekTerm.WeekNO;

                    dispatch({type:CTActions.MANAGER_CLASS_TOTAL_WEEK_CHANGE,data:NowWeekNo});

                    if (res[0]){

                        let ClassDropList = res[0].ItemGrade.map(item=>{

                            return {

                                value:item.GradeID,

                                title:item.GradeName

                            }

                        });

                        dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0]});

                        dispatch({type:CTActions.MANAGER_CLASS_TOTAL_GRADE_UPDATE,data:ClassDropList});

                    }

                    if (res[1]){

                        //组织课表的信息存放到redux中
                        const json = res[1];

                        let Schedule = [];

                        if (json.ItemClass.length>0){

                            Schedule =  json.ItemClass.map((item) => {

                                let classObj = {

                                    id:item.ClassID,

                                    name:item.ClassName,

                                    active:false

                                };

                                let list = json.ItemSchedule.map((i) => {

                                    if (i.ClassID === item.ClassID){

                                        return {

                                            type:i.ScheduleType,

                                            title:i.SubjectName,

                                            titleID:i.SubjectName,

                                            secondTitle:i.TeacherName,

                                            secondTitleID:i.TeacherID,

                                            thirdTitle:i.ClassRoomName,

                                            thirdTitleID:i.ClassRoomID,

                                            WeekDay:i.WeekDay,

                                            ClassHourNO:i.ClassHourNO

                                        };

                                    }else {

                                        return ;

                                    }

                                }).filter(i => {return i!==undefined});

                                classObj['list'] = list;

                                return classObj;

                            });

                        }

                        dispatch({type:CTActions.MANAGER_CLASS_TOTAL_INIT,data:Schedule});

                        dispatch({type:CTActions.MANAGER_CLASS_TOTAL_CLASS_COUNT,data:json.ClassCount});


                    }

                    dispatch({type:CTActions.MANAGER_CLASS_TOTAL_LOADING_HIDE});

                    dispatch({type:AppLoadingActions.APP_LOADING_HIDE});


                });

            }else{

                window.location.href='/error.aspx';

            }


        }else{//如果前面获取的周次、学段信息没获得跳转到课表首页。

            window.location.href='/html/schedule';

        }

    }

};

const ClassSingleInit = () => {

    return (dispatch,getState) => {

        dispatch({type:CSActions.MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_SHOW});

        let {PeriodWeekTerm,LoginUser} = getState();
        //如果前面获取的周次、学段信息已获得
        if (PeriodWeekTerm&&PeriodWeekTerm.ItemPeriod&&LoginUser.SchoolID){

            let {SchoolID,UserID,UserType} =LoginUser;//需要的参数后期加入

            let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数

            let GetAllOptionByPeriodID = ApiActions.GetAllOptionByPeriodID({SchoolID,PeriodID,UserID,UserType,dispatch});

            let GetClassByGradeIDAndKey = ApiActions.GetClassByGradeIDAndKey({

                SchoolID,GradeID:'',PeriodID,Key:'',dispatch

            });


            Promise.all([GetAllOptionByPeriodID,GetClassByGradeIDAndKey]).then(res => {

                let NowWeekNo = PeriodWeekTerm.WeekNO;

                console.log(res[0]);

                //将课程、学期、等等放到redux中

                if (res[0]){

                    dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0]});

                    let WeekList = [];

                    PeriodWeekTerm.ItemWeek.map(item=>{

                       WeekList.push({

                           value:item.WeekNO,

                           title:item.WeekNO

                       });

                    });

                    dispatch({type:CSActions.MANAGER_CLASS_SINGLE_WEEK_LIST_UPDATE,data:WeekList});

                }

                if (res[1]){

                    //根据获取的学科信息和教师信息组织数据
                    let GradeList = res[0].ItemGrade;

                    let leftMenuData = GradeList.map((item) => {

                        let list = res[1].map((i) => {

                            if (i.GradeID===item.GradeID){

                                return {

                                    id:i.ClassID,

                                    name:i.ClassName

                                }

                            }else{

                                return;

                            }

                        }).filter((i) =>i!==undefined);

                        return {

                            id:item.GradeID,

                            name:item.GradeName,

                            list

                        }

                    });

                    dispatch({type:CSActions.MANAGER_CLASS_SINGLE_INIT});

                    dispatch({type:CSActions.MANAGER_CLASS_SINGLE_CLASS_LIST_UPDATE,data:leftMenuData});

                    dispatch({type:CSActions.MANAGER_CLASS_SINGLE_WEEK_CHANGE,data:NowWeekNo});

                    dispatch({type:CSActions.MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_HIDE});

                    dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                }

            });


        }else{//如果前面获取的周次、学段信息没获得，等待获得。

            window.location.href='/html/schedule';

        }

    }

};


const ClassRoomTotalInit = () => {

    return (dispatch,getState) => {

        dispatch({type:CRTActions.MANAGER_CLASS_ROOM_TOTAL_LOADING_SHOW});

        let {PeriodWeekTerm,LoginUser} = getState();
        //如果前面获取的周次、学段信息已获得
        if (PeriodWeekTerm&&PeriodWeekTerm.ItemPeriod){

            let {SchoolID,UserID,UserType} =LoginUser;//需要的参数后期加入

            if (PeriodWeekTerm.ItemPeriod.length>0){

                let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数

                let GetAllOptionByPeriodID = ApiActions.GetAllOptionByPeriodID({SchoolID,PeriodID,UserID,UserType,dispatch});

                let GetAllScheduleOfClassRoomByClassRoomTypeForPage = ApiActions.GetAllScheduleOfClassRoomByClassRoomTypeForPage({

                    PeriodID,SchoolID,ClassRoomType:'',WeekNO:0,PageIndex:1,PageSize:10,dispatch

                });

                let WeekList = [];
                //封装获取到的周次
                if (PeriodWeekTerm.ItemWeek.length>0) {

                    WeekList = PeriodWeekTerm.ItemWeek.map((item) => {

                        return {value:item.WeekNO,title:item.WeekNO};

                    });

                }

                dispatch({type:CRTActions.MANAGER_CLASS_ROOM_TOTAL_WEEK_LIST_UPDATE,data:WeekList});

                Promise.all([GetAllOptionByPeriodID,GetAllScheduleOfClassRoomByClassRoomTypeForPage]).then((res)=>{
                    //将课程、学期、等等放到redux中
                    // res[0].Data['NowWeekNo'] = PeriodWeekTerm.NowWeekNo;

                    let NowWeekNo = PeriodWeekTerm.WeekNO;

                    dispatch({type:CRTActions.MANAGER_CLASS_ROOM_TOTAL_WEEK_CHANGE,data:NowWeekNo});

                    if (res[0]){

                        let ClassRoomDropList = res[0].ItemClassRoomType.map(item=>{

                            return {

                                value:item.ClassRoomTypeID,

                                title:item.ClassRoomTypeName

                            }

                        });

                        dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0]});

                        dispatch({type:CRTActions.MANAGER_CLASS_ROOM_TOTAL_ROOMTYPE_LIST_UPDATE,data:ClassRoomDropList});

                    }

                    if (res[1]){

                        //组织课表的信息存放到redux中
                        const json = res[1];

                        let Schedule = [];

                        if (json.ItemClassRoom.length>0){

                            Schedule =  json.ItemClassRoom.map((item) => {

                                let classRoomObj = {

                                    id:item.ClassRoomID,

                                    name:item.ClassRoomName,

                                    active:false

                                };

                                let list = json.ItemSchedule.map((i) => {

                                    if (i.ClassRoomID === item.ClassRoomID){

                                        return {

                                            type:i.ScheduleType,

                                            title:i.SubjectName,

                                            titleID:i.SubjectName,

                                            secondTitle:i.TeacherName,

                                            secondTitleID:i.TeacherID,

                                            thirdTitle:(i.ClassName?i.ClassName:i.CourseClassName),

                                            thirdTitleID:(i.ClassName?i.ClassID:i.CourseClassID),

                                            WeekDay:i.WeekDay,

                                            ClassHourNO:i.ClassHourNO

                                        };

                                    }else {

                                        return ;

                                    }

                                }).filter(i => {return i!==undefined});

                                classRoomObj['list'] = list;

                                return classRoomObj;

                            });

                        }

                        dispatch({type:CRTActions.MANAGER_CLASS_ROOM_TOTAL_INIT,data:Schedule});

                        dispatch({type:CRTActions.MANAGER_CLASS_ROOM_TOTAL_CLASS_COUNT,data:json.ClassRoomCount});

                        dispatch({type:CRTActions.MANAGER_CLASS_ROOM_TOTAL_LOADING_HIDE});

                        dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                    }

                });

            }else{

                window.location.href='/error.aspx';

            }


        }else{//如果前面获取的周次、学段信息没获得跳转到课表首页。

            window.location.href='/html/schedule';

        }

    }

};

const ClassRoomSingleInit = () => {

    return (dispatch,getState) => {

        dispatch({type:CRSActions.MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_LOADING_SHOW});

        let {PeriodWeekTerm,LoginUser} = getState();
        //如果前面获取的周次、学段信息已获得
        if (PeriodWeekTerm&&PeriodWeekTerm.ItemPeriod&&LoginUser.SchoolID){

            let {SchoolID,UserID,UserType} =LoginUser;//需要的参数后期加入

            let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数

            let GetAllOptionByPeriodID = ApiActions.GetAllOptionByPeriodID({SchoolID,PeriodID,UserID,UserType,dispatch});

            let GetClassRoomByClassTypeAndKey = ApiActions.GetClassRoomByClassTypeAndKey({

                SchoolID,ClassRoomTypeID:'',PeriodID,Key:'',dispatch

            });


            Promise.all([GetAllOptionByPeriodID,GetClassRoomByClassTypeAndKey]).then(res => {

                let NowWeekNo = PeriodWeekTerm.WeekNO;

                console.log(res[0]);

                //将课程、学期、等等放到redux中

                if (res[0]){

                    dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0]});

                    let WeekList = [];

                    PeriodWeekTerm.ItemWeek.map(item=>{

                        WeekList.push({

                            value:item.WeekNO,

                            title:item.WeekNO

                        });

                    });

                    dispatch({type:CRSActions.MANAGER_CLASS_ROOM_SINGLE_WEEK_LIST_UPDATE,data:WeekList});

                    if (res[1]){

                        //根据获取的学科信息和教师信息组织数据
                        let ClassRoomTypeList = res[0].ItemClassRoomType;

                        let leftMenuData = ClassRoomTypeList.map((item) => {

                            let list = res[1].map((i) => {

                                if (i.ClassRoomTypeID===item.ClassRoomTypeID){

                                    return {

                                        id:i.ClassRoomID,

                                        name:i.ClassRoomName

                                    }

                                }else{

                                    return;

                                }

                            }).filter((i) =>i!==undefined);

                            return {

                                id:item.ClassRoomTypeID,

                                name:item.ClassRoomTypeName,

                                list

                            }

                        });

                        dispatch({type:CRSActions.MANAGER_CLASS_ROOM_SINGLE_INIT});

                        dispatch({type:CRSActions.MANAGER_CLASS_ROOM_SINGLE_CLASSROOM_LIST_UPDATE,data:leftMenuData});

                        dispatch({type:CRSActions.MANAGER_CLASS_ROOM_SINGLE_WEEK_CHANGE,data:NowWeekNo});


                    }

                }

                dispatch({type:CRSActions.MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_LOADING_HIDE});

                dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

            });


        }else{//如果前面获取的周次、学段信息没获得，等待获得。

            window.location.href='/html/schedule';

        }

    }

};

export default {

    STSPageInit,

    STTPageInit,

    ClassTotalInit,

    ClassSingleInit,

    ClassRoomTotalInit,

    ClassRoomSingleInit

}