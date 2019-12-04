import React,{Component} from 'react';

import {connect} from 'react-redux';

import TermPick from  '../../component/TermPick';

import LeftMenu from '../../component/LeftMenu';

import { Loading } from "../../../../common";

import ComPageRefresh from '../../actions/ComPageRefresh';

import SingleDoubleTable from '../../component/SingleDoubleTable';

import TeacherIndexActions from "../../actions/Teacher/TeacherIndexActions";

import CSActions from '../../actions/Teacher/ClassStudentActions';

import AppAlertActions from '../../actions/AppAlertActions';

import ScheduleDetailModal from "../../component/ScheduleDetailModal";

import ChangeTimeModal from "../../component/ChangeTimeModal";

import AdjustClassRoomModal from "../../component/AdjustClassRoomModal";

import ReplaceScheduleModal from "../../component/ReplaceScheduleModal";



class ClassStudent extends Component{

    constructor(props) {

        super(props);

        const {dispatch} = props;

        dispatch(ComPageRefresh.ComPageInit(TeacherIndexActions.ClassStudentPageInit()));

    }

    //选择某一周次
    weekPickEvent(e){

        const {dispatch} = this.props;

        dispatch({type:CSActions.TEACHER_CS_WEEK_CHANGE,data:e.value});

        dispatch({type:CSActions.TEACHER_CS_LOADING_SHOW});

        dispatch(CSActions.CSWeekUpdate());

    }

    //选择下一周次
    weekNextEvent(){

        const {dispatch,Teacher} = this.props;

        const {WeekNO} = Teacher.ClassStudent;

        dispatch({type:CSActions.TEACHER_CS_WEEK_CHANGE,data:(WeekNO+1)});

        dispatch({type:CSActions.TEACHER_CS_LOADING_SHOW});

        dispatch(CSActions.CSWeekUpdate());

    }

    //选择上一周次
    weekPrevEvent(){

        const {dispatch,Teacher} = this.props;

        const {WeekNO} = Teacher.ClassStudent;

        dispatch({type:CSActions.TEACHER_CS_WEEK_CHANGE,data:(WeekNO-1)});

        dispatch({type:CSActions.TEACHER_CS_LOADING_SHOW});

        dispatch(CSActions.CSWeekUpdate());

    }
    //左侧菜单选取某一个学生
    menuPickClick(pickInfo){

        const {dispatch} = this.props;

        dispatch({type:CSActions.TEACHER_CS_LOADING_SHOW});

        dispatch(CSActions.ClassStudentUpdate(pickInfo));

    }

    //点击搜索事件

    searchClick(e){

        const {dispatch} = this.props;

        if (e.value===''){

            dispatch(AppAlertActions.alertWarn({title:"搜索不能为空！"}));

        }else{

            dispatch(CSActions.StudentSearch(e.value));

        }

    }



    //取消搜索事件
    cancelSearch(e){

        const {dispatch} = this.props;

        dispatch(CSActions.CancelStuSearch());

    }

    //左侧菜单输入框改变

    LeftMenuSearchValueChange(e){

        const { dispatch } = this.props;

        dispatch({type:CSActions.TEACHER_CS_LEFT_MENU_SEARCH_INPUT_CHANGE,data:e.target.value});

    }

    //弹出课程详情弹窗

    ScheduleDetailShow(Params){

        const { dispatch } = this.props;

        dispatch(CSActions.ScheduleDetailShow(Params));

    }


    //停课

    StopSchedule(params){

        const { dispatch } = this.props;

        dispatch(CSActions.StopSchedule(params));

    }

    //恢复上课
    RebackStopSchedule(params){

        const { dispatch } = this.props;

        dispatch(CSActions.RebackStopSchedule(params));

    }

    //关闭弹窗

    ScheduleDetailClose(){

        const { dispatch } = this.props;

        dispatch({type:CSActions.TEACHER_CS_SCHEDULE_DETAIL_MODAL_HIDE});

    }

    //调整时间弹窗

    ChangeTimeShow(params){

        const { dispatch } = this.props;

        dispatch(CSActions.ChangeTimeShow(params));

    }

    //调整时间弹窗点击某一个课时

    SelectClassHour(params){

        const { dispatch } = this.props;

        dispatch(CSActions.SelectClassHour(params));

    }


    //调整时间弹窗切换周次

    WeekPick(WeekNO){

        const { dispatch } = this.props;

        dispatch(CSActions.WeekPick(WeekNO));

    }

    //调整时间弹窗关闭

    CloseChangeTime(){

        const { dispatch } = this.props;

        dispatch({type:CSActions.TEACHER_CS_CHANGE_TIME_MODAL_HIDE});

    }

    //点击调整时间弹窗确定
    ChangeTimeCommit(){

        const { dispatch } = this.props;

        dispatch(CSActions.ChangeTimeCommit());

    }

    //撤销调整时间
    RebackTime(params){

        const { dispatch } = this.props;

        dispatch(CSActions.RebackTime(params));

    }

    //调整教室弹窗
    AdjustClassRoomShow(params){

        const { dispatch } = this.props;

        dispatch(CSActions.AdjustClassRoomShow(params));

    }

    //调整教室弹窗切换选中教室事件

    ChangeClassRoomPick(e){

        const { dispatch } = this.props;

        dispatch({type:CSActions.TEACHER_CS_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE,data:e.target.value});

    }

    //调整教室教室类型切换

    ChangeClassRoomType(key){

        const { dispatch } = this.props;

        dispatch({type:CSActions.TEACHER_CS_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE,data:key});

    }

    //调整教室搜索值变化

    SearchValueChange(e){

        const { dispatch } = this.props;

        dispatch({type:CSActions.TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE,data:e.target.value});


    }

    //点击教室搜索

    ClassRoomSearchClick(SearchValue){

        const { dispatch } = this.props;

        dispatch(CSActions.ClassRoomSearchClick(SearchValue))

    }

    //取消搜索教室

    ClassRoomSearchCancel(){

        const { dispatch } = this.props;

        dispatch({type:CSActions.TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE});

        dispatch({type:CSActions.TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE});

        dispatch({type:CSActions.TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE,data:''});

    }


    //关闭调整教室弹窗

    CloseAdjustClassRoom(){

        const { dispatch } = this.props;

        dispatch({type:CSActions.TEACHER_CS_ADJUST_CLASSROOM_MODAL_HIDE});

    }

    //调整教室弹窗提交
    AdjustClassRoomCommit(){

        const { dispatch } = this.props;

        dispatch(CSActions.AdjustClassRoomCommit());

    }

    //撤销教室调整

    RebackClassRoom(params){

        const { dispatch } = this.props;

        dispatch(CSActions.RebackClassRoom(params));

    }

    //找人代课弹窗出现

    ChooseReplaceTeacherShow(params){

        const { dispatch } = this.props;

        dispatch(CSActions.ChooseReplaceTeacherShow(params));

    }

    //找人代课教师选择

    ReplaceTeacherPick(ID){

        const { dispatch } = this.props;

        dispatch({type:CSActions.TEACHER_CS_REPLACE_SCHEDULE_MODAL_TEACHER_PICK,data:ID});

    }

    //找人代课输入框改变

    ReplaceSearchValueChange(e){

        const { dispatch } = this.props;

        dispatch({type:CSActions.TEACHER_CS_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE,data:e.target.value});

    }

    //点击代课教师搜索

    ReplaceSearchClick(SearchValue){

        const { dispatch } = this.props;

        dispatch(CSActions.ReplaceSearchClick(SearchValue));

    }

    //取消搜索教师

    ReplaceSearchCancel(){

        const { dispatch } = this.props;

        dispatch({type:CSActions.TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE});

        dispatch({type:CSActions.TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE});

        dispatch({type:CSActions.TEACHER_CS_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE,data:''});

    }

    //关闭找人代课弹窗

    ReplaceScheduleClose(){

        const { dispatch } = this.props;

        dispatch({type:CSActions.TEACHER_CS_REPLACE_SCHEDULE_MODAL_HIDE});

    }

    //找人代课弹窗提交
    ReplaceScheduleCommit(){

        const { dispatch } = this.props;

        dispatch(CSActions.ReplaceScheduleCommit());

    }

    //找人代课撤销

    RebackReplaceSchedule(params){

        const { dispatch } = this.props;

        dispatch(CSActions.RebackReplaceSchedule(params));

    }


    render() {

        const { PeriodWeekTerm ,Teacher} = this.props;

        const { ClassStudent } = Teacher;

        const {ScheduleDetail,ChangeTime,AdjustClassRoom,ReplaceSchedule} = ClassStudent;

        let ItemWeek = [];

        //封装获取到的周次
        if (PeriodWeekTerm.ItemWeek) {

            ItemWeek = PeriodWeekTerm.ItemWeek.map((item) => {

                return {value:item.WeekNO,title:item.WeekNO};

            });

        }

        return (

            <div className="subject-teacher-teacher-content clearfix">

                <Loading tip="请稍后..." spinning={ClassStudent.ScheduleLoadingShow}>

                    <LeftMenu
                        title="学生列表"
                        type="person"
                        pickList={ClassStudent.teacherList}
                        searchTitleShow={true}
                        searchTitle={ClassStudent.searchTitle}
                        pickClick={this.menuPickClick.bind(this)}
                        searchClick={this.searchClick.bind(this)}
                        cancelSearch={this.cancelSearch.bind(this)}
                        searchShow={ClassStudent.searchWrapperShow}
                        searchResult={ClassStudent.searchResult}
                        leftMenuSearchLoading={ClassStudent.searchLoadingShow}
                        PickID={ClassStudent.PickStudentID}
                        CancelBtnShow={ClassStudent.CancelBtnShow}
                        SearchValue={ClassStudent.SearchValue}
                        SearchValueChange={this.LeftMenuSearchValueChange.bind(this)}>

                    </LeftMenu>

                    <div className="pick-teacher-wrapper">

                        {

                            ClassStudent.PickStudentID!==''?

                                <React.Fragment>

                                    <span className="teacher-name">{ClassStudent.PickStudentName}</span>

                                    <span className="course-count"> (本周共<span className="count">{ClassStudent.ScheduleCount}</span>节课)</span>

                                </React.Fragment>

                                :<div className="please-select-teacher">请选择学生</div>

                        }

                    </div>

                    <TermPick

                        ItemWeek={ItemWeek}

                        ItemTermName={PeriodWeekTerm.ItemTerm?PeriodWeekTerm.ItemTerm.TermName:''}

                        NowWeekNo={ClassStudent.WeekNO}

                        weekPickEvent = {this.weekPickEvent.bind(this)}

                        weekNextEvent = {this.weekNextEvent.bind(this)}

                        weekPrevEvent = {this.weekPrevEvent.bind(this)}>

                    </TermPick>

                    <SingleDoubleTable
                        topHeight = {64}
                        commonHeight = {90}
                        commonWidth={106}
                        leftOneWidth ={32}
                        leftTwoWidth = {110}
                        ItemClassHourCount={ClassStudent.ItemClassHourCount}
                        ItemClassHour={ClassStudent.ItemClassHour}
                        ItemWeek = {PeriodWeekTerm.ItemWeek}
                        NowWeekNo={ClassStudent.WeekNO}
                        schedule={ClassStudent.Schedule}
                        NowDate={PeriodWeekTerm.NowDate}
                        ScheduleDetailShow={this.ScheduleDetailShow.bind(this)}
                    >

                    </SingleDoubleTable>

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

                    CanOperate={false}

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

const mapStateToProps = (state) => {

    const {PeriodWeekTerm,Teacher} = state;

    return{

        PeriodWeekTerm,

        Teacher

    }

};

export default connect(mapStateToProps)(ClassStudent);