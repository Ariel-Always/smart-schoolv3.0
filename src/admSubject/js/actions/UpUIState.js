//操作名称
const APP_LOADING_CLOSE = 'APP_LOADING_CLOSE';
const APP_LOADING_OPEN = 'APP_LOADING_OPEN';
const SHOW_ERROR_ALERT = 'SHOW_ERROR_ALERT';
const CLOSE_ERROR_ALERT = 'CLOSE_ERROR_ALERT';
const SHOW_WARN_ALERT = 'SHOW_WARN_ALERT';
const CLOSE_WARN_ALERT = 'CLOSE_WARN_ALERT';
const SHOW_QUERY_ALERT = 'SHOW_QUERY_ALERT';
const CLOSE_QUERY_ALERT = 'CLOSE_QUERY_ALERT';
//Subject
const SUBJECT_TABLE_LOADING_OPEN = 'SUBJECT_TABLE_LOADING_OPEN';
const SUBJECT_TABLE_LOADING_CLOSE = 'SUBJECT_TABLE_LOADING_CLOSE';

const SUBJECT_DETAILS_MODAL_OPEN = 'SUBJECT_DETAILS_MODAL_OPEN';
const SUBJECT_DETAILS_MODAL_CLOSE = 'SUBJECT_DETAILS_MODAL_CLOSE';

const CHANGE_SUBJECT_MODAL_OPEN = 'CHANGE_SUBJECT_MODAL_OPEN'
const CHANGE_SUBJECT_MODAL_CLOSE = 'CHANGE_SUBJECT_MODAL_CLOSE'
//操作
const showErrorAlert = (alertMsg)=> {
    return {type:SHOW_ERROR_ALERT,msg:alertMsg};
};

const hideErrorAlert = () =>{
    return {type:CLOSE_ERROR_ALERT};
};
const showWarnAlert = (alertMsg)=> {
    return {type:SHOW_WARN_ALERT,msg:alertMsg};
};

const hideWarnAlert = () =>{
    return {type:CLOSE_WARN_ALERT};
};
const showQueryAlert = (alertMsg)=> {
    return {type:SHOW_QUERY_ALERT,msg:alertMsg};
};

const hideQueryAlert = () =>{
    return {type:CLOSE_QUERY_ALERT};
};

const changeSubjectModalOpen = () => {
    return {type:CHANGE_SUBJECT_MODAL_OPEN};
}
const changeSubjectModalClose = () => {
    return {type:CHANGE_SUBJECT_MODAL_CLOSE};
}

export default {
    APP_LOADING_CLOSE,
    APP_LOADING_OPEN,
    SHOW_ERROR_ALERT,
    CLOSE_ERROR_ALERT,
    SHOW_WARN_ALERT,
    CLOSE_WARN_ALERT,
    SHOW_QUERY_ALERT,
    CLOSE_QUERY_ALERT,
    SUBJECT_TABLE_LOADING_OPEN,
    SUBJECT_TABLE_LOADING_CLOSE,
    SUBJECT_DETAILS_MODAL_OPEN,
    SUBJECT_DETAILS_MODAL_CLOSE,
    CHANGE_SUBJECT_MODAL_OPEN,
    CHANGE_SUBJECT_MODAL_CLOSE,
    showErrorAlert,
    hideErrorAlert,
    showWarnAlert,
    hideWarnAlert,
    showQueryAlert,
    hideQueryAlert,
    changeSubjectModalOpen,
    changeSubjectModalClose
}