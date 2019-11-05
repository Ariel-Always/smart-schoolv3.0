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






    render() {

        const {Manager,PeriodWeekTerm} = this.props;

        const {SubjectCourseGradeClassRoom,SubjectTeacherSchedule} = Manager;

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
                            scrollToBottom={this.scrollToBottom.bind(this)}>

                        </DoubleSingleTable>

                    </div>

                </Loading>

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