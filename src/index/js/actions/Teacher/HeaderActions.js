import ModulesActions from "./ModuleActions";

import TeacherPageActions from './TeacherPageActions';


const TEACHER_HEADER_MENU_TOGGLE = 'TEACHER_HEADER_MENU_TOGGLE';

const TEACHER_HEADER_MENU_SHOW = 'TEACHER_HEADER_MENU_SHOW';

const TEACHER_HEADER_MENU_HIDE = 'TEACHER_HEADER_MENU_HIDE';

const TEACHER_HEADER_SUBJECTS_UPDATE = 'TEACHER_HEADER_SUBJECTS_UPDATE';

const TEACHER_HEADER_SUBJECTS_PICK_CHANGE = 'TEACHER_HEADER_SUBJECTS_PICK_CHANGE';

const TEACHER_SUBJECT_MENU_TOGGLE = 'TEACHER_SUBJECT_MENU_TOGGLE';

const TEACHER_SUBJECT_MENU_SHOW = 'TEACHER_SUBJECT_MENU_SHOW';

const TEACHER_SUBJECT_MENU_HIDE = 'TEACHER_SUBJECT_MENU_HIDE';

const TEACHER_CUSTOM_MODAL_OPEN = 'TEACHER_CUSTOM_MODAL_OPEN'

const TEACHER_CUSTOM_MODAL_CLOSE = 'TEACHER_CUSTOM_MODAL_CLOSE'


//点击头部的教师的学科

const SubjectClick = (info) => {

    return (dispatch,getState)=>{

        let { UserID }  = getState().LoginUser;

        dispatch({type:TEACHER_HEADER_SUBJECTS_PICK_CHANGE,data:info});

        let SubjectID = info.id;

        dispatch({type:ModulesActions.TEACHER_MODULE_LOADING_SHOW});

        TeacherPageActions.getTeacherModules({UserID,SubjectID,dispatch}).then(data=>{

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


            }

        });


    }

};




export default {

    TEACHER_HEADER_MENU_TOGGLE,

    TEACHER_HEADER_MENU_SHOW,

    TEACHER_HEADER_MENU_HIDE,

    TEACHER_HEADER_SUBJECTS_UPDATE,

    TEACHER_HEADER_SUBJECTS_PICK_CHANGE,

    TEACHER_SUBJECT_MENU_TOGGLE,

    TEACHER_SUBJECT_MENU_SHOW,

    TEACHER_SUBJECT_MENU_HIDE,

    SubjectClick,

    TEACHER_CUSTOM_MODAL_CLOSE,

    TEACHER_CUSTOM_MODAL_OPEN

}