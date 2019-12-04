import React,{Component} from 'react';

import {Loading,Alert} from "../../../common";

import Frame from '../../../common/Frame';

import {TokenCheck_Connect} from "../../../common/js/disconnect";

import { connect } from 'react-redux';

import {HashRouter as Router} from 'react-router-dom';

import DocumentTitle from 'react-document-title';

import AdjustBtnsWrapper from '../component/Manager/AdjustBtnsWrapper';

import AddScheduleModal from './Manager/AddScheduleModal';

import AdjustByTimeModal from  './Manager/AdjustByTimeModal'

import ModuleCommonActions from '../actions/ModuleCommonActions';

import PeriodWeekTermActions from '../actions/PeriodWeekTermActions';

import ASMAction from  '../actions/Manager/AddScheduleModalActions';

import ABTMActions from '../actions/Manager/AdjustByTimeModalActions';

import ABCRActions from '../actions/Manager/AdjustByClassRoomActions';

import StopScheduleActions from '../actions/Manager/StopScheduleActions'

import DelScheduleActions from '../actions/Manager/DelScheduleActions';

import StopScheduleModal from './Manager/StopScheduleModal';

import DelScheduleModal from './Manager/DelScheduleModal';

import ABTActions from '../actions/Manager/AdjustByTeacherActions';

import RouterWrapper from './RouterWrapper';

import '../../scss/index.scss';

import RouterSetActions from "../actions/RouterSetActions";

import $ from 'jquery';

import ComPageRefresh from '../actions/ComPageRefresh';

import TeacherPowerActions from '../actions/Teacher/TeacherPowerActions';

import {QueryPower,QueryOtherPower} from '../../../common/js/power/index';





class App extends Component{

    constructor(props) {

        super(props);

        const {dispatch} = props;
        //获取公共的信息

        TokenCheck_Connect();

        const Hash = location.hash;

        if (sessionStorage.getItem('UserInfo')){

            let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

            const { UserType,UserClass } = UserInfo;

            //判断权限

            if (parseInt(UserType)===0||parseInt(UserType)===1){

                if (parseInt(UserType)===0){//判断管理员权限

                    QueryPower({UserInfo,ModuleID:'000-2-0-07'}).then(data=>{

                        if (data){

                            dispatch(ModuleCommonActions.getCommonInfo());

                            if (Hash.includes('Import')){

                                dispatch({type:RouterSetActions.ROUTER_SET_TO_IMPORT})

                            }else{

                                dispatch({type:RouterSetActions.ROUTER_SET_TO_DEFAULT})

                            }

                        }else{

                            window.location.href='/Error.aspx?errcode=E011';

                        }

                    });

                }else{

                   let GetAdjustPower =  QueryOtherPower({UserType,ModuleID:'000-2-0-07',SchoolID:UserInfo.SchoolID,Power:'Teacher_Schedule_U'});

                   let GetImportPower = QueryOtherPower({UserType,ModuleID:'000-2-0-07',SchoolID:UserInfo.SchoolID,Power:'Teacher_Schedule_C'})

                    Promise.all([GetAdjustPower,GetImportPower]).then(res=>{

                        dispatch({type:TeacherPowerActions.TEACHER_POWER_CHANGE,data:{Adjust:res[0],AddImport:res[1]}});

                        dispatch(ModuleCommonActions.getCommonInfo());

                        if (Hash.includes('Import')){

                            dispatch({type:RouterSetActions.ROUTER_SET_TO_IMPORT})

                        }else{

                            dispatch({type:RouterSetActions.ROUTER_SET_TO_DEFAULT})

                        }

                    });



                }

            }else{//无权限角色

                window.location.href='/Error.aspx?errcode=E011';

            }

        }else{


            let getUserInfo = setInterval(()=>{

                if (sessionStorage.getItem('UserInfo')){

                    let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

                   /* dispatch(ModuleCommonActions.getCommonInfo());

                    if (Hash.includes('Import')){

                        dispatch({type:RouterSetActions.ROUTER_SET_TO_IMPORT})

                    }else{

                        dispatch({type:RouterSetActions.ROUTER_SET_TO_DEFAULT})

                    }*/

                    const { UserType,UserClass } = UserInfo;

                    //判断权限

                    if (parseInt(UserType)===0||parseInt(UserType===1)){

                        if (parseInt(UserType)===0){//判断管理员权限

                            QueryPower({UserInfo,ModuleID:'000-2-0-07'}).then(data=>{

                                if (data){

                                    dispatch(ModuleCommonActions.getCommonInfo());

                                    if (Hash.includes('Import')){

                                        dispatch({type:RouterSetActions.ROUTER_SET_TO_IMPORT})

                                    }else{

                                        dispatch({type:RouterSetActions.ROUTER_SET_TO_DEFAULT})

                                    }

                                }else{

                                    window.location.href='/Error.aspx?errcode=E011';

                                }

                            });

                        }else{

                            let GetAdjustPower =  QueryOtherPower({UserType,ModuleID:'000-2-0-07',SchoolID:UserInfo.SchoolID,Power:'Teacher_Schedule_U'});

                            let GetImportPower = QueryOtherPower({UserType,ModuleID:'000-2-0-07',SchoolID:UserInfo.SchoolID,Power:'Teacher_Schedule_C'})


                            dispatch(ModuleCommonActions.getCommonInfo());

                            if (Hash.includes('Import')){

                                dispatch({type:RouterSetActions.ROUTER_SET_TO_IMPORT})

                            }else{

                                dispatch({type:RouterSetActions.ROUTER_SET_TO_DEFAULT})

                            }

                        }

                    }else{//无权限角色

                        window.location.href='/Error.aspx?errcode=E011';

                    }

                    clearInterval(getUserInfo);

                }

            },10);

        }



    }

    periodChange(key) {

        const {dispatch} = this.props;

        dispatch({type:PeriodWeekTermActions.PERIOD_VALUE_CHANGE,key:key});

        ComPageRefresh.ComPageUpdate(dispatch);

    }

    //弹出添加临时课程弹窗
    addScheduleModalShow(){

        const {dispatch} = this.props;

        dispatch({type:ASMAction.ADD_SCHEDULE_MODAL_SHOW});

        $('.add-schedule-modal-wrapper .dropdown_list_ul3').hide();

        $('.add-schedule-modal-wrapper .dropdown_item1_name').removeClass('slide');

        $('.add-schedule-modal-wrapper .dropdown_item3_li').removeClass('active');

        console.log($('.add-schedule-modal-wrapper .search_text_input').val(''));

        dispatch(ASMAction.InfoInit());

    }
    //按时间调整弹窗
    adjustByTimeModalShow(){

        const {dispatch} = this.props;

        dispatch({type:ABTMActions.ADJUST_BY_TIME_SHOW});

        dispatch(ABTMActions.InfoInit());

    }

    //停课弹窗
    stopScheduleShow(){

        const {dispatch} = this.props;

        dispatch({type:StopScheduleActions.STOP_SCHEDULE_SHOW});

        dispatch(StopScheduleActions.InfoInit());

    }

    //删除课程弹窗
    delScheduleShow(){

        const {dispatch} = this.props;

        dispatch({type:DelScheduleActions.DEL_SCHEDULE_SHOW});

        dispatch(DelScheduleActions.InfoInit());

    }

    //弹出调整教师弹窗

    adjustByTeacherShow(){

        const { dispatch } = this.props;

        dispatch({type:ABTActions.ADJUST_BY_TEACHER_SHOW});

    }

    //弹出调整教室弹窗

    adjustByClassRoomShow(){

        const { dispatch } = this.props;

        dispatch({type:ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_SHOW});

    }


    //导入课表

    Import(){

        window.open('/html/schedule#/Import');

    }

    //跳转到课表设置

    ScheduleSettingShow(){

        window.open('/html/schedule#/manager/scheduleSetting');

    }





    render() {

        const {state} = this.props;

        const { LoginUser,AppLoading,ModuleSetting,Manager,PeriodWeekTerm,AppAlert,RouterSet } = state;

        const { AdjustBtns } = Manager;

        return (

            <Router>

                <React.Fragment>

               <DocumentTitle title={ModuleSetting.moduleCnName}>

                   <React.Fragment>

                   {

                       AppLoading.show?

                           <Loading opacity={false} size="large" tip="加载中..."></Loading>

                           :''

                   }


                   <Frame
                        module={{
                            cnname:ModuleSetting.moduleCnName,
                            enname:ModuleSetting.moduleEnName,
                            image:ModuleSetting.logo
                        }}
                        userInfo={{
                            name:LoginUser.UserName,
                            image:LoginUser.PhotoPath
                        }}
                        showBarner={RouterSet.router==='/'?ModuleSetting.timeBar:false}

                        type="circle"

                    >

                        <div ref="frame-time-barner">

                            <div className="schedule-period-tab clearfix">

                                {

                                    (PeriodWeekTerm.ItemPeriod&&PeriodWeekTerm.ItemPeriod.length>1)&&PeriodWeekTerm.ItemPeriod.map((item,key) => {

                                        return <div key={key} onClick={this.periodChange.bind(this,key)} className={`schedule-period-item ${PeriodWeekTerm.defaultPeriodIndex===key?'active':''}`}>

                                                    {item.PeriodName}

                                                </div>

                                    })

                                }

                            </div>

                            {

                                parseInt(LoginUser.UserType) === 0?

                                    <AdjustBtnsWrapper

                                        adjustBtns={AdjustBtns}

                                        ScheduleSettingShow={this.ScheduleSettingShow.bind(this)}

                                        addScheduleModalShow={this.addScheduleModalShow.bind(this)}

                                        adjustByTimeModalShow = {this.adjustByTimeModalShow.bind(this)}

                                        stopScheduleShow={this.stopScheduleShow.bind(this)}

                                        delScheduleShow = {this.delScheduleShow.bind(this)}

                                        adjustByTeacherShow = {this.adjustByTeacherShow.bind(this)}

                                        adjustByClassRoomShow={this.adjustByClassRoomShow.bind(this)}

                                        Import={this.Import.bind(this)}>

                                    </AdjustBtnsWrapper>

                                    :''

                            }

                        </div>

                        <div ref="frame-right-content">

                            <RouterWrapper></RouterWrapper>

                        </div>

                    </Frame>

                   </React.Fragment>

               </DocumentTitle>

               <AddScheduleModal></AddScheduleModal>

               <AdjustByTimeModal></AdjustByTimeModal>

               <StopScheduleModal></StopScheduleModal>

               <DelScheduleModal></DelScheduleModal>


               <Alert type={AppAlert.type}
                      title={AppAlert.title}
                      abstract={AppAlert.abstract}
                      show={AppAlert.show}
                      onClose={AppAlert.close}
                      onCancel={AppAlert.cancel}
                      onOk={AppAlert.ok}
                      onHide={AppAlert.hide}
                      okTitle={AppAlert.okTitle}
                      cancelTitle={AppAlert.cancelTitle}>

               </Alert>

           </React.Fragment>

            </Router>
        );
    }
}

const mapStateToProps = (state) => {

  return{
      state
  }

};

export default connect(mapStateToProps)(App);