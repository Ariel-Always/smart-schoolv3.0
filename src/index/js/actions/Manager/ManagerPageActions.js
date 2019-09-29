import HeaderActions from './HeaderActions';
import Method from "../Method";
import AppAlertActions from "../AppAlertActions";



const PageInit = () => {

  return (dispatch,getState)=>{

    let { UserID }  = getState().LoginUser;

    getManagerDesk({UserID,dispatch}).then(data=>{

        if (data){

            const { TopVisit,OnlineUsers,SuspiciousLogin,OnlineDiskUsed,GroupFileSpaceUsed } = data;

            dispatch({type:HeaderActions.HEADER_STATICS_UPDATE,data:{TopVisit,OnlineUsers,SuspiciousLogin,OnlineDiskUsed,GroupFileSpaceUsed}});

        }

    });

  }

};


const getManagerDesk = async ({UserID,dispatch}) => {

    let res = await Method.getGetData(`/SubjectInfoMgr/DeskTop/Admin/GetDeskTop?UserID=${UserID}`,2);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        console.log(res);

        dispatch(AppAlertActions.alertError({title:res.Msg}));

    }

};



export default {

    PageInit

}