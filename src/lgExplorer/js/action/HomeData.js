import ApiAction from '../action/Api'


const GET_WEBSITELINK_FROM_DIFFERENT_PREIOD = "GET_WEBSITELINK_FROM_DIFFERENT_PREIOD"//从不同学段获取网站信息
const REFRESH_WEBSITELINK_RESOURCE = "REFRESH_WEBSITELINK_RESOURCE"//更新网站资源链接
const GET_PEROIDLIST_INFO = "GET_PEROIDLIST_INFO" //获取学段信息
const GET_RESOURCE_LINK_INFO = "GET_RESOURCE_LINK_INFO"//资源库链接信息
const REFRESH_RESOURCELINK_INFO = "REFRESH_RESOURCELINK_INFO"//更新资源库链接
const GET_MYRESOURCE_INFO = "GET_MYRESOURCE_INFO"//获取我的资源库链接信息
const INIT_LOADING_HIDE = "INIT_LOADING_HIDE"//默认进入页面时候的加载中效果
const PERIOD_WEBLISTLINK_LOADING = "PERIOD_WEBLISTLINK_LOADING"//切换时候学段时候的加载中效果
const colorList = ["red", "green", "blue", "pink", "purple", "qing"];
const GETCOURSEID_FROM_COOKIE="GETCOURSEID_FROM_COOKIE"//在cookie中获取存放在学科ID参数
const colorIndex = colorList.length - 1;
const RESOURCE_LOADING = "RESOURCE_LOADING"





const getLinkData = (Period = "P1", SubjectId) => {
    // let url = `/SubjectResMgr/LancooBrowser/GetPeriodList?Period=${Period}`
    let url = `/SubjectResMgr/LancooBrowser/WebsitesList?Period=${Period}&SubjectId=${SubjectId}`
    console.log(SubjectId)
    return dispatch => {
        dispatch({
            type: PERIOD_WEBLISTLINK_LOADING,
            data: true
        })
        ApiAction.getMethod(url).then(json => {
            let webLinkList = json.Data
            webLinkList = webLinkList.map(item => {
                return {
                    ...item,
                    List: item.List.map(i => {
                        let ranIndex = Math.floor(Math.random() * (colorIndex + 1));
                        return {
                            ...i,
                            word: "",
                            imgShow: "0",
                            backgroundColor: colorList[ranIndex]
                        }
                    })
                }

            })
            console.log(webLinkList)

            dispatch({
                type: GET_WEBSITELINK_FROM_DIFFERENT_PREIOD,
                data: webLinkList
            })
            dispatch({
                type: INIT_LOADING_HIDE

            })
            dispatch({
                type: PERIOD_WEBLISTLINK_LOADING,
                data: false
            })
        })
    }
}


const getPeriodList = (SubjectId) => {
    let url = `/SubjectResMgr/LancooBrowser/GetPeriodList`;
    return dispatch => {
        ApiAction.getMethod(url).then(json => {
            if (json.StatusCode === 200) {
                let periodList = json.Data
                console.log("接收成功");
                dispatch({
                    type: GET_PEROIDLIST_INFO,
                    data: periodList
                });

                dispatch(getLinkData(periodList[0].PeriodId, SubjectId));

            }
        })


    }
}




const getResLinkList = () => {
    return dispatch => {
        dispatch({
            type: RESOURCE_LOADING,
            data: true
        })
        const url = `/SubjectResMgr/LancooBrowser/GetResLibList`
        ApiAction.getMethod(url).then(json => {

            if (json.StatusCode === 200) {
                let resLinkList = json.Data.map(item => {
                    let ranIndex = Math.floor(Math.random() * (colorIndex + 1));
                    return {
                        ...item,
                        word: "",
                        backgroundColor: colorList[ranIndex]
                    }

                })
                dispatch({
                    type: GET_RESOURCE_LINK_INFO,
                    data: resLinkList
                })

                dispatch({
                    type: RESOURCE_LOADING,
                    data: false
                })
            }

            else {
                console.log(json.Msg)
            }
        })
    }
}

const getMyResLibList = () => {
    return dispatch => {
        dispatch({
            type: RESOURCE_LOADING,
            data: true
        })
        const url = `/SubjectResMgr/LancooBrowser/GetMyResLibList`
        ApiAction.getMethod(url).then(json => {
            if (json.StatusCode === 200) {
                let myResLibList = json.Data
                dispatch({
                    type: GET_MYRESOURCE_INFO,
                    data: myResLibList
                })
                dispatch({
                    type: RESOURCE_LOADING,
                    data: false
                })
            }
        });
    }
}



export default {
    GET_WEBSITELINK_FROM_DIFFERENT_PREIOD,
    getLinkData,
    REFRESH_WEBSITELINK_RESOURCE,

    GET_PEROIDLIST_INFO,
    getPeriodList,

    GET_RESOURCE_LINK_INFO,
    getResLinkList,
    REFRESH_RESOURCELINK_INFO,

    GET_MYRESOURCE_INFO,
    getMyResLibList,

    INIT_LOADING_HIDE,
    PERIOD_WEBLISTLINK_LOADING,
    RESOURCE_LOADING,

    GETCOURSEID_FROM_COOKIE

}