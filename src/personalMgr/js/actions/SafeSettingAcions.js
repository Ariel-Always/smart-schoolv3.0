import AppAlertActions from '../actions/AppAlertActions';

import Method from '../actions/Method';


const SAFE_SETTING_INIT_DATA_UPDATE = 'SAFE_SETTING_INIT_DATA_UPDATE';

const SAFE_SETTING_CONTENT_SLIDE_UP = 'SAFE_SETTING_CONTENT_SLIDE_UP';

const SAFE_SETTING_CONTENT_SLIDE_DOWN = 'SAFE_SETTING_CONTENT_SLIDE_DOWN';

const SAFE_SETTING_PWD_VALUE_CHANGE = 'SAFE_SETTING_PWD_VALUE_CHANGE';

const SAFE_SETTING_PWD_TIPS_SHOW = 'SAFE_SETTING_PWD_TIPS_SHOW';

const SAFE_SETTING_PWD_TIPS_HIDE = 'SAFE_SETTING_PWD_TIPS_HIDE';

const SAFE_SETTING_QUESTIONS_WRAPPER_SHOW = 'SAFE_SETTING_QUESTIONS_WRAPPER_SHOW';

const SAFE_SETTING_QUESTIONS_WRAPPER_HIDE = 'SAFE_SETTING_QUESTIONS_WRAPPER_HIDE';

const SAFE_SETTING_QUESTIONS_LIST_UPDATE = 'SAFE_SETTING_QUESTIONS_LIST_UPDATE';

const SAFE_SETTING_QUESTIONS_PICK_CHANGE = 'SAFE_SETTING_QUESTIONS_PICK_CHANGE';


//初始化界面
const Init = () => {

    return ( dispatch,getState ) => {

        let { UserID } = getState().LoginUser;

        let getInitPromise =  Method.getGetData(`/UserMgr/PersonalMgr/GetSecurityInfo?UserID=${UserID}`);

        getInitPromise.then(json => {

           if (json.Status === 200){

               dispatch({type:SAFE_SETTING_INIT_DATA_UPDATE,data:json.Data});

           }else{

               dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{

                        type:'btn-error',

                       title:json.Msg,

                       close:hideAlert(dispatch),

                       cancel:hideAlert(dispatch),

                       ok:hideAlert(dispatch)

                   }});

           }

        });

    }

};


//提交密码修改
const commitPwd = () => {

  return (dispatch,getState) => {

      let { originPwd,newPwd,reNewPwd } = getState().SafeSetting.pwdValue;

      let originResult,newResult,reNewResult;

      let oldRes = false;

      let newRes = false;

      let reNewRes = false;

      let ONSame = false;

      let NRSame = false;

       //判断旧密码
      if (originPwd===''){

          dispatch({type:SAFE_SETTING_PWD_TIPS_SHOW,data:{type:'origin',tips:"请输入原密码!"}});

      }else{

          originResult = UserComm_CheckUserPwd(originPwd);
          
          if (!originResult){

              dispatch({type:SAFE_SETTING_PWD_TIPS_SHOW,data:{type:'origin',tips:"密码格式错误，密码长度6-20个字符，只能由字母、数字、下划线以及指定的特殊字符"}});

          }else{

              dispatch({type:SAFE_SETTING_PWD_TIPS_HIDE,data:{type:'origin'}});

              oldRes = true;

          }

      }
      //判断新密码
      if (newPwd === ''){

          dispatch({type:SAFE_SETTING_PWD_TIPS_SHOW,data:{type:'new',tips:"请输入新密码!"}});

      }else{

          newResult = UserComm_CheckUserPwd(newPwd);
          
          if (!newResult){

              dispatch({type:SAFE_SETTING_PWD_TIPS_SHOW,data:{type:'new',tips:"密码格式错误，密码长度6-20个字符，只能由字母、数字、下划线以及指定的特殊字符"}});

          }else{

              dispatch({type:SAFE_SETTING_PWD_TIPS_HIDE,data:{type:'new'}});

              newRes = true;

          }

      }
    //判断重写输入的新密码
      if (reNewPwd === ''){

          dispatch({type:SAFE_SETTING_PWD_TIPS_SHOW,data:{type:'reNew',tips:"请输入确认密码!"}});

      }else{

          reNewResult = UserComm_CheckUserPwd(reNewPwd);

          if (!reNewResult){

              dispatch({type:SAFE_SETTING_PWD_TIPS_SHOW,data:{type:'reNew',tips:"密码格式错误，密码长度6-20个字符，只能由字母、数字、下划线以及指定的特殊字符"}});

          }else{

              dispatch({type:SAFE_SETTING_PWD_TIPS_HIDE,data:{type:'reNew'}});

              reNewRes = true;

          }

      }


    //判断新旧密码一致与否
      if (oldRes&&newRes){

          if ((originPwd === newPwd)){

              dispatch({type:SAFE_SETTING_PWD_TIPS_SHOW,data:{type:'new',tips:"原密码和新密码不能一样!"}});

          }else {

              dispatch({type:SAFE_SETTING_PWD_TIPS_HIDE,data:{type:'new'}});

              ONSame = true;

          }

      }

      //判断两次新密码是否一致
      if (newRes&&reNewRes){

          if (newPwd !== reNewPwd){

              dispatch({type:SAFE_SETTING_PWD_TIPS_SHOW,data:{type:'reNew',tips:"两次密码不一致!"}});

          }else{

              dispatch({type:SAFE_SETTING_PWD_TIPS_HIDE,data:{type:'reNew'}});

              NRSame = true;

          }

      }


      //最终判断完成标志
        if (oldRes&&newRes&&reNewRes&&NRSame&&ONSame){

           let { UserType } = getState().LoginUser;

           let OldPwd = originPwd;

           let NewPwd = newPwd;

           let PwdCommit = Method.getPostData(`/UserMgr/PersonalMgr/UpdatePwd?UserType=${UserType}&OldPwd=${OldPwd}&NewPwd=${NewPwd}`)

            PwdCommit.then(json => {

               if (json.Status === 200){

                    dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{

                        type:"success",

                        title:"修改密码成功,将跳转到登录界面！",

                        hide:()=>{ return  window.location.href='/html/login';}

                        }})

               }else{

                if (json.Data === -3){

                    dispatch({type:SAFE_SETTING_PWD_TIPS_SHOW,data:{type:'origin',tips:"密码不正确"}});

                }else if (json.Data === -2) {

                    dispatch({type:SAFE_SETTING_PWD_TIPS_SHOW,data:{type:'new',tips:"新旧密码一致！"}});

                }else{

                    dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{

                            type:"btn-error",

                            title:"参数错误！",

                            close:hideAlert(dispatch),

                            ok:hideAlert(dispatch),

                            cancel: hideAlert(dispatch)

                        }});

                }

               }

            });

        }



  }

};

//获取系统预设密保问题

const getQuestions = () =>{

  return (dispatch,getState) => {

        let { UserID } = getState().LoginUser;

        let getQuestionsPromise = Method.getGetData(`/UserMgr/PersonalMgr/GetSystemSecQA?UserID=${UserID}`);

        getQuestionsPromise.then(json => {

            if (json.Status === 200){

                let questionsList = [{value:"self",title:"自定义密保问题"}];

                let arr = json.Data.map((item,key)=>{

                    return {

                        value:key,

                        title:item

                    }

                });

                questionsList.push(...arr);

                dispatch({type:SAFE_SETTING_QUESTIONS_LIST_UPDATE,data:questionsList});

            }else{

                dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{

                        type:"btn-error",

                        title:json.Msg,

                        close:hideAlert(dispatch),

                        ok:hideAlert(dispatch),

                        cancel: hideAlert(dispatch)

                    }});

            }

        })

  }

};





//检测密码
const UserComm_CheckUserPwd = (strInput) => {

    return /^([0-9a-zA-Z`~\!@#$%\^&*\(\)_\+-={}|\[\]:\";\'<>\?,.\/\\]){6,20}$/.test(strInput);

};


//隐藏警告框
const hideAlert = (dispatch) => {

  return () => dispatch({type:AppAlertActions.APP_ALERT_HIDE});

};

export default{

    SAFE_SETTING_INIT_DATA_UPDATE,

    SAFE_SETTING_CONTENT_SLIDE_UP,

    SAFE_SETTING_CONTENT_SLIDE_DOWN,

    SAFE_SETTING_PWD_VALUE_CHANGE,

    SAFE_SETTING_PWD_TIPS_SHOW,

    SAFE_SETTING_PWD_TIPS_HIDE,

    SAFE_SETTING_QUESTIONS_WRAPPER_SHOW,

    SAFE_SETTING_QUESTIONS_WRAPPER_HIDE,

    SAFE_SETTING_QUESTIONS_LIST_UPDATE,

    SAFE_SETTING_QUESTIONS_PICK_CHANGE,

    Init,

    commitPwd,

    getQuestions

}