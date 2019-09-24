//操作名称
const APP_LOADING_CLOSE = 'APP_LOADING_CLOSE';
const APP_LOADING_OPEN = 'APP_LOADING_OPEN';
const SHOW_ERROR_ALERT = 'SHOW_ERROR_ALERT';
const CLOSE_ERROR_ALERT = 'CLOSE_ERROR_ALERT';
const SHOW_WARN_ALERT = 'SHOW_WARN_ALERT';
const CLOSE_WARN_ALERT = 'CLOSE_WARN_ALERT';
const SHOW_QUERY_ALERT = 'SHOW_QUERY_ALERT';
const CLOSE_QUERY_ALERT = 'CLOSE_QUERY_ALERT';

//右侧内容区loading
const RIGHT_LOADING_CLOSE =  'RIGHT_LOADING_CLOSE';
const RIGHT_LOADING_OPEN =  'RIGHT_LOADING_OPEN';
//Table
const TABLE_LOADING_OPEN = 'TABLE_LOADING_OPEN';
const TABLE_LOADING_CLOSE = 'TABLE_LOADING_CLOSE';
//editModalTipsVisible
const EDIT_MODAL_TIPS_VISIBLE = 'EDIT_MODAL_TIPS_VISIBLE'
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

//右侧loading
const RightLoadingOpen = () => {
    return {type:RIGHT_LOADING_OPEN};
}
const RightLoadingClose = () => {
    return {type:RIGHT_LOADING_CLOSE};
}
//Table
const TableLoadingOpen = () => {
    return {type:TABLE_LOADING_OPEN};
}
const TableLoadingClose = () => {
    return {type:TABLE_LOADING_CLOSE};
}
//EditModalTipsVisible
const editModalTipsVisible = (data) => {
    return {type:EDIT_MODAL_TIPS_VISIBLE,data:data}
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
    RIGHT_LOADING_OPEN,
    RIGHT_LOADING_CLOSE,
    TABLE_LOADING_CLOSE,
    TABLE_LOADING_OPEN,

    showErrorAlert,
    hideErrorAlert,
    showWarnAlert,
    hideWarnAlert,
    showQueryAlert,
    hideQueryAlert,
    RightLoadingOpen,
    RightLoadingClose,
    TableLoadingOpen,
    TableLoadingClose,

    EDIT_MODAL_TIPS_VISIBLE,
    editModalTipsVisible,
}