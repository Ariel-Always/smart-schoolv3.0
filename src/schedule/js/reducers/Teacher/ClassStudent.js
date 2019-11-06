import CSActions from '../../actions/Teacher/ClassStudentActions';

const ClassStudent = (state={

    schedule:[],

    ScheduleCount:0,

    WeekNO:0,

    WeekList:[],

    StudentList:[],

    PickStudentName:'',

    PickStudentID:'',

    ScheduleLoadingShow:true,

    searchWrapperShow:false,

    searchResult:[],

    searchTitle:'',

    searchLoadingShow:false,

    CancelBtnShow:'n',

    SearchValue:'',

    ItemClassHourCount:[],

    ItemClassHour:[]

},actions) => {

    switch (actions.type) {

        case CSActions.TEACHER_CLASS_TOTAL_STUDENT_INIT:

            return {

                ...state,

                schedule:[],

                ScheduleCount:0,

                WeekNO:0,

                WeekList:[],

                StudentList:[],

                PickStudentName:'',

                PickStudentID:'',

                ScheduleLoadingShow:true,

                searchWrapperShow:false,

                searchResult:[],

                searchTitle:'',

                searchLoadingShow:false,

                CancelBtnShow:'n',

                SearchValue:'',

                ItemClassHourCount:[],

                ItemClassHour:[]

            };

        case CSActions.TEACHER_CLASS_TOTAL_STUDENT_CLASSHOUR_UPDATE:

            return { ...state,...actions.data };

        case CSActions.TEACHER_CS_WEEK_LIST_UPDATE:

            return { ...state,WeekList:actions.data };

        case CSActions.TEACHER_CS_WEEK_CHANGE:

            return { ...state,WeekNO:actions.data };

        case CSActions.TEACHER_CS_SEARCH_STUDENT_RESULT_UPDATE:

            return { ...state,searchResult:actions.data };

        case CSActions.TEACHER_CS_SEARCH_STU_RESULT_SHOW:

            return { ...state,searchWrapperShow:true };

        case CSActions.TEACHER_CS_SEARCH_TITLE_SHOW:

            return { ...state,searchTitle:actions.data };

        case CSActions.TEACHER_CS_LOADING_SHOW:

            return { ...state,ScheduleLoadingShow:true };

        case CSActions.TEACHER_CS_LOADING_HIDE:

            return { ...state,ScheduleLoadingShow:false };

        case CSActions.STT_SCHEDULE_INIT:

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

        case CSActions.STT_SCHEDULE_CHANGE:

            return {

                ...state,

                ...actions.data


            };

        case CSActions.STT_NOW_WEEK_CHANGE:

            return {...state,NowWeekNo:actions.data};

        case CSActions.TEACHER_LIST_UPDATE:

            return {...state,teacherList:actions.data};

        case CSActions.SEARCH_TEACHER_RESULT_UPDATE:

            return {...state,searchResult:actions.data};

        case CSActions.SEARCH_TEACHER_RESULT_SHOW:

            return {...state,searchWrapperShow:true};

        case CSActions.SEARCH_TEACHER_RESULT_HIDE:

            return {...state,searchWrapperShow:false};

        case CSActions.SEARCH_LOADING_SHOW:

            return {...state,searchLoadingShow:true};

        case CSActions.SEARCH_LOADING_HIDE:

            return {...state,searchLoadingShow:false};

        case CSActions.SCHEDULE_LOADING_HIDE:

            return {...state,ScheduleLoadingShow:false};

        case CSActions.SCHEDULE_LOADING_SHOW:

            return {...state,ScheduleLoadingShow:true};

        case CSActions.TEACHER_STT_LEFT_MENU_SEARCH_INPUT_CHANGE:

            return { ...state,SearchValue:actions.data };

        case  CSActions.TEACHER_STT_LEFT_MENU_CANCEL_BTN_SHOW:

            return {...state,CancelBtnShow:'y'};

        case  CSActions.TEACHER_STT_LEFT_MENU_CANCEL_BTN_HIDE:

            return { ...state,CancelBtnShow:'n' };

        default:

            return state;

    }

};

export default ClassStudent