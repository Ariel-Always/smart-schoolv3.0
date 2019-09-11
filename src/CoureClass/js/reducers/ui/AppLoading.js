import UpUIState from '../../actions/UpUIState';
const AppLoading = (state = { appLoading: true, rightLoading: false, modalLoading: false, searchLoading: false }, actions) => {
    switch (actions.type) {
        case UpUIState.APP_LOADING_OPEN:
            return Object.assign({}, state, { appLoading: true });
        case UpUIState.APP_LOADING_CLOSE:
            return Object.assign({}, state, { appLoading: false });
        case UpUIState.RIGHT_LOADING_OPEN:
            return Object.assign({}, state, { rightLoading: true });
        case UpUIState.RIGHT_LOADING_CLOSE:
            return Object.assign({}, state, { rightLoading: false });
        case UpUIState.MODAL_LOADING_OPEN:
            return Object.assign({}, state, { modalLoading: true });
        case UpUIState.MODAL_LOADING_CLOSE:
            return Object.assign({}, state, { modalLoading: false });
        case UpUIState.SEARCH_LOADING_OPEN:
            return Object.assign({}, state, { searchLoading: true });
        case UpUIState.SEARCH_LOADING_CLOSE:
            return Object.assign({}, state, { searchLoading: false });
        default:
            return state;
    }
};
export default AppLoading;