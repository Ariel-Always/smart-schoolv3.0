

const SubjectTeacherTeacherSchedule = (state={

    schedule:[],

    NowWeekNo:0,

    loadingShow:true

},actions) => {

    switch (actions.type) {

      /*  case STSActions.SUBJECT_TEACHER_SCHEDULE_INIT:

            return {...state,schedule:actions.data};

        case STSActions.STS_NOW_WEEK_CHANGE:

            return {...state,NowWeekNo:actions.data};

        case STSActions.SUBJECT_TEACHER_SCHEDULE_UPDATE:

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