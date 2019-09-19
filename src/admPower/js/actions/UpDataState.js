import { postData, getData } from "../../../common/js/fetch";
import UpUIState from './UpUIState';
import CONFIG from '../../../common/js/config';
import 'whatwg-fetch';
import actions from './index'
import Mock from 'mockjs'




//操作常量
//获取登录用户信息
const GET_LOGIN_USER_INFO = 'GET_LOGIN_USER_INFO';
//获取教学班总览信息
const GET_COURE_CLASS_ALL_MSG = 'GET_COURE_CLASS_ALL_MSG';

//操作的执行
//获取登录用户信息
const getLoginUser = (url) => {
    return (dispatch) => {


        getData(CONFIG.proxy + url).then(res => res.json()).then(json => {
            dispatch({ type: GET_LOGIN_USER_INFO, data: json.data.result });
        });
    }
};

export default {
    getLoginUser,
    GET_LOGIN_USER_INFO,
    

}