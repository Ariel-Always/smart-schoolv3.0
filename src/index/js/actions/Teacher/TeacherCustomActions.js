import CONFIG from "../../../../common/js/config";
import AppLoadingActions from '../AppLoadingActions'
import { getData, PostData } from '../../../../common/js/fetch'
const GET_CUSTOM_DATA = 'GET_CUSTOM_DATA'

const getCustomData = (key, techerID,  keyword = '',subjectID='',subTypeID='1',periodId='4') => {
    let url = '';//桌面数据
    let url2 = '';//备选
    if (key === 'tool') {
        url = '/SubjectResMgr/ToolMgr/Teacher/ListDeskTop?TeacherId=' + techerID;
        url2 = '/SubjectResMgr/ToolMgr/Teacher/ListAvaliableTools?TeacherId=' + techerID+ '&keyWord=' +keyword;
    } else if (key === 'App') {
        url = '/SubjectResMgr/AppMgr/Teacher/ListDeskTop?TeacherId=' + techerID;
        url2 = '/SubjectResMgr/AppMgr/Teacher/ListAvaliableApp?TeacherId=' + techerID + '&keyWord=' +keyword;
    } else if (key === 'Website') {
        url = '/SubjectResMgr/WebSiteMgr/Teacher/ListDeskTop?TeacherId=' + techerID;
        url2 = '/SubjectResMgr/WebSiteMgr/Teacher/ListAvailableWebsites?TeacherId=' + techerID +'&keyWord=' +keyword +'&SubjectId='+subjectID+'&PeriodId='+periodId+'&SubTypeId='+subTypeID;

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
                        dispatch({ type: GET_CUSTOM_DATA, data: data1,data2: json.Data, key: key });
                    }
                });
            }
        });
    }
}

export default {
    GET_CUSTOM_DATA,

    getCustomData


}