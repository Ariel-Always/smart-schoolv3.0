import UpDataState from '../../actions/UpDataState';

const AllGradePreview = (state={

    ClassContentShow:false,

    ClassLoading:false,

    CurrentPage:1,

    SearchKey:'',

    Total:0,

    ClassInfo:""

},actions)=>{

    switch (actions.type) {

        case UpDataState.GET_ALL_GRADE_PREVIEW:

            return {

                ...state,

                ClassContentShow:false,

                ClassLoading:false,

                CurrentPage:1,

                Total:0,

                SearchKey:'',

                ...actions.data

            };


        case UpDataState.ALL_GRADE_CLASS_SEARCHKEY_CHANGE:

            return { ...state,SearchKey:actions.data };

        case UpDataState.ALL_GRADE_CLASS_LOADING_HIDE:

            return { ...state,ClassLoading:false };

        case UpDataState.ALL_GRADE_CLASS_LOADING_SHOW:

            return { ...state,ClassLoading:true };

        case UpDataState.ALL_GRADE_CLASS_CONTENT_SHOW:

            return { ...state,ClassContentShow:true };

        case UpDataState.ALL_GRADE_CLASS_CONTENT_HIDE:

            return { ...state,ClassContentShow:false };

        case UpDataState.ALL_GRADE_CLASS_LIST_UPDATE:

            return { ...state,ClassInfo:actions.data };

        default:

            return state;

    }
} ;


export default  AllGradePreview;