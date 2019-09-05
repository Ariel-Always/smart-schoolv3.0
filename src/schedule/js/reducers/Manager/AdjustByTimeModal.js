import ABTMActions from  '../../actions/Manager/AdjustByTimeModalActions';

const AdjustByTimeModal = (state={

    show:false,

    loadingShow:true,

    oldClassHours:[],

    newClassHours:[],

    periodGrades:[],

    periodGradesPlainOpts:[],

    periodGradesCheckedList:[]

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

        default:

            return state;

    }

};

export default AdjustByTimeModal