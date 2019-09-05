import {combineReducers} from 'redux'
import AppLoading from './ui/AppLoading';
import AppAlert from './ui/AppAlert';
import SubjectDetailsMsgModalShow from './ui/SubjectDetailsMsgModalShow';
import SubjectTableLoading from './ui/SubjectTableLoading';
import ChangeSubjectModal from './ui/ChangeSubjectModal';
const  UIState = combineReducers({
    AppLoading,
    AppAlert,
    SubjectTableLoading,
    SubjectDetailsMsgModalShow,
    ChangeSubjectModal
});

export default UIState;


