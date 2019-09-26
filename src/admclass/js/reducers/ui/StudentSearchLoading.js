import SearchLoadingActions from '../../actions/SearchLoadingActions';

const StudentSearchLoading = (state={

    show:false

}, actions) => {

    switch (actions.type) {

        case SearchLoadingActions.STUDENT_SEARCH_LOADING_SHOW:

            return { ...state,show:true };

        case SearchLoadingActions.STUDENT_SEARCH_LOADING_HIDE:

            return {...state,show:false };

        default:

            return state;

    }

};

export default StudentSearchLoading