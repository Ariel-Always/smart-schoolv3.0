//操作名称

//app层级的loading
const APP_LOADING_CLOSE = 'APP_LOADING_CLOSE';
const APP_LOADING_SHOW = 'APP_LOADING_SHOW';
//app层级的弹出层
const SHOW_ERROR_ALERT = 'SHOW_ERROR_ALERT';
const CLOSE_ERROR_ALERT = 'CLOSE_ERROR_ALERT';
//点击某一年级的加载
const CLASS_LOADING_SHOW = 'CLASS_LOADING_SHOW';
const CLASS_LOADING_HIDE = 'CLASS_LOADING_HIDE';


//操作函数
const showErrorAlert = (alertMsg)=> {
    return {type:SHOW_ERROR_ALERT,msg:alertMsg};
};

const hideErrorAlert = () =>{
    return {type:CLOSE_ERROR_ALERT};
};



export default {
    APP_LOADING_CLOSE,
    APP_LOADING_SHOW,
    SHOW_ERROR_ALERT,
    CLOSE_ERROR_ALERT,
    CLASS_LOADING_SHOW,
    CLASS_LOADING_HIDE,
    showErrorAlert,
    hideErrorAlert
}