import STSActions from '../../actions/Manager/SubjectTeacherScheduleActions';

const SubjectTeacherSubjectSchedule = (state={

    schedule:[],

    ItemSubjectSelect:{value:0,title:"全部学科"},

    NowWeekNo:0,

    pageIndex:1,

    loadingShow:true

}, actions) => {

    switch (actions.type) {

        case STSActions.SUBJECT_TEACHER_SCHEDULE_INIT:

            return {...state,schedule:actions.data};

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

        default:

            return state;

    }

};

export default SubjectTeacherSubjectSchedule