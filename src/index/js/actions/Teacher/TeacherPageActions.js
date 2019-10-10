import HeaderActions from './HeaderActions';

import Method from "../Method";

import AppAlertActions from "../AppAlertActions";

import AppLoadingActions from '../AppLoadingActions';

import ModulesActions from './ModuleActions';

import CONFIG from "../../../../common/js/config";


const MODULES_INFO_UPDATE = 'MODULES_INFO_UPDATE';


const PageInit = () => {

  return (dispatch,getState)=>{

    let { UserID }  = getState().LoginUser;

    getTeacherSubjects({UserID,dispatch}).then(data=>{

        if (data){

            const { SubjectNames,SubjectIDs } = data;

            const SubjectNameList = SubjectNames.split(',');

            const SubjectIDList = SubjectIDs.split(',');

            let SubjectsInfo = [];
            
            for (let i = 0;i < SubjectNameList.length;i++){

                SubjectsInfo.push({

                    id:SubjectIDList[i],

                    name:SubjectNameList[i]

                })

            }

            dispatch({type:HeaderActions.TEACHER_HEADER_SUBJECTS_UPDATE,data:SubjectsInfo});

            dispatch({type:HeaderActions.TEACHER_HEADER_SUBJECTS_PICK_CHANGE,data:SubjectsInfo[0]});

            getTeacherModules({UserID,SubjectID:SubjectsInfo[0].id,dispatch}).then(data=>{

                if (data){

                    console.log(data);

                    let ModuleGroups = data.map(item=>{

                        return {

                            ...item,

                            "Modules":item.Modules.map(i=>{

                                if (item.IsWebsiteGroup){

                                    if (i.IsGroup){

                                        let SubGroupModules = i.SubGroupModules.map(it=>{

                                            let RandomArr = ['green','orange','blue'];

                                            let bg = RandomArr[Math.floor(Math.random()*RandomArr.length)];

                                            return {

                                                    ...it,

                                                    "showDom":"img",

                                                    "BgColor":bg

                                                }

                                        });

                                        return {

                                            ...i,

                                            SubGroupModules:SubGroupModules,

                                            DetailShow:false

                                        }

                                    }else{

                                        let RandomArr = ['green','orange','blue'];

                                        let bg = RandomArr[Math.floor(Math.random()*RandomArr.length)];

                                        return {

                                            ...i,

                                            "showDom":"img",

                                            "BgColor":bg

                                        }

                                    }

                                }else{

                                    if (i.IsGroup){

                                        return {

                                            ...i,

                                            DetailShow:false

                                        }

                                    }else{

                                        return i;

                                    }

                                }

                            })

                        }

                    });

                    dispatch({type:ModulesActions.TEACHER_MODULE_GROUPS_UPDATE,data:ModuleGroups});

                    dispatch({type:ModulesActions.TEACHER_MODULE_LOADING_HIDE});

                    dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                }

            });

        }

    });

  }

};





//获取教师的学科

const getTeacherSubjects = async ({UserID,dispatch}) => {

    let res = await Method.getGetData(`/UserMgr/UserInfoMgr/GetUserDetail?UserID=${UserID}`,2,CONFIG.proxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg}));

    }

};


//获取教师该学科下的模块应用

const getTeacherModules = async ({UserID,SubjectID,dispatch}) => {

    let res = await Method.getGetData(`/SubjectInfoMgr/DeskTop/Teacher/GetDeskTop?UserID=${UserID}&SubjectID=${SubjectID}`,2,CONFIG.DeskTopProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg}));

    }

};

export default {

    MODULES_INFO_UPDATE,

    PageInit,

    getTeacherModules

}