import CSActions from '../../actions/Manager/ClassSingleActions';

const SubjectTeacherTeacherSchedule = (state={

    Schedule:[],

    ScheduleCount:0,

    WeekNO:0,

    WeekList:[],

    LoadingShow:true,

    ClassList:[],

    PickClass:'',

    PickClassID:'',

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

                PickClass:'',

                PickClassID:'',

                ScheduleLoadingShow:true,

                SearchWrapperShow:false,

                SearchResult:[],

                SearchLoadingShow:false,

                ClassList:[]

            };

        case CSActions.MANAGER_CLASS_SINGLE_CLASS_LIST_UPDATE:

            return { ...state,ClassList:actions.data };

        case CSActions.MANAGER_CLASS_SINGLE_SCHEDULE_UPDATE:

            return {

                ...state,

                ...actions.data

            };

        case CSActions.MANAGER_CLASS_SINGLE_SEARCHLIST_UPDATE:

            return { ...state,SearchResult:actions.data };

        case CSActions.MANAGER_CLASS_SINGLE_WEEK_CHANGE:

            return {...state,WeekNO:actions.data};

        case CSActions.MANAGER_CLASS_SINGLE_WEEK_LIST_UPDATE:

            return {...state,WeekList:actions.data};

        case CSActions.MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_HIDE:

            return {...state,ScheduleLoadingShow:false};

        case CSActions.MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_SHOW:

            return {...state,ScheduleLoadingShow:true};

        case CSActions.MANAGER_CLASS_SINGLE_SEARCH_LOADING_SHOW:

            return {...state,SearchLoadingShow:true};

        case CSActions.MANAGER_CLASS_SINGLE_SEARCH_LOADING_HIDE:

            return {...state,SearchLoadingShow:false};

        case CSActions.MANAGER_CLASS_SINGLE_SEARCH_RESULT_SHOW:

            return {...state,SearchWrapperShow:true};

        case CSActions.MANAGER_CLASS_SINGLE_SEARCH_RESULT_HIDE:

            return {...state,SearchWrapperShow:false};

        default:

            return state;

    }

};

export default SubjectTeacherTeacherSchedule