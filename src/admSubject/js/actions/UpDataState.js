import {postData,getData} from "../../../common/js/fetch";
import UpUIState from './UpUIState';
import CONFIG from '../../../common/js/config';
import 'whatwg-fetch';



//操作常量
//获取登录用户信息
const GET_LOGIN_USER_INFO = 'GET_LOGIN_USER_INFO';


// 获取学校学科信息
const GET_SUBJECT_MSG = 'GET_SUBJECT_MSG';
// 获取学校学段信息
const GET_PERIOD_MSG = 'GET_PERIOD_MSG';

//操作的执行
//获取登录用户信息
const  getLoginUser = (url) => {
    return (dispatch)=>{
        getData(CONFIG.proxy+url).then(res=>res.json()).then(json=>{
           dispatch({type:GET_LOGIN_USER_INFO,data:json.data.result});
        });
    }
};
//获取学校学段信息
const getPeriodMsg = (url) =>{
    return (dispatch)=>{
        console.log(CONFIG.proxy+url);
        getData(CONFIG.proxy+url).then(res=>{
            return res.json()}).then(json=>{
            if(json.Status === 400){
                console.log('错误码：'+json.Status)
            }else if(json.Status === 200){
                dispatch({type:GET_PERIOD_MSG,data:json.Data});
            }
        });
    }
}
//获取学科信息
const getSubjectMsg = (url) =>{
    return (dispatch)=>{
        console.log(CONFIG.proxy+url);
        getData(CONFIG.proxy+url).then(res=>{
            return res.json()}).then(json=>{
            if(json.Status === 400){
                console.log('错误码：'+json.Status)
            }else if(json.Status === 200){
                dispatch({type:GET_SUBJECT_MSG,data:json.Data});
            }
        });
    }
}



export default {
    getLoginUser,
    GET_LOGIN_USER_INFO,
    getSubjectMsg,
    GET_SUBJECT_MSG,
    getPeriodMsg,
    GET_PERIOD_MSG
    
}