import UpUIState from '../../actions/UpUIState';
const AdjustClassModal = (state={show:false},actions) => {
    switch (actions.type) {
        case UpUIState.ADJUST_CLASS_MODAL_SHOW:
            return {...state,show:true};
        default:
            return state;
    }
}
export default AdjustClassModal;