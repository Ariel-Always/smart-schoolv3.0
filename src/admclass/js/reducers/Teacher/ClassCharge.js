import CCActions from '../../actions/Teacher/ClassChargeActions';

const ClassCharge = (state={

    ActiveClassID:'',

    ClassLoadingShow:true,

    Class:[],

    TeacherPower:false,

    Teacher:{

        Total:0,

        List:[]

    },

    StuCheckList:[],

    StudentPower:false,

    StudentSearchOpen:false,

    StuCancelSearchBtn:'n',

    StudentSearchValue:'',

    StudentPage:1,

    StudentLoading:false,

    Student:{

        Total:0,

        List:[]

    }

},actions) => {

    switch (actions.type) {

        case CCActions.TEACHER_CLASS_CHARGE_PAGE_INIT:

            return {

                ...state,

                ...actions.data

            };

        case CCActions.TEACHER_CLASS_CHARGE_ACTIVE_CLASS_INFO_INIT:

            return {

                ...state,

                StudentSearchOpen:false,

                StuCancelSearchBtn:'n',

                StudentSearchValue:'',

                StudentPage:1,

                ...actions.data

            };

        case CCActions.TEACHER_CLASS_CHARGE_CLASS_ACTIVE:

            return {...state,ActiveClassID:actions.data};

        case CCActions.TEACHER_CLASS_CHARGE_LOADING_HIDE:

            return { ...state,ClassLoadingShow:false };

        case CCActions.TEACHER_CLASS_CHARGE_LOADING_SHOW:

            return { ...state,ClassLoadingShow:true };

        case CCActions.TEACHER_CLASS_CHARGE_STUDENT_LIST_UPDATE:

            return { ...state,Student:actions.data};

        case CCActions.TEACHER_CLASS_CHARGE_STUDENT_SEARCH_VALUE_CHANGE:

            return { ...state,StudentSearchValue:actions.data };

        case CCActions.TEACHER_CLASS_CHARGE_STUDENT_SEARCH_RESULT_SHOW:

            return { ...state,StudentSearchOpen:true };

        case CCActions.TEACHER_CLASS_CHARGE_STUDENT_SEARCH_RESULT_HIDE:

            return { ...state,StudentSearchOpen:false };

        case CCActions.TEACHER_CLASS_CHARGE_STUDENT_SEARCH_CANCEL_HIDE:

            return { ...state,StuCancelSearchBtn:'n' };

        case CCActions.TEACHER_CLASS_CHARGE_STUDENT_SEARCH_CANCEL_SHOW:

            return { ...state,StuCancelSearchBtn:'y' };

        case CCActions.TEACHER_CLASS_CHARGE_STUDENT_PAGE_INDEX_UPDATE:

            return { ...state,StudentPage:actions.data };

        case CCActions.TEACHER_CLASS_CHARGE_STUDENT_LOADING_SHOW:

            return { ...state,StudentLoading:true };

        case CCActions.TEACHER_CLASS_CHARGE_STUDENT_LOADING_HIDE:

            return { ...state,StudentLoading:false };

        default:

            return state;

    }

};

export default ClassCharge;