import React,{Component} from 'react';

import { connect } from 'react-redux';

import $ from "jquery";

import CONFIG from "../../../common/js/config";

import AppAlertActions from "../actions/AppAlertActions";

import AppLoadingActions from '../actions/AppLoadingActions';


class Import extends Component{

    constructor(props){

        super(props);

        const { dispatch,LoginUser } = props;

        const token = sessionStorage.getItem('token');

        if (LoginUser.UserType===0) {

            $.get(`${CONFIG.AdmClassProxy}/UserMgr/mathinfomgr/Import.aspx?Token=${token}&UserType=CourseTeacher`, (data, status) => {


                if (status==='success'){

                    $('#import-wrapper').append(data);

                    dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                }else if (status === 'error'||status==='notmodified'||status==='parsererror'){

                    dispatch(AppAlertActions.alertError({title:"请求出错！",ok:()=>{ return ()=> window.location.href='/html/admclass';}}));

                }else if (status === 'timeout'){

                    dispatch(AppAlertActions.alertError({title:"请求超时！",ok:()=>{ return ()=> window.location.href='/html/admclass';}}))

                }

            });


        }else if(LoginUser.UserType===1){

            $.get(`${CONFIG.AdmClassProxy}/UserMgr/TeachInfoMgr/Import.aspx?Token=${token}&UserType=GangerMonitor`,(data,status)=>{

                if (status==='success'){

                    $('#import-wrapper').append(data);

                    dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                }else if (status === 'error'||status==='notmodified'||status==='parsererror'){

                    dispatch(AppAlertActions.alertError({title:"请求出错！",ok:()=>{ return ()=> window.location.href='/html/admclass';}}));

                }else if (status === 'timeout'){

                    dispatch(AppAlertActions.alertError({title:"请求超时！",ok:()=>{ return ()=> window.location.href='/html/admclass';}}))

                }

            });

        }

    }


    render(){

        const { LoginUser } = this.props;

        return <div className="#import-wrapper">


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