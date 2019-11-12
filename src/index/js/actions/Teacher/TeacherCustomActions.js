import CONFIG from "../../../../common/js/config";
import AppLoadingActions from '../AppLoadingActions'
import { getData, PostData, postData } from '../../../../common/js/fetch'
const GET_CUSTOM_DATA = 'GET_CUSTOM_DATA'

const SET_CUSTOM_DATA = 'SET_CUSTOM_DATA'

const SET_ONE_CUSTOM_DATA = 'SET_ONE_CUSTOM_DATA'
const GET_ALTER_PERIOD_DATA = 'GET_ALTER_PERIOD_DATA'
const GET_ALTER_DATA = 'GET_ALTER_DATA'
const GET_WEBSITE_ALTER_TIPS = 'GET_WEBSITE_ALTER_TIPS'
const GET_APP_ALTER_TIPS = 'GET_APP_ALTER_TIPS'
const GET_TOOL_ALTER_TIPS = 'GET_TOOL_ALTER_TIPS'
const GET_DATABASE_ALTER_TIPS = 'GET_DATABASE_ALTER_TIPS'
const getCustomData = (key, techerID, keyword = '', subjectID = '', periodId = '') => {
    let url = '';//桌面数据
    let url2 = '';//备选
    let urlTips = '/SubjectResMgr/CommonMgr/Teacher/IsNotify?TeacherId=' + techerID
    if (key === 'tool') {
        url = '/SubjectResMgr/ToolMgr/Teacher/ListDeskTop?TeacherId=' + techerID;
        url2 = '/SubjectResMgr/ToolMgr/Teacher/ListAvaliableTools?TeacherId=' + techerID + '&keyWord=' + keyword;
        urlTips += '&SectionID=4';
    } else if (key === 'App') {
        url = '/SubjectResMgr/AppMgr/Teacher/ListDeskTop?TeacherId=' + techerID;
        urlTips += '&SectionID=1';
        url2 = '/SubjectResMgr/AppMgr/Teacher/ListAvaliableApp?TeacherId=' + techerID + '&keyWord=' + keyword;
    } else if (key === 'Website') {
        url = '/SubjectResMgr/WebSiteMgr/Teacher/ListDeskTop?TeacherId=' + techerID;
        url2 = '/SubjectResMgr/WebSiteMgr/Teacher/ListAvailableWebsites?TeacherID=' + techerID + '&keyWord=' + keyword + '&SubjectId=' + subjectID + '&PeriodId=' + periodId;
        urlTips += '&SectionID=2';
    } else if (key === 'database') {
        url = '/SubjectResMgr/ResLibMgr/Teacher/ListDeskTop?TeacherId=' + techerID;
        url2 = '/SubjectResMgr/ResLibMgr/Teacher/listAvalibleResLib?TeacherId=' + techerID;
        urlTips += '&SectionID=3';
    } else {
        console.log('key值有误')
        return;
    }
    return (dispatch) => {
        dispatch({ type: AppLoadingActions.CUSTOM_OPACITY_LOADING_OPEN });
        dispatch(getAlterTips(urlTips, key))

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
                        dispatch({ type: GET_CUSTOM_DATA, data: data1, data2: json.Data, key: key });
                        dispatch({ type: AppLoadingActions.CUSTOM_OPACITY_LOADING_CLOSE });
                        dispatch({ type: AppLoadingActions.CUSTOM_LOADING_CLOSE });

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
        if (dataType === 'Website') {
            MainData = State.Teacher.TeacherCustomData.WebsiteData;
        } else if (dataType === 'App') {
            MainData = State.Teacher.TeacherCustomData.AppData;
            
        } else if (dataType === 'tool') {
            MainData = State.Teacher.TeacherCustomData.ToolData;
            
        } else if (dataType === 'database') {
            MainData = State.Teacher.TeacherCustomData.DataBaseData;
            
        }
        
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
const fetchDeleteCustomData = (url, ID,dataType='Website') => {

    return (dispatch, getState) => {
        dispatch({ type: AppLoadingActions.CUSTOM_LOADING_OPEN });
        let State = getState();
        let IDObj={}
        if (dataType === 'Website') {
            IDObj = {WebsiteID: ID};
        }  else if (dataType === 'tool') {
            IDObj = {ToolID: ID};
            
        } 
        postData(CONFIG.CustomProxy + url, {
            TeacherID: State.LoginUser.UserID,
            SchoolID: State.LoginUser.SchoolID,
            ...IDObj

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
const getAlterPeriodData = (url) => {
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
const getAlterData = (url) => {
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
// 获取提示
const getAlterTips = (url, type = 'Website') => {

    return (dispatch) => {

        getData(CONFIG.CustomProxy + url, 2).then(res => {
            return res.json()
        }).then(json => {
            if (json.Status === 400) {
                console.log('错误码：' + json.Status)
            } else if (json.StatusCode === 200) {
                if (type === 'Website') {
                    dispatch({ type: GET_WEBSITE_ALTER_TIPS, data: json.Data })
                } else if (type === 'App') {
                    dispatch({ type: GET_APP_ALTER_TIPS, data: json.Data })
                } else if (type === 'tool') {
                    dispatch({ type: GET_TOOL_ALTER_TIPS, data: json.Data })
                } else if (type === 'database') {
                    dispatch({ type: GET_DATABASE_ALTER_TIPS, data: json.Data })
                }
            }
        });
    }
}
// 获取提示
const setAlterTips = (data, type = 'Website') => {
    let url = '/SubjectResMgr/CommonMgr/Teacher/SetNotNotify'
    
    return (dispatch) => {
        if (type === 'Website') {
            dispatch({ type: GET_WEBSITE_ALTER_TIPS, data: false })
        } else if (type === 'App') {
            dispatch({ type: GET_APP_ALTER_TIPS, data: false })
        } else if (type === 'tool') {
            dispatch({ type: GET_TOOL_ALTER_TIPS, data: false })
        } else if (type === 'database') {
            dispatch({ type: GET_DATABASE_ALTER_TIPS, data: false })
        }
        dispatch({ type: AppLoadingActions.CUSTOM_LOADING_OPEN });

        postData(CONFIG.CustomProxy + url, data, 2, 'json').then(res => {
            return res.json()
        }).then(json => {
            dispatch({ type: AppLoadingActions.CUSTOM_LOADING_CLOSE });

            if (json.Status === 400) {
                console.log('错误码：' + json.Status)
            } else if (json.StatusCode === 200) {


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

    getAlterData,
    GET_WEBSITE_ALTER_TIPS,
    GET_APP_ALTER_TIPS,
    GET_TOOL_ALTER_TIPS,
    GET_DATABASE_ALTER_TIPS,
    setAlterTips

}