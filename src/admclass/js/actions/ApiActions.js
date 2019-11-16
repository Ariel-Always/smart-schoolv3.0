import Method from './Method';

import AppAlertActions from "./AppAlertActions";






//get

//获取班主任所带行政班及班主任权限

const GetClassAndPower =  async ({UserID,dispatch}) => {

    let res = await Method.getGetData(`/UserMgr/ClassMgr/GetClassAndPower?UserID=${UserID}`,2);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }


};

//获取某班级的教师列表

const GetClassTeacher = async ({ClassID,dispatch}) => {

    let res = await Method.getGetData(`/UserMgr/ClassMgr/GetClassTeacher?ClassID=${ClassID}`,2);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }


};


//获取某班级学生列表
const GetStudentToPage = async ({ClassID,Keyword='',PageIndex=0,PageSize,dispatch}) => {

    let res = await Method.getGetData(`/UserMgr/UserInfoMgr/GetStudentToPage?ClassID=${ClassID}&Keyword=${Keyword}&PageIndex=${PageIndex}&PageSize=${PageSize}`,2);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }


};


//获取行政班开课学科

const GetSubject = async ({ClassID,dispatch}) => {

    let res = await Method.getGetData(`/UserMgr/ClassMgr/GetSubject?ClassID=${ClassID}`,2);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }
};

//获取所有的任课教师

const GetTeacherToPage = async ({SchoolID,SubjectIDs='',Keyword,PageIndex=0,PageSize=0,UserID,dispatch}) => {

    let res = await Method.getGetData(`/UserMgr/ClassMgr/GetTeacherToPage?SchoolID=${SchoolID}&PageIndex=${PageIndex}&PageSize=${PageSize}&SubjectIDs=${SubjectIDs}${Keyword?`&Keyword=${Keyword}`:''}${UserID?`&UserID=${UserID}`:''}`,2);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }


};





//post

//设置取消班长

const SetMonitor = async ({UserID,ClassID,dispatch}) => {

    let res = await Method.getPostData(`/UserMgr/ClassMgr/SetMonitor`,{

        UserID,ClassID

    },2);

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }


};


//设置教师

const SetCourseClassTeacher =  async ({ClassID,SubjectID,UserID='',dispatch}) => {

    let res = await Method.getPostData(`/UserMgr/ClassMgr/SetCourseClassTeacher`,{

        ClassID,UserID,SubjectID

    },2);

    if (res.StatusCode === 200){

        return res.Msg;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }


};








export default {

    GetClassAndPower,

    GetClassTeacher,

    GetStudentToPage,

    SetMonitor,

    GetSubject,

    GetTeacherToPage,

    SetCourseClassTeacher

}