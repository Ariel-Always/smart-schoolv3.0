import React,{Component} from 'react';

import { connect } from 'react-redux';

import {DropDown, Loading} from "../../../../common";

import ManagerIndexActions from "../../actions/Manager/ManagerIndexActions";

import CTActions from '../../actions/Manager/ClassTotalActions';

import ComPageRefresh from '../../actions/ComPageRefresh';

import TermPick from "../../component/TermPick";

import $ from "jquery";

import DoubleSingleTable from "../../component/DoubleSingleTable";

import {message} from "antd";
import SDActions from "../../actions/ScheduleDetailActions";

/*import ScheduleDetailModal from "../../component/ScheduleDetailModal";

import ChangeTimeModal from "../../component/ChangeTimeModal";

import AdjustClassRoomModal from "../../component/AdjustClassRoomModal";

import ReplaceScheduleModal from "../../component/ReplaceScheduleModal";*/



class ClassTotal extends Component{

    constructor(props){

        super(props);

        const {dispatch} = this.props;

        dispatch(ComPageRefresh.ComPageInit(ManagerIndexActions.ClassTotalInit()));

    }


    //年级下拉改变

    GradeChange(e){

        const {dispatch} = this.props;

        let data = {};

        if (e.value!=="none"){

            data = {value:e.value,title:e.title};

        }

        dispatch({type:CTActions.MANAGER_CLASS_TOTAL_GRADE_SELECT_CHANGE,data:data});

        $('#tb').find('div.ant-table-body').scrollTop(0);

        dispatch(CTActions.ClassTotalPageUpdate());

    }

    //选择某一周次
    weekPickEvent(e){

        const {dispatch} = this.props;

        dispatch({type:CTActions.MANAGER_CLASS_TOTAL_WEEK_CHANGE,data:e.value});

        $('#tb').find('div.ant-table-body').scrollTop(0);

        dispatch(CTActions.ClassTotalPageUpdate());

    }

    //选择下一周次
    weekNextEvent(){

        const {dispatch,ClassTotal} = this.props;

        const {WeekNO} = ClassTotal;

        dispatch({type:CTActions.MANAGER_CLASS_TOTAL_WEEK_CHANGE,data:(WeekNO+1)});

        $('#tb').find('div.ant-table-body').scrollTop(0);

        dispatch(CTActions.ClassTotalPageUpdate());

    }

    //选择上一周次
    weekPrevEvent(){

        const {dispatch,ClassTotal} = this.props;

        const {WeekNO} = ClassTotal;

        dispatch({type:CTActions.MANAGER_CLASS_TOTAL_WEEK_CHANGE,data:(WeekNO-1)});;

        $('#tb').find('div.ant-table-body').scrollTop(0);

        dispatch(CTActions.ClassTotalPageUpdate());

    }

    //滚动到底部

    scrollToBottom(e){

        const {dispatch,ClassTotal} = this.props;

        const { ClassCount,PageIndex } = ClassTotal;

        if (PageIndex < Math.ceil(ClassCount/10)){

            dispatch(CTActions.ClassTotalPageUpdate({nextPage:true}));

        }else if (Math.ceil(ClassCount/10)>0){

            message.info('已经是最后一页了！',0.2);

            message.config({maxCount:1,top:200});

        }

    }

    //表格点击某一行
    clickRow(record){

        const { ClassTotal,dispatch } = this.props;

        const { Schedule } = ClassTotal;

        let rID  = record.id;

        Schedule.map((item,key)=>{

            if (item.id === rID){

                Schedule[key]['active'] = true;

            }else{

                Schedule[key]['active'] = false;

            }

        });

        dispatch({type:CTActions.MANAGER_CLASS_TOTAL_SCHEDULE_UPDATE,data:Schedule});

    }


    //弹出课程详情弹窗

    ScheduleDetailShow(Params){

        const { dispatch,SubjectCourseGradeClassRoom,ClassTotal } = this.props;

        /*dispatch(CTActions.ScheduleDetailShow(Params));*/

        const { ItemClassHour,ItemClassHourCount,NowClassHourNO } = SubjectCourseGradeClassRoom;

        const {WeekNO,ScheduleList} = ClassTotal;

        const { ClassID } = Params;

        let FindPage = 1;

        ScheduleList.map((item,key)=>{

            let FindIndex = item.findIndex(i=>i.id===ClassID);

            if(FindIndex>=0){

                FindPage = key+1

            }

        });

        dispatch({type:SDActions.COMPONENT_SCHEDULE_DETAIL_MODAL_PARAMS_UPDATE,data:{ItemClassHour,ItemClassHourCount,NowClassHourNO,WeekNO,PageIndex:FindPage}});

        dispatch(SDActions.ScheduleDetailShow(Params));

    }


   /* //停课

    StopSchedule(params){

        const { dispatch } = this.props;

        dispatch(CTActions.StopSchedule(params));

    }

    //恢复上课
    RebackStopSchedule(params){

        const { dispatch } = this.props;

        dispatch(CTActions.RebackStopSchedule(params));

    }

    //关闭弹窗

    ScheduleDetailClose(){

        const { dispatch } = this.props;

        dispatch({type:CTActions.MANAGER_CT_SCHEDULE_DETAIL_MODAL_HIDE});

       /!* ComPageRefresh.ComPageUpdate(dispatch);*!/

        dispatch(CTActions.ClassTotalPageUpdate());

    }

    //调整时间弹窗

    ChangeTimeShow(params){

        const { dispatch } = this.props;

        dispatch(CTActions.ChangeTimeShow(params));

    }

    //调整时间弹窗点击某一个课时

    SelectClassHour(params){

        const { dispatch } = this.props;

        dispatch(CTActions.SelectClassHour(params));

    }


    //调整时间弹窗切换周次

    WeekPick(WeekNO){

        const { dispatch } = this.props;

        dispatch(CTActions.WeekPick(WeekNO));

    }

    //调整时间弹窗关闭

    CloseChangeTime(){

        const { dispatch } = this.props;

        dispatch({type:CTActions.MANAGER_CT_CHANGE_TIME_MODAL_HIDE});

    }

    //点击调整时间弹窗确定
    ChangeTimeCommit(){

        const { dispatch } = this.props;

        dispatch(CTActions.ChangeTimeCommit());

    }

    //撤销调整时间
    RebackTime(params){

        const { dispatch } = this.props;

        dispatch(CTActions.RebackTime(params));

    }

    //调整教室弹窗
    AdjustClassRoomShow(params){

        const { dispatch } = this.props;

        dispatch(CTActions.AdjustClassRoomShow(params));

    }

    //调整教室弹窗切换选中教室事件

    ChangeClassRoomPick(e){

        const { dispatch } = this.props;

        dispatch({type:CTActions.MANAGER_CT_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE,data:e.target.value});

    }

    //调整教室教室类型切换

    ChangeClassRoomType(key){

        const { dispatch } = this.props;

        dispatch({type:CTActions.MANAGER_CT_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE,data:key});

    }

    //调整教室搜索值变化

    SearchValueChange(e){

        const { dispatch } = this.props;

        dispatch({type:CTActions.MANAGER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE,data:e.target.value});


    }

    //点击教室搜索

    ClassRoomSearchClick(SearchValue){

        const { dispatch } = this.props;

        dispatch(CTActions.ClassRoomSearchClick(SearchValue))

    }

    //取消搜索教室

    ClassRoomSearchCancel(){

        const { dispatch } = this.props;

        dispatch({type:CTActions.MANAGER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE});

        dispatch({type:CTActions.MANAGER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE});

        dispatch({type:CTActions.MANAGER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE,data:''});

    }


    //关闭调整教室弹窗

    CloseAdjustClassRoom(){

        const { dispatch } = this.props;

        dispatch({type:CTActions.MANAGER_CT_ADJUST_CLASSROOM_MODAL_HIDE});

    }

    //调整教室弹窗提交
    AdjustClassRoomCommit(){

        const { dispatch } = this.props;

        dispatch(CTActions.AdjustClassRoomCommit());

    }

    //撤销教室调整

    RebackClassRoom(params){

        const { dispatch } = this.props;

        dispatch(CTActions.RebackClassRoom(params));

    }

    //找人代课弹窗出现

    ChooseReplaceTeacherShow(params){

        const { dispatch } = this.props;

        dispatch(CTActions.ChooseReplaceTeacherShow(params));

    }

    //找人代课教师选择

    ReplaceTeacherPick(ID){

        const { dispatch } = this.props;

        dispatch({type:CTActions.MANAGER_CT_REPLACE_SCHEDULE_MODAL_TEACHER_PICK,data:ID});

    }

    //找人代课输入框改变

    ReplaceSearchValueChange(e){

        const { dispatch } = this.props;

        dispatch({type:CTActions.MANAGER_CT_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE,data:e.target.value});

    }

    //点击代课教师搜索

    ReplaceSearchClick(SearchValue){

        const { dispatch } = this.props;

        dispatch(CTActions.ReplaceSearchClick(SearchValue));

    }

    //取消搜索教师

    ReplaceSearchCancel(){

        const { dispatch } = this.props;

        dispatch({type:CTActions.MANAGER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE});

        dispatch({type:CTActions.MANAGER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE});

        dispatch({type:CTActions.MANAGER_CT_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE,data:''});

    }

    //关闭找人代课弹窗

    ReplaceScheduleClose(){

        const { dispatch } = this.props;

        dispatch({type:CTActions.MANAGER_CT_REPLACE_SCHEDULE_MODAL_HIDE});

    }

    //找人代课弹窗提交
    ReplaceScheduleCommit(){

        const { dispatch } = this.props;

        dispatch(CTActions.ReplaceScheduleCommit());

    }

    //找人代课撤销

    RebackReplaceSchedule(params){

        const { dispatch } = this.props;

        dispatch(CTActions.RebackReplaceSchedule(params));

    }*/


    render(){


        const { PeriodWeekTerm,SubjectCourseGradeClassRoom,ClassTotal } = this.props;

        const { ScheduleDetail,ChangeTime,AdjustClassRoom,ReplaceSchedule } = ClassTotal;



        return <div className="class-total-content">

            <Loading spinning={ClassTotal.LoadingShow} tip="正在为您查找，请稍后...">

                <DropDown

                    dropSelectd={ClassTotal.GradeDropSelectd}

                    dropList={ClassTotal.GradeDropList}

                    style={{zIndex:5}}

                    height={108}

                    onChange={this.GradeChange.bind(this)}>

                </DropDown>

                <TermPick

                    ItemTermName={PeriodWeekTerm.ItemTerm?PeriodWeekTerm.ItemTerm.TermName:''}

                    NowWeekNo={ClassTotal.WeekNO}

                    ItemWeek ={ClassTotal.WeekList}

                    weekPickEvent = {this.weekPickEvent.bind(this)}

                    weekNextEvent = {this.weekNextEvent.bind(this)}

                    weekPrevEvent = {this.weekPrevEvent.bind(this)}
                >

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
                        schedule={ClassTotal.Schedule}
                        onClickRow={(record) => this.clickRow.bind(this,record)}
                        scrollToBottom={this.scrollToBottom.bind(this)}

                        ScheduleDetailShow={this.ScheduleDetailShow.bind(this)}
                    >

                    </DoubleSingleTable>

                </div>

            </Loading>

           {/* <ScheduleDetailModal

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



            </ReplaceScheduleModal>*/}

        </div>

    }

}

const  mapStateToProps = (state) => {

    let { PeriodWeekTerm,Manager } = state;

    let { ClassTotal,SubjectCourseGradeClassRoom } = Manager;

    return {

        PeriodWeekTerm,ClassTotal,SubjectCourseGradeClassRoom

    }

};

export default connect(mapStateToProps)(ClassTotal);