import React,{ Component } from 'react';

import { Modal,Loading } from "../../../common";

class ScheduleDetailModal extends Component{

    render() {

        const { Params } = this.props;

        const  { Show,ScheduleType,WeekDay,ClassDate,StartTime,EndTime,ClassHourNO } = Params;

        //课程类型
        let ScheduleTypeTitle = '';

        let ScheduleTypeClass = '';

        switch (ScheduleType) {

            case 1:

                ScheduleTypeTitle = '已结束';

                ScheduleTypeClass = 'end';

                break;

            case 2:

                ScheduleTypeTitle = '进行中';

                ScheduleTypeClass = 'going';

                break;

            case 3:

                ScheduleTypeTitle = '未开始';

                ScheduleTypeClass = 'unstart';

                break;

            default:

                ScheduleTypeTitle = '';

                ScheduleTypeClass = '';

        }

        //上课星期

        let WeekDayTitle = '';

        switch (WeekDay) {

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

        }


        return (

            <Modal type={1}

                   title='课程安排详情'

                   visible={Show}

                   width={720}

                   bodyStyle={{height:492}}

                   mask={true}

                   footer={null}

                   className="schedule-detail-modal-wrapper"

                   //onCancel={this.alertClose.bind(this)}

            >

                <div className="modal-content-wrapper">

                    <div className="line-wrapper clearfix">

                        <div className="props">状态:</div>

                        <div className="content-wrapper">

                            <div className={`schedule-type ${ScheduleTypeClass}`}>{ScheduleTypeTitle}</div>

                            {

                                ScheduleType!==1?

                                    <button className='stop-btn'>停课</button>

                                    :''

                            }

                        </div>

                    </div>

                    <div className="line-wrapper clearfix">

                        <div className="props">上课时间:</div>

                        <div className="content-wrapper">

                            <span className="week-day">

                                <span className="week">{WeekDayTitle}</span>

                                <span className="day">({ClassDate})</span>

                            </span>

                            <span className="class-hour-time">

                                <span className="class-hour-name">{ClassHourNO}</span>

                                <span className="start-end-time">({StartTime}-{EndTime})</span>

                            </span>

                        </div>

                    </div>

                </div>

            </Modal>

        );

    }

}

export default ScheduleDetailModal;