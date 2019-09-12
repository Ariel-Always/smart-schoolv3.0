import Method from "../Method";

import AppAlertActions from "../AppAlertActions";

const Init = () => {

    return (dispatch,getState) => {

        let { UserID,UserType } = getState().LoginUser;

        let baseInfo =  Method.getGetData(`/UserMgr/PersonalMgr/GetBasicInfo?UserID=${UserID}&UserType=${UserType}`);

        baseInfo.then(json => {

            if (json.Status === 200){

                let data = json.Data;

                if (UserType === 0){

                    let {

                        UserID,

                        UserName,

                        ShortName,

                        Gender,

                        RoleNames,

                        QQ,

                        Weixin,

                        Weibo,

                        Telephone,

                        Sign

                    } = data;

                }


            }else{

                dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{

                        type:"btn-error",

                        close:hideAlert(dispatch),

                        ok:hideAlert(dispatch),

                        cancel:hideAlert(dispatch)

                    }});

            }

        })

    }

};


export default {

    Init

}