//学科教师总表学科课表界面初始化
import Method from "../Method";

import SCGCRActions from "../Teacher/SCGCRActions";

import STSActions from "../Teacher/SubjectTeacherSubjectActions";

import AppLoadingActions from "../AppLoadingActions";

import STTActions from "../Teacher/SubjectTeacherTeacherActions";

import TPActions from "./TeacherPersonalActions";

import ApiActions from '../ApiActions';


//学科教师总表学科总课表界面初始化
const STSPageInit = () => {

    return (dispatch,getState) => {

        dispatch({type:STSActions.LOADING_SHOW});

        let {PeriodWeekTerm,LoginUser} = getState();
        //如果前面获取的周次、学段信息已获得
        if (PeriodWeekTerm&&PeriodWeekTerm.ItemPeriod){

            let {SchoolID,UserID,UserType} =LoginUser;//需要的参数后期加入

            if (PeriodWeekTerm.ItemPeriod.length>0){

                let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数

                let GetAllOptionByPeriodID = ApiActions.GetAllOptionByPeriodID({

                    SchoolID,PeriodID,UserID,UserType,dispatch

                });

                let GetAllScheduleOfTeachersBySubjectIDForPage = ApiActions.GetAllScheduleOfTeachersBySubjectIDForPage({

                    SchoolID, PeriodID,PageIndex:1,PageSize:10,dispatch

                });

                Promise.all([GetAllOptionByPeriodID,GetAllScheduleOfTeachersBySubjectIDForPage]).then((res)=>{
                    //将课程、学期、等等放到redux中
                    // res[0].Data['NowWeekNo'] = PeriodWeekTerm.NowWeekNo;

                    let NowWeekNo = PeriodWeekTerm.WeekNO;

                    dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0]});

                    dispatch({type:STSActions.STS_NOW_WEEK_CHANGE,data:NowWeekNo});

                    //组织课表的信息存放到redux中
                    const json = res[1];

                    let SubjectTeacherSchedule =  json.ItemTeacher.map((item) => {

                        let teacherObj = {

                            id:item.TeacherID,

                            name:item.TeacherName

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


            }else{

                window.location.href='/error.aspx';

            }


        }else{//如果前面获取的周次、学段信息没获得，等待获得。

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

                SchoolID,PeriodID

            });

            Promise.all([GetAllOptionByPeriodID,GetTeacherBySubjectIDAndKey]).then(res => {


                let NowWeekNo = PeriodWeekTerm.WeekNO;

                //将课程、学期、等等放到redux中

                dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0]});

                dispatch({type:STTActions.STT_NOW_WEEK_CHANGE,data:NowWeekNo});
                //根据获取的学科信息和教师信息组织数据

                if(res[0]){

                    let subjectList = res[0].ItemSubject;

                    let leftMenuData = [];

                    if (res[1].length>0){

                        console.log(res[1]);

                        if (subjectList.length > 1){

                            leftMenuData = subjectList.map((item) => {

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

                        }else{

                            let list = res[1].map((i) => {

                                return {

                                    id:i.Teacher,

                                    name:i.TeacherName

                                }

                            });
                            //查找subjectID和对应的Subjectname
                            let subjectID = '';

                            for (let i = 0; i <= res[1].length-1; i++){

                                subjectID = res[1][i].SubjectID;

                                break;

                            }

                            let subjectName = subjectList.find((item) => {return item.SubjectID === subjectID }).SubjectName;

                            dispatch({type:STTActions.SEARCH_TEACHER_RESULT_UPDATE,data:list});

                            dispatch({type:STTActions.SEARCH_TEACHER_RESULT_SHOW});

                            dispatch({type:STTActions.SEARCH_TITLE_SHOW,data:`${subjectName}任课教师列表`});

                        }

                    }

                    dispatch({type:STTActions.SCHEDULE_LOADING_HIDE});

                    dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                }



            });

        }else{//如果前面获取的周次、学段信息没获得，等待获得。

           window.location.href='/html/schedule';

        }

    }

};

//获取教师的个人课表

const TeacherPersonalInit = () => {

    return (dispatch,getState) => {


        dispatch({type:TPActions.TP_SCHEDULE_LOADING_SHOW});

        let {PeriodWeekTerm,LoginUser} = getState();
        //如果前面获取的周次、学段信息已获得
        if (PeriodWeekTerm&&PeriodWeekTerm.ItemPeriod&&LoginUser.SchoolID){

            let {SchoolID,UserID,UserType} = LoginUser;//需要的参数后期加入

            let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数

            let GetAllOptionByPeriodID = ApiActions.GetAllOptionByPeriodID({

                SchoolID,PeriodID,UserID,UserType,dispatch

            });

            let GetScheduleByUserID = ApiActions.GetScheduleByUserID({

                SchoolID,PeriodID,UserID,UserType,dispatch

            });

            Promise.all([GetAllOptionByPeriodID,GetScheduleByUserID]).then(res => {


                let NowWeekNo = PeriodWeekTerm.WeekNO;



                //将课程、学期、等等放到redux中

                dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0]});

                dispatch({type:TPActions.TP_NOW_WEEK_CHANGE,data:NowWeekNo});

                dispatch({type:TPActions.TP_SCHEDULE_LOADING_HIDE});

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

    TeacherPersonalInit

}