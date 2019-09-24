import {combineReducers} from 'redux'
import AppLoading from './ui/AppLoading';
import AppAlert from './ui/AppAlert';
import EditModalTipsVisible from './ui/EditModalTipsVisible';
const  UIState = combineReducers({
    AppLoading,
    AppAlert,
    EditModalTipsVisible
});

export default UIState;


