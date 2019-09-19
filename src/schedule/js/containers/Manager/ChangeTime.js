import React,{Component} from 'react';

import { Loading,DropDown } from "../../../../common";

import { connect } from 'react-redux';

import ABTActions from "../../actions/Manager/AdjustByTeacherActions";

import { DatePicker,ConfigProvider } from 'antd';

import zhCN from 'antd/es/locale/zh_CN';

import moment from 'moment';

import 'moment/locale/zh-cn';

moment.locale('zh-cn');



class ChangeTime extends Component{

    //教师选择

    teacherDropChange(info){

        const { dispatch } = this.props;

        dispatch(ABTActions.changeTimeTeacherDropChange(info));

    }

    //教师点击搜索

    teacherClickSearch(e){

        const key = e.value;

        const { dispatch } = this.props;

        dispatch(ABTActions.changeTimeTeacherClickSearch(key));

    }

    //取消搜索

    teacherSearchClose(){

        const  { dispatch } = this.props;

        dispatch(ABTActions.changeTimeTeacherSearchClose())

    }

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








    render() {

        const { teacherList,changeTime } = this.props;


        const {

            teacherDrop,

            searchList,

            searchOpen,

            searchLoadingShow,

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

            newClassRoomDisabled

        } = changeTime;




        return (

                <div className="change-time-wrapper clearfix">

                    <div className="teacher-wrapper">

                        <span className="props">老师:</span>

                        <DropDown  width={146}
                                   dropSelectd={teacherDrop}
                                   type="multiple"
                                   style={{zIndex:5}}
                                   mutipleOptions={{
                                       range:2,
                                       dropMultipleList:teacherList,
                                       dropMultipleChange:this.teacherDropChange.bind(this),
                                       dropClickSearch:this.teacherClickSearch.bind(this),
                                       dropCancelSearch:this.teacherSearchClose.bind(this),
                                       searchList:searchList,
                                       searchPlaceholder:"请输入教师名称进行搜索...",
                                       searchOpen:searchOpen,
                                       searchLoadingShow:searchLoadingShow
                                   }}>

                        </DropDown>

                    </div>

                    <div className="old-time-wrapper clearfix">

                        <span className="props">时间:</span>

                        <div className="content-wrapper">

                            <ConfigProvider locale={zhCN}>

                                <DatePicker value={originDate?moment(originDate):null} onChange={this.originTimeChange.bind(this)}></DatePicker>

                            </ConfigProvider>

                            <DropDown width={146}
                                      height={72}
                                      style={{zIndex:4}}
                                      dropSelectd={oldClassHourDrop}
                                      dropList={oldClassHourList}
                                      disabled={oldClassHourDisabled}
                                      onChange={this.oldClassHourPick.bind(this)}  >

                            </DropDown>

                            {

                                oldWeek&&oldWeek.ClassHour?

                                    <Loading type="loading" spinning={oldWeekLoading}>

                                        <div className="week-wrapper">(第{oldWeek.WeekNO}周 {oldWeek.WeekDay} { oldWeek.ClassHour })</div>

                                    </Loading>

                                    :''

                            }



                        </div>

                    </div>

                    <div className="new-time-wrapper clearfix">

                        <span className="props">时间:</span>

                        <div className="content-wrapper">

                            <ConfigProvider locale={zhCN}>

                                <DatePicker value={newDate?moment(newDate):null} onChange={this.originTimeChange.bind(this)}></DatePicker>

                            </ConfigProvider>

                            <DropDown width={146}
                                      height={72}
                                      style={{zIndex:4}}
                                      dropSelectd={newClassHourDrop}
                                      dropList={newClassHourList}
                                      disabled={newClassHourDisabled}
                                        >

                            </DropDown>

                            {

                                newWeek?

                                    <Loading type="loading" spinning={newWeekLoading}>

                                        <div className="week-wrapper">{newWeek}</div>

                                    </Loading>

                                    :''

                            }

                            <DropDown width={146}
                                      height={72}
                                      style={{zIndex:2}}
                                      dropSelectd={newClassRoomDrop}
                                      dropList={newClassRoomList}
                                      disabled={newClassRoomDisabled}>

                            </DropDown>

                        </div>

                    </div>

                </div>

        );

    }

}


const mapStateToProps = (state) => {

    const { teacherList,changeTime } = state.Manager.AdjustByTeacherModal;

    return {

        changeTime,

        teacherList

    }

};

export default connect(mapStateToProps)(ChangeTime);