import CONFIG from "../../../../common/js/config";
import AppLoadingActions from '../AppLoadingActions'
import { getData, PostData, postData } from '../../../../common/js/fetch'
const SET_CUSTOM_TIPS_VISIBLE = 'SET_CUSTOM_TIPS_VISIBLE'

const setCustomTipsVisible = (visibleObj, source) => {
    return (dispatch) => {
        dispatch({ type: SET_CUSTOM_TIPS_VISIBLE, data:visibleObj });
    }
}
export default {
    SET_CUSTOM_TIPS_VISIBLE,
    setCustomTipsVisible
}