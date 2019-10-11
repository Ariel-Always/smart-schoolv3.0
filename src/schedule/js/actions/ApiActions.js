import Method from './Method';

import AppAlertActions from './AppAlertActions';

import CONFIG from "../../../common/js/config";



//api接口

//获取学期、学段、周、年级、教室类型信息，如果是教师则返回只任教的学段

const GetTermAndPeriodAndWeekNOInfo = async ({SchoolID,UserID,UserType,dispatch}) => {

    let res = await Method.getGetData(`/Schedule/api/GetTermAndPeriodAndWeekNOInfo?SchoolID=${SchoolID}&UserID=${UserID}&UserType=${UserType}`,

        2,

        CONFIG.ScheduleProxy);

    if (res.Status === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常",ok:()=>{ return ()=>window.location.href='/error.aspx'}}));

    }


};

//获取学段课时、学科、年级、教室类型信息


const GetAllOptionByPeriodID = async ({SchoolID,PeriodID,UserID,UserType,dispatch}) => {

    let res = await Method.getGetData(`/Schedule/api/GetTermAndPeriodAndWeekNOInfo?SchoolID=${SchoolID}&UserID=${UserID}&UserType=${UserType}&PeriodID=${PeriodID}`,

        2,

        CONFIG.ScheduleProxy);

    if (res.Status === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常",ok:()=>{ return ()=>window.location.href='/error.aspx'}}));

    }


};


//分页获取学科教师总课表（包含全学科和单学科）

const GetAllScheduleOfTeachersBySubjectIDForPage = async ({SchoolID,PeriodID,SubjectID,WeekNO,PageIndex,PageSize,dispatch}) => {

    let res = await Method.getGetData(`/Schedule/api/GetTermAndPeriodAndWeekNOInfo
    ?SchoolID=${SchoolID}
    &SubjectID=${SubjectID}
    &PeriodID=${PeriodID}
    &WeekNO=${WeekNO}
    &PageIndex=${PageIndex}
    &PageSize=${PageSize}
    `,

        2,

        CONFIG.ScheduleProxy);

    if (res.Status === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常",ok:()=>{ return ()=>window.location.href='/error.aspx'}}));

    }


};




//获取课表教师信息（含搜索）

const GetTeacherBySubjectIDAndKey = async ({SchoolID,PeriodID,SubjectID='',Key='',dispatch}) => {

    let res = await Method.getGetData(`/Schedule/api/GetTeacherBySubjectIDAndKey
    ?SchoolID=${SchoolID}
    &SubjectID=${SubjectID}
    &PeriodID=${PeriodID}
    &Key=${Key}
    `,

        2,

        CONFIG.ScheduleProxy);

    if (res.Status === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常",ok:()=>{ return ()=>window.location.href='/error.aspx'}}));

    }


};




//获取单个教师或学生的课表信息

const GetScheduleByUserID = async ({SchoolID,PeriodID,UserType,UserID,WeekNO,dispatch}) => {

    let res = await Method.getGetData(`/Schedule/api/GetTeacherBySubjectIDAndKey
    ?SchoolID=${SchoolID}
    &PeriodID=${PeriodID}
    &UserType=${UserType}
    &UserID=${UserID}
    &WeekNO=${WeekNO}
    `,

        2,

        CONFIG.ScheduleProxy);

    if (res.Status === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }


};





//获取全部学科、周次、课时、学科教师、行政班信息

const GetAllOptionForAddSchedule = async ({SchoolID,dispatch}) => {

    let res = await Method.getGetData(`/Schedule/api/GetTeacherBySubjectIDAndKey?SchoolID=${SchoolID}`,

        2,

        CONFIG.ScheduleProxy);

    if (res.Status === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }

};


//获取课表班级信息（含搜索）

const GetClassByGradeIDAndKey = async ({SchoolID,PeriodID='',GradeID='',Key='',dispatch}) => {

    let res = await Method.getGetData(`/Schedule/api/GetClassByGradeIDAndKey
    
    ?SchoolID=${SchoolID}
    &PeriodID=${PeriodID}
    &GradeID=${GradeID}
    &Key=${Key}
    `,

        2,

        CONFIG.ScheduleProxy);

    if (res.Status === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }

};



//获取课表教室信息（含搜索）

const GetClassRoomByClassTypeAndKey = async ({SchoolID,PeriodID='',ClassRoomTypeID='',GradeID='',Key='',dispatch}) => {

    let res = await Method.getGetData(`/Schedule/api/GetClassRoomByClassTypeAndKey
    ?SchoolID=${SchoolID}
    &PeriodID=${PeriodID}
    &ClassRoomTypeID=${ClassRoomTypeID}
    &Key=${Key}
    `,

        2,

        CONFIG.ScheduleProxy);

    if (res.Status === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }

};




//添加临时课程。写入课程数据接口

const InsertSchedule =  async ({ SchoolID,SubjectID,WeekNO,WeeDay,ClassHourNO,TeacherID,ClassID,ClassRoomID,UserType,UserID,dispatch}) => {

    let res = await Method.getPostData(`/Schedule/api/InsertSchedule`,{

        SchoolID,SubjectID,WeekNO,WeeDay,ClassHourNO,TeacherID,ClassID,ClassRoomID,UserType,UserID

    },2,CONFIG.AdmClassProxy);

    if (res.Status === 200){

        return res;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }


};

export default {

    GetTermAndPeriodAndWeekNOInfo,

    GetAllOptionByPeriodID,

    GetAllScheduleOfTeachersBySubjectIDForPage,

    GetTeacherBySubjectIDAndKey,

    GetScheduleByUserID,

    GetAllOptionForAddSchedule,

    GetClassByGradeIDAndKey,

    GetClassRoomByClassTypeAndKey,

    InsertSchedule

}
