import UpUIState from '../../actions/UpUIState';
const AppLoading = (state = { appLoading: true, RightLoading: false }, actions) => {
    switch (actions.type) {
        case UpUIState.APP_LOADING_OPEN:
            return { appLoading: true };
        case UpUIState.APP_LOADING_CLOSE:
            return { appLoading: false };
        case UpUIState.RIGHT_LOADING_OPEN:
            return { RightLoading: true };
        case UpUIState.RIGHT_LOADING_CLOSE:
            return { RightLoading: false };
        default:
            return state;
    }
};
export default AppLoading;