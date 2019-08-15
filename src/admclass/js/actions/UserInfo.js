import {postData,getData} from "../../../common/js/fetch";
import uiStateUpdate from './UIState';

import CONFIG from '../../../common/js/config';
const GET_USER_INFO = "GET_USER_INFO";
const  getUserInfo = (url) => {
    return (dispatch)=>{
        getData(CONFIG.proxy+url).then(res=>res.json()).then(res=> {
            console.log(res);
        });
    }
};

export default {
    getUserInfo,
    GET_USER_INFO
}