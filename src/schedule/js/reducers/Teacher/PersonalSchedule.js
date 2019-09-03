import TPActions from "../../actions/Teacher/TeacherPersonalActions";


const PersonalSchedule = (state={

    schedule:[],

    NowWeekNo:0,

    loadingShow:true,

    NowDate:new Date()

},actions) => {

    switch (actions.type) {

        case TPActions.TP_NOW_WEEK_CHANGE:

            return {...state,NowWeekNo:actions.data};

        case TPActions.TP_SCHEDULE_CHANGE:

            return {...state,...actions.data};

        case TPActions.TP_SCHEDULE_LOADING_HIDE:

            return {...state,loadingShow:false};

        case TPActions.TP_SCHEDULE_LOADING_SHOW:

            return {...state,loadingShow:true};

        default:

            return state;

    }

};

export default PersonalSchedule