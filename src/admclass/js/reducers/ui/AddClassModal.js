import UpUIState from '../../actions/UpUIState';
const  AddClassModal = (state={show:false},actions) => {
    switch (actions.type) {
        case UpUIState.ADD_CLASS_MODAL_SHOW:
            return {...state,show:true};
        case UpUIState.ADD_CLASS_MODAL_HIDE:
            return {...state,show:false};
        default:
            return state;
    }
};
export default AddClassModal;