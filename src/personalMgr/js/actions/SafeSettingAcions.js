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

const SAFE_SETTING_QUESTIONS_INPUT_CHANGE = 'SAFE_SETTING_QUESTIONS_INPUT_CHANGE';

const SAFE_SETTING_QUESTIONS_TIPS_SHOW = 'SAFE_SETTING_QUESTIONS_TIPS_SHOW';

const SAFE_SETTING_QUESTIONS_TIPS_HIDE = 'SAFE_SETTING_QUESTIONS_TIPS_HIDE';

const SAFE_SETTING_DEL_QUESTIONS_MODAL_SHOW = 'SAFE_SETTING_DEL_QUESTIONS_MODAL_SHOW';

const SAFE_SETTING_DEL_QUESTIONS_MODAL_HIDE = 'SAFE_SETTING_DEL_QUESTIONS_MODAL_HIDE';

const SAFE_SETTING_DEL_QUESTIONS_INPUT_CHANGE = 'SAFE_SETTING_DEL_QUESTIONS_INPUT_CHANGE';

const SAFE_SETTING_DEL_QUESTIONS_PWD_TIPS_SHOW = 'SAFE_SETTING_DEL_QUESTIONS_PWD_TIPS_SHOW';

const SAFE_SETTING_DEL_QUESTIONS_PWD_TIPS_HIDE = 'SAFE_SETTING_DEL_QUESTIONS_PWD_TIPS_HIDE';




const SAFE_SETTING_EDIT_QUESTIONS_MODAL_SHOW = 'SAFE_SETTING_EDIT_QUESTIONS_MODAL_SHOW';

const SAFE_SETTING_EDIT_QUESTIONS_MODAL_HIDE = 'SAFE_SETTING_EDIT_QUESTIONS_MODAL_HIDE';

const SAFE_SETTING_EDIT_QUESTIONS_PICK = 'SAFE_SETTING_EDIT_QUESTIONS_PICK';

const SAFE_SETTING_EDIT_QUESTIONS_INPUT_CHANGE = 'SAFE_SETTING_EDIT_QUESTIONS_INPUT_CHANGE';

const SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW = 'SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW';

const SAFE_SETTING_EDIT_QUESTIONS_TIPS_HIDE = 'SAFE_SETTING_EDIT_QUESTIONS_TIPS_HIDE';



const SAFE_SETTING_EMAIL_INPUT_CHANGE = 'SAFE_SETTING_EMAIL_INPUT_CHANGE';




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

           let PwdCommit = Method.getPostData('/UserMgr/PersonalMgr/UpdatePwd',{

               UserType:UserType,OldPwd:OldPwd,NewPwd:NewPwd

           },2);

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

//提交密保问题
const commitQuestion = () => {

  return ( dispatch,getState ) => {

      let { qaValue,qaSelectd,initData } = getState().SafeSetting;

      const { selfQa,answer,pwd } = qaValue;

      let selfOk,answerOk,pwdOk = false;
      //判断是否选中自定义密保问题
      if (qaSelectd.value === 'self'){
            //自定义密保问题是否输入
            if (!selfQa){

                dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'self',tips:"请输入密保问题！"}});

            }else{

                let sefQaChecked = UserComm_CheckQA(selfQa);

                if (!sefQaChecked){//自定义密保是否通过检测

                    dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'self',tips:"密保问题格式错误！"}});

                }else{
                    //自定义密保是否会和已存在的重复。

                    let repeat = false;

                    initData.Questions.map(item=>{

                        if (item.Question === selfQa){

                            repeat = true;

                        }

                    });

                   if (repeat){

                       dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'self',tips:"密保问题已存在！"}});

                   }else{

                       dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_HIDE,data:{type:'self'}});

                       selfOk = true;

                   }

                }

            }

            //判断答案
          if (answer){

            let answerChecked = UserComm_CheckQA(answer);

            if (answerChecked){

                dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_HIDE,data:{type:'answer'}});

                answerOk = true;

            }else{

                dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'answer',tips:"答案格式错误！"}});

            }

          }else {

              dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'answer',tips:"请输入答案！"}});

          }

          //判断密码
          if (pwd){

              let pwdChecked = UserComm_CheckUserPwd(pwd);

              if (pwdChecked){

                  dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_HIDE,data:{type:'pwd'}});

                  pwdOk = true;

              }else{

                  dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"密码格式错误！"}});

              }

          }else {

              dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"请输入密码！"}});

          }

          if (selfOk&&pwdOk&&answerOk){

              let { UserID } = getState().LoginUser;

              let commitQaPromise = Method.getPostData('/UserMgr/PersonalMgr/AddSecQA',{

                  UserID:UserID, Question:selfQa,Answer:answer,Pwd:pwd

              },2);

              commitQaPromise.then(json => {

                 if (json.Status === 200){

                    dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{type:"success",title:"密保问题添加成功",hide:hideAlert(dispatch)}});

                     dispatch(clearQuestions());

                    dispatch(Init());

                 }else{

                     if (json.Data === -1){

                         dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{

                                 type:"btn-error",

                                 title:"参数错误！",

                                 close:hideAlert(dispatch),

                                 ok:hideAlert(dispatch),

                                 cancel: hideAlert(dispatch)

                             }});

                     }

                     if (json.Data === -2){

                         dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{

                                 type:"btn-error",

                                 title:"已存在相同问题！",

                                 close:hideAlert(dispatch),

                                 ok:hideAlert(dispatch),

                                 cancel: hideAlert(dispatch)

                             }});

                     }

                     if (json.Data === -3){

                         dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"密码不正确！"}});

                     }

                 }

              });

          }

      }else{

          //判断答案
          if (answer){

              let answerChecked = UserComm_CheckQA(answer);

              if (answerChecked){

                  dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_HIDE,data:{type:'answer'}});

                  answerOk = true;

              }else{

                  dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'answer',tips:"答案格式错误！"}});

              }

          }else {

              dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'answer',tips:"请输入答案！"}});

          }

          //判断密码
          if (pwd){

              let pwdChecked = UserComm_CheckUserPwd(pwd);

              if (pwdChecked){

                  dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_HIDE,data:{type:'pwd'}});

                  pwdOk = true;

              }else{

                  dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"密码格式错误！"}});

              }

          }else {

              dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"请输入密码！"}});

          }

          if (answerOk&&pwdOk){

              let { UserID } = getState().LoginUser;

              let commitQaPromise = Method.getPostData('/UserMgr/PersonalMgr/AddSecQA',{

                  UserID:UserID, Question:qaSelectd.title,Answer:answer,Pwd:pwd

              },2);

              commitQaPromise.then(json => {

                  if (json.Status === 200){

                      dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{type:"success",title:"密保问题添加成功",hide:hideAlert(dispatch)}});

                      dispatch(clearQuestions());

                      dispatch(Init());

                  }else{

                      if (json.Data === -1){

                          dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{

                                  type:"btn-error",

                                  title:"参数错误！",

                                  close:hideAlert(dispatch),

                                  ok:hideAlert(dispatch),

                                  cancel: hideAlert(dispatch)

                              }});

                      }

                      if (json.Data === -2){

                          dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{

                                  type:"btn-error",

                                  title:"已存在相同问题！",

                                  close:hideAlert(dispatch),

                                  ok:hideAlert(dispatch),

                                  cancel: hideAlert(dispatch)

                              }});

                      }

                      if (json.Data === -3){

                          dispatch({type:SAFE_SETTING_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"密码不正确！"}});

                      }

                  }

              });

          }

      }

  }

};



//清空密码部分，返回初始状态
const clearPwd = () => {

    return dispatch => {

        dispatch({type:SAFE_SETTING_PWD_VALUE_CHANGE,data:{type:'origin',value:''}});

        dispatch({type:SAFE_SETTING_PWD_VALUE_CHANGE,data:{type:'new',value:''}});

        dispatch({type:SAFE_SETTING_PWD_VALUE_CHANGE,data:{type:'reNew',value:''}});

    }

};

//提交删除命令
const commitDelQuestion = () => {

  return ( dispatch,getState ) => {

      let { delQuestionsModal } = getState().SafeSetting;

      if (delQuestionsModal.pwd){

          let pwdChecked = UserComm_CheckUserPwd(delQuestionsModal.pwd);

          if (pwdChecked){

              let { UserID } = getState().LoginUser;

              let { question,pwd } = delQuestionsModal;

              let delPromise = Method.getPostData('/UserMgr/PersonalMgr/DeleteSecQA',{

                  UserID:UserID,ID:question.id,Pwd:pwd

              },2);

              delPromise.then(json => {

                 if (json.Status === 200){

                    dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{type:"success",title:"删除成功",hide:hideAlert(dispatch)}});

                     dispatch({type:SAFE_SETTING_DEL_QUESTIONS_MODAL_HIDE});

                    dispatch(Init());

                 }else{

                     if (json.Data === -1){

                         dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{

                                 type:"btn-error",

                                 title:"参数错误！",

                                 close:hideAlert(dispatch),

                                 ok:hideAlert(dispatch),

                                 cancel: hideAlert(dispatch)

                             }});

                     }

                     if (json.Data === -2){

                         dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{

                                 type:"btn-error",

                                 title:"原问题已不存在！",

                                 close:hideAlert(dispatch),

                                 ok:hideAlert(dispatch),

                                 cancel: hideAlert(dispatch)

                             }});

                     }

                     if (json.Data === -3){

                         dispatch({type:SAFE_SETTING_DEL_QUESTIONS_PWD_TIPS_SHOW,data:"密码不正确"});

                     }

                 }

              });

          }else{

              dispatch({type:SAFE_SETTING_DEL_QUESTIONS_PWD_TIPS_SHOW,data:"密码格式不正确"})

          }

      }else{

          dispatch({type:SAFE_SETTING_DEL_QUESTIONS_PWD_TIPS_SHOW,data:"密码不能为空"})

      }

  }

};

//提交编辑问题的弹窗
const commitEditQuestion = () => {

    return ( dispatch,getState ) => {

        let { initData } = getState().SafeSetting;

        let { selfQa,newAnswer,newQuestionDropSelectd,pwd,originQuestion } = getState().SafeSetting.editQuestionsModal;

        let selfOk,answerOk,pwdOk = false;

        //判断是否选中自定义密保问题
        if (newQuestionDropSelectd.value === 'self'){
            //自定义密保问题是否输入
            if (!selfQa){

                dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'self',tips:"请输入密保问题！"}});

            }else{

                let sefQaChecked = UserComm_CheckQA(selfQa);

                if (!sefQaChecked){//自定义密保是否通过检测

                    dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'self',tips:"密保问题格式错误！"}});

                }else{
                    //自定义密保是否会和已存在的重复。

                    let repeat = false;

                    initData.Questions.map(item=>{

                        if (item.Question === selfQa){

                            repeat = true;

                        }

                    });

                    if (repeat){

                        dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'self',tips:"密保问题已存在！"}});

                    }else{

                        dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_HIDE,data:{type:'self'}});

                        selfOk = true;

                    }

                }

            }

            //判断答案
            if (newAnswer){

                let answerChecked = UserComm_CheckQA(newAnswer);

                if (answerChecked){

                    dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'answer'}});

                    answerOk = true;

                }else{

                    dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'answer',tips:"答案格式错误！"}});

                }

            }else {

                dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'answer',tips:"请输入答案！"}});

            }

            //判断密码
            if (pwd){

                let pwdChecked = UserComm_CheckUserPwd(pwd);

                if (pwdChecked){

                    dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_HIDE,data:{type:'pwd'}});

                    pwdOk = true;

                }else{

                    dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"密码格式错误！"}});

                }

            }else {

                dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"请输入密码！"}});

            }

            if (selfOk&&pwdOk&&answerOk){

                let { UserID } = getState().LoginUser;


                let commitQaPromise = Method.getPostData('/UserMgr/PersonalMgr/EditSecQA',{

                    ID:originQuestion.id,UserID:UserID, Question:selfQa,Answer:newAnswer,Pwd:pwd

                },2);

                commitQaPromise.then(json => {

                    if (json.Status === 200){

                        dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{type:"success",title:"密保问题添加成功",hide:hideAlert(dispatch)}});

                        dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_MODAL_HIDE});

                        dispatch(Init());

                    }else{

                        if (json.Data === -1){

                            dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{

                                    type:"btn-error",

                                    title:"参数错误！",

                                    close:hideAlert(dispatch),

                                    ok:hideAlert(dispatch),

                                    cancel: hideAlert(dispatch)

                                }});

                        }

                        if (json.Data === -2){

                            dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{

                                    type:"btn-error",

                                    title:"已存在相同问题！",

                                    close:hideAlert(dispatch),

                                    ok:hideAlert(dispatch),

                                    cancel: hideAlert(dispatch)

                                }});

                        }

                        if (json.Data === -3){

                            dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"密码不正确！"}});

                        }

                    }

                });

            }

        }else{

            //判断答案
            if (newAnswer){

                let answerChecked = UserComm_CheckQA(newAnswer);

                if (answerChecked){

                    dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_HIDE,data:{type:'answer'}});

                    answerOk = true;

                }else{

                    dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'answer',tips:"答案格式错误！"}});

                }

            }else {

                dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'answer',tips:"请输入答案！"}});

            }

            //判断密码
            if (pwd){

                let pwdChecked = UserComm_CheckUserPwd(pwd);

                if (pwdChecked){

                    dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_HIDE,data:{type:'pwd'}});

                    pwdOk = true;

                }else{

                    dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"密码格式错误！"}});

                }

            }else {

                dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"请输入密码！"}});

            }

            if (answerOk&&pwdOk){

                let { UserID } = getState().LoginUser;

                let commitQaPromise = Method.getPostData('/UserMgr/PersonalMgr/AddSecQA',{

                    ID:originQuestion.id,UserID:UserID, Question:newQuestionDropSelectd.title.title,Answer:newAnswer,Pwd:pwd

                },2);

                commitQaPromise.then(json => {

                    if (json.Status === 200){

                        dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{type:"success",title:"密保问题添加成功",hide:hideAlert(dispatch)}});

                        dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_MODAL_HIDE});

                        dispatch(Init());

                    }else{

                        if (json.Data === -1){

                            dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{

                                    type:"btn-error",

                                    title:"参数错误！",

                                    close:hideAlert(dispatch),

                                    ok:hideAlert(dispatch),

                                    cancel: hideAlert(dispatch)

                                }});

                        }

                        if (json.Data === -2){

                            dispatch({type:AppAlertActions.APP_ALERT_SHOW,data:{

                                    type:"btn-error",

                                    title:"已存在相同问题！",

                                    close:hideAlert(dispatch),

                                    ok:hideAlert(dispatch),

                                    cancel: hideAlert(dispatch)

                                }});

                        }

                        if (json.Data === -3){

                            dispatch({type:SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,data:{type:'pwd',tips:"密码不正确！"}});

                        }

                    }

                });

            }

        }


    }

};











//清空问题，返回初始状态
const clearQuestions = () => {

    return dispatch => {

        dispatch({type:SAFE_SETTING_QUESTIONS_PICK_CHANGE,data:{value:'self',title:"自定义密保问题"}})

        dispatch({type:SAFE_SETTING_QUESTIONS_INPUT_CHANGE,data:{type:'self',value:""}});

        dispatch({type:SAFE_SETTING_QUESTIONS_INPUT_CHANGE,data:{type:'answer',value:""}});

        dispatch({type:SAFE_SETTING_QUESTIONS_INPUT_CHANGE,data:{type:'pwd',value:""}});

    }

};


//检测密码
const UserComm_CheckUserPwd = (strInput) => {

    return /^([0-9a-zA-Z`~\!@#$%\^&*\(\)_\+-={}|\[\]:\";\'<>\?,.\/\\]){6,20}$/.test(strInput);

};

//检测密保
const UserComm_CheckQA = (strInput) => {
    return /^[?？+-=\.\\/\*()（）A-Za-z0-9\u4e00-\u9fa5]{1,30}$/.test(strInput);
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

    SAFE_SETTING_QUESTIONS_INPUT_CHANGE,

    SAFE_SETTING_QUESTIONS_TIPS_SHOW,

    SAFE_SETTING_QUESTIONS_TIPS_HIDE,

    SAFE_SETTING_DEL_QUESTIONS_MODAL_SHOW,

    SAFE_SETTING_DEL_QUESTIONS_MODAL_HIDE,

    SAFE_SETTING_DEL_QUESTIONS_INPUT_CHANGE,

    SAFE_SETTING_DEL_QUESTIONS_PWD_TIPS_SHOW,

    SAFE_SETTING_DEL_QUESTIONS_PWD_TIPS_HIDE,

    SAFE_SETTING_EDIT_QUESTIONS_MODAL_SHOW,

    SAFE_SETTING_EDIT_QUESTIONS_MODAL_HIDE,

    SAFE_SETTING_EDIT_QUESTIONS_PICK,

    SAFE_SETTING_EDIT_QUESTIONS_INPUT_CHANGE,

    SAFE_SETTING_EDIT_QUESTIONS_TIPS_SHOW,

    SAFE_SETTING_EDIT_QUESTIONS_TIPS_HIDE,

    SAFE_SETTING_EMAIL_INPUT_CHANGE,

    Init,

    commitPwd,

    getQuestions,

    commitQuestion,

    clearQuestions,

    clearPwd,

    commitDelQuestion,

    commitEditQuestion

}