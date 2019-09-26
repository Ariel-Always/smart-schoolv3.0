import UpDataState from '../../actions/UpDataState';

const TheGradePreview = (state={

    SearchKey:'',

    ClassLoading:false,

    StaticsShow:true

},actions) => {

    switch (actions.type) {

        case UpDataState.GET_THE_GRADE_PREVIEW:

            return{...state,

                SearchKey:'',

                ClassLoading:false,

                StaticsShow:true,

                ...actions.data,

            };

        case UpDataState.THE_GRADE_CLASS_SEARCHKEY_CHANGE:

            return { ...state,SearchKey:actions.data };

        case UpDataState.THE_GRADE_CLASS_LOADING_HIDE:

            return { ...state,ClassLoading:false };

        case UpDataState.THE_GRADE_CLASS_LOADING_SHOW:

            return { ...state,ClassLoading:true };

        case UpDataState.THE_GRADE_CLASS_STATICS_SHOW:

            return { ...state,StaticsShow:true };

        case UpDataState.THE_GRADE_CLASS_STATICS_HIDE:

            return { ...state,StaticsShow:false };

        case UpDataState.THE_GRADE_CLASS_LIST_UPDATE:

            return { ...state,...actions.data };

        default:

            return state;

    }

};

export default TheGradePreview;