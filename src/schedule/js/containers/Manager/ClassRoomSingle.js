import React,{Component} from 'react';

import { connect } from 'react-redux';

import ManagerIndexActions from "../../actions/Manager/ManagerIndexActions";

import CRSActions from '../../actions/Manager/ClassRoomSingleActions';

import AppAlertActions from '../../actions/AppAlertActions';

import LeftMenu from "../../component/LeftMenu";

import TermPick from "../../component/TermPick";

import {Loading} from "../../../../common";

import SingleDoubleTable from "../../component/SingleDoubleTable";

import ComPageInit from "../../actions/ComPageInit";


class ClassRoomSingle extends Component{

    constructor(props) {

        super(props);

        const {dispatch} = props;

        ComPageInit(dispatch,ManagerIndexActions.ClassRoomSingleInit());

    }

    //选择某一周次
    weekPickEvent(e){

        const {dispatch} = this.props;

        dispatch({type:CRSActions.MANAGER_CLASS_ROOM_SINGLE_WEEK_CHANGE,data:e.value});

        dispatch({type:CRSActions.MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_LOADING_SHOW});

       dispatch(CRSActions.WeekUpdate());

    }

    //选择下一周次
    weekNextEvent(){

        const {dispatch,Manager,ClassRoomSingle} = this.props;

        const {WeekNO} = ClassRoomSingle;

        dispatch({type:CRSActions.MANAGER_CLASS_ROOM_SINGLE_WEEK_CHANGE,data:(WeekNO+1)});

        dispatch({type:CRSActions.MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_LOADING_SHOW});

        dispatch(CRSActions.WeekUpdate());

    }

    //选择上一周次
    weekPrevEvent(){

        const {dispatch,Manager,ClassRoomSingle} = this.props;

        const {WeekNO} = ClassRoomSingle;

        dispatch({type:CRSActions.MANAGER_CLASS_ROOM_SINGLE_WEEK_CHANGE,data:(WeekNO-1)});

        dispatch(CRSActions.WeekUpdate());

    }
    //左侧菜单选取某一个班级
    menuPickClick(pickInfo){

        const {dispatch} = this.props;

        dispatch({type:CRSActions.MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_LOADING_SHOW});

        dispatch(CRSActions.ClassRoomSingleScheduleUpdate(pickInfo));

    }

    //点击搜索事件

    searchClick(e){

        const {dispatch} = this.props;

        if (e.value===''){

            dispatch(AppAlertActions.alertWarn({title:"搜索不能为空！"}));

        }else{

            dispatch(CRSActions.ClassSearch(e.value));

        }

    }

    //取消搜索事件
    cancelSearch(e){

        const {dispatch} = this.props;

        dispatch({type:CRSActions.MANAGER_CLASS_ROOM_SINGLE_SEARCH_RESULT_HIDE});

    }


    render() {

        const { PeriodWeekTerm ,ClassRoomSingle,Manager} = this.props;

        const {SubjectCourseGradeClassRoom} = Manager;

        //封装获取到的周次


        return (

            <div className="subject-teacher-teacher-content clearfix">

                <LeftMenu
                    title="班级列表"
                    type="classroom"
                    pickList={ClassRoomSingle.ClassRoomList}
                    pickClick={this.menuPickClick.bind(this)}
                    searchClick={this.searchClick.bind(this)}
                    cancelSearch={this.cancelSearch.bind(this)}
                    searchShow={ClassRoomSingle.SearchWrapperShow}
                    searchResult={ClassRoomSingle.SearchResult}
                    leftMenuSearchLoading={ClassRoomSingle.SearchLoadingShow}>

                </LeftMenu>

                {

                    ClassRoomSingle.PickClassRoom===''?

                        '':

                        <div className="pick-teacher-wrapper">

                            <span className="teacher-name">{ClassRoomSingle.PickClassRoom}</span>

                            <span className="course-count"> (本周共<span className="count">{ClassRoomSingle.ScheduleCount}</span>节课)</span>

                        </div>

                }

                <TermPick

                    ItemWeek={ClassRoomSingle.WeekList}

                    ItemTermName={PeriodWeekTerm.ItemTerm?PeriodWeekTerm.ItemTerm.TermName:''}

                    NowWeekNo={ClassRoomSingle.WeekNO}

                    weekPickEvent = {this.weekPickEvent.bind(this)}

                    weekNextEvent = {this.weekNextEvent.bind(this)}

                    weekPrevEvent = {this.weekPrevEvent.bind(this)}>

                </TermPick>

                <Loading tip="请稍后..." spinning={ClassRoomSingle.ScheduleLoadingShow}>

                    <SingleDoubleTable
                        topHeight = {64}
                        commonHeight = {90}
                        commonWidth={106}
                        leftOneWidth ={32}
                        leftTwoWidth = {110}
                        ItemClassHourCount={SubjectCourseGradeClassRoom.ItemClassHourCount}
                        ItemClassHour={SubjectCourseGradeClassRoom.ItemClassHour}
                        ItemWeek = {PeriodWeekTerm.ItemWeek}
                        NowWeekNo={ClassRoomSingle.WeekNO}
                        schedule={ClassRoomSingle.Schedule}
                        NowDate={PeriodWeekTerm.NowDate}>

                    </SingleDoubleTable>

                </Loading>

            </div>

        );

    }

}

const  mapStateToProps = (state) => {

    let { LoginUser,Manager,PeriodWeekTerm } = state;

    let { ClassRoomSingle } = Manager;

    return {

        PeriodWeekTerm,ClassRoomSingle,Manager

    }

};

export default connect(mapStateToProps)(ClassRoomSingle);