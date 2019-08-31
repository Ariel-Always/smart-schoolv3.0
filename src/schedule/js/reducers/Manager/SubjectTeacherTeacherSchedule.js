import STTActions from '../../actions/Manager/SubjectTeacherTeacherActions';

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

    searchResult:[]

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

        case STTActions.SCHEDULE_LOADING_HIDE:

            return {...state,ScheduleLoadingShow:false};

        case STTActions.SCHEDULE_LOADING_SHOW:

            return {...state,ScheduleLoadingShow:true};

        default:

            return state;

    }

};

export default SubjectTeacherTeacherSchedule