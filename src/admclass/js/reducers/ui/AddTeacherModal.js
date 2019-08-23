import UpUIState from '../../actions/UpUIState';
import UpDataState from '../../actions/UpDataState';

const  AddTeacherModal = (state={

    show:false,

    loadingShow:true,

    teacherList:[],

    subjects:[],

    subjectsSelect:{value:'all',title:"全部教师"},

    colseShow:false,

    newPickTeacher:{id:'',name:'',photo:''},

    originTeacherShow:false,

    originTeacherInfo:{id:'',name:'',photo:''},

    newTeacherTitle:"任课教师"

    },actions) =>{

    switch (actions.type) {

        case UpUIState.ADD_TEACHER_MODAL_SHOW:

            return {

                ...state,show:true,

                loadingShow:true,

                teacherList:[],

                subjects:[],

                subjectsSelect:{value:'all',title:"全部教师"},

                colseShow:false,

                originTeacherShow:false,

                originTeacherInfo:{id:'',name:'',photo:''},

                newTeacherTitle:"任课教师"

            };

        case UpUIState.ADD_TEACHER_MODAL_HIDE:

            return {...state,show:false};

        case UpUIState.ADD_TEACHER_LOADING_HIDE:

            return {...state,loadingShow:false};

        case UpDataState.ADD_TEACHER_UPDATA_TEACHERLIST:

            return {...state,teacherList:actions.list};

        case UpDataState.ADD_TEACHER_UPDATA_SUBJECTS:

            return {...state,subjects:actions.list};

        case UpDataState.ADD_TEACHER_CLOSE_SHOW:

            return {...state,closeShow:true};

        case UpDataState.ADD_TEACHER_CLOSE_HIDE:

            return {...state,closeShow:false};

        case UpDataState.ADD_TEACHER_UPDATE_NEW_TEACHER:

            return  {...state,newPickTeacher:actions.data};

        case UpDataState.ADD_TEACHER_UPDATE_ORIGIN_TEACHER:

            return {...state,originTeacherInfo:actions.data};

        case UpDataState.ADD_TEACHER_ORIGIN_TEACHER_SHOW:

            return {...state,originTeacherShow:true};

        case UpDataState.ADD_TEACHER_ORIGIN_TEACHER_HIDE:

            return {...state,originTeacherShow:false};

        case UpDataState.ADD_TEACHER_NEW_TEACHER_TITLE:

            return {...state,newTeacherTitle:actions.title};

        default:

            return state;

    }

};

export default AddTeacherModal;