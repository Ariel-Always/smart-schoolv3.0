import CSActions from '../../actions/Manager/ClassSingleActions';

const ClassSingle = (state={

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

    SearchLoadingShow:false,

    OptionalClassShow:false,

    OptionalClassLoading:true,

    OptionalClassData:[],

    OptionalClassCurrentPage:1

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

                ClassList:[],

                OptionalClassShow:false

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

        case CSActions.MANAGER_CLASS_SINGLE_OPTIONAL_CLASS_MODAL_SHOW:

            return {

                ...state,

                OptionalClassShow:true,

                OptionalClassLoading:true,

                OptionalClassData:[],

                OptionalClassCurrentPage:1

            };

        case CSActions.MANAGER_CLASS_SINGLE_OPTIONAL_CLASS_MODAL_HIDE:

            return {...state,OptionalClassShow:false};

        case CSActions.MANAGER_CLASS_SINGLE_OPTIONAL_CLASS_LOADING_HIDE:

            return {...state,OptionalClassLoading:false};

        case CSActions.MANAGER_CLASS_SINGLE_OPTIONAL_CLASS_LOADING_SHOW:

            return {...state,OptionalClassLoading:true};

        case CSActions.MANAGER_CLASS_SINGLE_OPTIONAL_CLASS_DATA_UPDATE:

            return {...state,OptionalClassData:actions.data};

        case CSActions.MANAGER_CLASS_SINGLE_OPTIONAL_CLASS_PAGE_CHANGE:

            return {...state,OptionalClassCurrentPage:actions.data};

        default:

            return state;

    }

};

export default ClassSingle