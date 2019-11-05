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

    searchResult:[],

    searchLoadingShow:false,

    CancelBtnShow:'n',

    SearchValue:''


},actions) => {

    switch (actions.type) {

        case STTActions.STT_SCHEDULE_INIT:

            return {

                ...state,

                schedule:[],

                ScheduleCount:0,

                loadingShow:true,

                pickTeacher:'',

                pickTeacherID:'',

                CancelBtnShow:'n',

                SearchValue:'',

                ScheduleLoadingShow:true,

                searchWrapperShow:false,

                searchResult:[],

                searchLoadingShow:false,

                teacherList:actions.data

            };

        case STTActions.STT_SCHEDULE_CHANGE:

            return {

                ...state,

                ...actions.data


            };

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

        case STTActions.MANAGER_STT_LEFT_MENU_SEARCH_INPUT_CHANGE:

            return { ...state,SearchValue:actions.data };

        case  STTActions.MANAGER_STT_LEFT_MENU_CANCEL_BTN_SHOW:

            return {...state,CancelBtnShow:'y'};

        case  STTActions.MANAGER_STT_LEFT_MENU_CANCEL_BTN_HIDE:

            return { ...state,CancelBtnShow:'n' };

        default:

            return state;

    }

};

export default SubjectTeacherTeacherSchedule