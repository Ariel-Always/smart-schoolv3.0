//modal
import $ from 'jquery';

import AppAlertActions from "../AppAlertActions";

import ApiActions from "../ApiActions";

import CCActions from './ClassChargeActions';

window.JQuery = $;

window.$ = $;

const TEACHER_STUDENT_INFO_EDITOR_STUDENT_ID_CHANGE = 'TEACHER_STUDENT_INFO_EDITOR_STUDENT_ID_CHANGE';

const TEACHER_STUDENT_INFO_MODAL_SHOW = 'TEACHER_STUDENT_INFO_MODAL_SHOW';

const TEACHER_STUDENT_INFO_MODAL_HIDE = 'TEACHER_STUDENT_INFO_MODAL_HIDE';

//loading
const TEACHER_STUDENT_INFO_MODAL_LOADING_SHOW = 'TEACHER_STUDENT_INFO_MODAL_LOADING_SHOW';

const TEACHER_STUDENT_INFO_MODAL_LOADING_HIDE = 'TEACHER_STUDENT_INFO_MODAL_LOADING_HIDE';

const TEACHER_STUDENT_INFO_MODAL_INIT = 'TEACHER_STUDENT_INFO_MODAL_INIT';

//班级

const TEACHER_STUDENT_INFO_MODAL_CLASS_LIST_UPDATE = 'TEACHER_STUDENT_INFO_MODAL_CLASS_LIST_UPDATE';

const TEACHER_STUDENT_INFO_MODAL_CLASS_DROP_SHOW = 'TEACHER_STUDENT_INFO_MODAL_CLASS_DROP_SHOW';

const TEACHER_STUDENT_INFO_MODAL_CLASS_DROP_HIDE = 'TEACHER_STUDENT_INFO_MODAL_CLASS_DROP_HIDE';

const TEACHER_STUDENT_INFO_MODAL_CLASS_NANE_ID_UPDATE = 'TEACHER_STUDENT_INFO_MODAL_CLASS_NANE_ID_UPDATE';

const TEACHER_STUDENT_INFO_MODAL_CLASS_DROP_CHANGE = 'TEACHER_STUDENT_INFO_MODAL_CLASS_DROP_CHANGE';


//输入变化

const TEACHER_STUDENT_INFO_MODAL_USER_ID_CHANGE = 'TEACHER_STUDENT_INFO_MODAL_USER_ID_CHANGE';

const TEACHER_STUDENT_INFO_MODAL_USER_NAME_CHANGE = 'TEACHER_STUDENT_INFO_MODAL_USER_NAME_CHANGE';

const TEACHER_STUDENT_INFO_MODAL_ID_CARD_CHANGE = 'TEACHER_STUDENT_INFO_MODAL_ID_CARD_CHANGE';

const TEACHER_STUDENT_INFO_MODAL_ADDRESS_CHANGE = 'TEACHER_STUDENT_INFO_MODAL_ADDRESS_CHANGE';

const TEACHER_STUDENT_INFO_MODAL_MAIL_CHANGE = 'TEACHER_STUDENT_INFO_MODAL_MAIL_CHANGE';

const TEACHER_STUDENT_INFO_MODAL_PHONE_CHANGE = 'TEACHER_STUDENT_INFO_MODAL_PHONE_CHANGE';

//提示消失和出现

const TEACHER_STUDENT_INFO_MODAL_ERROR_TIPS_SHOW = 'TEACHER_STUDENT_INFO_MODAL_ERROR_TIPS_SHOW';

const TEACHER_STUDENT_INFO_MODAL_ERROR_TIPS_HIDE = 'TEACHER_STUDENT_INFO_MODAL_ERROR_TIPS_HIDE';

//下拉菜单发生变化

const TEACHER_STUDENT_INFO_MODAL_SEX_CHANGE = 'TEACHER_STUDENT_INFO_MODAL_SEX_CHANGE';

const TEACHER_STUDENT_INFO_MODAL_CLASS_CHANGE = 'TEACHER_STUDENT_INFO_MODAL_CLASS_CHANGE';





//初始化

const ModalInit = () =>{

    return (dispatch,getState)=>{

        const { EditorStudentID } = getState().Teacher.StudentInfoModal;

        const { Class } = getState().Teacher.ClassCharge;

        let PhotoPath = '';

        const Token = sessionStorage.getItem('token');

        if (EditorStudentID){

            ApiActions.GetUserDetail({UserID:EditorStudentID,dispatch}).then(data=>{

                if (data){

                    const { UserName,Gender,IDCardNo,Email,Telephone,HomeAddress,PhotoPath_NOcache } = data;

                    let SexDrop = {};

                    let ClassID,ClassName = '';

                    let ClassDrop = {};

                    PhotoPath = data.PhotoPath;

                    switch (Gender) {

                        case '保密':

                            SexDrop = { value:3,title:"保密" };

                            break;

                        case '男':

                            SexDrop = { value:1,title:"男" };

                            break;

                        case '女':

                            SexDrop = { value:2,title:"女" };

                            break;

                        default:

                            return;

                    }

                    if (Class.length>1){

                        Class.map(item=>{

                            if (item.ClassName===data.ClassName){

                                ClassDrop = {value:item.ClassID,title:item.ClassName};

                            }

                        });

                        const Classes = Class.map(item=>{

                            return { value:item.ClassID,title:item.ClassName };

                        });

                        dispatch({type:TEACHER_STUDENT_INFO_MODAL_CLASS_DROP_SHOW});

                        dispatch({type:TEACHER_STUDENT_INFO_MODAL_CLASS_DROP_CHANGE,data:ClassDrop});

                        dispatch({type:TEACHER_STUDENT_INFO_MODAL_CLASS_LIST_UPDATE,data:Classes});


                    }else{

                        dispatch({type:TEACHER_STUDENT_INFO_MODAL_CLASS_DROP_HIDE});

                        dispatch({type:TEACHER_STUDENT_INFO_MODAL_CLASS_NANE_ID_UPDATE,data:{ClassName:Class[0].ClassName,ClassID:Class[0].ClassID}});

                    }

                    dispatch({type:TEACHER_STUDENT_INFO_MODAL_INIT,data:{

                        UserNameValue:UserName,SexDrop,IDCardValue:IDCardNo,

                        MailValue:Email,PhoneValue:Telephone,AddressValue:HomeAddress,

                        PhotoPath_NOcache,PhotoPath

                    }});

                }

                ApiActions.GetResHttpServerAddr({dispatch}).then(data => {

                    if (data) {

                        let option = {
                            token: Token,
                            resWebUrl: data, //资源站点地址
                            userType: 'Student',   //用户类型，可选值Admin、Student、Teacher、SchoolLeader
                            userID:EditorStudentID, //新增时传空字符串、编辑时传相应UserID
                            curImgPath:PhotoPath //用户当前头像，新增时可不传

                        };// //console.log(this.state.option, $("#picUpload"))

                        $("#picUpload").picUploader(option);//初始化

                    }

                    dispatch({type:TEACHER_STUDENT_INFO_MODAL_LOADING_HIDE});

                });

            })

        }else{

            if (Class.length>1){

                const Classes = Class.map(item=>{

                    return { value:item.ClassID,title:item.ClassName };

                });

                dispatch({type:TEACHER_STUDENT_INFO_MODAL_CLASS_DROP_SHOW});

                dispatch({type:TEACHER_STUDENT_INFO_MODAL_CLASS_DROP_CHANGE,data:{value:Class[0].ClassID,title:Class[0].ClassName}});

                dispatch({type:TEACHER_STUDENT_INFO_MODAL_CLASS_LIST_UPDATE,data:Classes});


            }else{

                const { ClassName,ClassID } = Class[0];

                dispatch({type:TEACHER_STUDENT_INFO_MODAL_CLASS_DROP_HIDE});

                dispatch({type:TEACHER_STUDENT_INFO_MODAL_CLASS_NANE_ID_UPDATE,data:{ClassName,ClassID}});

            }

            ApiActions.GetResHttpServerAddr({dispatch}).then(data => {

                if (data) {

                    let option = {
                        token: Token,
                        resWebUrl: data, //资源站点地址
                        userType: 'Student',   //用户类型，可选值Admin、Student、Teacher、SchoolLeader
                        userID:EditorStudentID, //新增时传空字符串、编辑时传相应UserID
                        curImgPath:PhotoPath //用户当前头像，新增时可不传

                    };// //console.log(this.state.option, $("#picUpload"))

                    $("#picUpload").picUploader(option);//初始化

                }

                dispatch({type:TEACHER_STUDENT_INFO_MODAL_LOADING_HIDE});

            });

        }








    }

};


//点击确定

const StudentModalOk = () =>{

    return (dispatch,getState)=>{

        dispatch({type:TEACHER_STUDENT_INFO_MODAL_LOADING_SHOW});

        const {  UserIDTipsVisible, UserNameTipsVisible, TelephoneTipsVisible,

            EmailTipsVisible, IDCardNoTipsVisible, HomeAdressTipsVisible,

            UserIDValue, UserNameValue, IDCardValue, PhoneValue, MailValue,

            AddressValue,SexDrop,ClassDrop,ClassDropShow,ClassID,EditorStudentID

        } = getState().Teacher.StudentInfoModal;


        let IDOk,NameOk,IDCardOk,TelOk,MailOk,AddressOk = false;




        if (EditorStudentID){

            IDOk = true;

            if ((!UserNameTipsVisible)&&(UserNameValue!=='')){

                NameOk = true;

            }

            if ((!TelephoneTipsVisible)&&(PhoneValue!=='')){

                TelOk = true;

            }

            if (!TelephoneTipsVisible){

                TelOk = true;

            }

            if (!EmailTipsVisible){

                MailOk = true;

            }

            if (!IDCardNoTipsVisible){

                IDCardOk = true;

            }

            if (!HomeAdressTipsVisible){

                AddressOk = true;

            }

        }else{

            if ((!UserIDTipsVisible)&&(UserIDValue!=='')){

                IDOk = true;

            }

            if ((!UserNameTipsVisible)&&(UserNameValue!=='')){

                NameOk = true;

            }

            if (!TelephoneTipsVisible){

                TelOk = true;

            }

            if (!EmailTipsVisible){

                MailOk = true;

            }

            if (!IDCardNoTipsVisible){

                IDCardOk = true;

            }

            if (!HomeAdressTipsVisible){

                AddressOk = true;

            }

        }

        //当所有都OK的时候才能提交否则不可提交

        if (IDOk&&NameOk&&IDCardOk&&TelOk&&MailOk&&AddressOk){

            if($('#picUpload').picUploader.uploadSubmit()){

                let PhotoPath =  $('#picUpload').picUploader.getCurImgPath();

                let classID = '';

                if (ClassDropShow){

                    classID = ClassDrop.value;

                }else{

                    classID = ClassID;

                }

                if (EditorStudentID){

                    ApiActions.EditStudent({

                        UserID:UserIDValue,UserName:UserNameValue,

                        Gender:SexDrop.title,classID,PhotoPath,

                        IDCardNo:IDCardValue,Email:MailValue,

                        Telephone:PhoneValue,HomeAdress:AddressValue,

                        dispatch

                    }).then(data=>{

                        if (data===0){

                            dispatch(AppAlertActions.alertSuccess({title:`修改学生信息成功`}))

                            dispatch({type:TEACHER_STUDENT_INFO_MODAL_HIDE});

                            dispatch(CCActions.StudentUpdate(0));

                        }

                        dispatch({type:TEACHER_STUDENT_INFO_MODAL_LOADING_HIDE});

                    })

                }else{

                    ApiActions.AddStudent({

                        UserID:UserIDValue,UserName:UserNameValue,

                        Gender:SexDrop.title,classID,PhotoPath,

                        IDCardNo:IDCardValue,Email:MailValue,

                        Telephone:PhoneValue,HomeAdress:AddressValue,

                        dispatch

                    }).then(data=>{

                        if (data===0){

                            dispatch(AppAlertActions.alertSuccess({title:`新增学生成功`}))

                            dispatch({type:TEACHER_STUDENT_INFO_MODAL_HIDE});

                            dispatch(CCActions.StudentUpdate(0));

                        }

                        dispatch({type:TEACHER_STUDENT_INFO_MODAL_LOADING_HIDE});

                    })

                }

            }else{

                dispatch(AppAlertActions.alertWarn({title:"头像上传失败！"}));

                dispatch({type:TEACHER_STUDENT_INFO_MODAL_LOADING_HIDE});

            }

        }else{

            dispatch({type:TEACHER_STUDENT_INFO_MODAL_LOADING_HIDE});

            if (!IDOk){

                if (UserIDValue){

                    dispatch(AppAlertActions.alertWarn({title:"学号不正确"}));

                }else{

                    dispatch(AppAlertActions.alertWarn({title:"学号不能为空"}));

                }

            }else if (!NameOk){

                if (UserNameValue){

                    dispatch(AppAlertActions.alertWarn({title:"学生姓名不正确"}));

                }else{

                    dispatch(AppAlertActions.alertWarn({title:"学生姓名不能为空"}));

                }

            }else if(!IDCardOk){

                dispatch(AppAlertActions.alertWarn({title:"身份证号码不正确"}));

            }else if(!TelOk){

                dispatch(AppAlertActions.alertWarn({title:"电话号码不正确"}));

            }else if(!MailOk){

                dispatch(AppAlertActions.alertWarn({title:"邮箱不正确"}));

            }else if(!AddressOk){

                dispatch(AppAlertActions.alertWarn({title:"家庭地址不正确"}));

            }

        }


    }

};



export default {

    TEACHER_STUDENT_INFO_MODAL_SHOW,

    TEACHER_STUDENT_INFO_MODAL_HIDE,

    TEACHER_STUDENT_INFO_MODAL_LOADING_SHOW,

    TEACHER_STUDENT_INFO_MODAL_LOADING_HIDE,

    TEACHER_STUDENT_INFO_MODAL_INIT,

    TEACHER_STUDENT_INFO_MODAL_CLASS_LIST_UPDATE,

    TEACHER_STUDENT_INFO_MODAL_CLASS_DROP_SHOW,

    TEACHER_STUDENT_INFO_MODAL_CLASS_DROP_HIDE,

    TEACHER_STUDENT_INFO_MODAL_CLASS_NANE_ID_UPDATE,

    TEACHER_STUDENT_INFO_MODAL_CLASS_DROP_CHANGE,

    TEACHER_STUDENT_INFO_MODAL_USER_ID_CHANGE,

    TEACHER_STUDENT_INFO_MODAL_USER_NAME_CHANGE,

    TEACHER_STUDENT_INFO_MODAL_ID_CARD_CHANGE,

    TEACHER_STUDENT_INFO_MODAL_ADDRESS_CHANGE,

    TEACHER_STUDENT_INFO_MODAL_MAIL_CHANGE,

    TEACHER_STUDENT_INFO_MODAL_PHONE_CHANGE,

    TEACHER_STUDENT_INFO_MODAL_ERROR_TIPS_SHOW,

    TEACHER_STUDENT_INFO_MODAL_ERROR_TIPS_HIDE,

    TEACHER_STUDENT_INFO_MODAL_SEX_CHANGE,

    TEACHER_STUDENT_INFO_MODAL_CLASS_CHANGE,

    TEACHER_STUDENT_INFO_EDITOR_STUDENT_ID_CHANGE,

    ModalInit,

    StudentModalOk



}