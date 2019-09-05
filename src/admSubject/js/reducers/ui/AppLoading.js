import UpUIState from '../../actions/UpUIState';
const AppLoading = (state = { appLoading: true,modalLoading:false }, actions) => {
    switch (actions.type) {
        case UpUIState.APP_LOADING_OPEN:
            return  Object.assign({}, state,{ appLoading: true });
        case UpUIState.APP_LOADING_CLOSE:
            return Object.assign({}, state,{ appLoading: false });
        case UpUIState.MODAL_LOADING_OPEN:
            return Object.assign({}, state,{ modalLoading: true });
        case UpUIState.MODAL_LOADING_CLOSE:
            return Object.assign({}, state,{ modalLoading: false });
        default:
            return state;
    }
};
export default AppLoading;