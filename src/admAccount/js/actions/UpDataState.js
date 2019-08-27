import {postData,getData} from "../../../common/js/fetch";
import UpUIState from './UpUIState';
import CONFIG from '../../../common/js/config';
import 'whatwg-fetch';



//操作常量
//获取登录用户信息
const GET_LOGIN_USER_INFO = 'GET_LOGIN_USER_INFO';
//获取所有年级总览信息
const  GET_ALL_USER_PREVIEW = 'GET_ALL_USER_PREVIEW';
//获取学生档案信息
const  GET_GRADE_STUDENT_PREVIEW = 'GET_GRADE_STUDENT_PREVIEW';
//获取教师档案信息
const  GET_SUBJECT_TEACHER_PREVIEW = 'GET_SUBJECT_TEACHER_PREVIEW';
//获取领导档案信息
const  GET_SCHOOL_LEADER_PREVIEW = 'GET_SCHOOL_LEADER_PREVIEW';
//获取年级班级信息
const  GET_GRADE_CLASS_MSG = 'GET_GRADE_CLASS_MSG';
//获取学科信息
const GET_SUBJECT_TEACHER_MSG = 'GET_SUBJECT_TEACHER_MSG';

//操作的执行
//获取登录用户信息
const  getLoginUser = (url) => {
    return (dispatch)=>{
        getData(CONFIG.proxy+url).then(res=>res.json()).then(json=>{
           dispatch({type:GET_LOGIN_USER_INFO,data:json.data.result});
        });
    }
};
//获取所有用户总览信息
const getAllUserPreview = (url) =>{
    return (dispatch)=>{
        // console.log(CONFIG.proxy+url);
        getData(CONFIG.proxy+url).then(res=>{
            if(res.status === '401'){
                console.log('错误码：'+ res.status)
            }
            return res.json()}).then(json=>{
            if(json.status === 400){
                console.log(json.status)
            }else if(json.status === 200){
                dispatch({type:GET_ALL_USER_PREVIEW,data:json.data});
                dispatch({ type: UpUIState.APP_LOADING_CLOSE });
            }
           
        });
    }
}

//获取学生档案信息
const getGradeStudentPreview = (url) =>{
    return (dispatch)=>{
        console.log(CONFIG.proxy+url);
        getData(CONFIG.proxy+url).then(res=>{
            if(res.Status === '401'){
                console.log('错误码：'+ res.Status)
            }
            return res.json()}).then(json=>{
            if(json.Status === 400){
                console.log(json.Status)
            }else if(json.Status === 200){
                dispatch({type:GET_GRADE_STUDENT_PREVIEW,data:json.Data});
                dispatch({ type: UpUIState.APP_LOADING_CLOSE });
            }
           
        });
    }
}

//获取教师档案信息
const getSubjectTeacherPreview = (url) =>{
    return (dispatch)=>{
        console.log(CONFIG.proxy+url);
        getData(CONFIG.proxy+url).then(res=>{
            if(res.Status === '401'){
                console.log('错误码：'+ res.Status)
            }
            return res.json()}).then(json=>{
            if(json.Status === 400){
                console.log(json.Status)
            }else if(json.Status === 200){
                console.log(json.Data)
                dispatch({type:GET_SCHOOL_LEADER_PREVIEW,data:json.Data});
                dispatch({ type: UpUIState.APP_LOADING_CLOSE });
            }
           
        });
    }
}
//获取领导档案信息
const getSchoolLeaderPreview = (url) =>{
    return (dispatch)=>{
        console.log(CONFIG.proxy+url);
        getData(CONFIG.proxy+url).then(res=>{
            if(res.status === '401'){
                console.log('错误码：'+ res.status)
            }
            return res.json()}).then(json=>{
            if(json.status === 400){
            }else if(json.status === 200){
                dispatch({type:GET_SUBJECT_TEACHER_PREVIEW,data:json.data});
                dispatch({ type: UpUIState.APP_LOADING_CLOSE });
            }
           
        });
    }
}
//获取年级班级信息
const getGradeClassMsg = (url) =>{
    return (dispatch)=>{
        console.log(CONFIG.proxy+url);
        getData(CONFIG.proxy+url).then(res=>{
            if(res.status === '401'){
                console.log('错误码：'+ res.status)
            }
            return res.json()}).then(json=>{
            if(json.status === 400){
                console.log(json.status)
            }else if(json.Status === 200){
                console.log('ddd')
                dispatch({type:GET_GRADE_CLASS_MSG,data:json.Data});
            }
           
        });
    }
}
//获取学科信息
const getSubjectTeacherMsg = (url) =>{
    return (dispatch)=>{
        console.log(CONFIG.proxy+url);
        getData(CONFIG.proxy+url).then(res=>{
            if(res.Status === '401'){
                console.log('错误码：'+ res.status)
            }
            return res.json()}).then(json=>{
            if(json.Status === 400){
                console.log(json.Status)
            }else if(json.Status === 200){
                console.log('ddd')
                dispatch({type:GET_SUBJECT_TEACHER_MSG,data:json.Data});
            }
           
        });
    }
}


export default {
    getLoginUser,
    getAllUserPreview,
    GET_LOGIN_USER_INFO,
    GET_ALL_USER_PREVIEW,
    getSubjectTeacherPreview,
    getGradeStudentPreview,
    getSchoolLeaderPreview,
    getSubjectTeacherMsg,
    GET_GRADE_STUDENT_PREVIEW,
    GET_SUBJECT_TEACHER_PREVIEW,
    GET_SCHOOL_LEADER_PREVIEW,
    getGradeClassMsg,
    GET_GRADE_CLASS_MSG,
    GET_SUBJECT_TEACHER_MSG
}