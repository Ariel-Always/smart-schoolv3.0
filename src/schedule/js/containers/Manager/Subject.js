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



    render() {

        const {Manager,PeriodWeekTerm} = this.props;

        const {SubjectCourseGradeClassRoom,SubjectTeacherSchedule} = Manager;

        const { ScheduleDetail,ChangeTime } = SubjectTeacherSchedule;



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