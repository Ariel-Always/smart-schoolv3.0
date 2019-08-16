//操作名称
const APP_LOADING_CLOSE = 'APP_LOADING_CLOSE';
const APP_LOADING_OPEN = 'APP_LOADING_OPEN';
const SHOW_ERROR_ALERT = 'SHOW_ERROR_ALERT';
const CLOSE_ERROR_ALERT = 'CLOSE_ERROR_ALERT';

//操作
const showErrorAlert = (alertMsg)=> {
    return {type:SHOWERRORALERT,msg:alertMsg};
};

const hideErrorAlert = () =>{
    return {type:CLOSEERRORALERT};
};

export default {
    APP_LOADING_CLOSE,
    APP_LOADING_OPEN,
    SHOW_ERROR_ALERT,
    CLOSE_ERROR_ALERT,
    showErrorAlert,
    hideErrorAlert
}