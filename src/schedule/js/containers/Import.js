import React,{Component} from 'react';

import { connect } from 'react-redux';

import $ from "jquery";

import CONFIG from "../../../common/js/config";

import AppAlertActions from "../actions/AppAlertActions";

import AppLoadingActions from '../actions/AppLoadingActions';


class Import extends Component{

    componentDidMount(){

        const { dispatch } = this.props;

        if (sessionStorage.getItem('UserInfo')){

            const token = sessionStorage.getItem('token');

            let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

            let { SchoolID,UserName,UserID } = UserInfo;

            $.get(`${CONFIG.AdmClassProxy}/UserMgr/TeachInfoMgr/Import.aspx?SchoolID=${SchoolID}&Token=${token}&Type=scheduleMiddle&UserName=${UserName}&UserID=${UserID}`, (data, status) => {


                if (status==='success'){

                    $('#import-wrapper').append(data);

                    dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                }else if (status === 'error'||status==='notmodified'||status==='parsererror'){

                    dispatch(AppAlertActions.alertError({title:"请求出错！",ok:()=>{ return ()=> window.location.href='/html/admclass';}}));

                }else if (status === 'timeout'){

                    dispatch(AppAlertActions.alertError({title:"请求超时！",ok:()=>{ return ()=> window.location.href='/html/admclass';}}))

                }

            });



        }else{


            let getUserInfo = setInterval(()=>{

                if (sessionStorage.getItem('UserInfo')){

                    const token = sessionStorage.getItem('token');

                    let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

                    let { SchoolID,UserName,UserID } = UserInfo;

                    $.get(`${CONFIG.AdmClassProxy}/UserMgr/TeachInfoMgr/Import.aspx?SchoolID=${SchoolID}&Token=${token}&Type=scheduleMiddle&UserName=${UserName}&UserID=${UserID}`, (data, status) => {


                        if (status==='success'){

                            $('#import-wrapper').append(data);

                            dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                        }else if (status === 'error'||status==='notmodified'||status==='parsererror'){

                            dispatch(AppAlertActions.alertError({title:"请求出错！",ok:()=>{ return ()=> window.location.href='/html/admclass';}}));

                        }else if (status === 'timeout'){

                            dispatch(AppAlertActions.alertError({title:"请求超时！",ok:()=>{ return ()=> window.location.href='/html/admclass';}}))

                        }

                    });

                    clearInterval(getUserInfo);

                }

            },20)

        }

        $('.frame-content-rightside').css({

            'margin-top':'0px',

            "border-radius":"12px",

            "border-top":"0px"

        });

    }


    render(){

        const { LoginUser } = this.props;

        return <div id="import-wrapper">


        </div>

    }

}

const  mapStateToProps = (state) => {

    let { LoginUser } = state;

    return {

        LoginUser

    }

};

export default connect(mapStateToProps)(Import);