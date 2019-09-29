import React,{Component} from 'react';

import { Loading,DropDown } from "../../../../common";

import { connect } from 'react-redux';

import ABTActions from "../../actions/Teacher/AdjustByTeacherActions";

import { DatePicker,ConfigProvider } from 'antd';

import zhCN from 'antd/es/locale/zh_CN';

import moment from 'moment';

import 'moment/locale/zh-cn';

moment.locale('zh-cn');


class ChangeClassRoom extends Component{


    //日期选择
    dateChange(date,dateString){

        const { dispatch } = this.props;

        dispatch(ABTActions.changeClassRoomDatePick(dateString));

    }


    //课时选取
    classHourPick(info){

        const { dispatch } = this.props;

        dispatch(ABTActions.changeClassRoomClassHourPick(info));

    }

    //点击教室

    classRoomPick(info){

        const { dispatch } = this.props;

        dispatch(ABTActions.changeClassRoomClassRoomPick(info));

    }





    render() {

        const { teacherList } = this.props;

        const {

            loadingShow,

            date,

            teacherClassRoom,

            classHourDrop,

            classHourList,

            classHourDisabled,

            WeekNO,

            WeekDay,

            ClassHour,

            classRoomList,

            classRoomDrop,

            classRoomDisabled,

            teacherTips,

            dateTips,

            scheduleTips,

            targetClassRoomTips

        } = this.props.ChangeClassRoom;

        return (

            <Loading type="loading" spinning={false}>

                <div className="change-class-room-wrapper">

                <div className="time-wrapper">

                    <span className="props">时间:</span>

                    <ConfigProvider locale={zhCN}>

                        <DatePicker value={date?moment(date):null} onChange={this.dateChange.bind(this)}></DatePicker>

                    </ConfigProvider>

                    <span className="error-tips" style={{display:`${dateTips?'block':'none'}`}}>请选择日期</span>


                    <DropDown width={150}
                              height={72}
                              style={{zIndex:4}}
                              dropSelectd={classHourDrop}
                              dropList={classHourList}
                              disabled={classHourDisabled}
                              onChange={this.classHourPick.bind(this)}
                    >

                    </DropDown>

                    <span className="error-tips" style={{display:`${scheduleTips?'block':'none'}`}}>请选择课时</span>


                    <span className="week-wrapper">{WeekNO?`第${WeekNO}周`:''} {WeekDay} { ClassHour }</span>

                </div>

                <div className="class-room-wrapper">

                    <span className="props">教室:</span>

                    <span className={`classroom ${classHourDrop.value!=='none'?'pick':''}`}>{teacherClassRoom.name}</span>


                    <span className="props">新的教室:</span>

                    <DropDown width={150}
                              height={72}
                              style={{zIndex:2}}
                              dropSelectd={classRoomDrop}
                              dropList={classRoomList}
                              disabled={classRoomDisabled}
                              onChange={this.classRoomPick.bind(this)}>

                    </DropDown>

                    <span className="error-tips" style={{display:`${targetClassRoomTips?'block':'none'}`}}>请选择教室</span>

                </div>

            </div>

            </Loading>

        );

    }

}

const mapStateToProps = (state) => {

    const { ChangeClassRoom,teacherList } = state.Teacher.AdjustByTeacherModal;

    return {

        ChangeClassRoom,

        teacherList

    }

};

export default connect(mapStateToProps)(ChangeClassRoom);