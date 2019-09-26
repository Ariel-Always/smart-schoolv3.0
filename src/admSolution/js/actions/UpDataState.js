import { postData, getData } from "../../../common/js/fetch";
import UpUIState from './UpUIState';
import CONFIG from '../../../common/js/config';
import 'whatwg-fetch';
import actions from './index'




//操作常量
//获取登录用户信息
const GET_LOGIN_USER_INFO = 'GET_LOGIN_USER_INFO';
// 获取教学方案
const GET_TEACHING_ABSOLUTION_MSG = 'GET_TEACHING_ABSOLUTION_MSG'


//操作的执行
//获取登录用户信息
const getLoginUser = (url) => {
    return (dispatch) => {
        getData(CONFIG.proxy + url).then(res => res.json()).then(json => {
            dispatch({ type: GET_LOGIN_USER_INFO, data: json.data.result });
        });
    }
};


//设置教学方案
const getTeachingAbsolutionMsg = (url) => {
    return (dispatch) => {
        getData(CONFIG.proxy + url).then(res => {
            dispatch({ type: actions.UpUIState.APP_LOADING_OPEN });


            return res.json()
        }).then(json => {
            if (json.Status === 400) {
                console.log('错误码：' + json.Status)
            } else if (json.Status === 200) {

                dispatch({ type: GET_TEACHING_ABSOLUTION_MSG, data:  json.Data});
                dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });

            }
        });
    }
}

export default {
    getLoginUser,
    GET_LOGIN_USER_INFO,


    getTeachingAbsolutionMsg,
    GET_TEACHING_ABSOLUTION_MSG

}