import HeaderActions from './HeaderActions';

import Method from "../Method";

import AppAlertActions from "../AppAlertActions";

import AppLoadingActions from '../AppLoadingActions';

import CONFIG from "../../../../common/js/config";

import dynamicFile from "dynamic-file";

import {getData} from "../../../../common/js/fetch";

const MODULES_INFO_UPDATE = 'MODULES_INFO_UPDATE';


const PageInit = () => {

  return (dispatch,getState)=>{

    let { UserID }  = getState().LoginUser;

    getManagerDesk({UserID,dispatch}).then(data=>{

        if (data){

            const { TopVisit,OnlineUsers,SuspiciousLogin,OnlineDiskUsed,GroupFileSpaceUsed,Groups } = data;

            dispatch({type:HeaderActions.HEADER_STATICS_UPDATE,data:{TopVisit,OnlineUsers,SuspiciousLogin,OnlineDiskUsed,GroupFileSpaceUsed}});

            dispatch({type:MODULES_INFO_UPDATE,data:Groups});

            dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

            let token = sessionStorage.getItem('token');

            let host = `http://${window.location.host}/`;

            GetMsgWebServerAddress({dispatch}).then(data=>{

                if (data){

                    let PsnMgrLgAssistantAddr = data.WebSvrAddr;

                    sessionStorage.setItem('PsnMgrToken',token);//用户Token

                    sessionStorage.setItem('PsnMgrMainServerAddr', host); //基础平台IP地址和端口号 形如：http://192.168.129.1:30103/

                    sessionStorage.setItem('PsnMgrLgAssistantAddr',PsnMgrLgAssistantAddr);

                    dynamicFile([

                        `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/css/lancoo.cp.assistantInfoCenter.css`,

                        `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/js/jquery-1.7.2.min.js`

                    ]).then(()=>{

                        dynamicFile([

                            `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/assets/jquery.pagination.js`,

                            `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/js/lancoo.cp.assistantInfoCenter.js`

                        ])

                    })

                }

            })



        }

    });

  }

};


const getManagerDesk = async ({UserID,dispatch}) => {

    let res = await Method.getGetData(`/SubjectInfoMgr/DeskTop/Admin/GetDeskTop?UserID=${UserID}`,2,CONFIG.DeskTopProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        //window.location.href='/error.aspx';

        alert(res.Msg);

    }

};


const GetMsgWebServerAddress = async ({dispatch}) => {

    const res = await Method.getGetData('/Base/GetSingleSubsystemServer?SysID=200',1);

    if (res.StatusCode===200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:'消息获取失败！'}));

    }

};


export default {

    MODULES_INFO_UPDATE,

    PageInit

}