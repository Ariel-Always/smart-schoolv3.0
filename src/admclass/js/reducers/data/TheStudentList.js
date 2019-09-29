import UpDataState from '../../actions/UpDataState';


const TheStudentList = (state={

    SearchKey:'',

    WrapperLoading:false

},actions) => {

    switch (actions.type) {

        case UpDataState.GET_THE_CLASS_STUDENTS:

            return {...state,...actions.data};

        case UpDataState.STUDENT_SEARCHKEY_CHANGE:

            return { ...state,SearchKey:actions.data };

        case UpDataState.STUDENT_WRAPPER_LOADING_SHOW:

            return { ...state,WrapperLoading:true };

        case UpDataState.STUDENT_WRAPPER_LOADING_HIDE:

            return { ...state,WrapperLoading:false };

        default:

            return state;

    }

};
export default TheStudentList;