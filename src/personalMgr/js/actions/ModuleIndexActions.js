import { getData } from '../../../common/js/fetch';

import Method from './Method'

import AppAlertActions from '../actions/AppAlertActions';

import LoginUserActions from '../actions/LoginUserActions';


const PageInit = () =>{

    return dispatch => {

        getData('http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev/Login').then(res => res.json()).then(json => {

            dispatch({type:LoginUserActions.UPDATE_LOGIN_USER,data:json.data.result});

        });

    }

};


const hideAlert = (dispatch) =>{

  return () => dispatch({type:AppAlertActions.APP_ALERT_HIDE});

};

export default {

    PageInit

}