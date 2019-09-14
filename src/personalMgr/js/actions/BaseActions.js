import Method from "./Method";

import AppAlertActions from "./AppAlertActions";

import {getData} from "../../../common/js/fetch";

import LoginUserActions from "./LoginUserActions";

const BASE_INFO_UPDATE = 'BASE_INFO_UPDATE';



const Init = () => {

    return (dispatch,getState) => {

       /* let { UserID,UserType } = getState().LoginUser;*/


        let LoginUserPromise =    getData('http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev/Login').then(res => res.json()).then(json => {

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

    Init

}