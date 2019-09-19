import Method from "./Method";

import AppAlertActions from "./AppAlertActions";

import {getData} from "../../../common/js/fetch";

import LoginUserActions from "./LoginUserActions";

import AppLoadingActions from './AppLoadingActions';



const BASE_INFO_UPDATE = 'BASE_INFO_UPDATE';

const BASE_SETTING_EDITOR_OPEN = 'BASE_SETTING_EDITOR_OPEN';

const BASE_SETTING_EDITOR_CLOSE = 'BASE_SETTING_EDITOR_CLOSE';

const BASE_SETTING_SHORT_NAME_CHANGE = 'BASE_SETTING_SHORT_NAME_CHANGE';

const BASE_SETTING_QQ_CHANGE = 'BASE_SETTING_QQ_CHANGE';

const BASE_SETTING_WEIXIN_CHANGE = 'BASE_SETTING_WEIXIN_CHANGE';

const BASE_SETTING_WEIBO_CHANGE = 'BASE_SETTING_WEIBO_CHANGE';

const BASE_SETTING_TEL_CHANGE = 'BASE_SETTING_TEL_CHANGE';

const BASE_SETTING_SIGN_CHANGE = 'BASE_SETTING_SIGN_CHANGE';

const BASE_SETTING_SHORT_NAME_TIPS_SHOW = 'BASE_SETTING_SHORT_NAME_TIPS_SHOW';

const BASE_SETTING_SHORT_NAME_TIPS_HIDE = 'BASE_SETTING_SHORT_NAME_TIPS_HIDE';

const BASE_SETTING_QQ_TIPS_SHOW = 'BASE_SETTING_QQ_TIPS_SHOW';

const BASE_SETTING_QQ_TIPS_HIDE = 'BASE_SETTING_QQ_TIPS_HIDE';

const BASE_SETTING_WEIXIN_TIPS_SHOW = 'BASE_SETTING_WEIXIN_TIPS_SHOW';

const BASE_SETTING_WEIXIN_TIPS_HIDE = 'BASE_SETTING_WEIXIN_TIPS_HIDE';

const BASE_SETTING_WEIBO_TIPS_SHOW = 'BASE_SETTING_WEIBO_TIPS_SHOW';

const BASE_SETTING_WEIBO_TIPS_HIDE = 'BASE_SETTING_WEIBO_TIPS_HIDE';

const BASE_SETTING_TEL_TIPS_SHOW = 'BASE_SETTING_TEL_TIPS_SHOW';

const BASE_SETTING_TEL_TIPS_HIDE = 'BASE_SETTING_TEL_TIPS_HIDE';

const BASE_SETTING_MANAGER_MODULES_SHOW = 'BASE_SETTING_MANAGER_MODULES_SHOW';

const BASE_SETTING_MANAGER_MODULES_HIDE = 'BASE_SETTING_MANAGER_MODULES_HIDE';

const BASE_SETTING_TEACHER_ROAL_DETAILS_STATUS_SHOW = 'BASE_SETTING_TEACHER_ROAL_DETAILS_STATUS_SHOW';

const BASE_SETTING_TEACHER_ROAL_DETAILS_STATUS_HIDE = 'BASE_SETTING_TEACHER_ROAL_DETAILS_STATUS_HIDE';




const BASE_SETTING_LOADING_HIDE = 'BASE_SETTING_LOADING_HIDE';

const BASE_SETTING_LOADING_SHOW = 'BASE_SETTING_LOADING_SHOW';

//界面初始化函数
const Init = () => {

    return (dispatch,getState) => {


        dispatch({type:BASE_SETTING_LOADING_SHOW});

       /* let { UserID,UserType } = getState().LoginUser;*/


        Method.getGetData('/Login').then(json => {

            dispatch({type:LoginUserActions.UPDATE_LOGIN_USER,data:json.data.result});

            let data = json.data.result;

            let UserType = data.UserType;

            let UserID = data.UserID;

            let baseInfo =  Method.getGetData(`/UserMgr/PersonalMgr/GetBasicInfo?UserID=${UserID}&UserType=${UserType}`);

            baseInfo.then(json => {

                if (json.Status === 200){

                    let data = json.Data;


                    dispatch({type:BASE_INFO_UPDATE,data:data});

                    dispatch({type:BASE_SETTING_LOADING_HIDE});

                    dispatch({type:AppLoadingActions.APP_LOADING_HIDE});


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

const Commit = () => {

  return ( dispatch,getState ) => {

      let { ShortNameTipsShow, QQTipsShow, WeixinTipsShow, WeiboTipsShow, TelephoneTipsShow } = getState().BaseSetting

      let { UserID,UserType }= getState().LoginUser;

      let { ShortNameValue,QQValue,WeixinValue,TelephoneValue,WeiboValue,SignValue } = getState().BaseSetting;

      if ((!ShortNameTipsShow)&&(!QQTipsShow)&&(!WeixinTipsShow)&&(!WeiboTipsShow)&&(!TelephoneTipsShow)){

            let commitPromise = Method.getPostData('/UserMgr/PersonalMgr/UpdateBasicInfo',{

                UserID:UserID,UserType:UserType,ShortName:ShortNameValue,QQ:QQValue,Weixin:WeixinValue,

                Weibo:WeiboValue,Telephone:TelephoneValue,Sign:SignValue,PhotoPath:''

            },2,'no-cors').then(json => {

               if (json.Status === 200){

                   dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{

                           type:"success",

                           title:"保存成功！",

                           hide:()=>{ return dispatch({type:BASE_SETTING_EDITOR_CLOSE}) }

                       }});

               }else{

                   dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{

                           type:"btn-error",

                           close:hideAlert(dispatch),

                           ok:hideAlert(dispatch),

                           cancel:hideAlert(dispatch)

                       }});

                   dispatch({type:BASE_SETTING_EDITOR_CLOSE});

               }

            });

      }


  };

};


const hideAlert = (dispatch) => {

    return () => { dispatch({type:AppAlertActions.APP_ALERT_HIDE}) }

};

export default {

    BASE_INFO_UPDATE,

    BASE_SETTING_EDITOR_OPEN,

    BASE_SETTING_EDITOR_CLOSE,

    BASE_SETTING_SHORT_NAME_CHANGE,

    BASE_SETTING_QQ_CHANGE,

    BASE_SETTING_WEIXIN_CHANGE,

    BASE_SETTING_WEIBO_CHANGE,

    BASE_SETTING_TEL_CHANGE,

    BASE_SETTING_SIGN_CHANGE,

    BASE_SETTING_SHORT_NAME_TIPS_SHOW,

    BASE_SETTING_SHORT_NAME_TIPS_HIDE,

    BASE_SETTING_QQ_TIPS_SHOW,

    BASE_SETTING_QQ_TIPS_HIDE,

    BASE_SETTING_WEIXIN_TIPS_SHOW,

    BASE_SETTING_WEIXIN_TIPS_HIDE,

    BASE_SETTING_WEIBO_TIPS_SHOW,

    BASE_SETTING_WEIBO_TIPS_HIDE,

    BASE_SETTING_TEL_TIPS_SHOW,

    BASE_SETTING_TEL_TIPS_HIDE,

    BASE_SETTING_MANAGER_MODULES_SHOW,

    BASE_SETTING_MANAGER_MODULES_HIDE,

    BASE_SETTING_TEACHER_ROAL_DETAILS_STATUS_SHOW,

    BASE_SETTING_TEACHER_ROAL_DETAILS_STATUS_HIDE,

    BASE_SETTING_LOADING_HIDE,

    BASE_SETTING_LOADING_SHOW,

    Init,

    Commit

}