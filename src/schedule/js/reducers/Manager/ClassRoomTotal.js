import CRTActions from '../../actions/Manager/ClassRoomTotalActions';

const ClassRoomTotal = (state={

    RoomTypeDropSelectd:{value:"none",title:"全部教室"},

    RoomTypeDropList:[],

    WeekNO:0,

    Schedule:[],

    WeekList:[],

    LoadingShow:true,

    PageIndex:1,

    ClassRoomCount:0

},actions) => {

    switch (actions.type) {

        case CRTActions.MANAGER_CLASS_ROOM_TOTAL_INIT:

            return {

                ...state,

                RoomTypeDropSelectd:{value:"none",title:"全部教室"},

                PageIndex:1,

                ClassRoomCount:0,

                Schedule:actions.data

            };

        case CRTActions.MANAGER_CLASS_ROOM_TOTAL_ROOMTYPE_SELECT_CHANGE:

            return { ...state,RoomTypeDropSelectd:actions.data };

        case CRTActions.MANAGER_CLASS_ROOM_TOTAL_ROOMTYPE_LIST_UPDATE:

            return { ...state,RoomTypeDropList:actions.data };

        case CRTActions.MANAGER_CLASS_ROOM_TOTAL_WEEK_CHANGE:

            return { ...state,WeekNO:actions.data };

        case CRTActions.MANAGER_CLASS_ROOM_TOTAL_SCHEDULE_UPDATE:

        return { ...state,Schedule:actions.data };

        case CRTActions.MANAGER_CLASS_ROOM_TOTAL_CLASS_COUNT:

            return { ...state,ClassRoomCount:actions.data};

        case CRTActions.MANAGER_CLASS_ROOM_TOTAL_WEEK_LIST_UPDATE:

            return { ...state,WeekList:actions.data };

        case CRTActions.MANAGER_CLASS_ROOM_TOTAL_LOADING_HIDE:

            return { ...state,LoadingShow:false };

        case CRTActions.MANAGER_CLASS_ROOM_TOTAL_LOADING_SHOW:

            return { ...state,LoadingShow:true };

        case CRTActions.MANAGER_CLASS_ROOM_TOTAL_PAGE_ADD:

            return { ...state,PageIndex:state.PageIndex+1};

        default:

            return state;

    }

};

export default ClassRoomTotal;