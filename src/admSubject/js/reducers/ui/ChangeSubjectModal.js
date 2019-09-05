import UpUIState from '../../actions/UpUIState';
const ChangeSubjectModal = (state={ModalShow:false},actions) => {
    switch (actions.type) {
        case UpUIState.CHANGE_SUBJECT_MODAL_OPEN:
            return {ModalShow:true};
        case UpUIState.CHANGE_SUBJECT_MODAL_CLOSE:
            return {ModalShow:false};
        default:
            return state;
    }
};
export default  ChangeSubjectModal;