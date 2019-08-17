import UpUIState from '../../actions/UpUIState';
const AppAlert = (state={show:false,title:'',type:0},actions) => {
    switch (actions.type) {
        case UpUIState.SHOW_ERROR_ALERT:
            return {show:true,title:actions.msg.title,type:actions.msg.type,onOk:actions.msg.ok,onCancel:actions.msg.cancel,onClose:actions.msg.close};
        case UpUIState.CLOSE_ERROR_ALERT:
            return {...state,show:false};
        default:
            return state;
    }
};
export default  AppAlert