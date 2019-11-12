import STSActions from '../../actions/Manager/SubjectTeacherScheduleActions';

const SubjectTeacherSchedule = (state={

    schedule:[],

    ItemSubjectSelect:{value:0,title:"全部学科"},

    NowWeekNo:0,

    pageIndex:1,

    loadingShow:true,

    TeacherCount:0,

    ScheduleDetail:{

        Show:false,

        ModalLoading:true

    },

    ChangeTime:{

        Show:false,

        ModalLoading:true,

        SelectWeekDay:'',

        SelectClassHourNO:0,

        SelectDate:''

    },

    AdjustClassRoom:{

        Show:false,

        ModalLoading:true,

        ClassRoomList:[],

        ClassRoomTabActive:0

    }

},actions) => {

    switch (actions.type) {

        case STSActions.SUBJECT_TEACHER_SCHEDULE_INIT:

            return {

                ...state,

                ItemSubjectSelect:{value:0,title:"全部学科"},

                pageIndex:1,

                loadingShow:true,

                schedule:actions.data,

                ScheduleDetailModal:{

                    Show:false,

                    ModalLoading:false

                },


                ChangeTime:{

                    Show:false,

                    ModalLoading:true,

                    SelectWeekDay:'',

                    SelectClassHourNO:0,

                    SelectDate:''

                },

                AdjustClassRoom:{

                    Show:false,

                    ModalLoading:true,

                    ClassRoomList:[],

                    ClassRoomTabActive:0

                }


            };

        case STSActions.SUBJECT_TEACHER_SCHEDULE_TEACHER_COUNT:

            return { ...state,TeacherCount:actions.data };

        case STSActions.STS_SUBJECT_CHANGE:

          return {...state,ItemSubjectSelect:actions.data};

        case STSActions.STS_NOW_WEEK_CHANGE:

            return {...state,NowWeekNo:actions.data};

        case STSActions.SUBJECT_TEACHER_SCHEDULE_UPDATE:

            return {...state,schedule:actions.data};

        case STSActions.STS_PAGE_ADD:

            return {...state,pageIndex:state.pageIndex+1};

        case STSActions.LOADING_HIDE:

            return {...state,loadingShow:false};

        case STSActions.LOADING_SHOW:

            return {...state,loadingShow:true};

        case STSActions.MANAGER_STS_SCHEDULE_DETAIL_MODAL_SHOW:

            return {...state,ScheduleDetail:{...state.ScheduleDetail,Show:true,ModalLoading:true}};

        case STSActions.MANAGER_STS_SCHEDULE_DETAIL_MODAL_LOADING_HIDE:

            return {...state,ScheduleDetail:{...state.ScheduleDetail,ModalLoading:false}};

        case STSActions.MANAGER_STS_SCHEDULE_DETAIL_MODAL_LOADING_SHOW:

            return {...state,ScheduleDetail:{...state.ScheduleDetail,ModalLoading:true}};

        case STSActions.MANAGER_STS_SCHEDULE_DETAIL_MODAL_INIT:

            return {

                ...state,

                ScheduleDetail:{

                    ...state.ScheduleDetail,

                    ...actions.data

                }
            };

        case STSActions.MANAGER_STS_SCHEDULE_DETAIL_MODAL_HIDE:

            return { ...state,ScheduleDetail:{...state.ScheduleDetail,Show:false}};

        case STSActions.MANAGER_STS_CHANGE_TIME_MODAL_SHOW:

            return {...state,ChangeTime:{...state.ChangeTime,Show:true,ModalLoading:true}};

        case STSActions.MANAGER_STS_CHANGE_TIME_MODAL_HIDE:

            return {...state,ChangeTime:{...state.ChangeTime,Show:false}};

        case STSActions.MANAGER_STS_CHANGE_TIME_MODAL_LOADING_SHOW:

            return {...state,ChangeTime:{...state.ChangeTime,ModalLoading:true}};

        case STSActions.MANAGER_STS_CHANGE_TIME_MODAL_LOADING_HIDE:

            return {...state,ChangeTime:{...state.ChangeTime,ModalLoading:false}};

        case STSActions.MANAGER_STS_CHANGE_TIME_MODAL_INIT:

            return {...state,ChangeTime:{...state.ChangeTime,SelectWeekDay:'',SelectClassHourNO:0,...actions.data}};

        case STSActions.MANAGER_STS_CHANGE_TIME_MODAL_CLASSHOUR_PICK:

            return { ...state,ChangeTime:{...state.ChangeTime,...actions.data}};

        case STSActions.MANAGER_STS_ADJUST_CLASSROOM_MODAL_SHOW:

            return {...state,AdjustClassRoom:{...state.AdjustClassRoom,Show:true,ModalLoading:true}};

        case STSActions.MANAGER_STS_ADJUST_CLASSROOM_MODAL_HIDE:

            return {...state,AdjustClassRoom:{...state.AdjustClassRoom,Show:false}};

        case STSActions.MANAGER_STS_ADJUST_CLASSROOM_MODAL_LOADING_SHOW:

            return {...state,AdjustClassRoom:{...state.AdjustClassRoom,ModalLoading:true}};

        case STSActions.MANAGER_STS_ADJUST_CLASSROOM_MODAL_LOADING_HIDE:

            return {...state,AdjustClassRoom:{...state.AdjustClassRoom,ModalLoading:false}};

        case STSActions.MANAGER_STS_ADJUST_CLASSROOM_MODAL_INIT:

            return {...state,AdjustClassRoom:{...state.AdjustClassRoom,...actions.data}};



        default:

            return state;

    }

};

export default SubjectTeacherSchedule