import ABTMActions from  '../../actions/Manager/AdjustByTimeModalActions';

const AdjustByTimeModal = (state={

    show:false,

    loadingShow:true,

    oldClassHours:[],

    newClassHours:[],

    periodGrades:[],

    periodGradesPlainOpts:[],

    periodGradesCheckedList:[],

    oldClassHourPlainOpts:[],

    oldClassHourCheckedList:[],

    newClassHourPlainOpts:[],

    newClassHourCheckedList:[]

}, actions) => {

    switch (actions.type) {

        case ABTMActions.ADJUST_BY_TIME_SHOW:

            return {...state,show:true};

        case ABTMActions.ADJUST_BY_TIME_HIDE:

            return {...state,show:false};

        case ABTMActions.ADJUST_BY_TIME_INFO_UPDATE:

            return {...state,...actions.data};

        case ABTMActions.ADJUST_BY_TIME_LOADING_SHOW:

            return {...state,loadingShow:true};

        case ABTMActions.ADJUST_BY_TIME_LOADING_HIDE:

            return {...state,loadingShow:false};

        case ABTMActions.ADJUST_BY_TIME_PERIOD_GRADE_CHECKED:

            return {...state,periodGradesCheckedList:actions.data.periodGradesCheckedList};

        case ABTMActions.ADJUST_BY_TIME_OLD_CLASSHOUR_CHECKED:

            return {...state,oldClassHourCheckedList:actions.data.oldClassHourCheckedList};

        case ABTMActions.ADJUST_BY_TIME_NEW_CLASSHOUR_CHECKED:

            return {...state,newClassHourCheckedList:actions.data.newClassHourCheckedList};

        default:

            return state;

    }

};

export default AdjustByTimeModal