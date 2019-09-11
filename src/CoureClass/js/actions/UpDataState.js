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
//设置教学班菜单
const SET_COURE_CLASS_ALL_MSG = 'SET_COURE_CLASS_ALL_MSG'
//获取学科总览
const GET_SUBJECT_ALL_MSG = 'GET_SUBJECT_ALL_MSG'
//获取年级总览
const GET_CLASS_ALL_MSG = 'GET_CLASS_ALL_MSG'


//操作的执行
//获取登录用户信息
const getLoginUser = (url) => {
    return (dispatch) => {


        getData(CONFIG.proxy + url).then(res => res.json()).then(json => {
            dispatch({ type: GET_LOGIN_USER_INFO, data: json.data.result });
        });
    }
};
//获取学校学段信息
const getCoureClassAllMsg = (url, func) => {


    return (dispatch) => {


        getData(CONFIG.proxy + url).then(res => {

            return res.json()
        }).then(json => {
            if (json.Status === 400) {
                console.log('错误码：' + json.Status)
            } else if (json.Status === 200) {
                dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
                dispatch({ type: GET_COURE_CLASS_ALL_MSG, data: json.Data, func: func });
            }
        });
    }
}


//设置教学班菜单
const setCoureClassAllMsg = (data, subjectID = null) => {
    return {
        type: SET_COURE_CLASS_ALL_MSG,
        data: data,
        subjectID: subjectID
    }
};

//获取学科总览
const getSubjectAllMsg = (url, subject) => {
    return (dispatch) => {
        getData(CONFIG.proxy + url).then(res => {
            dispatch({ type: actions.UpUIState.RIGHT_LOADING_CLOSE });

            return res.json()
        }).then(json => {
            if (json.Status === 400) {
                console.log('错误码：' + json.Status)
            } else if (json.Status === 200) {
                console.log(json.Data)
                dispatch({ type: GET_SUBJECT_ALL_MSG, data: json.Data, subject: subject });

            }
        });
    }
}
//获取教学班信息
const getClassAllMsg = (url, subject, Class) => {
    return (dispatch) => {
        dispatch({ type: actions.UpUIState.TABLE_LOADING_OPEN });

        getData(CONFIG.proxy + url).then(res => {
            dispatch({ type: actions.UpUIState.TABLE_LOADING_CLOSE });
            return res.json()
        }).then(json => {
            if (json.Status === 400) {
                console.log('错误码：' + json.Status)
            } else if (json.Status === 200) {
                console.log(json.Data)
                dispatch({ type: GET_CLASS_ALL_MSG, data: json.Data, subject: subject, Class: Class });

            }
        });
    }
}
export default {
    getLoginUser,
    GET_LOGIN_USER_INFO,
    getCoureClassAllMsg,
    GET_COURE_CLASS_ALL_MSG,
    SET_COURE_CLASS_ALL_MSG,
    setCoureClassAllMsg,
    GET_SUBJECT_ALL_MSG,
    getSubjectAllMsg,
    GET_CLASS_ALL_MSG,
    getClassAllMsg

}