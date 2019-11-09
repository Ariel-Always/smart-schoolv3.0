import React,{ Component } from 'react';

import { Modal,Loading } from "../../../common";

import ScrollBars from 'react-custom-scrollbars';

class ScheduleDetailModal extends Component{

    render() {

        const { Params,StopSchedule,RebackStopSchedule,ChangeTimeShow } = this.props;

        const  { Show,ModalLoading,itemSchedule,itemScheduleLog=[],itemScheduleHistory=[] } = Params;


        const {

                IsOver='',ScheduleType='',NowTeacherName='',NowTeacherID='',ReplaceTeacherID='',

                NowClassHourTimeName='',SubjectName='',ScheduleID='',WeekNO=0,

                NowClassRoomName='',NowClassRoomID='',ReplaceClassRoomID='',

                ClassName='',CourseName='',CountStu=0,

                ClassDate='',NowClassDate='',ReplaceClassDate='',

                ClassHourNO='',NowClassHourNO='',ReplaceClassHourNO=''

        } = itemSchedule?itemSchedule[0]:{};



        //拆开字符串显示

        let str,WeekTime,WeekDay,ClassTime,ClassHourName,StartEndTime = '';

        //课程类型
        let ScheduleTypeTitle = '';

        let ScheduleTypeClass = '';

        switch (ScheduleType) {

            case 1:

                ScheduleTypeTitle = '已结束';

                ScheduleTypeClass = 'end';

                break;

            case 2:

                if (IsOver){

                    ScheduleTypeTitle = '已停课';

                    ScheduleTypeClass = 'end';

                }else{

                    ScheduleTypeTitle = '进行中';

                    ScheduleTypeClass = 'going';

                }

                break;

            case 3:

                if (IsOver){

                    ScheduleTypeTitle = '已停课';

                    ScheduleTypeClass = 'end';

                }else{

                    ScheduleTypeTitle = '未开始';

                    ScheduleTypeClass = 'unstart';

                }

                break;

            default:

                ScheduleTypeTitle = '';

                ScheduleTypeClass = '';

        }



        if (NowClassHourTimeName){

            str = NowClassHourTimeName.split(')');

            WeekTime = str[0].split('(');

            ClassTime = str[1].split('(');

            WeekDay = WeekTime[0];

            ClassHourName = ClassTime[0];

            StartEndTime = ClassTime[1];

        }



        //上课星期

        let WeekDayTitle = '';

      /*  switch (WeekDay) {

            case 0:

                WeekDayTitle = '星期一';

                break;

            case 1:

                WeekDayTitle = '星期二';

                break;

            case 2:

                WeekDayTitle = '星期三';

                break;

            case 3:

                WeekDayTitle = '星期四';

                break;

            case 4:

                WeekDayTitle = '星期五';

                break;

            case 5:

                WeekDayTitle = '星期六';

                break;

            case 6:

                WeekDayTitle = '星期日';

                break;

            default:

                WeekDayTitle = '';

        }*/



        return (

            <Modal type={1}

                   title='课程安排详情'

                   visible={Show}

                   width={720}

                   mask={true}

                   footer={null}

                   className="schedule-detail-modal-wrapper"

                   //onCancel={this.alertClose.bind(this)}

            >

                <div className="modal-content-wrapper">

                    <Loading spinning={ModalLoading}>

                        <div className="line-wrapper clearfix">

                            <div className="props">状态:</div>

                            <div className="content-wrapper">

                                <span className={`schedule-type ${ScheduleTypeClass}`}>{ScheduleTypeTitle}</span>

                                {

                                    ScheduleType!==1?

                                        IsOver===1?

                                            <button className='reback adjust-btn' onClick={()=>RebackStopSchedule({TeacherID:NowTeacherID,ClassDate:NowClassDate,ClassHourNO:NowClassHourNO,ScheduleID})}>恢复上课</button>

                                            :<button className='stop-btn' onClick={()=>StopSchedule({TeacherID:NowTeacherID,ClassDate:NowClassDate,ClassHourNO:NowClassHourNO,ScheduleID})}>停课</button>

                                        :''

                                }

                            </div>

                        </div>

                        <div className="line-wrapper clearfix">

                            <div className="props">上课时间:</div>

                            <div className={`content-wrapper ${ScheduleType!==1&&IsOver!==1&&ReplaceClassDate?'red':''}`}>

                                <span className="week-day">

                                    <span className="week">{WeekDay}</span>

                                    <span className={`day ${ScheduleType!==1&&IsOver!==1&&ReplaceClassDate?'red':''}`}>({NowClassDate})</span>

                                </span>

                                <span className="class-hour-time">

                                    <span className="class-hour">{ClassHourName}</span>

                                    <span className={`start-end-time ${ScheduleType!==1&&IsOver!==1&&ReplaceClassDate?'red':''}`}>({StartEndTime})</span>

                                </span>

                                {

                                    IsOver===0&&ScheduleType!==1?

                                        ReplaceClassDate?

                                            <button className="adjust-btn reback">恢复时间</button>

                                            :

                                            <button className="adjust-btn adjust-time" onClick={()=>ChangeTimeShow({StartEndTime,WeekDay,ClassHourName,ClassDate:NowClassDate,ClassHourNO:NowClassHourNO,WeekNO,})}>调整时间</button>

                                        :''

                                }

                            </div>

                        </div>

                        <div className="line-wrapper clearfix">

                            <div className="props">上课课程:</div>

                            <div className='content-wrapper'>

                                <span className="subject-name">{SubjectName}</span>

                            </div>

                        </div>

                        <div className="line-wrapper clearfix">

                            <div className="props">上课教师:</div>

                            <div className={`content-wrapper ${ScheduleType!==1&&IsOver!==1&&ReplaceTeacherID?'red':''}`}>

                                <span className="teacher-name">{NowTeacherName}</span>

                                {

                                    IsOver === 0&&ScheduleType!==1?

                                        ReplaceTeacherID?

                                            <button className="reback adjust-btn">恢复教师</button>

                                            :

                                            <button className="adjust-btn">找人代课</button>

                                        :''

                                }

                            </div>

                        </div>

                        <div className="line-wrapper clearfix">

                            <div className="props">上课地点:</div>

                            <div className={`content-wrapper ${ScheduleType!==1&&IsOver!==1&&ReplaceClassRoomID?'red':''}`}>

                                <span className="class-room-name">{NowClassRoomName}</span>

                                {

                                    IsOver===0&&ScheduleType!==1?

                                        ReplaceClassRoomID?

                                            <button className="adjust-btn reback">恢复教室</button>

                                            :

                                            <button className="adjust-btn">调整教室</button>

                                        :''

                                }

                            </div>

                        </div>

                        <div className="line-wrapper clearfix">

                            <div className="props">上课班级:</div>

                            <div className="content-wrapper">

                                <span className="class-room-name">{ClassName?ClassName:CourseName}</span>

                            </div>

                        </div>

                        <div className="line-wrapper clearfix">

                            <div className="props">上课人数:</div>

                            <div className="content-wrapper">

                                <span className="class-room-name">{CountStu}人</span>

                            </div>

                        </div>

                        {

                            itemScheduleLog.length>0?

                                <div className="schedule-log clearfix">

                                    <div className="props">调课日志:</div>

                                    <div className="log-wrapper">

                                        <ScrollBars style={{width:546,height:72}}>

                                            {

                                                itemScheduleLog.map((item,key)=>{

                                                    return <div key={key} className="log-item">{item.OperateDesc}</div>

                                                })

                                            }

                                        </ScrollBars>

                                    </div>

                                </div>

                                :''

                        }

                        {

                            itemScheduleHistory.length>0?

                                <div className="schedule-history clearfix">

                                    <div className="props">历史安排:</div>

                                    <div className="history-wrapper">

                                        <div className="line">

                                            <span className="left-props">上课课程:</span>

                                            <span className="right-name">{itemScheduleHistory[0].SubjectName}</span>

                                        </div>

                                        <div className="line">

                                            <span className="left-props">上课教师:</span>

                                            <span className="right-name">{itemScheduleHistory[0].NowTeacherName}</span>

                                        </div>

                                        <div className="line">

                                            <span className="left-props">上课地点:</span>

                                            <span className="right-name">{itemScheduleHistory[0].NowClassRoomName}</span>

                                        </div>

                                        <div className="line">

                                            <span className="left-props">上课班级:</span>

                                            <span className="right-name">{itemScheduleHistory[0].ClassName?itemScheduleHistory[0].ClassName:itemScheduleHistory[0].CourseClass}</span>

                                        </div>

                                    </div>

                                </div>

                                :''

                        }

                    </Loading>

                </div>

            </Modal>

        );

    }

}

export default ScheduleDetailModal;