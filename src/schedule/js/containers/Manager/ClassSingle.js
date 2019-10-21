import React,{Component} from 'react';

import { connect } from 'react-redux';

import ManagerIndexActions from "../../actions/Manager/ManagerIndexActions";

import CSActions from '../../actions/Manager/ClassSingleActions';

import AppAlertActions from '../../actions/AppAlertActions';

import LeftMenu from "../../component/LeftMenu";

import TermPick from "../../component/TermPick";

import {Loading} from "../../../../common";

import SingleDoubleTable from "../../component/SingleDoubleTable";


class ClassSingle extends Component{

    constructor(props) {

        super(props);

        const {dispatch} = props;

        dispatch(ManagerIndexActions.ClassSingleInit());

    }

    //选择某一周次
    weekPickEvent(e){

        const {dispatch} = this.props;

        dispatch({type:CSActions.MANAGER_CLASS_SINGLE_WEEK_CHANGE,data:e.value});

        dispatch({type:CSActions.MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_SHOW});

       dispatch(CSActions.WeekUpdate());

    }

    //选择下一周次
    weekNextEvent(){

        const {dispatch,Manager,ClassSingle} = this.props;

        const {WeekNO} = ClassSingle;

        dispatch({type:CSActions.MANAGER_CLASS_SINGLE_WEEK_CHANGE,data:(WeekNO+1)});

        dispatch({type:CSActions.MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_SHOW});

        dispatch(CSActions.WeekUpdate());

    }

    //选择上一周次
    weekPrevEvent(){

        const {dispatch,Manager,ClassSingle} = this.props;

        const {WeekNO} = ClassSingle;

        dispatch({type:CSActions.MANAGER_CLASS_SINGLE_WEEK_CHANGE,data:(WeekNO-1)});

        dispatch(CSActions.WeekUpdate());

    }
    //左侧菜单选取某一个班级
    menuPickClick(pickInfo){

        const {dispatch} = this.props;

        dispatch({type:CSActions.MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_SHOW});

        dispatch(CSActions.ClassSingleScheduleUpdate(pickInfo));

    }

    //点击搜索事件

    searchClick(e){

        const {dispatch} = this.props;

        if (e.value===''){

            dispatch(AppAlertActions.alertWarn({title:"搜索不能为空！"}));

        }else{

            dispatch(CSActions.ClassSearch(e.value));

        }

    }

    //取消搜索事件
    cancelSearch(e){

        const {dispatch} = this.props;

        dispatch({type:CSActions.MANAGER_CLASS_SINGLE_SEARCH_RESULT_HIDE});

    }


    render() {

        const { PeriodWeekTerm ,ClassSingle,Manager} = this.props;

        const {SubjectCourseGradeClassRoom} = Manager;

        //封装获取到的周次


        return (

            <div className="subject-teacher-teacher-content clearfix">

                <LeftMenu
                    title="班级列表"
                    type="class"
                    pickList={ClassSingle.ClassList}
                    pickClick={this.menuPickClick.bind(this)}
                    searchClick={this.searchClick.bind(this)}
                    cancelSearch={this.cancelSearch.bind(this)}
                    searchShow={ClassSingle.SearchWrapperShow}
                    searchResult={ClassSingle.SearchResult}
                    leftMenuSearchLoading={ClassSingle.SearchLoadingShow}>

                </LeftMenu>

                {

                    ClassSingle.PickClass===''?

                        '':

                        <div className="pick-teacher-wrapper">

                            <span className="teacher-name">{ClassSingle.PickClass}</span>

                            <span className="course-count"> (本周共<span className="count">{ClassSingle.ScheduleCount}</span>节课)</span>

                        </div>

                }

                <TermPick

                    ItemWeek={ClassSingle.WeekList}

                    ItemTermName={PeriodWeekTerm.ItemTerm?PeriodWeekTerm.ItemTerm.TermName:''}

                    NowWeekNo={ClassSingle.WeekNO}

                    weekPickEvent = {this.weekPickEvent.bind(this)}

                    weekNextEvent = {this.weekNextEvent.bind(this)}

                    weekPrevEvent = {this.weekPrevEvent.bind(this)}>

                </TermPick>

                <Loading tip="请稍后..." spinning={ClassSingle.ScheduleLoadingShow}>

                    <SingleDoubleTable
                        topHeight = {64}
                        commonHeight = {90}
                        commonWidth={106}
                        leftOneWidth ={32}
                        leftTwoWidth = {110}
                        ItemClassHourCount={SubjectCourseGradeClassRoom.ItemClassHourCount}
                        ItemClassHour={SubjectCourseGradeClassRoom.ItemClassHour}
                        ItemWeek = {PeriodWeekTerm.ItemWeek}
                        NowWeekNo={ClassSingle.WeekNO}
                        schedule={ClassSingle.Schedule}
                        NowDate={PeriodWeekTerm.NowDate}>

                    </SingleDoubleTable>

                </Loading>

            </div>

        );

    }

}

const  mapStateToProps = (state) => {

    let { LoginUser,Manager,PeriodWeekTerm } = state;

    let { ClassSingle } = Manager;

    return {

        PeriodWeekTerm,ClassSingle,Manager

    }

};

export default connect(mapStateToProps)(ClassSingle);