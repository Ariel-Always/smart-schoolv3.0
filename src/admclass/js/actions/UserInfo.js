import  'whatwg-fetch';
import uiStateUpdate from './UIState';

import CONFIG from '../../../common/js/config';
const GET_USER_INFO = "GET_USER_INFO";
const  getUserInfo = (url) => {
    return (dispatch)=>{
        fetch(CONFIG.proxy+url).then(res=>res.json()).then((res)=>{
            dispatch({type:GET_USER_INFO,userInfo:res.Data});
            dispatch({type:uiStateUpdate.APPLOADINGCLOSE});
        })
    }
};

export default {
    getUserInfo,
    GET_USER_INFO
}