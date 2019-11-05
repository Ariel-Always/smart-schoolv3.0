import React,{Component} from 'react';

import { connect } from 'react-redux';

import {DropDown, Loading} from "../../../../common";


import ManagerIndexActions from "../../actions/Manager/ManagerIndexActions";

import CRTActions from '../../actions/Manager/ClassRoomTotalActions';

import TermPick from "../../component/TermPick";

import $ from "jquery";

import DoubleSingleTable from "../../component/DoubleSingleTable";

import ComPageRefresh from "../../actions/ComPageRefresh";

import {message} from "antd";


class ClassRoomTotal extends Component{

    constructor(props){

        super(props);

        const {dispatch} = this.props;

        ComPageRefresh.ComPageInit(dispatch,ManagerIndexActions.ClassRoomTotalInit());


    }


    //年级下拉改变

    RoomTypeChange(e){



        const {dispatch} = this.props;

        let data = {};

        if (e.value!=="none"){

            data = {value:e.value,title:e.title};

        }

        dispatch({type:CRTActions.MANAGER_CLASS_ROOM_TOTAL_ROOMTYPE_SELECT_CHANGE,data:data});

        $('#tb').find('div.ant-table-body').scrollTop(0);

        dispatch(CRTActions.ClassTotalPageUpdate());

    }

    //选择某一周次
    weekPickEvent(e){

        const {dispatch} = this.props;

        dispatch({type:CRTActions.MANAGER_CLASS_ROOM_TOTAL_WEEK_CHANGE,data:e.value});

        $('#tb').find('div.ant-table-body').scrollTop(0);

        dispatch(CRTActions.ClassTotalPageUpdate());

    }

    //选择下一周次
    weekNextEvent(){

        const {dispatch,ClassRoomTotal} = this.props;

        const {WeekNO} = ClassRoomTotal;

        dispatch({type:CRTActions.MANAGER_CLASS_ROOM_TOTAL_WEEK_CHANGE,data:(WeekNO+1)});

        $('#tb').find('div.ant-table-body').scrollTop(0);

        dispatch(CRTActions.ClassTotalPageUpdate());

    }

    //选择上一周次
    weekPrevEvent(){

        const {dispatch,ClassRoomTotal} = this.props;

        const {WeekNO} = ClassRoomTotal;

        dispatch({type:CRTActions.MANAGER_CLASS_ROOM_TOTAL_WEEK_CHANGE,data:(WeekNO-1)});

        $('#tb').find('div.ant-table-body').scrollTop(0);

        dispatch(CRTActions.ClassTotalPageUpdate());

    }

    //滚动到底部

    scrollToBottom(e){

        const {dispatch,ClassRoomTotal} = this.props;

        const { PageIndex,ClassRoomCount } = ClassRoomTotal;

        if (PageIndex < Math.ceil(ClassRoomCount/10)){

            dispatch(CRTActions.ClassTotalPageUpdate({nextPage:true}));

        }else if (Math.ceil(ClassRoomCount/10)>0){

            message.info('已经是最后一页了！',0.2);

            message.config({maxCount:1,top:200});

        }

    }

    //表格点击某一行
    clickRow(record){

        const { ClassRoomTotal,dispatch } = this.props;

        const { Schedule } = ClassRoomTotal;

        let rID  = record.id;

        Schedule.map((item,key)=>{

            if (item.id === rID){

                Schedule[key]['active'] = true;

            }else{

                Schedule[key]['active'] = false;

            }

        });

        dispatch({type:CRTActions.MANAGER_CLASS_ROOM_TOTAL_SCHEDULE_UPDATE,data:Schedule});

    }


    render(){

        const { PeriodWeekTerm,SubjectCourseGradeClassRoom,ClassRoomTotal } = this.props;



        return <div className="class-total-content">

            <Loading spinning={ClassRoomTotal.LoadingShow} tip="正在为您查找，请稍后...">

                <DropDown

                    dropSelectd={ClassRoomTotal.RoomTypeDropSelectd}

                    dropList={ClassRoomTotal.RoomTypeDropList}

                    style={{zIndex:5}}

                    height={108}

                    onChange={this.RoomTypeChange.bind(this)}>

                </DropDown>

                <TermPick

                    ItemTermName={PeriodWeekTerm.ItemTerm?PeriodWeekTerm.ItemTerm.TermName:''}

                    NowWeekNo={ClassRoomTotal.WeekNO}

                    ItemWeek ={ClassRoomTotal.WeekList}

                    weekPickEvent = {this.weekPickEvent.bind(this)}

                    weekNextEvent = {this.weekNextEvent.bind(this)}

                    weekPrevEvent = {this.weekPrevEvent.bind(this)}
                >

                </TermPick>

                <div className="double-single-table-wrapper">


                        <DoubleSingleTable
                        ItemClassHourCount={SubjectCourseGradeClassRoom.ItemClassHourCount}
                        ItemClassHour={SubjectCourseGradeClassRoom.ItemClassHour}
                        ItemWeek = {PeriodWeekTerm.ItemWeek}
                        NowWeekNo={PeriodWeekTerm.NowWeekNo}
                        leftColWidth={136}
                        commonColWidth={128}
                        rowOneHeight={46}
                        rowTowHeight={64}
                        commonRowHeight={90}
                        schedule={ClassRoomTotal.Schedule}
                        onClickRow={(record) => this.clickRow.bind(this,record)}
                        scrollToBottom={this.scrollToBottom.bind(this)}
                    >

                    </DoubleSingleTable>


                </div>

            </Loading>

        </div>

    }

}

const  mapStateToProps = (state) => {

    let { PeriodWeekTerm,Manager } = state;

    let { ClassRoomTotal,SubjectCourseGradeClassRoom } = Manager;

    return {

        PeriodWeekTerm,ClassRoomTotal,SubjectCourseGradeClassRoom

    }

};

export default connect(mapStateToProps)(ClassRoomTotal);