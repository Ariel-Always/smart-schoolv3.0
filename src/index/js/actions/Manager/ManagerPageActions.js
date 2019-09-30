import HeaderActions from './HeaderActions';

import Method from "../Method";

import AppAlertActions from "../AppAlertActions";

import AppLoadingActions from '../AppLoadingActions';


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

        }

    });

  }

};


const getManagerDesk = async ({UserID,dispatch}) => {

    let res = await Method.getGetData(`/SubjectInfoMgr/DeskTop/Admin/GetDeskTop?UserID=${UserID}`,2,'http://47.244.238.75:7300/mock/5d7e0519fdd0dc0457886a3c/webCloudDev');

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg}));

    }

};



export default {

    MODULES_INFO_UPDATE,

    PageInit

}