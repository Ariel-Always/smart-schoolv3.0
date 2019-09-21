import React,{Component} from 'react';

import { Loading,DropDown } from "../../../../common";

import { DatePicker,ConfigProvider } from 'antd';

import { connect } from 'react-redux';

import ABTActions from '../../actions/Manager/AdjustByTeacherActions';

import zhCN from 'antd/es/locale/zh_CN';

import moment from 'moment';

import 'moment/locale/zh-cn';

moment.locale('zh-cn');


class StopSchedule extends Component{


    //教师选取
    teacherDropChange(info){

        const { dispatch } = this.props;

        dispatch(ABTActions.changeClassRoomTeacherPick(info));

    }

    teacherClickSearch(e){

        const { dispatch } = this.props;

        const key = e.value;

        dispatch(ABTActions.changeClassRoomTeacherSearch(key));

    }

    teacherSearchClose(){

        const { dispatch } = this.props;

        dispatch(ABTActions.changeClassRoomTeacherSearchClose());

    }

    datePick(){



    }

    render() {

        const { teacherList,StopSchedule } = this.props;

        const { date,classHours,classHoursCheckedList,teacherDrop,teacherSearchList,teacherSearchOpen,teacherSearchLoadingShow } = StopSchedule;

        return (

            <div className="stop-schedule-by-teacher-wrapper">

                <div className="teacher-wrapper">

                    <span className="props">老师:</span>

                    <DropDown  width={150}
                               dropSelectd={teacherDrop}
                               type="multiple"
                               style={{zIndex:5}}
                               mutipleOptions={{
                                   range:2,
                                   dropMultipleList:teacherList,
                                   dropMultipleChange:this.teacherDropChange.bind(this),
                                   dropClickSearch:this.teacherClickSearch.bind(this),
                                   dropCancelSearch:this.teacherSearchClose.bind(this),
                                   searchList:teacherSearchList,
                                   searchPlaceholder:"请输入教师名称进行搜索...",
                                   searchOpen:teacherSearchOpen,
                                   searchLoadingShow:teacherSearchLoadingShow
                               }}>

                    </DropDown>

                </div>

                <div className="checked-date-wrapper">

                    <span className="props">停课时间:</span>

                    <ConfigProvider locale={zhCN}>

                        <DatePicker value={date?moment(date,'YYYY-MM-DD'):null} onChange={this.datePick.bind(this)}></DatePicker>


                    </ConfigProvider>

                </div>

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

                                                if (it.list.includes(i.no)){

                                                    itemChecked = true;

                                                }

                                            }

                                        });

                                        return <div key={k} className={`check-item ${itemChecked?'active':''}`} onClick={this.classHoursChecked.bind(this,{type:'item',pid:item.type,id:i.no})}>

                                            {i.name}

                                        </div>

                                    })

                                }

                            </div>

                        })

                    }
                </div>


            </div>

        );

    }

}


const mapStateToProps = (state) => {

    const { StopSchedule,teacherList } = state.Manager.AdjustByTeacherModal;

    return{

        StopSchedule,

        teacherList

    }

};

export default connect(mapStateToProps)(StopSchedule);