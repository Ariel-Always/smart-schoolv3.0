//学科教师总表学科课表界面初始化
import Method from "../Method";

import SCGCRActions from "../Teacher/SCGCRActions";

import STSActions from "../Teacher/SubjectTeacherSubjectActions";

import AppLoadingActions from "../AppLoadingActions";

import STTActions from "../Teacher/SubjectTeacherTeacherActions";

import TPActions from "./TeacherPersonalActions";


//学科教师总表学科总课表界面初始化
const STSPageInit = () => {

    return (dispatch,getState) => {

        let {PeriodWeekTerm,LoginUser} = getState();
        //如果前面获取的周次、学段信息已获得
        if (PeriodWeekTerm&&PeriodWeekTerm.ItemPeriod){

            let SchoolID =LoginUser.SchoolID;//需要的参数后期加入

            let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数

            let getSCGCPromise = Method.getGetData(`/scheduleSubjectGrade-teacher?SchoolID=${SchoolID}&PeriodID=${PeriodID}`);

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

                }

            },50)

        }

    }

};

//学科教师总表教师课表界面初始化
const STTPageInit = () => {

    return (dispatch,getState) => {


        let {PeriodWeekTerm,LoginUser} = getState();
        //如果前面获取的周次、学段信息已获得
        if (PeriodWeekTerm&&PeriodWeekTerm.ItemPeriod&&LoginUser.SchoolID){

            let SchoolID =LoginUser.SchoolID;//需要的参数后期加入

            let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数

            let getSCGCPromise = Method.getGetData(`/scheduleSubjectGrade-teacher?SchoolID=${SchoolID}&PeriodID=${PeriodID}`);

            let getSTTMenuPromise = Method.getGetData(`/scheduleSubjectTeacherTeacher-teacher?SchoolID=${SchoolID}&PeriodID=${PeriodID}`);

            Promise.all([getSCGCPromise,getSTTMenuPromise]).then(res => {


                let NowWeekNo = PeriodWeekTerm.NowWeekNo;

                //将课程、学期、等等放到redux中

                dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0].Data});

                dispatch({type:STTActions.STT_NOW_WEEK_CHANGE,data:NowWeekNo});
                //根据获取的学科信息和教师信息组织数据

                let subjectList = res[0].Data.ItemSubject;

                let leftMenuData = [];

                if (subjectList.length > 1){

                    leftMenuData = subjectList.map((item) => {

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

                }else{

                    let list = res[1].Data.map((i) => {

                        return {

                            id:i.Teacher,

                            name:i.TeacherName

                        }

                    });
                    //查找subjectID和对应的Subjectname
                    let subjectID = '';

                    for (let i = 0; i <= res[1].Data.length-1; i++){

                        subjectID = res[1].Data[i].SubjectID;

                        break;

                    }

                    let subjectName = subjectList.find((item) => {return item.SubjectID === subjectID }).SubjectName;

                    dispatch({type:STTActions.SEARCH_TEACHER_RESULT_UPDATE,data:list});

                    dispatch({type:STTActions.SEARCH_TEACHER_RESULT_SHOW});

                    dispatch({type:STTActions.SEARCH_TITLE_SHOW,data:`${subjectName}任课教师列表`});

                }

                dispatch({type:STTActions.SCHEDULE_LOADING_HIDE});

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

                    let getSCGCPromise = Method.getGetData(`/scheduleSubjectGrade-teacher?SchoolID=${SchoolID}&PeriodID=${PeriodID}`);

                    let getSTTMenuPromise = Method.getGetData(`/scheduleSubjectTeacherTeacher-teacher?SchoolID=${SchoolID}&PeriodID=${PeriodID}`);

                    Promise.all([getSCGCPromise,getSTTMenuPromise]).then(res => {


                        let NowWeekNo = PeriodWeekTerm.NowWeekNo;

                        //将课程、学期、等等放到redux中

                        dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0].Data});

                        dispatch({type:STTActions.STT_NOW_WEEK_CHANGE,data:NowWeekNo});
                        //根据获取的学科信息和教师信息组织数据

                        let subjectList = res[0].Data.ItemSubject;

                        let leftMenuData = [];

                        if (subjectList.length > 1){

                            leftMenuData = subjectList.map((item) => {

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

                        }else{

                            let list = res[1].Data.map((i) => {

                                return {

                                    id:i.Teacher,

                                    name:i.TeacherName

                                }

                            });
                            //查找subjectID和对应的Subjectname
                            let subjectID = '';

                            for (let i = 0; i <= res[1].Data.length-1; i++){

                                subjectID = res[1].Data[i].SubjectID;

                                break;

                            }

                            let subjectName = subjectList.find((item) => {return item.SubjectID === subjectID }).SubjectName;

                            dispatch({type:STTActions.SEARCH_TEACHER_RESULT_UPDATE,data:list});

                            dispatch({type:STTActions.SEARCH_TEACHER_RESULT_SHOW});

                            dispatch({type:STTActions.SEARCH_TITLE_SHOW,data:`${subjectName}任课教师列表`});

                        }

                        dispatch({type:STTActions.SCHEDULE_LOADING_HIDE});

                        dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                    });

                }

            },50)

        }

    }

};

//获取教师的个人课表

const TeacherPersonalInit = () => {

    return (dispatch,getState) => {


        let {PeriodWeekTerm,LoginUser} = getState();
        //如果前面获取的周次、学段信息已获得
        if (PeriodWeekTerm&&PeriodWeekTerm.ItemPeriod&&LoginUser.SchoolID){

            let SchoolID = LoginUser.SchoolID;//需要的参数后期加入

            let UserID = LoginUser.UserID;

            let UserType = LoginUser.UserType;

            let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数

            let getSCGCPromise = Method.getGetData(`/scheduleSubjectGrade-teacher?SchoolID=${SchoolID}&PeriodID=${PeriodID}&UserID=${UserID}&UserType=${UserType}`);

            let teacherSchedulePromise = Method.getGetData(`/scheduleSubjectTeacherTeacherSchedule?UserID=${UserID}&UserType=${UserType}&SchoolID=${SchoolID}&NowWeekNo=${PeriodWeekTerm.NowWeekNo}`);

            Promise.all([getSCGCPromise,teacherSchedulePromise]).then(res => {


                let NowWeekNo = PeriodWeekTerm.NowWeekNo;



                //将课程、学期、等等放到redux中

                dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0].Data});

                dispatch({type:TPActions.TP_NOW_WEEK_CHANGE,data:NowWeekNo});

                dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

            });

        }else{//如果前面获取的周次、学段信息没获得，等待获得。

            let  PeriodWeekTermInterVal =  setInterval(()=>{

                const {PeriodWeekTerm,LoginUser} = getState();

                if (PeriodWeekTerm&&PeriodWeekTerm.ItemPeriod){

                    clearInterval(PeriodWeekTermInterVal);

                    //异步获取到周次、学段信息等

                    let SchoolID = LoginUser.SchoolID;//需要的参数后期加入

                    let UserID = LoginUser.UserID;

                    let UserType = LoginUser.UserType;

                    let NowWeekNo = PeriodWeekTerm.NowWeekNo;

                    let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数

                    let getSCGCPromise = Method.getGetData(`/scheduleSubjectGrade-teacher?SchoolID=${SchoolID}&PeriodID=${PeriodID}&UserID=${UserID}&UserType=${UserType}`);

                    let teacherSchedulePromise = Method.getGetData(`/scheduleSubjectTeacherTeacherSchedule?UserID=${UserID}&UserType=${UserType}&SchoolID=${SchoolID}&NowWeekNo=${NowWeekNo}`);

                    Promise.all([getSCGCPromise,teacherSchedulePromise]).then(res => {


                        let NowWeekNo = PeriodWeekTerm.NowWeekNo;

                        //将课程、学期、等等放到redux中

                        let schedule =  res[1].Data.ItemSchedule.map((item) => {

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

                        let NowDate = res[1].Data.NowDate;

                        dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0].Data});

                        dispatch({type:TPActions.TP_SCHEDULE_CHANGE,data:{schedule,NowDate}});

                        dispatch({type:TPActions.TP_SCHEDULE_LOADING_HIDE});

                        dispatch({type:TPActions.TP_NOW_WEEK_CHANGE,data:NowWeekNo});

                        dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                });

            }

            },50)

        }

    }

};


export default {

    STSPageInit,

    STTPageInit,

    TeacherPersonalInit

}