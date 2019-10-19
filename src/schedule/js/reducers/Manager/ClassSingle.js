import CSActions from '../../actions/Manager/ClassSingleActions';

const SubjectTeacherTeacherSchedule = (state={

    Schedule:[],

    ScheduleCount:0,

    WeekNO:0,

    WeekList:[],

    LoadingShow:true,

    ClassList:[],

    PickTeacher:'',

    PickTeacherID:'',

    ScheduleLoadingShow:true,

    SearchWrapperShow:false,

    SearchResult:[],

    SearchLoadingShow:false

},actions) => {

    switch (actions.type) {

        case CSActions.MANAGER_CLASS_SINGLE_INIT:

            return {

                ...state,

                Schedule:[],

                ScheduleCount:0,

                WeekNO:0,

                LoadingShow:true,

                PickTeacher:'',

                PickTeacherID:'',

                ScheduleLoadingShow:true,

                SearchWrapperShow:false,

                SearchResult:[],

                SearchLoadingShow:false,

                ClassList:[]

            };

        case CSActions.MANAGER_CLASS_SINGLE_CLASS_LIST_UPDATE:

            return { ...state,ClassList:actions.data };

     /*   case STTActions.STT_SCHEDULE_CHANGE:

            return {

                ...state,

                ...actions.data


            };*/

        case CSActions.MANAGER_CLASS_SINGLE_WEEK_CHANGE:

            return {...state,WeekNO:actions.data};

     /*   case STTActions.TEACHER_LIST_UPDATE:

            return {...state,teacherList:actions.data};

        case STTActions.SEARCH_TEACHER_RESULT_UPDATE:

            return {...state,searchResult:actions.data};

        case STTActions.SEARCH_TEACHER_RESULT_SHOW:

            return {...state,searchWrapperShow:true};

        case STTActions.SEARCH_TEACHER_RESULT_HIDE:

            return {...state,searchWrapperShow:false};

        case STTActions.SEARCH_LOADING_SHOW:

            return {...state,searchLoadingShow:true};

        case STTActions.SEARCH_LOADING_HIDE:

            return {...state,searchLoadingShow:false};*/

        case CSActions.MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_HIDE:

            return {...state,ScheduleLoadingShow:false};

        case CSActions.MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_SHOW:

            return {...state,ScheduleLoadingShow:true};

        default:

            return state;

    }

};

export default SubjectTeacherTeacherSchedule