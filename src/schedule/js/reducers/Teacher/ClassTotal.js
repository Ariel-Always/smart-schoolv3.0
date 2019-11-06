import CTActions from '../../actions/Teacher/ClassTotalActions';

const ClassTotal = (state={

  /*  ClassDropShow:false,

    ClassDropSelectd:'',

    ClassDropList:[],*/

    ClassName:'',

    ClassID:'',

    WeekNO:0,

    Schedule:[],

    ItemClassHour:[],

    ItemClassHourCount:[],

    WeekList:[],

    LoadingShow:true,

    OptionalClassShow:false,

    OptionalClassLoading:true,

    OptionalClassData:[],

    OptionalClassCurrentPage:1


},actions) => {

    switch (actions.type) {

        /*case CTActions.TEACHER_CLASS_TOTAL_CLASS_DROP_SHOW:

             return {

                 ...state,

                 ClassDropShow:true,

             };

        case CTActions.TEACHER_CLASS_TOTAL_CLASS_DROP_HIDE:

            return {

                ...state,

                ClassDropShow:false,

            };

        case CTActions.TEACHER_CLASS_TOTAL_CLASS_DROP_CHANGE:

            return { ...state,ClassDropSelectd:actions.data };

        case CTActions.TEACHER_CLASS_TOTAL_CLASS_DROP_LIST_UPDATE:

            return { ...state,ClassDropList:actions.data };*/

        case CTActions.TEACHER_CLASS_TOTAL_CLASS_UPDATE:

            return {...state,...actions.data};

        case CTActions.TEACHER_CLASS_TOTAL_CLASS_CLASSHOUR_UPDATE:

            return { ...state,...actions.data };

        case CTActions.TEACHER_CLASS_TOTAL_SCHEDULE_UPDATE:

            return { ...state,Schedule:actions.data };

        case CTActions.TEACHER_CLASS_TOTAL_WEEK_CHANGE:

            return { ...state,WeekNO:actions.data };

        case CTActions.TEACHER_CLASS_TOTAL_WEEK_LIST_UPDATE:

            return { ...state,WeekList:actions.data };

        case CTActions.TEACHER_CLASS_TOTAL_LOADING_HIDE:

            return { ...state,LoadingShow:false };

        case CTActions.TEACHER_CLASS_TOTAL_LOADING_SHOW:

            return { ...state,LoadingShow:true };

        case CTActions.TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_MODAL_SHOW:

            return { ...state,OptionalClassShow:true };

        case CTActions.TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_MODAL_HIDE:

            return { ...state,OptionalClassShow:false };

        case CTActions.TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_LOADING_SHOW:

            return { ...state,OptionalClassLoading:true };

        case CTActions.TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_LOADING_HIDE:

            return { ...state,OptionalClassLoading:false };

        case CTActions.TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_DATA_UPDATE:

            return { ...state,OptionalClassData:actions.data };

        case CTActions.TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_PAGE_CHANGE:

            return { ...state,OptionalClassCurrentPage:actions.data };

        default:

            return state;

    }

};

export default ClassTotal;