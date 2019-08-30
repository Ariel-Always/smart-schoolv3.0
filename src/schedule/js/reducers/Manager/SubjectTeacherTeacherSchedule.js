import STTActions from '../../actions/Manager/SubjectTeacherTeacherActions';

const SubjectTeacherTeacherSchedule = (state={

    schedule:[],

    NowWeekNo:0,

    loadingShow:true,

    teacherList:[]

},actions) => {

    switch (actions.type) {

      /* case STSActions.SUBJECT_TEACHER_SCHEDULE_INIT:

            return {...state,schedule:actions.data};*/

        case STTActions.STT_NOW_WEEK_CHANGE:

            return {...state,NowWeekNo:actions.data};

        case STTActions.TEACHER_LIST_UPDATE:

            return {...state,teacherList:actions.data};

     /*   case STSActions.SUBJECT_TEACHER_SCHEDULE_UPDATE:

            return {...state,schedule:actions.data};

        case STSActions.LOADING_HIDE:

            return {...state,loadingShow:false};

        case STSActions.LOADING_SHOW:

            return {...state,loadingShow:true};*/

        default:

            return state;

    }

};

export default SubjectTeacherTeacherSchedule