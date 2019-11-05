import React,{Component} from 'react';

import {connect} from 'react-redux';

import TopButtons from '../../component/Teacher/TopButtons';

import TermPick from "../../component/TermPick"

import TeacherIndexActions from '../../actions/Teacher/TeacherIndexActions';

import {Loading} from "../../../../common";

import SingleDoubleTable from "../../component/SingleDoubleTable";

import TPActions from "../../actions/Teacher/TeacherPersonalActions";

import AdjustByTeacherActions from '../../actions/Teacher/AdjustByTeacherActions';

import AdjustByTeacherModal from './AdjustByTeacherModal';

import ComPageRefresh from "../../actions/ComPageRefresh";

class TeacherPersonalSchedule extends Component{

    constructor(props) {

        super(props);

        const {dispatch} = props;

        ComPageRefresh.ComPageInit(dispatch,TeacherIndexActions.TeacherPersonalInit());

    }

    //选择某一周次
    weekPickEvent(e){

        const {dispatch} = this.props;

        dispatch({type:TPActions.TP_NOW_WEEK_CHANGE,data:e.value});

        dispatch(TPActions.TPSUpdate());

    }

    //选择下一周次
    weekNextEvent(){

        const {dispatch,Teacher} = this.props;

        const {NowWeekNo} = Teacher.PersonalSchedule;

        dispatch({type:TPActions.TP_NOW_WEEK_CHANGE,data:(NowWeekNo+1)});

        dispatch(TPActions.TPSUpdate());

    }

    //选择上一周次
    weekPrevEvent(){

        const {dispatch,Teacher} = this.props;

        const {NowWeekNo} = Teacher.PersonalSchedule;

        dispatch({type:TPActions.TP_NOW_WEEK_CHANGE,data:(NowWeekNo-1)});

        dispatch(TPActions.TPSUpdate());

    }

    AdjustScheduleShow(){

        const { dispatch } = this.props;

        dispatch({type:AdjustByTeacherActions.ADJUST_BY_TEACHER_SHOW});

    }

    //导入课表

    Import(){

        window.open('/html/schedule/#/Import');

    }


    render() {

        const { Teacher,PeriodWeekTerm } = this.props;

        const { PersonalSchedule,SubjectCourseGradeClassRoom } = Teacher;

        let ItemWeek = [];
        //封装获取到的周次
        if (PeriodWeekTerm.ItemWeek) {

            ItemWeek = PeriodWeekTerm.ItemWeek.map((item) => {

                return {value:item.WeekNO,title:item.WeekNO};

            });

        }

        return (

            <div className="teacher-mine-wrapper">

                <TopButtons AdjustScheduleShow={this.AdjustScheduleShow.bind(this)} Import={this.Import.bind(this)}></TopButtons>

                <TermPick

                    ItemTermName={PeriodWeekTerm.ItemTerm?PeriodWeekTerm.ItemTerm.TermName:''}

                    NowWeekNo={PersonalSchedule.NowWeekNo}

                    ItemWeek ={ItemWeek}

                    weekPickEvent = {this.weekPickEvent.bind(this)}

                    weekNextEvent = {this.weekNextEvent.bind(this)}

                    weekPrevEvent = {this.weekPrevEvent.bind(this)}>

                </TermPick>

                <Loading tip="请稍后..." spinning={PersonalSchedule.loadingShow}>

                    <SingleDoubleTable
                        topHeight = {64}
                        commonHeight = {90}
                        commonWidth={128}
                        leftOneWidth ={52}
                        leftTwoWidth = {136}
                        ItemClassHourCount={SubjectCourseGradeClassRoom.ItemClassHourCount}
                        ItemClassHour={SubjectCourseGradeClassRoom.ItemClassHour}
                        ItemWeek = {PeriodWeekTerm.ItemWeek}
                        NowWeekNo={PersonalSchedule.NowWeekNo}
                        schedule={PersonalSchedule.schedule}
                        NowDate = {PeriodWeekTerm.NowDate}>

                    </SingleDoubleTable>

                </Loading>

                <AdjustByTeacherModal></AdjustByTeacherModal>

            </div>

        );

    }

}

const mapStateToProps = (state) => {

    const { Teacher,PeriodWeekTerm } = state;

    return {

        Teacher,

        PeriodWeekTerm

    };

};

export default connect(mapStateToProps)(TeacherPersonalSchedule);