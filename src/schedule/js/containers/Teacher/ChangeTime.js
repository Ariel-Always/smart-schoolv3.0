import React,{Component} from 'react';

import { Loading,DropDown } from "../../../../common";

import { connect } from 'react-redux';

import ABTActions from "../../actions/Teacher/AdjustByTeacherActions";

import { DatePicker,ConfigProvider } from 'antd';

import zhCN from 'antd/es/locale/zh_CN';

import moment from 'moment';

import 'moment/locale/zh-cn';

moment.locale('zh-cn');



class ChangeTime extends Component{



    //旧日期更改

    originTimeChange(date,dateString){

        const { dispatch } = this.props;

        dispatch(ABTActions.changeTimeOriginDate(dateString));

    }
    //旧课时选取
    oldClassHourPick(info){

        const { dispatch } = this.props;

        dispatch(ABTActions.changTimeOldClassHourPick(info));

    }

    //新日期选取

    newTimeChange(date,dateString){

        const { dispatch } = this.props;

        dispatch(ABTActions.changeTimeNewTimeChange(dateString));

    }

    //新的课时选取

    newClassHourPick(info){

        const { dispatch } = this.props;

        dispatch(ABTActions.changeTimeNewClassHourPick(info));

    }

    //新的教室变化

    newClassRoomChange(info){

        const { dispatch } = this.props;

        dispatch(ABTActions.changeTimeNewClassRoomPick(info));


    }








    render() {

        const { teacherList,changeTime } = this.props;


        const {

            originDate,

            oldClassHourDrop,

            oldClassHourList,

            oldClassHourDisabled,

            oldWeek,

            oldWeekLoading,

            newDate,

            newClassHourDrop,

            newClassHourList,

            newClassHourDisabled,

            newWeek,

            newWeekLoading,

            newClassRoomDrop,

            newClassRoomList,

            newClassRoomDisabled,

            errorTips,

            teacherTips,

            originDateTips,

            originScheduleTips,

            targetDateTips,

            targetScheduleTips,

            targetClassRoomTips

        } = changeTime;




        return (

                <div className="change-time-wrapper clearfix">

                    <div className="old-time-wrapper clearfix" style={{marginLeft:0,marginTop:12}}>

                        <span className="props">时间:</span>

                        <div className="content-wrapper">

                            <ConfigProvider locale={zhCN}>

                                <DatePicker value={originDate?moment(originDate):null} onChange={this.originTimeChange.bind(this)}></DatePicker>

                            </ConfigProvider>

                            <span className="error-tips" style={{display:`${originDateTips?'block':'none'}`}}>请选择日期</span>


                            <DropDown width={146}
                                      height={72}
                                      style={{zIndex:4}}
                                      dropSelectd={oldClassHourDrop}
                                      dropList={oldClassHourList}
                                      disabled={oldClassHourDisabled}
                                      onChange={this.oldClassHourPick.bind(this)}>

                            </DropDown>

                            <span className="error-tips" style={{display:`${originScheduleTips?'block':'none'}`}}>请选择节次</span>

                            <div className="week-wrapper">{oldWeek.WeekNO?`第${oldWeek.WeekNO}周`:''} {oldWeek.WeekDay} { oldWeek.ClassHour }</div>


                        </div>

                    </div>

                    <div className="new-time-wrapper clearfix" style={{marginTop:12}}>

                        <span className="props">时间:</span>

                        <div className="content-wrapper">

                            <ConfigProvider locale={zhCN}>

                                <DatePicker value={newDate?moment(newDate):null} onChange={this.newTimeChange.bind(this)}></DatePicker>

                            </ConfigProvider>

                            <span className="error-tips" style={{display:`${targetDateTips?'block':'none'}`}}>请选择时间</span>


                            <DropDown width={146}
                                      height={72}
                                      style={{zIndex:4}}
                                      dropSelectd={newClassHourDrop}
                                      dropList={newClassHourList}
                                      disabled={newClassHourDisabled}
                                      onChange={this.newClassHourPick.bind(this)}
                                        >

                            </DropDown>

                            <span className="error-tips" style={{display:`${targetScheduleTips?'block':'none'}`}}>请选择节次</span>


                            <div className="week-wrapper">{newWeek.WeekNO?`第${newWeek.WeekNO}周`:''} {newWeek.WeekDay} {newWeek.ClassHour}</div>


                            <DropDown width={146}
                                      height={72}
                                      style={{zIndex:2}}
                                      dropSelectd={newClassRoomDrop}
                                      dropList={newClassRoomList}
                                      disabled={newClassRoomDisabled}
                                      onChange={ this.newClassRoomChange.bind(this) }  >

                            </DropDown>

                            <span className="error-tips" style={{display:`${targetClassRoomTips?'block':'none'}`}}>请选择教室</span>


                            <div className="error-tips" style={{display:`${errorTips?'block':'none'}`}}>该教室已被占用</div>

                        </div>

                        <span className="props">新的教室:</span>

                    </div>

                </div>

        );

    }

}


const mapStateToProps = (state) => {

    const { teacherList,changeTime } = state.Teacher.AdjustByTeacherModal;

    return {

        changeTime,

        teacherList

    }

};

export default connect(mapStateToProps)(ChangeTime);