const UIState = (state={},actions) => {
    switch (actions.type) {
        case "login":
            return {...state};
        default:
            return state;
    }
};
export default UIState;