import React,{Component} from 'react';

import TermPick from "../../component/TermPick";

import STSAction from "../../actions/Teacher/SubjectTeacherSubjectActions";

import {connect} from 'react-redux';

import TeacherIndexActions from "../../actions/Teacher/TeacherIndexActions";

import {DropDown, Loading} from "../../../../common";

import {Scrollbars} from "react-custom-scrollbars";

import DoubleSingleTable from "../../component/DoubleSingleTable";

class Subject extends Component{

    constructor(props) {

        super(props);

        const {PeriodWeekTerm,dispatch} = this.props;

        dispatch(TeacherIndexActions.STSPageInit());

    }

    //选择某一周次
    weekPickEvent(e){

        const {dispatch} = this.props;

        dispatch({type:STSAction.STS_NOW_WEEK_CHANGE,data:e.value});

        this.refs.scrollBars.scrollTop(0);

        dispatch(STSAction.STSPageUpdate());

    }

    //选择下一周次
    weekNextEvent(){

        const {dispatch,Teacher} = this.props;

        const {NowWeekNo} = Teacher.SubjectTeacherSubjectSchedule;

        dispatch({type:STSAction.STS_NOW_WEEK_CHANGE,data:(NowWeekNo+1)});

        this.refs.scrollBars.scrollTop(0);

        dispatch(STSAction.STSPageUpdate());

    }

    //选择上一周次
    weekPrevEvent(){

        const {dispatch,Teacher} = this.props;

        const {NowWeekNo} = Teacher.SubjectTeacherSubjectSchedule;

        dispatch({type:STSAction.STS_NOW_WEEK_CHANGE,data:(NowWeekNo-1)});

        this.refs.scrollBars.scrollTop(0);

        dispatch(STSAction.STSPageUpdate());

    }

    //滚动到底部

    scrollToBottom(e){

        if (e.top===1){

            const {dispatch} = this.props;

            dispatch(STSAction.STSPageUpdate({nextPage:true}));

        }

    }


    render() {

        const { PeriodWeekTerm,Teacher } = this.props;

        const { SubjectTeacherSubjectSchedule,SubjectCourseGradeClassRoom  } = Teacher;

        let ItemWeek = [];
        //封装获取到的周次
        if (PeriodWeekTerm.ItemWeek) {

            ItemWeek = PeriodWeekTerm.ItemWeek.map((item) => {

                return {value:item.WeekNO,title:item.WeekNO};

            });

        }

        return (

            <div className="subject-teacher-subject-content">

                <DropDown

                    dropSelectd={SubjectTeacherSubjectSchedule.ItemSubjectSelect}

                    dropList={dropList}

                    style={{zIndex:5}}

                    height={108}

                    onChange={this.subjectChange.bind(this)}>

                </DropDown>

                <TermPick

                    ItemTermName={PeriodWeekTerm.ItemTerm?PeriodWeekTerm.ItemTerm.TermName:''}

                    NowWeekNo={SubjectTeacherSubjectSchedule.NowWeekNo}

                    ItemWeek ={ItemWeek}

                    weekPickEvent = {this.weekPickEvent.bind(this)}

                    weekNextEvent = {this.weekNextEvent.bind(this)}

                    weekPrevEvent = {this.weekPrevEvent.bind(this)}>

                </TermPick>

                <div className="double-single-table-wrapper">

                    <Loading spinning={SubjectTeacherSubjectSchedule.loadingShow} tip="正在为您查找，请稍后...">

                        <Scrollbars

                            ref="scrollBars"

                            style={{width:1148}}

                            autoHeight={true}

                            autoHeightMax={748}

                            renderTrackHorizontal={()=>{

                                return <div className="scrollbar-horizo​​ntal" style={{position:"absolute",bottom:0,width:"100%",left:0,height:4,borderRadius:2}}></div>

                            }}

                            onScrollFrame={this.scrollToBottom.bind(this)}>



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
                                schedule={SubjectTeacherSubjectSchedule.schedule}>

                            </DoubleSingleTable>

                        </Scrollbars>

                    </Loading>

                </div>

            </div>

        );

    }

}

const mapStateToProps = (state) => {

  const { PeriodWeekTerm,Teacher } = state;

  return{

      PeriodWeekTerm,

      Teacher

  }

};

export default connect(mapStateToProps)(Subject);