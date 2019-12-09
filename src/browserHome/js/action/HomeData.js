import ApiAction from '../action/Api'
import { getData, postData } from '../../../common/js/fetch/index'
const LINK_INFORMATION = " LINK_INFORMATION"; //网站链接的数组行为
const RESOURCE_INFORMATION = "RESOURCE_INFORMATION";//资源库的数组行为
const LINK_ARRUPDATE = "LINK_ARRUPDATE";//更新网站链接的数组
const RESOURCE_ARRUPDATE = "RESOURCE_ARRUPDATE";//更新资源库的数组行为
const WORD_CHANGE = "WORD_CHANGE"//监听输入框输入行为

const GET_WEBSITELINK_FROM_DIFFERENT_PREIOD = "GET_WEBSITELINK_FROM_DIFFERENT_PREIOD"//从不同学段获取网站信息
const REFRESH_WEBSITELINK_RESOURCE = "GET_WEBSITELINK_FROM_DIFFERENT_PREIOD"//更新网站资源链接
const GET_PEROIDLIST_INFO = "GET_PEROIDLIST_INFO" //获取学段信息
const GET_RESOURCE_LINK_INFO = "GET_RESOURCE_LINK_INFO"//资源库链接信息
const REFRESH_RESOURCELINK_INFO = "REFRESH_RESOURCELINK_INFO"//更新资源库链接
const GET_MYRESOURCE_INFO = "GET_MYRESOURCE_INFO"//获取我的资源库链接信息





// const getLinkData = () => {
//     return dispatcn => {

// getData('http://192.168.2.202:7300/mock/5db974a3a1aded10689632eb/example/myInterface3', 1).then(res => res.json()).then(data => {

//     let linkArr = data.Result.map(item => {

//         return {

//             ...item,

//             Item: item.Item.map(i => {

//                 return {

//                     ...i,

//                     word: ''
//                 }

//             })

//         }

//     });


//             dispatcn({ type: LINK_INFORMATION, data: linkArr });
//         })

//     }

// }
const getLinkData = (Period = "P1") => {

    // let url = `/SubjectResMgr/LancooBrowser/GetPeriodList?Period=${Period}`
    let url = `/SubjectResMgr/LancooBrowser/WebsitesList?Period=${Period}`
    return dispatch => {
        ApiAction.getMethod(url).then(json => {
            let webLinkList = json.Data
            webLinkList = webLinkList.map(item => {
                return {
                    ...item,
                    List: item.List.map(i => {
                        return {
                            ...i,
                            word: ""

                        }
                    })
                }

            })
            console.log(webLinkList)

            dispatch({
                type: GET_WEBSITELINK_FROM_DIFFERENT_PREIOD,
                data: webLinkList
            })
        })
    }
}


const getPeriodList = () => {
    let url = `/SubjectResMgr/LancooBrowser/GetPeriodList`;
    return dispatch => {
        ApiAction.getMethod(url).then(json => {
            if (json.StatusCode === 200) {
                let periodList = json.Data
                console.log("接收成功");
                dispatch({
                    type: GET_PEROIDLIST_INFO,
                    data: periodList
                })

            }


        })


    }
}

// const getResBaseData = () => {
//     return dispatch => {
//         getData("http://192.168.2.202:7300/mock/5db974a3a1aded10689632eb/example/interface4", 1).then(res => res.json()).then(data => {
//             let baseArr = data.Resource.map(item => {
//                 return {
//                     ...item,
//                     word: ''
//                 }
//             })

//             dispatch({ type: RESOURCE_INFORMATION, data: baseArr });
//         })
//     }

// }


const getResLinkList = () => {
    return dispatch => {
        const url = `/SubjectResMgr/LancooBrowser/GetResLibList`
        ApiAction.getMethod(url).then(json => {

            if (json.StatusCode === 200) {
                let resLinkList = json.Data.map(item => {
                    return {
                        ...item,
                        word: ""
                    }

                })
                dispatch({
                    type: GET_RESOURCE_LINK_INFO,
                    data: resLinkList
                })
                console.log(resLinkList)
            }
            else {
                console.log(json.Msg)
            }
        })
    }
}

const getMyResLibList = () => {
    return dispatch => {
        const url = `/SubjectResMgr/LancooBrowser/GetMyResLibList`
        ApiAction.getMethod(url).then(json => {
            if (json.StatusCode === 200) {
                let myResLibList = json.Data
                dispatch({
                    type: GET_MYRESOURCE_INFO,
                    data: myResLibList
                })
            }
        });
    }
}



export default {
    LINK_INFORMATION,
    RESOURCE_INFORMATION,
    LINK_ARRUPDATE,
    RESOURCE_ARRUPDATE,
    // getLinkData,
    // getResBaseData,
    WORD_CHANGE,
    getLinkData,
    GET_WEBSITELINK_FROM_DIFFERENT_PREIOD,
    REFRESH_WEBSITELINK_RESOURCE,

    GET_PEROIDLIST_INFO,
    getPeriodList,
    GET_RESOURCE_LINK_INFO,
    getResLinkList,
    REFRESH_RESOURCELINK_INFO,
    GET_MYRESOURCE_INFO,
    getMyResLibList


}