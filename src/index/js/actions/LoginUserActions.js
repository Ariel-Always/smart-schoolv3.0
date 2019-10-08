import Method from './Method';

import CONFIG from '../../../common/js/config';

import AppAlertActions from './AppAlertActions';

const LOGIN_USER_INFO_UPDATE = 'LOGIN_USER_INFO_UPDATE';



const getUserInfo = () => {

    return dispatch => {

        getLoginUser({dispatch}).then(data=>{

            if (data){

                dispatch({type:LOGIN_USER_INFO_UPDATE,data:data});

            }

        });

    }

};



//获取登录用户的接口函数
const getLoginUser = async ({dispatch}) => {

  //let res = await Method.getGetData(`/UserMgr/Login/Api/Login.ashx?method=GetUserInfo`,1,'http://192.168.129.2:10102');

  let res = await Method.getGetData(`/Login2?method=GetUserInfo`,1,CONFIG.DeskTopProxy);

  if (res.error === 0){

      return res.data.result;

  }else{

      dispatch(AppAlertActions.alertError({title:"登录错误，请重新登录",ok:()=>{ return GoToLogin }}));

  }

};


//跳转到login界面

const GoToLogin = () => {

    //获取本地的地址。

    let lg_preurl = encodeURIComponent(window.location.href);

    //在这里做异步获取login的地址然后跳转

    window.location.href = 'http://www.baidu.com';

};


export default {

    LOGIN_USER_INFO_UPDATE,

    getUserInfo,

    GoToLogin

}