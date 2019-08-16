import {postData,getData} from "../../../common/js/fetch";
import UpUIState from './UpUIState';
import CONFIG from '../../../common/js/config';
import 'whatwg-fetch';



//操作常量
//获取登录用户信息
const GET_LOGIN_USER_INFO = 'GET_LOGIN_USER_INFO';
//获取所有年级总览信息
const  GET_ALL_GRADE_PREVIEW = 'GET_ALL_GRADE_PREVIEW';


//操作的执行
//获取登录用户信息
const  getLoginUser = (url) => {
    return (dispatch)=>{
        fetch(CONFIG.proxy+url).then(res=>res.json()).then(json=>{
           dispatch({type:GET_LOGIN_USER_INFO,data:json.data.result});
        });
    }
};
//获取所有年级总览信息
const getAllGradePreview = (url) =>{
    return (dispatch)=>{
        console.log(CONFIG.proxy+url);
        fetch(CONFIG.proxy+url).then(res=>res.json()).then(json=>{

            dispatch({type:GET_ALL_GRADE_PREVIEW,data:json.Data});
        });
    }
}



export default {
    getLoginUser,
    getAllGradePreview,
    GET_LOGIN_USER_INFO,
    GET_ALL_GRADE_PREVIEW
}