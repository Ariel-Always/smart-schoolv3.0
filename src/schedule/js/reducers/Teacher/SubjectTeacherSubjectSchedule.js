import STSActions from '../../actions/Teacher/SubjectTeacherSubjectActions';

const SubjectTeacherSubjectSchedule = (state={

    schedule:[],

    ItemSubjectSelect:{value:0,title:"全部学科"},

    NowWeekNo:0,

    pageIndex:1,

    loadingShow:true,

    TeacherCount:0,

    SubjectSelectd:"",

    SubjectDropList:[],

    SubjectDropShow:false,

    SubjectTitleName:"",

    SubjectTitleID:''

}, actions) => {

    switch (actions.type) {

        case STSActions.SUBJECT_TEACHER_SCHEDULE_INIT:

            return {

                ...state,

                schedule:actions.data,

                ItemSubjectSelect:{value:0,title:"全部学科"},

                pageIndex:1,

                loadingShow:true

            };

        case STSActions.STS_SUBJECT_CHANGE:

          return {...state,ItemSubjectSelect:actions.data};

        case STSActions.STS_NOW_WEEK_CHANGE:

            return {...state,NowWeekNo:actions.data};

        case STSActions.SUBJECT_TEACHER_SCHEDULE_UPDATE:

            return {...state,schedule:actions.data};

        case STSActions.TEACHER_SUBJECT_TEACHER_SUBJECT_TEACHER_COUNT:

            return {...state,TeacherCount:actions.data};

        case STSActions.STS_PAGE_ADD:

            return {...state,pageIndex:state.pageIndex+1};

        case STSActions.LOADING_HIDE:

            return {...state,loadingShow:false};

        case STSActions.LOADING_SHOW:

            return {...state,loadingShow:true};

        case STSActions.TEACHER_STS_SUBJECT_DROP_SHOW:

            return { ...state,SubjectDropShow:true };

        case STSActions.TEACHER_STS_SUBJECT_DROP_HIDE:

            return { ...state,SubjectDropShow:false };

        case STSActions.TEACHER_STS_SUBJECT_DROP_CHANGE:

            return { ...state,SubjectSelectd:actions.data };

        case STSActions.TEACHER_STS_SUBJECT_DROP_LIST_CHANGE:

            return { ...state,SubjectDropList:actions.data };

        case STSActions.TEACHER_STS_SUBJECT_TITLE_CHANGE:

            return { ...state,SubjectTitleName:actions.data.title,SubjectTitleID:actions.data.id };

        default:

            return state;

    }

};

export default SubjectTeacherSubjectSchedule