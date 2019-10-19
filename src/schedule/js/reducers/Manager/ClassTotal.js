import ClassTotalActions from '../../actions/Manager/ClassTotalActions';

const ClassTotal = (state={

    GradeDropSelectd:{value:"none",title:"全部年级"},

    GradeDropList:[],

    WeekNO:0,

    Schedule:[],

    WeekList:[],

    LoadingShow:true,

    PageIndex:1,

},actions) => {

    switch (actions.type) {

        case ClassTotalActions.MANAGER_CLASS_TOTAL_GRADE_SELECT_CHANGE:

            return { ...state,GradeDropSelectd:actions.data };

        case ClassTotalActions.MANAGER_CLASS_TOTAL_GRADE_UPDATE:

            return { ...state,GradeDropList:actions.data };

        case ClassTotalActions.MANAGER_CLASS_TOTAL_WEEK_CHANGE:

            return { ...state,WeekNO:actions.data };

        case ClassTotalActions.MANAGER_CLASS_TOTAL_SCHEDULE_UPDATE:

        return { ...state,Schedule:actions.data };

        case ClassTotalActions.MANAGER_CLASS_TOTAL_WEEK_LIST_UPDATE:

            return { ...state,WeekList:actions.data };

        case ClassTotalActions.MANAGER_CLASS_TOTAL_LOADING_HIDE:

            return { ...state,LoadingShow:false };

        case ClassTotalActions.MANAGER_CLASS_TOTAL_LOADING_SHOW:

            return { ...state,LoadingShow:true };

        case ClassTotalActions.MANAGER_CLASS_TOTAL_PAGE_ADD:

            return { ...state,LoadingShow:true };

        default:

            return state;

    }

};

export default ClassTotal;