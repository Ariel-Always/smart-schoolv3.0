import Method from '../Method';

import SCGCRActions  from './SCGCRActions'

import AppLoadingActions from '../../actions/AppLoadingActions'

import STSActions from './SubjectTeacherScheduleActions';

import STTActions from './SubjectTeacherTeacherActions';


//学科教师总表界面初始化
const STSPageInit = () => {

    return (dispatch,getState) => {

        let {PeriodWeekTerm,LoginUser} = getState();
        //如果前面获取的周次、学段信息已获得
        if (PeriodWeekTerm&&PeriodWeekTerm.ItemPeriod){

            let SchoolID =LoginUser.SchoolID;//需要的参数后期加入

            let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数

            let getSCGCPromise = Method.getGetData(`/scheduleSubjectGrade?SchoolID=${SchoolID}&PeriodID=${PeriodID}`);

            let getSTSPromise = Method.getGetData(`/scheduleSubjectTeacherSubject?PageSize=10&SchoolID=${SchoolID}&PeriodID=${PeriodID}&SubjectID=''&WeekNO=0&PageIndex=1`);


            Promise.all([getSCGCPromise,getSTSPromise]).then((res)=>{
                //将课程、学期、等等放到redux中
                // res[0].Data['NowWeekNo'] = PeriodWeekTerm.NowWeekNo;

                let NowWeekNo = PeriodWeekTerm.NowWeekNo;

                dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0].Data});

                dispatch({type:STSActions.STS_NOW_WEEK_CHANGE,data:NowWeekNo});

                //组织课表的信息存放到redux中
                const json = res[1].Data;

                let SubjectTeacherSchedule =  json.ItemTeacher.map((item) => {

                    let teacherObj = {

                        TeacherID:item.TeacherID,

                        TeacherName:item.TeacherName

                    };

                    let courseList = json.ItemSchedule.filter((i) => {

                        if (i.TeacherID === item.TeacherID){

                            return i;

                        }

                    });

                    teacherObj['courseList'] = courseList;

                    return teacherObj;

                });

                dispatch({type:STSActions.SUBJECT_TEACHER_SCHEDULE_INIT,data:SubjectTeacherSchedule});

                dispatch({type:STSActions.LOADING_HIDE});

                dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

            });

        }else{//如果前面获取的周次、学段信息没获得，等待获得。

            let  PeriodWeekTermInterVal =  setInterval(()=>{

                const {PeriodWeekTerm,LoginUser} = getState();

                if (PeriodWeekTerm&&PeriodWeekTerm.ItemPeriod){

                    clearInterval(PeriodWeekTermInterVal);

                    //异步获取到周次、学段信息等

                    let SchoolID =LoginUser.SchoolID;//需要的参数后期加入

                    let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数

                    let getSCGCPromise = Method.getGetData(`/scheduleSubjectGrade?SchoolID=${SchoolID}&PeriodID=${PeriodID}`);

                    let getSTSPromise = Method.getGetData(`/scheduleSubjectTeacherSubject?PageSize=10&SchoolID=${SchoolID}&PeriodID=${PeriodID}&SubjectID=''&WeekNO=0&PageIndex=1`);


                    Promise.all([getSCGCPromise,getSTSPromise]).then((res)=>{
                        //将课程、学期、等等放到redux中
                       // res[0].Data['NowWeekNo'] = PeriodWeekTerm.NowWeekNo;

                        let NowWeekNo = PeriodWeekTerm.NowWeekNo;

                        dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0].Data});

                        dispatch({type:STSActions.STS_NOW_WEEK_CHANGE,data:NowWeekNo});

                        //组织课表的信息存放到redux中
                        const json = res[1].Data;

                        let SubjectTeacherSchedule =  json.ItemTeacher.map((item) => {

                            let teacherObj = {

                                TeacherID:item.TeacherID,

                                TeacherName:item.TeacherName

                            };

                          let courseList = json.ItemSchedule.filter((i) => {

                                if (i.TeacherID === item.TeacherID){

                                    return i;

                                }

                          });

                          teacherObj['courseList'] = courseList;

                          return teacherObj;

                        });

                        dispatch({type:STSActions.SUBJECT_TEACHER_SCHEDULE_INIT,data:SubjectTeacherSchedule});

                        dispatch({type:STSActions.LOADING_HIDE});

                        dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                    });

                }

            },50)

        }

    }

};

//学科教师总表界面更新
const STSPageUpdate = (opt) => {

  return (dispatch,getState) => {

      dispatch({type:STSActions.LOADING_SHOW});

      const {PeriodWeekTerm,LoginUser,Manager} = getState();
      //获取需要传递的参数
      let SchoolID =LoginUser.SchoolID;

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

      let getSTSPromise = Method.getGetData(`/scheduleSubjectTeacherSubject?PageSize=10&SubjectID=${SubjectID}&SchoolID=${SchoolID}&PeriodID=${PeriodID}&WeekNO=${NowWeekNo}&PageIndex=${PageIndex}`);

      getSTSPromise.then(json => {

          let SubjectTeacherSchedule =  json.Data.ItemTeacher.map((item) => {

              let teacherObj = {

                  TeacherID:item.TeacherID,

                  TeacherName:item.TeacherName

              };

              let courseList = json.Data.ItemSchedule.filter((i) => {

                  if (i.TeacherID === item.TeacherID){

                      return i;

                  }

              });

              teacherObj['courseList'] = courseList;

              return teacherObj;

          });
          //判断操作是否是下一页操作
          if (opt&&opt.nextPage){

              schedule.push(...SubjectTeacherSchedule);

              dispatch({type:STSActions.SUBJECT_TEACHER_SCHEDULE_UPDATE,data:schedule});

              dispatch({type:STSActions.STS_PAGE_ADD});

          }else{

              dispatch({type:STSActions.SUBJECT_TEACHER_SCHEDULE_UPDATE,data:SubjectTeacherSchedule});

          }

          dispatch({type:STSActions.LOADING_HIDE});

      });

  }

};


const STTPageInit = () => {

  return (dispatch,getState) => {


      let {PeriodWeekTerm,LoginUser} = getState();
      //如果前面获取的周次、学段信息已获得
      if (PeriodWeekTerm&&PeriodWeekTerm.ItemPeriod&&LoginUser.SchoolID){

          let SchoolID =LoginUser.SchoolID;//需要的参数后期加入

          let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数

          let getSCGCPromise = Method.getGetData(`/scheduleSubjectGrade?SchoolID=${SchoolID}&PeriodID=${PeriodID}`);

          let getSTTMenuPromise = Method.getGetData(`/scheduleSubjectTeacherTeacher?SchoolID=${SchoolID}&PeriodID=${PeriodID}`);

          Promise.all([getSCGCPromise,getSTTMenuPromise]).then(res => {

              let NowWeekNo = PeriodWeekTerm.NowWeekNo;
              //将课程、学期、等等放到redux中

              dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0].Data});

              dispatch({type:STTActions.STT_NOW_WEEK_CHANGE,data:NowWeekNo});
              //根据获取的学科信息和教师信息组织数据
              let subjectList = res[0].Data.ItemSubject;

              let leftMenuData = subjectList.map((item) => {

                  let list = res[1].Data.map((i) => {

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

              dispatch({type:STTActions.TEACHER_LIST_UPDATE,data:leftMenuData});

              dispatch({type:STTActions.LOADING_HIDE});

              dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

          });

      }else{//如果前面获取的周次、学段信息没获得，等待获得。

          let  PeriodWeekTermInterVal =  setInterval(()=>{

              const {PeriodWeekTerm,LoginUser} = getState();

              if (PeriodWeekTerm&&PeriodWeekTerm.ItemPeriod){

                  clearInterval(PeriodWeekTermInterVal);

                  //异步获取到周次、学段信息等

                  let SchoolID =LoginUser.SchoolID;//需要的参数后期加入

                  let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数

                  let getSCGCPromise = Method.getGetData(`/scheduleSubjectGrade?SchoolID=${SchoolID}&PeriodID=${PeriodID}`);

                  let getSTTMenuPromise = Method.getGetData(`/scheduleSubjectTeacherTeacher?SchoolID=${SchoolID}&PeriodID=${PeriodID}`);

                  Promise.all([getSCGCPromise,getSTTMenuPromise]).then(res => {


                      let NowWeekNo = PeriodWeekTerm.NowWeekNo;

                      //将课程、学期、等等放到redux中

                      dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0].Data});

                      dispatch({type:STTActions.STT_NOW_WEEK_CHANGE,data:NowWeekNo});
                      //根据获取的学科信息和教师信息组织数据
                      let subjectList = res[0].Data.ItemSubject;

                      let leftMenuData = subjectList.map((item) => {

                          let list = res[1].Data.map((i) => {

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

                      dispatch({type:STTActions.TEACHER_LIST_UPDATE,data:leftMenuData});

                      dispatch({type:STTActions.LOADING_HIDE});

                      dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                  });

              }

          },50)

      }

  }

};


export default {

    STSPageInit,

    STSPageUpdate,

    STTPageInit

}