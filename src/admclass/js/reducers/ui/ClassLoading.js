import UpUIState from '../../actions/UpUIState';
const ClassLoading = (state={show:true},actions) => {
    switch (actions.type) {
        case UpUIState.CLASS_LOADING_HIDE:
            return {...state,show:false}
        default:
            return state;
    }
};
export default ClassLoading;