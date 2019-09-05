import { postData, getData } from "../../../common/js/fetch";
import UpUIState from './UpUIState';
import CONFIG from '../../../common/js/config';
import 'whatwg-fetch';
import actions from './index'




//操作常量
//获取登录用户信息
const GET_LOGIN_USER_INFO = 'GET_LOGIN_USER_INFO';


// 获取学校学科信息
const GET_SUBJECT_MSG = 'GET_SUBJECT_MSG';
// 获取学校学段信息
const GET_PERIOD_MSG = 'GET_PERIOD_MSG';
// 弹窗获取学校教师信息
const GET_TEACHER_MSG = 'GET_TEACHER_MSG'
// 编辑弹窗信息
const CHANGE_SUBJECT_MODAL_MSG = 'CHANGE_SUBJECT_MODAL_MSG'


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
const getPeriodMsg = (url) => {
    return (dispatch) => {
        getData(CONFIG.proxy + url).then(res => {

            return res.json()
        }).then(json => {
            if (json.Status === 400) {
                console.log('错误码：' + json.Status)
            } else if (json.Status === 200) {
                dispatch({ type: GET_PERIOD_MSG, data: json.Data });
            }
        });
    }
}
//获取学科信息
const getSubjectMsg = (url) => {
    return (dispatch) => {

        dispatch({ type: actions.UpUIState.SUBJECT_TABLE_LOADING_OPEN });
        getData(CONFIG.proxy + url).then(res => {
            dispatch({ type: actions.UpUIState.SUBJECT_TABLE_LOADING_CLOSE });
            return res.json()
        }).then(json => {
            if (json.Status === 400) {
                console.log('错误码：' + json.Status)
            } else if (json.Status === 200) {
                dispatch({ type: GET_SUBJECT_MSG, data: json.Data });
            }
        });
    }
}
//获取学校教师信息
const getTeacherMsg = (url) => {
    return (dispatch) => {
        getData(CONFIG.proxy + url).then(res => {

            return res.json()
        }).then(json => {
            if (json.Status === 400) {
                console.log('错误码：' + json.Status)
            } else if (json.Status === 200) {
                console.log(json.Data)

                dispatch({ type: GET_TEACHER_MSG, data: json.Data });
                dispatch({ type: actions.UpUIState.SUBJECT_DETAILS_MODAL_OPEN });
            }
        });
    }
}

// 编辑弹窗信息
const changeSubjectModalMsg = (data) => {
    return {
        type: CHANGE_SUBJECT_MODAL_MSG,
        data: data
    }

};


export default {
    getLoginUser,
    GET_LOGIN_USER_INFO,
    getSubjectMsg,
    GET_SUBJECT_MSG,
    getPeriodMsg,
    GET_PERIOD_MSG,
    getTeacherMsg,
    GET_TEACHER_MSG,
    changeSubjectModalMsg,
    CHANGE_SUBJECT_MODAL_MSG

}