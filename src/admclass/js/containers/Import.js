import React,{Component} from 'react';

import { connect } from 'react-redux';

import CONFIG from '../../../common/js/config';

import UpUIState from '../actions/UpUIState';

import $ from 'jquery';

import AppAlertActions from '../actions/AppAlertActions';

import ImportPhoto from '../../../common/js/Import/ImportPhoto'



class Import extends Component{

    constructor(props){

        super(props);

        const { dispatch } = props;

        const token = sessionStorage.getItem('token');

        const Hash = location.hash;

        const  HashParam = Hash.split('/')[2];

     /*   if (HashParam.includes('Teacher')) {

            $.get(`${CONFIG.AdmClassProxy}/UserMgr/ClassMgr/Import.aspx?Token=${token}&UserType=CourseTeacher`, (data, status) => {

                if (status==='success'){

                    $('#import-wrapper').append(data);

                    dispatch({type:UpUIState.APP_LOADING_CLOSE});
                    
                }else if (status === 'error'||status==='notmodified'||status==='parsererror'){

                    dispatch(AppAlertActions.alertError({title:"请求出错！",ok:()=>{ return ()=> window.location.href='/html/admclass';}}));

                }else if (status === 'timeout'){

                    dispatch(AppAlertActions.alertError({title:"请求超时！",ok:()=>{ return ()=> window.location.href='/html/admclass';}}))

                }


            });


        }else if(HashParam.includes('Genger')){

            $.get(`${CONFIG.AdmClassProxy}/UserMgr/ClassMgr/Import.aspx?Token=${token}&UserType=GangerMonitor`,(data,status)=>{

                if (status==='success'){

                    $('#import-wrapper').append(data);

                    dispatch({type:UpUIState.APP_LOADING_CLOSE});

                }else if (status === 'error'||status==='notmodified'||status==='parsererror'){

                    dispatch(AppAlertActions.alertError({title:"请求出错！",ok:()=>{ return ()=> window.location.href='/html/admclass';}}));

                }else if (status === 'timeout'){

                    dispatch(AppAlertActions.alertError({title:"请求超时！",ok:()=>{ return ()=> window.location.href='/html/admclass';}}))

                }

            });

        }*/



    }


    render(){

        const { LoginUser } = this.props;

        return <div id="import-wrapper">

            <ImportPhoto ImportTitle="导入任课教师" ImportTarget="Teacher"></ImportPhoto>

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