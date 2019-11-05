import React,{Component} from 'react';

import {connect} from 'react-redux';

import TermPick from  '../../component/TermPick';

import LeftMenu from '../../component/LeftMenu';

import { Loading } from "../../../../common";

import SingleDoubleTable from '../../component/SingleDoubleTable';

import TeacherIndexActions from "../../actions/Teacher/TeacherIndexActions";

import STTActions from '../../actions/Teacher/SubjectTeacherTeacherActions';

import ComPageRefresh from "../../actions/ComPageRefresh";


class Teacher extends Component{

    constructor(props) {

        super(props);

        const {dispatch} = props;

        ComPageRefresh.ComPageInit(dispatch,TeacherIndexActions.STTPageInit());

    }

    //选择某一周次
    weekPickEvent(e){

        const {dispatch} = this.props;

        dispatch({type:STTActions.STT_NOW_WEEK_CHANGE,data:e.value});

        dispatch({type:STTActions.SCHEDULE_LOADING_SHOW});

        dispatch(STTActions.STTWeekUpdate());

    }

    //选择下一周次
    weekNextEvent(){

        const {dispatch,Teacher} = this.props;

        const {NowWeekNo} = Teacher.SubjectTeacherTeacherSchedule;

        dispatch({type:STTActions.STT_NOW_WEEK_CHANGE,data:(NowWeekNo+1)});

        dispatch({type:STTActions.SCHEDULE_LOADING_SHOW});

        dispatch(STTActions.STTWeekUpdate());

    }

    //选择上一周次
    weekPrevEvent(){

        const {dispatch,Teacher} = this.props;

        const {NowWeekNo} = Teacher.SubjectTeacherTeacherSchedule;

        dispatch({type:STTActions.STT_NOW_WEEK_CHANGE,data:(NowWeekNo-1)});

        dispatch({type:STTActions.SCHEDULE_LOADING_SHOW});

        dispatch(STTActions.STTWeekUpdate());

    }
    //左侧菜单选取某一个教师
    menuPickClick(pickInfo){

        const {dispatch} = this.props;

        dispatch({type:STTActions.SCHEDULE_LOADING_SHOW});

        dispatch(STTActions.STTTeacherUpdate(pickInfo));

    }

    //点击搜索事件

    searchClick(e){

        const {dispatch} = this.props;

        dispatch(STTActions.STTTeacherSearch(e.value));

    }

    //取消搜索事件
    cancelSearch(e){

        const {dispatch} = this.props;

        dispatch(STTActions.cancelSearch());

        dispatch({type:STTActions.TEACHER_STT_LEFT_MENU_SEARCH_INPUT_CHANGE,data:''});

        dispatch({type:STTActions.TEACHER_STT_LEFT_MENU_CANCEL_BTN_HIDE});


    }

    //左侧菜单输入框改变

    SearchValueChange(e){

        const { dispatch } = this.props;

        dispatch({type:STTActions.TEACHER_STT_LEFT_MENU_SEARCH_INPUT_CHANGE,data:e.target.value});

    }


    render() {

        const { PeriodWeekTerm ,Teacher} = this.props;

        const {SubjectTeacherTeacherSchedule,SubjectCourseGradeClassRoom} = Teacher;

        let ItemWeek = [];
        //封装获取到的周次
        if (PeriodWeekTerm.ItemWeek) {

            ItemWeek = PeriodWeekTerm.ItemWeek.map((item) => {

                return {value:item.WeekNO,title:item.WeekNO};

            });

        }

        return (

            <div className="subject-teacher-teacher-content clearfix">

                <Loading tip="请稍后..." spinning={SubjectTeacherTeacherSchedule.ScheduleLoadingShow}>

                    <LeftMenu
                        title="教师列表"
                        type="person"
                        pickList={SubjectTeacherTeacherSchedule.teacherList}
                        pickClick={this.menuPickClick.bind(this)}
                        searchClick={this.searchClick.bind(this)}
                        cancelSearch={this.cancelSearch.bind(this)}
                        searchShow={SubjectTeacherTeacherSchedule.searchWrapperShow}
                        searchResult={SubjectTeacherTeacherSchedule.searchResult}
                        leftMenuSearchLoading={SubjectTeacherTeacherSchedule.searchLoadingShow}
                        searchTitleShow={SubjectTeacherTeacherSchedule.searchTitleShow}
                        searchTitle={SubjectTeacherTeacherSchedule.searchTitle}
                        PickID={SubjectTeacherTeacherSchedule.pickTeacherID}
                        CancelBtnShow={SubjectTeacherTeacherSchedule.CancelBtnShow}
                        SearchValue={SubjectTeacherTeacherSchedule.SearchValue}
                        SearchValueChange={this.SearchValueChange.bind(this)}>>

                    </LeftMenu>

                    {

                        SubjectTeacherTeacherSchedule.pickTeacher===''?

                            '':

                            <div className="pick-teacher-wrapper">

                                <span className="teacher-name">{SubjectTeacherTeacherSchedule.pickTeacher}</span>

                                <span className="course-count"> (本周共<span className="count">{SubjectTeacherTeacherSchedule.ScheduleCount}</span>节课)</span>

                            </div>

                    }

                    <TermPick

                        ItemWeek={ItemWeek}

                        ItemTermName={PeriodWeekTerm.ItemTerm?PeriodWeekTerm.ItemTerm.TermName:''}

                        NowWeekNo={SubjectTeacherTeacherSchedule.NowWeekNo}

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
                            ItemClassHourCount={SubjectCourseGradeClassRoom.ItemClassHourCount}
                            ItemClassHour={SubjectCourseGradeClassRoom.ItemClassHour}
                            ItemWeek = {PeriodWeekTerm.ItemWeek}
                            NowWeekNo={SubjectTeacherTeacherSchedule.NowWeekNo}
                            schedule={SubjectTeacherTeacherSchedule.schedule}
                            NowDate={PeriodWeekTerm.NowDate}>

                        </SingleDoubleTable>

                </Loading>

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

export default connect(mapStateToProps)(Teacher);