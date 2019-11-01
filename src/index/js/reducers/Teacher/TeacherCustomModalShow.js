import HeaderActions from '../../actions/Teacher/HeaderActions';
const TeacherCustomModalShow = (state = { Show: false, key: 'tool', AddCustomModalShow: false }, actions) => {
    switch (actions.type) {
        case HeaderActions.TEACHER_CUSTOM_MODAL_OPEN:
            return Object.assign({}, state, { Show: true, key: actions.key });
        case HeaderActions.TEACHER_CUSTOM_MODAL_CLOSE:
            return Object.assign({}, state, { Show: false, key: actions.key });
        case HeaderActions.ADD_CUSTOM_MODAL_OPEN:
            return Object.assign({}, state, { AddCustomModalShow: true });
        case HeaderActions.ADD_CUSTOM_MODAL_CLOSE:
            return Object.assign({}, state, { AddCustomModalShow: false });
        default:
            return state;
    }
};
export default TeacherCustomModalShow;