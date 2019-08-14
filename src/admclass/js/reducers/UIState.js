import uiStateUpdate from '../actions/UIState';
const UIState = (state={appLoading:true},actions) => {
    switch (actions.type) {
        case uiStateUpdate.APPLOADINGOPEN:
             return {appLoading:true};
        case uiStateUpdate.APPLOADINGCLOSE:
            return {appLoading:false};
        default:
            return state;
    }
};
export default UIState;