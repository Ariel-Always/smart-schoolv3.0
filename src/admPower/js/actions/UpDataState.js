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
const GET_USER_POWER_MSG = 'GET_USER_POWER_MSG';

//操作的执行
//获取登录用户信息
const getLoginUser = (url) => {
    return (dispatch) => {
        getData(CONFIG.proxy + url).then(res => res.json()).then(json => {
            dispatch({ type: GET_LOGIN_USER_INFO, data: json.data.result });
        });
    }
};
//获取用户权限信息
const getUserPowerMsg = (url) => {


    return (dispatch) => {



        getData(CONFIG.PowerProxy + url, 2).then(res => {
            return res.json()
        }).then(json => {
            if (json.Status === 400) {
                console.log('错误码：' + json.Status)
            } else if (json.Status === 200) {
                console.log(json.Data)
                dispatch({ type: GET_USER_POWER_MSG, data: json.Data });
                dispatch({ type: actions.UpUIState.RIGHT_LOADING_CLOSE })

            }
        });
    }
}

export default {
    getLoginUser,
    GET_LOGIN_USER_INFO,

    GET_USER_POWER_MSG,
    getUserPowerMsg


}