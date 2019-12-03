import React,{Component} from 'react';

import {DropDown,Loading} from "../../../../common";

import { message } from 'antd';

import STSAction from '../../actions/Manager/SubjectTeacherScheduleActions';

import ManagerIndexActions from '../../actions/Manager/ManagerIndexActions';

import ComPageRefresh from '../../actions/ComPageRefresh';

import TermPick from '../../component/TermPick';

import DoubleSingleTable from '../../component/DoubleSingleTable';

import $ from 'jquery';

import {connect} from 'react-redux';

import ScheduleDetailModal from "../../component/ScheduleDetailModal";

import ChangeTimeModal from '../../component/ChangeTimeModal';

import AdjustClassRoomModal from "../../component/AdjustClassRoomModal";

import ReplaceScheduleModal from '../../component/ReplaceScheduleModal';


class Subject extends Component{

    constructor(props) {

        super(props);

        const {PeriodWeekTerm,dispatch} = this.props;

        ComPageRefresh.ComPageInit(dispatch,ManagerIndexActions.STSPageInit());

    }
    //选择不同的学科
    subjectChange(e){

        const {dispatch} = this.props;

        let data = {};

        if (e.value!==0){

            data = {value:e.value,title:e.title};

        }

        dispatch({type:STSAction.STS_SUBJECT_CHANGE,data:data});

        $('#tb').find('div.ant-table-body').scrollTop(0);

        dispatch(STSAction.STSPageUpdate());

    }

    //选择某一周次
    weekPickEvent(e){

        const {dispatch} = this.props;

        dispatch({type:STSAction.STS_NOW_WEEK_CHANGE,data:e.value});

        $('#tb').find('div.ant-table-body').scrollTop(0);

        dispatch(STSAction.STSPageUpdate());

    }

    //选择下一周次
    weekNextEvent(){

        const {dispatch,Manager} = this.props;

        const {NowWeekNo} = Manager.SubjectTeacherSchedule;

        dispatch({type:STSAction.STS_NOW_WEEK_CHANGE,data:(NowWeekNo+1)});

        $('#tb').find('div.ant-table-body').scrollTop(0);

        dispatch(STSAction.STSPageUpdate());

    }

    //选择上一周次
    weekPrevEvent(){

        const {dispatch,Manager} = this.props;

        const {NowWeekNo} = Manager.SubjectTeacherSchedule;

        dispatch({type:STSAction.STS_NOW_WEEK_CHANGE,data:(NowWeekNo-1)});

        $('#tb').find('div.ant-table-body').scrollTop(0);

        dispatch(STSAction.STSPageUpdate());

    }
    //滚动到底部

    scrollToBottom(e){

        const {dispatch,Manager} = this.props;

        const { pageIndex,TeacherCount } = Manager.SubjectTeacherSchedule;

        console.log(123);

        if (pageIndex < Math.ceil(TeacherCount/10) ){

            dispatch(STSAction.STSPageUpdate({nextPage:true}));

        }else if (Math.ceil(TeacherCount/10)>0){

            message.info('已经是最后一页了！',0.2);

            message.config({maxCount:1,top:200});

        }

    }

    //表格点击某一行
    clickRow(record){

        const { Manager,dispatch } = this.props;

        const { schedule } = Manager.SubjectTeacherSchedule;

        let rID  = record.id;

        schedule.map((item,key)=>{

            if (item.id === rID){

                schedule[key]['active'] = true;

            }else{

                schedule[key]['active'] = false;

            }

        });

        dispatch({type:STSAction.SUBJECT_TEACHER_SCHEDULE_UPDATE,data:schedule});

    }

    //弹出课程详情弹窗

    ScheduleDetailShow(Params){

        const { dispatch } = this.props;

        dispatch(STSAction.ScheduleDetailShow(Params));

    }


    //停课

    StopSchedule(params){

        const { dispatch } = this.props;

        dispatch(STSAction.StopSchedule(params));

    }

    //恢复上课
    RebackStopSchedule(params){

        const { dispatch } = this.props;

        dispatch(STSAction.RebackStopSchedule(params));

    }

    //关闭弹窗

    ScheduleDetailClose(){

        const { dispatch } = this.props;

        dispatch({type:STSAction.MANAGER_STS_SCHEDULE_DETAIL_MODAL_HIDE});

    }

    //调整时间弹窗

    ChangeTimeShow(params){

        const { dispatch } = this.props;

        dispatch(STSAction.ChangeTimeShow(params));

    }

    //调整时间弹窗点击某一个课时

    SelectClassHour(params){

        const { dispatch } = this.props;

        dispatch(STSAction.SelectClassHour(params));

    }


    //调整时间弹窗切换周次

    WeekPick(WeekNO){

        const { dispatch } = this.props;

        dispatch(STSAction.WeekPick(WeekNO));

    }

    //调整时间弹窗关闭

    CloseChangeTime(){

        const { dispatch } = this.props;

        dispatch({type:STSAction.MANAGER_STS_CHANGE_TIME_MODAL_HIDE});

    }

    //点击调整时间弹窗确定
    ChangeTimeCommit(){

        const { dispatch } = this.props;

        dispatch(STSAction.ChangeTimeCommit());

    }

    //撤销调整时间
    RebackTime(params){

        const { dispatch } = this.props;

        dispatch(STSAction.RebackTime(params));

    }

    //调整教室弹窗
    AdjustClassRoomShow(params){

        const { dispatch } = this.props;

        dispatch(STSAction.AdjustClassRoomShow(params));

    }

    //调整教室弹窗切换选中教室事件

    ChangeClassRoomPick(e){

        const { dispatch } = this.props;

        dispatch({type:STSAction.MANAGER_STS_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE,data:e.target.value});

    }

    //调整教室教室类型切换

    ChangeClassRoomType(key){

        const { dispatch } = this.props;

        dispatch({type:STSAction.MANAGER_STS_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE,data:key});

    }

    //调整教室搜索值变化

    SearchValueChange(e){

        const { dispatch } = this.props;

        dispatch({type:STSAction.MANAGER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE,data:e.target.value});


    }

    //点击教室搜索

    ClassRoomSearchClick(SearchValue){

        const { dispatch } = this.props;

        dispatch(STSAction.ClassRoomSearchClick(SearchValue))

    }

    //取消搜索教室

    ClassRoomSearchCancel(){

        const { dispatch } = this.props;

        dispatch({type:STSAction.MANAGER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE});

        dispatch({type:STSAction.MANAGER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE});

        dispatch({type:STSAction.MANAGER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE,data:''});

    }


    //关闭调整教室弹窗

    CloseAdjustClassRoom(){

        const { dispatch } = this.props;

        dispatch({type:STSAction.MANAGER_STS_ADJUST_CLASSROOM_MODAL_HIDE});

    }

    //调整教室弹窗提交
    AdjustClassRoomCommit(){

        const { dispatch } = this.props;

        dispatch(STSAction.AdjustClassRoomCommit());

    }

    //撤销教室调整

    RebackClassRoom(params){

        const { dispatch } = this.props;

        dispatch(STSAction.RebackClassRoom(params));

    }

    //找人代课弹窗出现

    ChooseReplaceTeacherShow(params){

        const { dispatch } = this.props;

        dispatch(STSAction.ChooseReplaceTeacherShow(params));

    }

    //找人代课教师选择

    ReplaceTeacherPick(ID){

        const { dispatch } = this.props;

        dispatch({type:STSAction.MANAGER_STS_REPLACE_SCHEDULE_MODAL_TEACHER_PICK,data:ID});

    }

    //找人代课输入框改变

    ReplaceSearchValueChange(e){

        const { dispatch } = this.props;

        dispatch({type:STSAction.MANAGER_STS_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE,data:e.target.value});

    }

    //点击代课教师搜索

    ReplaceSearchClick(SearchValue){

        const { dispatch } = this.props;

        dispatch(STSAction.ReplaceSearchClick(SearchValue));

    }

    //取消搜索教师

    ReplaceSearchCancel(){

        const { dispatch } = this.props;

        dispatch({type:STSAction.MANAGER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE});

        dispatch({type:STSAction.MANAGER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE});

        dispatch({type:STSAction.MANAGER_STS_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE,data:''});

    }

    //关闭找人代课弹窗

    ReplaceScheduleClose(){

        const { dispatch } = this.props;

        dispatch({type:STSAction.MANAGER_STS_REPLACE_SCHEDULE_MODAL_HIDE});

    }

    //找人代课弹窗提交
    ReplaceScheduleCommit(){

        const { dispatch } = this.props;

        dispatch(STSAction.ReplaceScheduleCommit());

    }

    //找人代课撤销

    RebackReplaceSchedule(params){

        const { dispatch } = this.props;

        dispatch(STSAction.RebackReplaceSchedule(params));

    }



    render() {

        const {Manager,PeriodWeekTerm} = this.props;

        const {SubjectCourseGradeClassRoom,SubjectTeacherSchedule} = Manager;

        const { ScheduleDetail,ChangeTime,AdjustClassRoom,ReplaceSchedule } = SubjectTeacherSchedule;



        let dropList = [];
        //封装获取到的学科列表
        if (SubjectCourseGradeClassRoom.ItemSubject&&SubjectCourseGradeClassRoom.ItemSubject.length>0){

            dropList = SubjectCourseGradeClassRoom.ItemSubject.map((item) => {

               return {

                            value:item.SubjectID,

                            title:item.SubjectName

                       }

            });

        }

        dropList.unshift({value:'',title:"全部学科"});


        let ItemWeek = [];
        //封装获取到的周次
        if (PeriodWeekTerm.ItemWeek) {

            ItemWeek = PeriodWeekTerm.ItemWeek.map((item) => {

               return {value:item.WeekNO,title:item.WeekNO};

            });

        }

        return (

            <div className="subject-teacher-subject-content">

                <Loading spinning={SubjectTeacherSchedule.loadingShow} tip="正在为您查找，请稍后...">


                    <DropDown

                        dropSelectd={SubjectTeacherSchedule.ItemSubjectSelect}

                        dropList={dropList}

                        style={{zIndex:5}}

                        height={108}

                        onChange={this.subjectChange.bind(this)}>

                    </DropDown>

                    <TermPick

                        ItemTermName={PeriodWeekTerm.ItemTerm?PeriodWeekTerm.ItemTerm.TermName:''}

                        NowWeekNo={SubjectTeacherSchedule.NowWeekNo}

                        ItemWeek ={ItemWeek}

                        weekPickEvent = {this.weekPickEvent.bind(this)}

                        weekNextEvent = {this.weekNextEvent.bind(this)}

                        weekPrevEvent = {this.weekPrevEvent.bind(this)}>

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
                            schedule={SubjectTeacherSchedule.schedule}
                            scheduleCount={SubjectTeacherSchedule.TeacherCount}
                            schedulePageIndex={SubjectTeacherSchedule.pageIndex}
                            schedulePageSize={10}
                            onClickRow={(record) => this.clickRow.bind(this,record)}
                            scrollToBottom={this.scrollToBottom.bind(this)}
                            ScheduleDetailShow={this.ScheduleDetailShow.bind(this)}>

                        </DoubleSingleTable>

                    </div>

                </Loading>

                <ScheduleDetailModal

                    Params={ScheduleDetail}

                    StopSchedule={this.StopSchedule.bind(this)}

                    RebackStopSchedule={this.RebackStopSchedule.bind(this)}

                    ChangeTimeShow={this.ChangeTimeShow.bind(this)}

                    ScheduleDetailClose={this.ScheduleDetailClose.bind(this)}

                    RebackTime={this.RebackTime.bind(this)}

                    AdjustClassRoomShow={this.AdjustClassRoomShow.bind(this)}

                    RebackClassRoom={this.RebackClassRoom.bind(this)}

                    ChooseReplaceTeacherShow={this.ChooseReplaceTeacherShow.bind(this)}

                    RebackReplaceSchedule={this.RebackReplaceSchedule.bind(this)}

                >

                </ScheduleDetailModal>

                <ChangeTimeModal

                    Params={ChangeTime}

                    SelectClassHour={this.SelectClassHour.bind(this)}

                    WeekPick={this.WeekPick.bind(this)}

                    CloseChangeTime={this.CloseChangeTime.bind(this)}

                    ChangeTimeCommit={this.ChangeTimeCommit.bind(this)}

                >

                </ChangeTimeModal>

                <AdjustClassRoomModal

                    Params={AdjustClassRoom}

                    ChangeClassRoomPick={this.ChangeClassRoomPick.bind(this)}

                    ChangeClassRoomType={this.ChangeClassRoomType.bind(this)}

                    SearchValueChange={this.SearchValueChange.bind(this)}

                    ClassRoomSearchClick={this.ClassRoomSearchClick.bind(this)}

                    ClassRoomSearchCancel={this.ClassRoomSearchCancel.bind(this)}

                    CloseAdjustClassRoom={this.CloseAdjustClassRoom.bind(this)}

                    AdjustClassRoomCommit={this.AdjustClassRoomCommit.bind(this)}

                >

                </AdjustClassRoomModal>

                <ReplaceScheduleModal

                    Params={ReplaceSchedule}

                    ReplaceTeacherPick={this.ReplaceTeacherPick.bind(this)}

                    SearchValueChange={this.ReplaceSearchValueChange.bind(this)}

                    ReplaceSearchClick={this.ReplaceSearchClick.bind(this)}

                    ReplaceSearchCancel={this.ReplaceSearchCancel.bind(this)}

                    ReplaceScheduleClose={this.ReplaceScheduleClose.bind(this)}

                    ReplaceScheduleCommit={this.ReplaceScheduleCommit.bind(this)}

                >



                </ReplaceScheduleModal>

            </div>

        );

    }

}

const mapStateToProps = (state) =>{

    const { Manager,PeriodWeekTerm } = state;

    return{

        Manager,

        PeriodWeekTerm

    }

};

export default connect(mapStateToProps)(Subject);