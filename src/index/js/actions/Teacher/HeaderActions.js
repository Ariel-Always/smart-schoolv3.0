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


//点击头部的教师的学科

const SubjectClick = (info) => {

    return (dispatch,getState)=>{

        let { UserID }  = getState().LoginUser;

        dispatch({type:TEACHER_HEADER_SUBJECTS_PICK_CHANGE,data:info});

        let SubjectID = info.id;

        TeacherPageActions.getTeacherModules({UserID,SubjectID,dispatch}).then(data=>{

            if (data){

                dispatch({type:ModulesActions.TEACHER_MODULE_GROUPS_UPDATE,data:data.Groups});



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