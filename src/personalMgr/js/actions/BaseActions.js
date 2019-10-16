import Method from "./Method";

import AppAlertActions from "./AppAlertActions";

import {getData} from "../../../common/js/fetch";

import LoginUserActions from "./LoginUserActions";

import AppLoadingActions from './AppLoadingActions';
import CONFIG from "../../../common/js/config";



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

const PICUPLOADER_OPTIONS_UPDATE = 'PICUPLOADER_OPTIONS_UPDATE';



const BASE_SETTING_LOADING_HIDE = 'BASE_SETTING_LOADING_HIDE';

const BASE_SETTING_LOADING_SHOW = 'BASE_SETTING_LOADING_SHOW';

//界面初始化函数
const Init = () => {

    return (dispatch,getState) => {


        dispatch({type:BASE_SETTING_LOADING_SHOW});

        let { UserID,UserType } = getState().LoginUser;

        let { BaseSetting } = getState();

        getBaseInfo({UserID,UserType,dispatch}).then(data => {

            if (data){


                if (data.PhotoPath===BaseSetting.PhotoPath) {//不需要刷新photo头像

                    delete data.PhotoPath;

                    delete data.PhotoPath_NoCache;

                }

                console.log(data);

                dispatch({type:BASE_INFO_UPDATE,data:data});

                const { PhotoPath_NoCache } = data;

                let userType = '';

                switch (UserType) {

                    case 0:

                        userType = 'Admin';

                        break;

                    case 1:

                        userType = 'Teacher';

                        break;

                    case 2:

                        userType = 'Student';

                        break;

                    default:

                        userType = 'Admin';

                }

                var option = {

                    token: sessionStorage.getItem('token'),

                    resWebUrl: "http://192.168.129.1:30101/lgftp/", //资源站点地址

                    userType:userType,   //用户类型，可选值Admin、Student、Teacher、SchoolLeader

                    userID:UserID, //新增时传空字符串、编辑时传相应UserID

                    curImgPath:PhotoPath_NoCache?PhotoPath_NoCache:BaseSetting.PhotoPath_NoCache, //用户当前头像，新增时可不传

                    size:"small"

                };

                dispatch({type:PICUPLOADER_OPTIONS_UPDATE,data:option});

                $('#PicUpload').picUploader(option);

                dispatch({type:BASE_SETTING_LOADING_HIDE});

                dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

            }

        });

    }

};

const Commit = (dom) => {

  return ( dispatch,getState ) => {
      

      let { ShortNameTipsShow, QQTipsShow, WeixinTipsShow, WeiboTipsShow, TelephoneTipsShow } = getState().BaseSetting

      let { UserID,UserType }= getState().LoginUser;

      let { ShortNameValue,QQValue,WeixinValue,TelephoneValue,WeiboValue,SignValue } = getState().BaseSetting;

      if ((!ShortNameTipsShow)&&(!QQTipsShow)&&(!WeixinTipsShow)&&(!WeiboTipsShow)&&(!TelephoneTipsShow)){

          dispatch({type:BASE_SETTING_EDITOR_CLOSE});

          if($(dom).picUploader.uploadSubmit()){

              let PhotoPath =  $(dom).picUploader.getCurImgPath();

              UpdateBasicInfo({

                  UserID,UserType,ShortName:ShortNameValue?ShortNameValue:'',QQ:QQValue?QQValue:'',Weixin:WeixinValue?WeixinValue:'',

                  Weibo:WeiboValue?WeiboValue:'',Telephone:TelephoneValue?TelephoneValue:'',Sign:SignValue?SignValue:'',PhotoPath,dispatch

              }).then(data => {

                  if (data==='success'){

                      dispatch(AppAlertActions.alertSuccess({title:"保存成功"}));

                      getBaseInfo({UserID,UserType,dispatch}).then(data => {

                          if (data){

                              dispatch({type:BASE_INFO_UPDATE,data:data});

                              let option = getState().BaseSetting.PicUploader;

                              option.curImgPath = data.PhotoPath_NoCache;

                              dispatch({type:PICUPLOADER_OPTIONS_UPDATE,data:option});

                              $('#PicUpload').picUploader.reset(option);

                          }

                      });

                  }

              });

          }else{

              dispatch(AppAlertActions.alertError({title:"头像上传出错！"}));

          }



      }


  };

};










//获取base信息

let getBaseInfo =  async ({UserID,UserType,dispatch}) => {

    let res = await Method.getGetData(`/UserMgr/PersonalMgr/GetBasicInfo?UserID=${UserID}&UserType=${UserType}`,2,CONFIG.PersonalProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:'未知异常',ok:res.Msg?'':()=>{ return ()=>window.location.href='/error.aspx'}}));

    }

};


//更新信息
let UpdateBasicInfo =  async ({UserID,UserType,ShortName,PhotoPath,QQ,Weixin,Telephone,Weibo,Sign,dispatch}) => {

    let res = await Method.getPostData('/UserMgr/PersonalMgr/UpdateBasicInfo',{

        UserID,UserType,ShortName,QQ,Weixin,

        Weibo,Telephone,Sign,PhotoPath

    },2,CONFIG.PersonalProxy);



    if (res.StatusCode === 200){

        return res.Msg;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:'未知异常'}));

    }

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

    PICUPLOADER_OPTIONS_UPDATE,

    Init,

    Commit

}