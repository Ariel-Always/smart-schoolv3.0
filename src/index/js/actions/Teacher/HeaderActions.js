import ModulesActions from "./ModuleActions";

import TeacherPageActions from './TeacherPageActions';
import AppLoadingActions from "../AppLoadingActions";

const TEACHER_HEADER_MENU_TOGGLE = 'TEACHER_HEADER_MENU_TOGGLE';

const TEACHER_HEADER_MENU_SHOW = 'TEACHER_HEADER_MENU_SHOW';

const TEACHER_HEADER_MENU_HIDE = 'TEACHER_HEADER_MENU_HIDE';

const TEACHER_HEADER_SUBJECTS_UPDATE = 'TEACHER_HEADER_SUBJECTS_UPDATE';

const TEACHER_HEADER_SUBJECTS_PICK_CHANGE = 'TEACHER_HEADER_SUBJECTS_PICK_CHANGE';

const TEACHER_SUBJECT_MENU_TOGGLE = 'TEACHER_SUBJECT_MENU_TOGGLE';

const TEACHER_SUBJECT_MENU_SHOW = 'TEACHER_SUBJECT_MENU_SHOW';

const TEACHER_SUBJECT_MENU_HIDE = 'TEACHER_SUBJECT_MENU_HIDE';


//点击头部的教师的学科

const SubjectClick = (info) => {

    return (dispatch,getState)=>{

        let { UserID }  = getState().LoginUser;

        dispatch({type:TEACHER_HEADER_SUBJECTS_PICK_CHANGE,data:info});

        let SubjectID = info.id;

        dispatch({type:ModulesActions.TEACHER_MODULE_LOADING_SHOW});

        TeacherPageActions.getTeacherModules({UserID,SubjectID,dispatch}).then(data=>{

            if (data){

                let ModuleGroups = data.Groups.map(item=>{

                    return {

                        ...item,

                        "Modules":item.Modules.map(i=>{

                            if (i.IsGroup){

                                let SubGroupModules = i.SubGroupModules.map(it=>{

                                    if (it.ModuleType==='website'){

                                        return {

                                            ...it,

                                            "show":false,

                                            "showDom":"img"

                                        }

                                    }else{

                                        return it

                                    }

                                });

                                return {

                                    ...i,

                                    SubGroupModules:SubGroupModules,

                                    DetailShow:false

                                }

                            }else{

                                if (i.ModuleType==='website'){

                                    return {

                                        ...i,

                                        "showDom":"img"

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

    SubjectClick

}