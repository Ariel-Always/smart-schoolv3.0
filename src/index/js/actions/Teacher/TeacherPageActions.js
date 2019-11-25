import HeaderActions from './HeaderActions';

import AppLoadingActions from '../AppLoadingActions';

import ModulesActions from './ModuleActions';

import dynamicFile from "dynamic-file";

import ApiActions from "../ApiActions";


const MODULES_INFO_UPDATE = 'MODULES_INFO_UPDATE';


const PageInit = () => {

  return (dispatch,getState)=>{

    let { UserID }  = getState().LoginUser;

        const { SubjectNames,SubjectIDs } = JSON.parse(sessionStorage.getItem("UserInfo"));

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

        ApiActions.GetTeacherDeskTop({UserID,SubjectID:SubjectsInfo[0].id,dispatch}).then(data=>{

            if (data){

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



                let token = sessionStorage.getItem('token');

                const protocol = window.location.protocol;

                const host = `${protocol}//${window.location.host}/`;

                sessionStorage.setItem('PsnMgrToken',token);

                sessionStorage.setItem("PsnMgrMainServerAddr",host);

                sessionStorage.setItem("PsnMgrLgAssistantAddr",'http://192.168.129.1:10103/');

                dynamicFile([

                    'http://192.168.129.1:10103/PsnMgr/LgAssistant/css/lancoo.cp.assistant.css',

                    'http://192.168.129.1:10103/PsnMgr/LgAssistant/assets/layui-v2.5.5/layui/css/layui.css',

                    'http://192.168.129.1:10103/PsnMgr/LgAssistant/js/jquery-1.7.2.min.js'

                ]).then(()=>{

                    dynamicFile([

                        'http://192.168.129.1:10103/PsnMgr/LgAssistant/assets/jquery.pagination.js',

                        'http://192.168.129.1:10103/PsnMgr/LgAssistant/assets/layui-v2.5.5/layui/layui.js',

                        'http://192.168.129.1:10103/PsnMgr/LgAssistant/js/lancoo.cp.assistant.js'

                    ]).then(()=>{

                        Agassitant();

                    })

                });

            }

        });

  }

};


const PageUpdate = () =>{

    return (dispatch,getState)=>{

        const SubjectID = getState().Teacher.HeaderSetting.SubjectSelect.id;

        const {UserID} = getState().LoginUser;

        console.log()

        dispatch({type:ModulesActions.TEACHER_MODULE_LOADING_SHOW});

        ApiActions.GetTeacherDeskTop({UserID,SubjectID,dispatch}).then(data=>{

            if (data){

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

            }

            dispatch({type:ModulesActions.TEACHER_MODULE_LOADING_HIDE});

        });

    }

};







export default {

    MODULES_INFO_UPDATE,

    PageInit,

    PageUpdate

}