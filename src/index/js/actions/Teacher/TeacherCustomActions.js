import CONFIG from "../../../../common/js/config";
import AppLoadingActions from '../AppLoadingActions'
import { getData, PostData, postData } from '../../../../common/js/fetch'
const GET_CUSTOM_DATA = 'GET_CUSTOM_DATA'

const SET_CUSTOM_DATA = 'SET_CUSTOM_DATA'

const SET_ONE_CUSTOM_DATA = 'SET_ONE_CUSTOM_DATA'
const GET_ALTER_PERIOD_DATA = 'GET_ALTER_PERIOD_DATA'
const GET_ALTER_DATA = 'GET_ALTER_DATA'
const getCustomData = (key, techerID, keyword = '', subjectID = '', periodId = '2') => {
    let url = '';//桌面数据
    let url2 = '';//备选
    if (key === 'tool') {
        url = '/SubjectResMgr/ToolMgr/Teacher/ListDeskTop?TeacherId=' + techerID;
        url2 = '/SubjectResMgr/ToolMgr/Teacher/ListAvaliableTools?TeacherId=' + techerID + '&keyWord=' + keyword;
    } else if (key === 'App') {
        url = '/SubjectResMgr/AppMgr/Teacher/ListDeskTop?TeacherId=' + techerID;
        url2 = '/SubjectResMgr/AppMgr/Teacher/ListAvaliableApp?TeacherId=' + techerID + '&keyWord=' + keyword;
    } else if (key === 'Website') {
        url = '/SubjectResMgr/WebSiteMgr/Teacher/ListDeskTop?TeacherId=' + techerID;
        url2 = '/SubjectResMgr/WebSiteMgr/Teacher/ListAvailableWebsites?TeacherID=' + techerID + '&keyWord=' + keyword + '&SubjectId=' + subjectID + '&PeriodId=' + periodId;

    } else if (key === 'database') {
        url = '/SubjectResMgr/ResLibMgr/Teacher/ListDeskTop?TeacherId=' + techerID;
        url2 = '/SubjectResMgr/ResLibMgr/Teacher/listAvalibleResLib?TeacherId=' + techerID;

    } else {
        console.log('key值有误')
        return;
    }
    return (dispatch) => {
        dispatch({ type: AppLoadingActions.CUSTOM_LOADING_OPEN });
        getData(CONFIG.CustomProxy + url, 2).then(res => {
            return res.json()
        }).then(json => {
            if (json.Status === 400) {
                console.log('错误码：' + json.Status)
            } else if (json.StatusCode === 200) {
                let data1 = json.Data;
                getData(CONFIG.CustomProxy + url2, 2).then(res => {
                    return res.json()
                }).then(json => {
                    if (json.Status === 400) {
                        console.log('错误码：' + json.Status)
                    } else if (json.StatusCode === 200) {
                        dispatch({ type: AppLoadingActions.CUSTOM_LOADING_CLOSE });
                        dispatch({ type: GET_CUSTOM_DATA, data: data1, data2: json.Data, key: key });
                    }
                });
            }
        });
    }
}
// 同滑块内
const setCustomData = (dataType, dataObj, source, destination) => {
    return (dispatch) => {
        dispatch({ type: SET_CUSTOM_DATA, dataType, dataObj, source, destination });
    }
}
// 更改main数据
const fetchCustomData = (url, dataType = 'Website') => {

    return (dispatch, getState) => {
        dispatch({ type: AppLoadingActions.CUSTOM_LOADING_OPEN });
        let State = getState();
        let MainData = State.Teacher.TeacherCustomData.WebsiteData;
        let NewData = {};
        let List = [];
        let Groups = []
        MainData.map((child, index) => {
            let group = {}
            if (child.IsGroup) {
                group.GroupName = child.Name;
                group.OrderNo = child.key;
                group.List = child.List.map((child1, index1) => {
                    return {
                        ID: child1.ID,
                        OrderNo: child1.key
                    }
                })
                Groups.push(group)
            } else {
                List.push({
                    ID: child.ID,
                    OrderNo: child.key
                })
            }
        })

        NewData = { TeacherID: State.LoginUser.UserID, List: List, Groups: Groups }

        postData(CONFIG.CustomProxy + url, {
            TeacherID: State.LoginUser.UserID,
            List: List,
            Groups: Groups
        }, 2, 'json').then(res => {
            return res.json()
        }).then(json => {
            if (json.Status === 400) {
                console.log('错误码：' + json.Status)
            } else if (json.StatusCode === 200) {

                dispatch({ type: AppLoadingActions.CUSTOM_LOADING_CLOSE });
            }
        });
    }
}

// 删除数据
const fetchDeleteCustomData = (url, ID) => {

    return (dispatch, getState) => {
        dispatch({ type: AppLoadingActions.CUSTOM_LOADING_OPEN });
        let State = getState();

        postData(CONFIG.CustomProxy + url, {
            TeacherID: State.LoginUser.UserID,
            SchoolID: State.LoginUser.SchoolID,
            WebsiteID: ID,

        }, 2, 'json').then(res => {
            return res.json()
        }).then(json => {
            if (json.Status === 400) {
                console.log('错误码：' + json.Status)
            } else if (json.StatusCode === 200) {

                dispatch({ type: AppLoadingActions.CUSTOM_LOADING_CLOSE });
            }
        });
    }
}

// 同滑块内
const setOneCustomData = (dataObj, source) => {
    return (dispatch) => {
        dispatch({ type: SET_ONE_CUSTOM_DATA, dataObj, source });
    }
}

// 获取学段
const getAlterPeriodData = (url) =>{
    return (dispatch) => {

        getData(CONFIG.CustomProxy + url, 2).then(res => {
            return res.json()
        }).then(json => {
            if (json.Status === 400) {
                console.log('错误码：' + json.Status)
            } else if (json.StatusCode === 200) {
                dispatch({ type: GET_ALTER_PERIOD_DATA, data: json.Data })
            }
        });
    }
}

// 获取备选
const getAlterData = (url) =>{
    return (dispatch) => {

        getData(CONFIG.CustomProxy + url, 2).then(res => {
            return res.json()
        }).then(json => {
            if (json.Status === 400) {
                console.log('错误码：' + json.Status)
            } else if (json.StatusCode === 200) {
                dispatch({ type: GET_ALTER_DATA, data: json.Data })
            }
        });
    }
}
export default {
    GET_CUSTOM_DATA,

    getCustomData,

    setCustomData,

    SET_CUSTOM_DATA,

    fetchCustomData,

    SET_ONE_CUSTOM_DATA,

    setOneCustomData,
    fetchDeleteCustomData,

    getAlterPeriodData,

    GET_ALTER_PERIOD_DATA,

    GET_ALTER_DATA,

    getAlterData
}