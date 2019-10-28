import { postData, getData } from "../../../common/js/fetch";
import UpUIState from './UpUIState';
import CONFIG from '../../../common/js/config';
import 'whatwg-fetch';
import actions from './index'
import Mock from 'mockjs'
//常量
//获取教师任课的教学班信息
const GET_TECHER_COURSE_CLASS_MSG = 'GET_TECHER_COURSE_CLASS_MSG';

//函数
//获取教师任课的教学班信息
const getTeacherCourseClassMsg = (url) => {
    return (dispatch) => {
        
        dispatch({ type: actions.UpUIState.RIGHT_LOADING_OPEN });

        getData(CONFIG.CourseClassProxy + url,2).then(res => {
            return res.json()
        }).then(json => {
            if (json.StatusCode === 400) {
                console.log('错误码：' + json.StatusCode)
            } else if (json.StatusCode === 200) {
                console.log(json.Data)
                dispatch({ type: GET_TECHER_COURSE_CLASS_MSG, data: json.Data });
                dispatch({ type: actions.UpUIState.RIGHT_LOADING_CLOSE });
            }
        });
    }
}

export default {
    GET_TECHER_COURSE_CLASS_MSG,
    getTeacherCourseClassMsg

}