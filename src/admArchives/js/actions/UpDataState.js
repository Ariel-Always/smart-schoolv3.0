import { postData, getData } from "../../../common/js/fetch";
import UpUIState from './UpUIState';
import Public from '../../../common/js/public'
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
//编辑/添加领导
const SET_INIT_LEADER_MSG = 'SET_INIT_LEADER_MSG';
//编辑/添加领导:默认
const SET_LEADER_MSG = 'SET_LEADER_MSG'
//已审核
const GET_DID_SIGN_UP_LOG_MSG = 'GET_DID_SIGN_UP_LOG_MSG';
//待审核
const GET_WILL_SIGN_UP_LOG_MSG = 'GET_WILL_SIGN_UP_LOG_MSG';
//审核状态
const SET_SIGN_UP_LOG_STATUS_MSG = 'SET_SIGN_UP_LOG_STATUS_MSG'

// 设置学科选择
const SET_SUBJECTID = 'SET_SUBJECTID'
//设置年级选择
const SET_GRADEID = 'SET_GRADEID'

// 毕业生档案
const GET_GRADUATE_GRADE_CLASS_MSG = 'GET_GRADUATE_GRADE_CLASS_MSG';
// 分页获取毕业生信息
const GET_GRADUATE_PREVIEW = 'GET_GRADUATE_PREVIEW';
// 编辑毕业生去向
const GET_GRADUATE_MSG = 'GET_GRADUATE_MSG'
const SET_GRADUATE_MSG = 'SET_GRADUATE_MSG'
// 编辑联系方式
const GET_GRADUATE_CONTACT_MSG = 'GET_GRADUATE_CONTACT_MSG'
const SET_GRADUATE_CONTACT_MSG = 'SET_GRADUATE_CONTACT_MSG'
//操作的执行
//获取登录用户信息
const getLoginUser = (data) => {
    return (dispatch) => {

        dispatch({ type: GET_LOGIN_USER_INFO, data: data });

    }
};
//获取所有用户总览信息/改
const getAllUserPreview = (url) => {
    return (dispatch) => {
        // console.log(CONFIG.proxy+url);
        dispatch(actions.UpUIState.RightLoadingOpen());
        getData(CONFIG.UserInfoProxy + url, 2).then(res => {
            if (res.StatusCode === '401') {
                console.log('错误码：' + res.StatusCode)
            }
            return res.json()
        }).then(json => {
            if (json.StatusCode === 400) {
                console.log(json.StatusCode)
            } else if (json.StatusCode === 200) {
                dispatch({ type: GET_ALL_USER_PREVIEW, data: json.Data });
                dispatch(actions.UpUIState.RightLoadingClose());
                dispatch({ type: UpUIState.APP_LOADING_CLOSE });
            }

        });
    }
}

//获取学生档案信息/改
const getGradeStudentPreview = (url, GradeID = { value: 0, title: '全部年级' }, ClassID = { value: 0, title: '全部班级' }) => {
    console.log(GradeID, ClassID)
    let pageIndex = Public.getUrlQueryVariable(url, 'PageIndex');
    let pageSize = Public.getUrlQueryVariable(url, 'PageSize');
    return (dispatch) => {
        dispatch(actions.UpUIState.TableLoadingOpen());
        getData(CONFIG.UserInfoProxy + url, 2).then(res => {
            if (res.StatusCode === '401') {
                console.log('错误码：' + res.StatusCode)
            }
            return res.json()
        }).then(json => {
            if (json.StatusCode === 400) {
                console.log(json.StatusCode)
            } else if (json.StatusCode === 200) {
                dispatch({ type: GET_GRADE_STUDENT_PREVIEW, data: json.Data, GradeID: GradeID, ClassID: ClassID, pageIndex: pageIndex, pageSize: pageSize });
                dispatch(actions.UpUIState.TableLoadingClose());
            }

        });
    }
}

//获取教师档案信息/改
const getSubjectTeacherPreview = (url, SubjectID) => {
    let pageIndex = Public.getUrlQueryVariable(url, 'PageIndex');
    let pageSize = Public.getUrlQueryVariable(url, 'PageSize');
    return (dispatch) => {
        dispatch(actions.UpUIState.TableLoadingOpen());
        getData(CONFIG.UserInfoProxy + url, 2).then(res => {
            if (res.StatusCode === '401') {
                console.log('错误码：' + res.StatusCode)
            }
            return res.json()
        }).then(json => {
            if (json.StatusCode === 400) {
                console.log(json.StatusCode)
            } else if (json.StatusCode === 200) {
                dispatch({ type: GET_SUBJECT_TEACHER_PREVIEW, data: json.Data, pageIndex: pageIndex, pageSize: pageSize });
                if (SubjectID)
                    dispatch({ type: SET_SUBJECTID, SubjectID: SubjectID })
                dispatch(actions.UpUIState.TableLoadingClose());
            }

        });
    }
}
//获取领导档案信息
const getSchoolLeaderPreview = (url) => {
    return (dispatch) => {
        console.log(CONFIG.XTestProxy + url);
        getData(CONFIG.XTestProxy + url).then(res => {
            if (res.StatusCode === '401') {
                console.log('错误码：' + res.StatusCode)
            }
            return res.json()
        }).then(json => {
            if (json.StatusCode === 400) {
            } else if (json.StatusCode === 200) {
                dispatch({ type: GET_SCHOOL_LEADER_PREVIEW, data: json.Data });
                dispatch({ type: UpUIState.APP_LOADING_CLOSE });
            }

        });
    }
}
//获取年级班级信息/改
const getGradeClassMsg = (url) => {
    return (dispatch) => {
        getData(CONFIG.UserInfoProxy + url, 2).then(res => {
            if (res.StatusCode === '401') {
                console.log('错误码：' + res.StatusCode)
            }
            return res.json()
        }).then(json => {
            if (json.StatusCode === 400) {
                console.log(json.StatusCode)
            } else if (json.StatusCode === 200) {
                dispatch({ type: GET_GRADE_CLASS_MSG, data: json.Data });
            }

        });
    }
}
//获取学科信息/改
const getSubjectTeacherMsg = (url, SubjectID = 'all') => {
    return (dispatch, getState) => {

        getData(CONFIG.UserInfoProxy + url, 2).then(res => {
            if (res.StatusCode === '401') {
                console.log('错误码：' + res.StatusCode)
            }
            return res.json()
        }).then(json => {
            if (json.StatusCode === 400) {
                console.log(json.StatusCode)
            } else if (json.StatusCode === 200) {
                dispatch({ type: GET_SUBJECT_TEACHER_MSG, data: json.Data });
                if (SubjectID !== 'all') {
                    let state = getState();
                    let SubjectList = state.DataState.SubjectTeacherMsg.returnData.SubjectList;
                    let subject = {};
                    SubjectList.map((child, index) => {
                        if (child.value === SubjectID) {
                            subject = child
                        }
                    })
                    dispatch({ type: SET_SUBJECTID, SubjectID: subject })
                }

            }

        });
    }
}
//获取职称信息/改
const getTeacherTitleMsg = (url) => {
    return (dispatch) => {

        getData(CONFIG.UserInfoProxy + url, 2).then(res => {
            if (res.StatusCode === '401') {
                console.log('错误码：' + res.StatusCode)
            }
            return res.json()
        }).then(json => {
            if (json.StatusCode === 400) {
                console.log(json.StatusCode)
            } else if (json.StatusCode === 200) {
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

//领导信息编辑/添加
const setLeaderMsg = (data) => {
    console.log(data)
    return (dispatch) => {
        dispatch({ type: SET_LEADER_MSG, data: data })
    }
}
//领导信息编辑/添加：默认
const setInitLeaderMsg = (data) => {
    return (dispatch) => {
        dispatch({ type: SET_INIT_LEADER_MSG, data: data })
    }
}

//获取学生注册记录-已审核
const getDidSignUpLog = (url) => {

    return (dispatch) => {
        dispatch(actions.UpUIState.TableLoadingOpen());

        getData(CONFIG.UserInfoProxy + url, 2).then(res => {
            if (res.StatusCode === '401') {
                console.log('错误码：' + res.StatusCode)
            }
            return res.json()
        }).then(json => {
            if (json.StatusCode === 400) {
                console.log(json.StatusCode)
            } else if (json.StatusCode === 200) {
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
            if (res.StatusCode === '401') {
                console.log('错误码：' + res.StatusCode)
            }
            return res.json()
        }).then(json => {
            if (json.StatusCode === 400) {
                console.log(json.StatusCode)
            } else if (json.StatusCode === 200) {
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

// 毕业生档案管理-获取年级班级信息
const getGraduateGradeClassMsg = (url) => {
    return (dispatch) => {
        dispatch(actions.UpUIState.RightLoadingOpen());

        getData(CONFIG.XTestProxy + url, 2).then(res => {
            if (res.StatusCode === '401') {
                console.log('错误码：' + res.StatusCode)
            }
            return res.json()
        }).then(json => {
            if (json.StatusCode === 400) {
                console.log(json.StatusCode)
            } else if (json.StatusCode === 200) {
                dispatch({ type: GET_GRADUATE_GRADE_CLASS_MSG, data: json.Data });
                dispatch(actions.UpUIState.RightLoadingClose());

            }

        });
    }
}
// 分页获取毕业生信息
const getGraduatePreview = (url) => {
    let pageIndex = Public.getUrlQueryVariable(url, 'PageIndex');
    let pageSize = Public.getUrlQueryVariable(url, 'PageSize');
    return (dispatch) => {
        dispatch(actions.UpUIState.TableLoadingOpen());

        getData(CONFIG.XTestProxy + url, 2).then(res => {
            if (res.StatusCode === '401') {
                console.log('错误码：' + res.StatusCode)
            }
            return res.json()
        }).then(json => {
            if (json.StatusCode === 400) {
                console.log(json.StatusCode)
            } else if (json.StatusCode === 200) {
                dispatch({ type: GET_GRADUATE_PREVIEW, data: json.Data, pageIndex: pageIndex, pageSize: pageSize });
                dispatch(actions.UpUIState.TableLoadingClose());

            }

        });
    }
}

// 编辑毕业生去向
const getGraduateMsg = (data = {
    UserName: '',
    UserID: '',
    JobType: '',
    Discription: ''
}) => {
    return (dispatch) => {
        dispatch({ type: GET_GRADUATE_MSG, data: data })
    }
}
const setGraduateMsg = (data) => {
    return (dispatch) => {
        dispatch({ type: SET_GRADUATE_MSG, data: data })
    }
}
// 编辑联系方式
const getGraduateContactMsg = (data = {
    UserID: '',
    Email: '',
    Telephone: '',
    HomeAddress: ''
}) => {
    return (dispatch) => {
        dispatch({ type: GET_GRADUATE_CONTACT_MSG, data: data })
    }
}
const setGraduateContactMsg = (data) => {
    return (dispatch) => {
        dispatch({ type: SET_GRADUATE_CONTACT_MSG, data: data })
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

    , SET_SUBJECTID,
    SET_GRADEID,

    setLeaderMsg,
    setInitLeaderMsg,
    SET_INIT_LEADER_MSG,
    SET_LEADER_MSG,

    GET_GRADUATE_GRADE_CLASS_MSG,
    getGraduateGradeClassMsg,

    GET_GRADUATE_PREVIEW,
    getGraduatePreview,
    GET_GRADUATE_MSG,
    SET_GRADUATE_MSG,
    getGraduateMsg,
    setGraduateMsg,

    SET_GRADUATE_CONTACT_MSG,
    GET_GRADUATE_CONTACT_MSG,
    setGraduateContactMsg,
    getGraduateContactMsg

}