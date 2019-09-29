import { postData, getData } from "../../../common/js/fetch";
import UpUIState from './UpUIState';
import CONFIG from '../../../common/js/config';
import 'whatwg-fetch';
import actions from './index'



//操作常量
//获取登录用户信息
const GET_LOGIN_USER_INFO = 'GET_LOGIN_USER_INFO';
//获取所有年级总览信息
const GET_ALL_USER_PREVIEW = 'GET_ALL_USER_PREVIEW';
//获取学生档案信息
const GET_GRADE_STUDENT_PREVIEW = 'GET_GRADE_STUDENT_PREVIEW';
//获取教师档案信息
const GET_SUBJECT_TEACHER_PREVIEW = 'GET_SUBJECT_TEACHER_PREVIEW';
//获取领导档案信息
const GET_SCHOOL_LEADER_PREVIEW = 'GET_SCHOOL_LEADER_PREVIEW';
//获取年级班级信息
const GET_GRADE_CLASS_MSG = 'GET_GRADE_CLASS_MSG';
//获取职称信息
const GET_TEACHER_TITLE_MSG = 'GET_TEACHER_TITLE_MSG'
//获取学科信息
const GET_SUBJECT_TEACHER_MSG = 'GET_SUBJECT_TEACHER_MSG';
//编辑/添加学生
const SET_STUDENT_MSG = 'SET_STUDENT_MSG';
//编辑/添加学生:默认
const SET_INIT_STUDENT_MSG = 'SET_INIT_STUDENT_MSG';

//编辑/添加教师
const SET_TEACHER_MSG = 'SET_TEACHER_MSG';
//编辑/添加教师:默认
const SET_INIT_TEACHER_MSG = 'SET_INIT_TEACHER_MSG';

//已审核
const GET_DID_SIGN_UP_LOG_MSG = 'GET_DID_SIGN_UP_LOG_MSG';
//待审核
const GET_WILL_SIGN_UP_LOG_MSG = 'GET_WILL_SIGN_UP_LOG_MSG';
//审核状态
const SET_SIGN_UP_LOG_STATUS_MSG = 'SET_SIGN_UP_LOG_STATUS_MSG'
//操作的执行
//获取登录用户信息
const getLoginUser = (url) => {
    return (dispatch) => {
        getData(CONFIG.proxy + url).then(res => res.json()).then(json => {
            dispatch({ type: GET_LOGIN_USER_INFO, data: json.data.result });
        });
    }
};
//获取所有用户总览信息/改
const getAllUserPreview = (url) => {
    return (dispatch) => {
        // console.log(CONFIG.proxy+url);
        dispatch(actions.UpUIState.RightLoadingOpen());
        getData(CONFIG.UserInfoProxy + url, 2).then(res => {
            if (res.Status === '401') {
                console.log('错误码：' + res.Status)
            }
            return res.json()
        }).then(json => {
            if (json.Status === 400) {
                console.log(json.Status)
            } else if (json.Status === 200) {
                dispatch({ type: GET_ALL_USER_PREVIEW, data: json.Data });
                dispatch(actions.UpUIState.RightLoadingClose());
                dispatch({ type: UpUIState.APP_LOADING_CLOSE });
            }

        });
    }
}

//获取学生档案信息/改
const getGradeStudentPreview = (url, GradeID = { value: 0, title: '全部年级' }, ClassID = { value: 0, title: '全部班级' }) => {
    return (dispatch) => {
        dispatch(actions.UpUIState.TableLoadingOpen());
        getData(CONFIG.UserInfoProxy + url, 2).then(res => {
            if (res.Status === '401') {
                console.log('错误码：' + res.Status)
            }
            return res.json()
        }).then(json => {
            if (json.Status === 400) {
                console.log(json.Status)
            } else if (json.Status === 200) {
                dispatch({ type: GET_GRADE_STUDENT_PREVIEW, data: json.Data, GradeID: GradeID, ClassID: ClassID });
                dispatch(actions.UpUIState.TableLoadingClose());
            }

        });
    }
}

//获取教师档案信息/改
const getSubjectTeacherPreview = (url, SubjectID = { value: 'all', title: '全部' }) => {
    return (dispatch) => {
        dispatch(actions.UpUIState.TableLoadingOpen());
        getData(CONFIG.UserInfoProxy + url, 2).then(res => {
            if (res.Status === '401') {
                console.log('错误码：' + res.Status)
            }
            return res.json()
        }).then(json => {
            if (json.Status === 400) {
                console.log(json.Status)
            } else if (json.Status === 200) {
                dispatch({ type: GET_SUBJECT_TEACHER_PREVIEW, data: json.Data, SubjectID: SubjectID });
                dispatch(actions.UpUIState.TableLoadingClose());
            }

        });
    }
}
//获取领导档案信息
const getSchoolLeaderPreview = (url) => {
    return (dispatch) => {
        console.log(CONFIG.proxy + url);
        getData(CONFIG.proxy + url).then(res => {
            if (res.status === '401') {
                console.log('错误码：' + res.status)
            }
            return res.json()
        }).then(json => {
            if (json.status === 400) {
            } else if (json.status === 200) {
                dispatch({ type: GET_SCHOOL_LEADER_PREVIEW, data: json.data });
                dispatch({ type: UpUIState.APP_LOADING_CLOSE });
            }

        });
    }
}
//获取年级班级信息/改
const getGradeClassMsg = (url) => {
    return (dispatch) => {
        getData(CONFIG.UserInfoProxy + url, 2).then(res => {
            if (res.Status === '401') {
                console.log('错误码：' + res.Status)
            }
            return res.json()
        }).then(json => {
            if (json.Status === 400) {
                console.log(json.Status)
            } else if (json.Status === 200) {
                dispatch({ type: GET_GRADE_CLASS_MSG, data: json.Data });
            }

        });
    }
}
//获取学科信息/改
const getSubjectTeacherMsg = (url) => {
    return (dispatch) => {

        getData(CONFIG.UserInfoProxy + url, 2).then(res => {
            if (res.Status === '401') {
                console.log('错误码：' + res.status)
            }
            return res.json()
        }).then(json => {
            if (json.Status === 400) {
                console.log(json.Status)
            } else if (json.Status === 200) {
                dispatch({ type: GET_SUBJECT_TEACHER_MSG, data: json.Data });
            }

        });
    }
}
//获取职称信息/改
const getTeacherTitleMsg = (url) => {
    return (dispatch) => {

        getData(CONFIG.UserInfoProxy + url, 2).then(res => {
            if (res.Status === '401') {
                console.log('错误码：' + res.Status)
            }
            return res.json()
        }).then(json => {
            if (json.Status === 400) {
                console.log(json.Status)
            } else if (json.Status === 200) {
                dispatch({ type: GET_TEACHER_TITLE_MSG, data: json.Data });
            }

        });
    }
}
//学生信息编辑/添加
const setStudentMsg = (data) => {
    return (dispatch) => {
        dispatch({ type: SET_STUDENT_MSG, data: data })
    }
}
//学生信息编辑/添加：默认
const setInitStudentMsg = (data) => {
    return (dispatch) => {
        dispatch({ type: SET_INIT_STUDENT_MSG, data: data })
    }
}
//教师信息编辑/添加
const setTeacherMsg = (data) => {
    return (dispatch) => {
        dispatch({ type: SET_TEACHER_MSG, data: data })
    }
}
//教师信息编辑/添加：默认
const setInitTeacherMsg = (data) => {
    return (dispatch) => {
        dispatch({ type: SET_INIT_TEACHER_MSG, data: data })
    }
}

//获取学生注册记录-已审核
const getDidSignUpLog = (url) => {
    
    return (dispatch) => {
        dispatch(actions.UpUIState.TableLoadingOpen());

        getData(CONFIG.UserInfoProxy + url, 2).then(res => {
            if (res.Status === '401') {
                console.log('错误码：' + res.Status)
            }
            return res.json()
        }).then(json => {
            if (json.Status === 400) {
                console.log(json.Status)
            } else if (json.Status === 200) {
                dispatch({ type: GET_DID_SIGN_UP_LOG_MSG, data: json.Data });
                dispatch(actions.UpUIState.TableLoadingClose());

            }

        });
    }
}
//获取学生注册记录-未审核
const getWillSignUpLog = (url) => {
    return (dispatch) => {
        dispatch(actions.UpUIState.TableLoadingOpen());

        getData(CONFIG.UserInfoProxy + url, 2).then(res => {
            if (res.Status === '401') {
                console.log('错误码：' + res.Status)
            }
            return res.json()
        }).then(json => {
            if (json.Status === 400) {
                console.log(json.Status)
            } else if (json.Status === 200) {
                dispatch({ type: GET_WILL_SIGN_UP_LOG_MSG, data: json.Data });
                dispatch(actions.UpUIState.TableLoadingClose());

            }

        });
    }
}
//获取学生注册记录-修改审核次数
const setSignUpLogCountMsg = (data) => {
    return (dispatch) => {  
        dispatch({ type: SET_SIGN_UP_LOG_STATUS_MSG, data: data });
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
    GET_SUBJECT_TEACHER_MSG,

    SET_STUDENT_MSG,
    SET_INIT_STUDENT_MSG,
    setStudentMsg,
    setInitStudentMsg,

    setTeacherMsg,
    setInitTeacherMsg,
    SET_TEACHER_MSG,
    SET_INIT_TEACHER_MSG,

    getTeacherTitleMsg,
    GET_TEACHER_TITLE_MSG,

    GET_DID_SIGN_UP_LOG_MSG,
    getDidSignUpLog,
    GET_WILL_SIGN_UP_LOG_MSG,
    getWillSignUpLog,
    setSignUpLogCountMsg,
    SET_SIGN_UP_LOG_STATUS_MSG
}