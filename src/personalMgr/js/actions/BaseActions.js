import Method from "./Method";

import AppAlertActions from "./AppAlertActions";

import {getData} from "../../../common/js/fetch";

import LoginUserActions from "./LoginUserActions";

const BASE_INFO_UPDATE = 'BASE_INFO_UPDATE';

const BASE_SETTING_STATUS_CHANGE = 'BASE_SETTING_STATUS_CHANGE';


const Init = () => {

    return (dispatch,getState) => {

       /* let { UserID,UserType } = getState().LoginUser;*/


        let LoginUserPromise =    Method.getGetData('/Login').then(json => {

            dispatch({type:LoginUserActions.UPDATE_LOGIN_USER,data:json.data.result});

            let data = json.data.result;

            let UserType = data.UserType;

            let UserID = data.UserID;

            let baseInfo =  Method.getGetData(`/UserMgr/PersonalMgr/GetBasicInfo?UserID=${UserID}&UserType=${UserType}`);

            baseInfo.then(json => {

                if (json.Status === 200){

                    let data = json.Data;

                      dispatch({type:BASE_INFO_UPDATE,data:data});

                }else{

                    dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{

                            type:"btn-error",

                            close:hideAlert(dispatch),

                            ok:hideAlert(dispatch),

                            cancel:hideAlert(dispatch)

                        }});

                }

            })


        });


    }

};


const hideAlert = (dispatch) => {

    return () => { dispatch({type:AppAlertActions.APP_ALERT_HIDE}) }

};

export default {

    BASE_INFO_UPDATE,

    BASE_SETTING_STATUS_CHANGE,

    Init

}