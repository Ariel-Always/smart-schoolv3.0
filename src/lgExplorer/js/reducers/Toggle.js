
import ToggleOptions from "../action/ToggleOptions"
const toggle = (state = {

    tabActive: 'website',
    current: "primary"

}, action = {}) => {
    switch (action.type) {

        case ToggleOptions.Toggle_Website:
            return {
                ...state,
                tabActive: "website"
            };

        case ToggleOptions.Toggle_ResourceBase:

            return {
                ...state,
                tabActive: "resourceBase"
            };

        case ToggleOptions.Toggle_MyResourceBase:
            return {
                ...state,
                tabActive: "myResourceBase"
            }
        case ToggleOptions.Toggle_primary:
            return {
                ...state,
                current: "primary"
            }
        case ToggleOptions.Toggle_middle:
            return {
                ...state,
                current: "middle"
            }
        case ToggleOptions.Toggle_hign:
            return {
                ...state,
                current: "high"
            }



        default:
            return state;
    }



};
export default toggle;