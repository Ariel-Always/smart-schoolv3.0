import React,{Component} from 'react';

import { Loading,DropDown } from "../../../../common";

import { DatePicker,ConfigProvider } from 'antd';

import { connect } from 'react-redux';

import ABTActions from '../../actions/Teacher/AdjustByTeacherActions';

import zhCN from 'antd/es/locale/zh_CN';

import moment from 'moment';

import 'moment/locale/zh-cn';

moment.locale('zh-cn');


class StopSchedule extends Component{



    datePick(date,dateString){

        const { dispatch } = this.props;

        dispatch(ABTActions.stopScheduleDateChange(dateString));

    }

    classHoursChecked(opts){

        const { dispatch } = this.props;

        dispatch(ABTActions.stopScheduleClassHoursChecked(opts));

    }

    render() {

        const { teacherList,StopSchedule } = this.props;

        const {

            date,

            classHours,

            classHoursCheckedList,

            classHourLoading,

            dateTips,

            scheduleTips,

            teacherTips

        } = StopSchedule;

        return (

            <div className="stop-schedule-by-teacher-wrapper">

                <div className="checked-date-wrapper">

                    <span className="props">停课时间:</span>

                    <ConfigProvider locale={zhCN}>

                        <DatePicker value={date?moment(date,'YYYY-MM-DD'):null} onChange={this.datePick.bind(this)}></DatePicker>


                    </ConfigProvider>

                    <span className="error-tips" style={{display:`${dateTips?'block':'none'}`}}>请选择日期</span>

                </div>

                <Loading type="loading" spinning={classHourLoading}>

                    {

                        classHours.length>0?

                            <div className="class-hour-pick-wrapper">

                                {

                                    classHours.map((item,key) => {


                                        let noonChecked = false;


                                        classHoursCheckedList.map(itm => {

                                            if (itm.type === item.type){

                                                if (itm.checked){

                                                    noonChecked = true;

                                                }

                                            }

                                        });

                                        return  <div key={key} className="class-hour-item clearfix">

                                            <div className="noon">

                                                <div className={`check-item ${noonChecked?'active':''}`} onClick={this.classHoursChecked.bind(this,{type:'noon',id:item.type})}>

                                                    {item.name}

                                                </div>

                                            </div>

                                            {

                                                item.list.map((i,k) => {

                                                    let itemChecked = false;

                                                    classHoursCheckedList.map(it => {

                                                        if (it.type === item.type){

                                                            if (it.list.includes(i.id)){

                                                                itemChecked = true;

                                                            }

                                                        }

                                                    });

                                                    return <div key={k} className={`check-item ${itemChecked?'active':''}`} onClick={this.classHoursChecked.bind(this,{type:'item',pid:item.type,id:i.id})}>

                                                        第{i.name}节

                                                    </div>

                                                })

                                            }

                                        </div>

                                    })

                                }

                            </div>

                            :''

                    }

                </Loading>

                <span className="error-tips" style={{display:`${scheduleTips?'block':'none'}`}}>请选择节次</span>

            </div>

        );

    }

}


const mapStateToProps = (state) => {

    const { StopSchedule,teacherList } = state.Teacher.AdjustByTeacherModal;

    return{

        StopSchedule,

        teacherList

    }

};

export default connect(mapStateToProps)(StopSchedule);