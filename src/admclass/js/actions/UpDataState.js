import {postData,getData} from "../../../common/js/fetch";
import UpUIState from './UpUIState';
import CONFIG from '../../../common/js/config';
import 'whatwg-fetch';




//操作常量
//获取登录用户信息
const GET_LOGIN_USER_INFO = 'GET_LOGIN_USER_INFO';
//获取所有年级总览信息
const  GET_ALL_GRADE_PREVIEW = 'GET_ALL_GRADE_PREVIEW';
//获取年级班级信息
const GET_SHCOOL_GRADE_CLASSES = 'GET_SHCOOL_GRADE_CLASSES';
//获取某一年级总览数据
const  GET_THE_GRADE_PREVIEW = 'GET_THE_GRADE_PREVIEW';

//操作的执行
//获取界面初始信息
const  getPageInit = () => {
    return (dispatch) => {
        fetch(`${CONFIG.proxy}/Login?method=GetUserInfo`).then(res => res.json()).then(json => {
            dispatch({type:GET_LOGIN_USER_INFO,data:json.data.result});
            dispatch(getXuGetData(GET_ALL_GRADE_PREVIEW,'/AdmAllGradePreview'));
            dispatch(getXuGetData(GET_SHCOOL_GRADE_CLASSES,'/GradesClasses'));
        }).then(() => {
            dispatch({type:UpUIState.APP_LOADING_CLOSE});
        });
    }
}

//获取xx年级的总览数据
const getTheGradePreview = (url) =>{
    return dispatch =>{
        fetch(`${CONFIG.proxy}/AdmTheGradePreview`).then(res=>res.json()).then((json)=>{
          return  dispatch({type:GET_THE_GRADE_PREVIEW,data:json.Data});
        }).then(()=>{
            dispatch({type:UpUIState.CLASS_LOADING_HIDE});
        })
    }
};


//从徐工那边获取的数据以及数据格式
const getXuGetData = (type,url) => {
    return dispatch=>{
        dispatch({type:UpUIState.CLASS_LOADING_SHOW});//先loading后取消
        fetch(CONFIG.proxy+url).then((res)=>{
            return res.json();
        }).then((json)=>{
           dispatch({type:type,data:json.Data});
        });
    }
}






export default {
    getPageInit,
    getTheGradePreview,
    GET_LOGIN_USER_INFO,
    GET_ALL_GRADE_PREVIEW,
    GET_SHCOOL_GRADE_CLASSES,
    GET_THE_GRADE_PREVIEW
}