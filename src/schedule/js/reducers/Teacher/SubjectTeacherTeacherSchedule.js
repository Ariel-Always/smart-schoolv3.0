import STTActions from '../../actions/Teacher/SubjectTeacherTeacherActions';

const SubjectTeacherTeacherSchedule = (state={

    schedule:[],

    ScheduleCount:0,

    NowWeekNo:0,

    loadingShow:true,

    teacherList:[],

    pickTeacher:'',

    pickTeacherID:'',

    ScheduleLoadingShow:true,

    searchWrapperShow:false,

    searchResult:[],

    searchLoadingShow:false,

    searchTitle:'',

    searchTitleShow:false

},actions) => {

    switch (actions.type) {

        case STTActions.STT_SCHEDULE_CHANGE:

            return {...state,...actions.data};

        case STTActions.STT_NOW_WEEK_CHANGE:

            return {...state,NowWeekNo:actions.data};

        case STTActions.TEACHER_LIST_UPDATE:

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

            return {...state,searchLoadingShow:false};

        case STTActions.SCHEDULE_LOADING_HIDE:

            return {...state,ScheduleLoadingShow:false};

        case STTActions.SCHEDULE_LOADING_SHOW:

            return {...state,ScheduleLoadingShow:true};

        case STTActions.SEARCH_TITLE_SHOW:

            return {...state,searchTitleShow:true,searchTitle:actions.data};

        case STTActions.SEARCH_TITLE_HIDE:

            return {...state,searchTitleShow:false};

        default:

            return state;

    }

};

export default SubjectTeacherTeacherSchedule