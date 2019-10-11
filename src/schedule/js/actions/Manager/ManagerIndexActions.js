import Method from '../Method';

import SCGCRActions  from './SCGCRActions'

import AppLoadingActions from '../../actions/AppLoadingActions'

import STSActions from './SubjectTeacherScheduleActions';

import STTActions from './SubjectTeacherTeacherActions';

import ApiActions from "../ApiActions";


//学科教师总表学科课表界面初始化
const STSPageInit = () => {

    return (dispatch,getState) => {

        dispatch({type:STSActions.LOADING_SHOW});

        let {PeriodWeekTerm,LoginUser} = getState();
        //如果前面获取的周次、学段信息已获得
        if (PeriodWeekTerm&&PeriodWeekTerm.ItemPeriod){

            let {SchoolID,UserID,UserType} =LoginUser;//需要的参数后期加入

            let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数

            let GetAllOptionByPeriodID = ApiActions.GetAllOptionByPeriodID({SchoolID,PeriodID,UserID,UserType,dispatch});

            let GetAllScheduleOfTeachersBySubjectIDForPage = ApiActions.GetAllScheduleOfTeachersBySubjectIDForPage({

                PeriodID,SchoolID,SubjectID:'',WeekNO:0,PageIndex:1,PageSize:10,dispatch

            });


            Promise.all([GetAllOptionByPeriodID,GetAllScheduleOfTeachersBySubjectIDForPage]).then((res)=>{
                //将课程、学期、等等放到redux中
                // res[0].Data['NowWeekNo'] = PeriodWeekTerm.NowWeekNo;

                let NowWeekNo = PeriodWeekTerm.NowWeekNo;

                dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0]});

                dispatch({type:STSActions.STS_NOW_WEEK_CHANGE,data:NowWeekNo});

                //组织课表的信息存放到redux中
                const json = res[1];

                let SubjectTeacherSchedule =  json.ItemTeacher.map((item) => {

                    let teacherObj = {

                        id:item.TeacherID,

                        name:item.TeacherName,

                        active:false

                    };

                    let list = json.ItemSchedule.map((i) => {

                        if (i.TeacherID === item.TeacherID){

                            return {

                                type:i.ScheduleType,

                                title:(i.ClassName!==''?i.ClassName:CourseClassName),

                                titleID:(i.ClassName!==''?i.ClassID:CourseClassID),

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

                dispatch({type:STSActions.SUBJECT_TEACHER_SCHEDULE_INIT,data:SubjectTeacherSchedule});

                dispatch({type:STSActions.LOADING_HIDE});

                dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

            });

        }else{//如果前面获取的周次、学段信息没获得跳转到课表首页。

            window.location.href='html/schedule#/';

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

          //let getSCGCPromise = Method.getGetData(`/scheduleSubjectGrade?SchoolID=${SchoolID}&PeriodID=${PeriodID}`);

          let GetAllOptionByPeriodID = ApiActions.GetAllOptionByPeriodID({SchoolID,PeriodID,UserID,UserType,dispatch});

          let GetTeacherBySubjectIDAndKey = ApiActions.GetTeacherBySubjectIDAndKey({

              SchoolID,SubjectID:'',PeriodID,Key:''

          });


          Promise.all([GetAllOptionByPeriodID,GetTeacherBySubjectIDAndKey]).then(res => {

              let NowWeekNo = PeriodWeekTerm.NowWeekNo;
              //将课程、学期、等等放到redux中

              dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0]});

              dispatch({type:STTActions.STT_NOW_WEEK_CHANGE,data:NowWeekNo});
              //根据获取的学科信息和教师信息组织数据
              let subjectList = res[0].ItemSubject;

              let leftMenuData = subjectList.map((item) => {

                  let list = res[1].map((i) => {

                      if (i.SubjectID===item.SubjectID){

                          return {

                              id:i.Teacher,

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

          });


      }else{//如果前面获取的周次、学段信息没获得，等待获得。

          window.location.href='html/schedule#/';

      }

  }

};



export default {

    STSPageInit,

    STTPageInit

}