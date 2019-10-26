import React,{Component} from 'react';

import {Input} from "antd";

import {Modal,Radio,RadioGroup} from "../../../../common";

import SSActions from '../../actions/Manager/ScheduleSettingActions';

import AppAlertActions from '../../actions/AppAlertActions';

import PeriodClassHourSetting from '../../component/Manager/PeriodClassHourSetting';

import $ from 'jquery';

import { connect } from 'react-redux';


class ScheduleSetting extends Component{

    constructor(props){

        super(props);

        const { dispatch } = props;

         if (sessionStorage.getItem('UserInfo')){

             let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

             const { SchoolID } = UserInfo;

             dispatch(SSActions.PageInit({SchoolID}));

         }else{

             const WaiteUserInfo = setInterval(()=>{

                 let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

                 const { SchoolID } = UserInfo;

                 dispatch(SSActions.PageInit({SchoolID}));

                 clearInterval(WaiteUserInfo);

             },20)

         }

    }

    componentDidMount(){

        //改变样式
        $('.frame-content-rightside').css({

            'border-radius':'12px',

            'margin-top':"0",

            "border-top":"0"

        });

    }


    //切换课表设置的方式
    SettingTypeChange(opts){

        const { dispatch } = this.props;

        dispatch(AppAlertActions.alertQuery({title:"您确定要切换设置方式吗？",abstract:<div className="schedule-setting-type-tips">切换设置方式将会把您之前所设置的课时所删除！</div>,ok:()=>this.SettingTypeSitch.bind(this,opts)}));

    }

    //切换调课方式
    SettingTypeSitch(opts){

        const { dispatch } = this.props;

        dispatch(SSActions.SettingTypeSitch(opts));

    }


    //批量调整课时

    AdjustClassHour(opts){

        const  { dispatch } = this.props;

        const { Event } = opts;

        //阻止事件冒泡
        Event.stopPropagation();

        dispatch(SSActions.AdjustClassHour(opts));

    }

    //批量调整课时关闭

    AdjustClassHourHide(){

        const  { dispatch } = this.props;

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_ADJUST_MODAL_HIDE});

    }

    //确定点击弹窗按钮

    AdjustClassHourOk(){

        const { dispatch } = this.props;

        dispatch(SSActions.AdjustClassHourOk());

    }

    //调整课时上午单选变化
    MorningRadioChange(e){

        const { dispatch } = this.props;

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_MORNING_RADIO_CHANGE,data:e.target.value});

    }
    //调整课时下午单选变化
    AfternoonRadioChange(e){

        const { dispatch } = this.props;

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_AFTERNOON_RADIO_CHANGE,data:e.target.value});

    }

    //受控组件input变化

    AdjustMorningInputChange(e){

        const { dispatch } = this.props;

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_ADJUST_MORNING_INPUT_CHANGE,data:e.target.value});

    }

    //受控组件input变化

    AdjustAfternoonInputChange(e){

        const { dispatch } = this.props;

        dispatch({type:SSActions.MANAGER_SCHEDULE_SETTING_ADJUST_AFTERNOON_INPUT_CHANGE,data:e.target.value});

    }



    //添加课时弹窗

    AddClassHour(opts){

        const  { dispatch } = this.props;

        dispatch(SSActions.AddClassHour(opts));

    }




    render(){

        const { ScheduleSetting } = this.props;

        const {

            SettingType, MultiplePeriod, SettingByPeriod, SettingByUnify, IsEnable, Times,

            LinkageEditStatus, AdjustClassHourModal,AddClassHourModal

        } = ScheduleSetting;

        const {

            MorningRadioChecked,MorningInputDisabled,MorningTime,

            AfternoonRadioChecked,AfternoonInputDisabled,AfternoonTime

        } = AdjustClassHourModal;

        return <React.Fragment>

            <div className="schedule-setting-wrapper">

            <div className="title-bar">

                <div className="title-bar-name">节次及上课时间设置</div>

            </div>

            <div className="setting-content-wrapper">

                <div className="setting-type-wrapper">

                    <span className="setting-type-title">选择设置方式:</span>

                    <div className="setting-type-switch clearfix">

                        <div className={`setting-type-tab left ${SettingType===1?'active':''}`} onClick={this.SettingTypeChange.bind(this,{type:1})}>分学段设置</div>

                        <div className={`setting-type-tab right ${SettingType===0?'active':''}`} onClick={this.SettingTypeChange.bind(this,{type:0})}>统一设置</div>

                    </div>

                </div>

                {

                    SettingType===0?

                        <PeriodClassHourSetting

                            IsUnify={true}

                            ClassHourList={SettingByUnify.ClassHourList}

                            AdjustClassHour={this.AdjustClassHour.bind(this)}

                            AddClassHour={this.AddClassHour.bind(this)}

                        >

                    </PeriodClassHourSetting>

                        :''

                }

                {

                    SettingType===1?

                        SettingByPeriod.PeriodSettingList.map((item,key)=>{



                            return <PeriodClassHourSetting key={key}

                                                           IsUnify={false}

                                                           PeriodID={item.PeriodID}

                                                           PeriodName={item.PeriodName}

                                                           ClassHourList={item.ClassHourList}

                                                           AdjustClassHour={this.AdjustClassHour.bind(this)}

                                                           AddClassHour={this.AddClassHour.bind(this)}
                            >



                            </PeriodClassHourSetting>

                        })

                        :''

                }


            </div>

            <div className="title-bar">

                <div className="title-bar-name">物联网自动联动设置</div>

            </div>

            <div className="linkage-setting-wrapper clearfix">

                <span className="title">当前状态:</span>

                <button className={`linkage-switch ${IsEnable===1?'on':''}`}>{IsEnable===1?'已开启':'已关闭'}</button>

                <span className="title">自动提前开机时间:</span>

                {

                        LinkageEditStatus?

                            <Input />

                            :

                            <span className="min-text">{Times}</span>

                }


                <span className="title">分钟</span>

                {

                    IsEnable?

                            LinkageEditStatus?

                                <React.Fragment>

                                    <button className="save">确定</button>


                                    <button className="cancel">取消</button>


                                </React.Fragment>

                                :

                                <button className="edit">编辑</button>

                        :''

                }

            </div>



        </div>

            <Modal type={1} className="adjust-class-hour-modal"

                   title="批量调整上课时间"

                   visible={AdjustClassHourModal.Show}

                   width={540}

                   bodyStyle={{height:176}}

                   mask={true}

                   maskClosable={false}

                   destroyOnClose={true}

                   onOk={this.AdjustClassHourOk.bind(this)}

                   onCancel={this.AdjustClassHourHide.bind(this)}>

                    <div className="monring-setting setting-line clearfix">

                        <span className="title">上午:</span>

                        <RadioGroup value={MorningRadioChecked} onChange={this.MorningRadioChange.bind(this)}>

                            <Radio type="gray" value="before">提前</Radio>

                            <Radio type="gray" value="after">延后</Radio>

                        </RadioGroup>

                        <Input maxLength={2} disabled={MorningInputDisabled} value={MorningInputDisabled?'':MorningTime} onChange={this.AdjustMorningInputChange.bind(this)}/>

                    </div>

                    <div className="afternoon-setting setting-line clearfix">

                        <span className="title">下午:</span>

                        <RadioGroup value={AfternoonRadioChecked} onChange={this.AfternoonRadioChange.bind(this)} >

                            <Radio type="gray" value="before">提前</Radio>

                            <Radio type="gray" value="after">延后</Radio>

                        </RadioGroup>

                        <Input maxLength={2} disabled={AfternoonInputDisabled} value={AfternoonInputDisabled?'':AfternoonTime} onChange={this.AdjustAfternoonInputChange.bind(this)}/>

                    </div>

            </Modal>

            <Modal type={1} className="add-class-hour-modal"

                   title="新增上课节次"

                   visible={AddClassHourModal.Show}

                   width={540}

                   bodyStyle={{height:176}}

                   mask={true}

                   maskClosable={false}

                   destroyOnClose={true}

                   //onOk={this.AdjustClassHourOk.bind(this)}

                   //onCancel={this.AdjustClassHourHide.bind(this)}
                >



            </Modal>

        </React.Fragment>

    }

}

const  mapStateToProps = (state) => {

    let { Manager } = state;

    let { ScheduleSetting } = Manager;

    return {

        ScheduleSetting

    }

};

export default connect(mapStateToProps)(ScheduleSetting);