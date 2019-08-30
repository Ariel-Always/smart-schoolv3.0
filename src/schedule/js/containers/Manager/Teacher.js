import React,{Component} from 'react';

import AppLoadingActions from "../../actions/AppLoadingActions"

import {connect} from 'react-redux';

import TermPick from  '../../component/TermPick';

import LeftMenu from '../../component/LeftMenu';

import SingleDoubleTable from '../../component/SingleDoubleTable';

import ManagerIndexActions from "../../actions/Manager/ManagerIndexActions";

import DoubleSingleTable from "../../component/DoubleSingleTable";


class Teacher extends Component{

    constructor(props) {

        super(props);

        const {dispatch} = props;

        dispatch(ManagerIndexActions.STTPageInit());

    }

    //选择某一周次
    weekPickEvent(e){

        const {dispatch} = this.props;

        //dispatch({type:STSAction.STS_NOW_WEEK_CHANGE,data:e.value});

       // dispatch(ManagerIndexActions.STTPageUpdate());

    }

    //选择下一周次
    weekNextEvent(){

        const {dispatch,Manager} = this.props;

        const {NowWeekNo} = Manager.SubjectTeacherSchedule;

        //dispatch({type:STSAction.STS_NOW_WEEK_CHANGE,data:(NowWeekNo+1)});

        //dispatch(ManagerIndexActions.STTPageUpdate());

    }

    //选择上一周次
    weekPrevEvent(){

        const {dispatch,Manager} = this.props;

        const {NowWeekNo} = Manager.SubjectTeacherSchedule;

       /* dispatch({type:STSAction.STS_NOW_WEEK_CHANGE,data:(NowWeekNo-1)});

        dispatch(ManagerIndexActions.STTPageUpdate());*/

    }



    render() {

        const { PeriodWeekTerm ,Manager} = this.props;

        const {SubjectTeacherTeacherSchedule,SubjectCourseGradeClassRoom} = Manager;

        let ItemWeek = [];
        //封装获取到的周次
        if (PeriodWeekTerm.ItemWeek) {

            ItemWeek = PeriodWeekTerm.ItemWeek.map((item) => {

                return {value:item.WeekNO,title:item.WeekNO};

            });

        }

        return (

            <div className="subject-teacher-teacher-content clearfix">

                <TermPick

                    ItemWeek={ItemWeek}

                    ItemTermName={PeriodWeekTerm.ItemTerm?PeriodWeekTerm.ItemTerm.TermName:''}

                    NowWeekNo={SubjectTeacherTeacherSchedule.NowWeekNo}

                    weekPickEvent = {this.weekPickEvent.bind(this)}

                    weekNextEvent = {this.weekNextEvent.bind(this)}

                    weekPrevEvent = {this.weekPrevEvent.bind(this)}>

                </TermPick>

                <LeftMenu
                    title="教师列表"
                    type="person"
                    pickList={SubjectTeacherTeacherSchedule.teacherList}>

                </LeftMenu>

                <SingleDoubleTable
                    topHeight = {64}
                    commonHeight = {90}
                    commonWidth={106}
                    leftOneWidth ={32}
                    leftTwoWidth = {110}
                    ItemClassHourCount={SubjectCourseGradeClassRoom.ItemClassHourCount}
                    ItemClassHour={SubjectCourseGradeClassRoom.ItemClassHour}
                    ItemWeek = {PeriodWeekTerm.ItemWeek}
                    NowWeekNo={PeriodWeekTerm.NowWeekNo}
                    schedule={SubjectTeacherTeacherSchedule.schedule}>

                </SingleDoubleTable>

            </div>

        );

    }

}

const mapStateToProps = (state) => {

    const {PeriodWeekTerm,Manager} = state;

    return{

        PeriodWeekTerm,

        Manager

    }

};

export default connect(mapStateToProps)(Teacher);