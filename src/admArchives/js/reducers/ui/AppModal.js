import UpUIState from '../../actions/UpUIState';
const AppModal = (state = { userInfoModalVisible:false,handleGraduateContactModalVisible: false, handleGraduateModalVisible: false, handleLeaderModalVisible: false, addLeaderModalVisible: false }, actions) => {
    switch (actions.type) {
        case UpUIState.ADD_LEADER_MODAL_OPEN:
            return Object.assign({}, state, { addLeaderModalVisible: true });
        case UpUIState.ADD_LEADER_MODAL_CLOSE:
            return Object.assign({}, state, { addLeaderModalVisible: false });
        case UpUIState.HANDLE_LEADER_MODAL_OPEN:
            return Object.assign({}, state, { handleLeaderModalVisible: true });
        case UpUIState.HANDLE_LEADER_MODAL_CLOSE:
            return Object.assign({}, state, { handleLeaderModalVisible: false });
        case UpUIState.HANDLE_GRADUATE_MODAL_OPEN:
            return Object.assign({}, state, { handleGraduateModalVisible: true });
        case UpUIState.HANDLE_GRADUATE_MODAL_CLOSE:
            return Object.assign({}, state, { handleGraduateModalVisible: false });
        case UpUIState.HANDLE_GRADUATE_CONTACT_MODAL_OPEN:
            return Object.assign({}, state, { handleGraduateContactModalVisible: true });
        case UpUIState.HANDLE_GRADUATE_CONTACT_MODAL_CLOSE:
            return Object.assign({}, state, { handleGraduateContactModalVisible: false });
        case UpUIState.USER_INFO_MODAL_OPEN:
            return Object.assign({}, state, { userInfoModalVisible: true });
        case UpUIState.USER_INFO_MODAL_CLOSE:
            return Object.assign({}, state, { userInfoModalVisible: false });
        default:
            return state;
    }
};
export default AppModal;