import React,{Component} from 'react';

import AppLoadingActions from "../../actions/AppLoadingActions"

import {connect} from 'react-redux';

import TermPick from  '../../component/TermPick';
import SubjectTeacherTeacherSchedule from "../../reducers/Manager/SubjectTeacherTeacherSchedule";
import STSAction from "../../actions/Manager/SubjectTeacherScheduleActions";
import ManagerIndexActions from "../../actions/Manager/ManagerIndexActions";


class Teacher extends Component{
    constructor(props) {

        super(props);

        const {dispatch} = props;

        dispatch({type:AppLoadingActions.APP_LOADING_HIDE});



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

        const {SubjectTeacherTeacherSchedule} = Manager;

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