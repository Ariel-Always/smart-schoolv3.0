import CRSActions from '../../actions/Manager/ClassRoomSingleActions';

const ClassRoomSingle = (state={

    Schedule:[],

    ScheduleCount:0,

    WeekNO:0,

    WeekList:[],

    LoadingShow:true,

    ClassRoomList:[],

    PickClassRoom:'',

    PickClassRoomID:'',

    ScheduleLoadingShow:true,

    SearchWrapperShow:false,

    SearchResult:[],

    SearchLoadingShow:false,

    CancelBtnShow:'n',

    SearchValue:''

},actions) => {

    switch (actions.type) {

        case CRSActions.MANAGER_CLASS_ROOM_SINGLE_INIT:

            return {

                ...state,

                Schedule:[],

                ScheduleCount:0,

                WeekNO:0,

                LoadingShow:true,

                PickClassRoom:'',

                PickClassRoomID:'',

                CancelBtnShow:'n',

                SearchValue:'',

                ScheduleLoadingShow:true,

                SearchWrapperShow:false,

                SearchResult:[],

                SearchLoadingShow:false,

                ClassRoomList:[]

            };

        case CRSActions.MANAGER_CLASS_ROOM_SINGLE_CLASSROOM_LIST_UPDATE:

            return { ...state,ClassRoomList:actions.data };

        case CRSActions.MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_UPDATE:

            return {

                ...state,

                ...actions.data

            };

        case CRSActions.MANAGER_CLASS_ROOM_SINGLE_SEARCHLIST_UPDATE:

            return { ...state,SearchResult:actions.data };

        case CRSActions.MANAGER_CLASS_ROOM_SINGLE_WEEK_CHANGE:

            return {...state,WeekNO:actions.data};

        case CRSActions.MANAGER_CLASS_ROOM_SINGLE_WEEK_LIST_UPDATE:

            return {...state,WeekList:actions.data};

        case CRSActions.MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_LOADING_HIDE:

            return {...state,ScheduleLoadingShow:false};

        case CRSActions.MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_LOADING_SHOW:

            return {...state,ScheduleLoadingShow:true};

        case CRSActions.MANAGER_CLASS_ROOM_SINGLE_SEARCH_LOADING_SHOW:

            return {...state,SearchLoadingShow:true};

        case CRSActions.MANAGER_CLASS_ROOM_SINGLE_SEARCH_LOADING_HIDE:

            return {...state,SearchLoadingShow:false};

        case CRSActions.MANAGER_CLASS_ROOM_SINGLE_SEARCH_RESULT_SHOW:

            return {...state,SearchWrapperShow:true};

        case CRSActions.MANAGER_CLASS_ROOM_SINGLE_SEARCH_RESULT_HIDE:

            return {...state,SearchWrapperShow:false};


        case CRSActions.MANAGER_CRS_LEFT_MENU_SEARCH_INPUT_CHANGE:

            return {...state,SearchValue:actions.data};

        case CRSActions.MANAGER_CRS_LEFT_MENU_CANCEL_BTN_SHOW:

            return {...state,CancelBtnShow:'y'};

        case CRSActions.MANAGER_CRS_LEFT_MENU_CANCEL_BTN_HIDE:

            return {...state,CancelBtnShow:'n'};



        default:

            return state;

    }

};

export default ClassRoomSingle