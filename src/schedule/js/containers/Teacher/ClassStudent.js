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



class ClassStudent extends Component{

    constructor(props) {

        super(props);

        const {dispatch} = props;

        ComPageRefresh.ComPageInit(dispatch,TeacherIndexActions.ClassStudentPageInit());

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

    SearchValueChange(e){

        const { dispatch } = this.props;

        dispatch({type:CSActions.TEACHER_CS_LEFT_MENU_SEARCH_INPUT_CHANGE,data:e.target.value});

    }


    render() {

        const { PeriodWeekTerm ,Teacher} = this.props;

        const { ClassStudent } = Teacher;

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
                        SearchValueChange={this.SearchValueChange.bind(this)}>

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

export default connect(mapStateToProps)(ClassStudent);