import React,{Component} from 'react';

import { connect } from 'react-redux';

import {DropDown, Loading} from "../../../../common";


import ManagerIndexActions from "../../actions/Manager/ManagerIndexActions";

import CTActions from '../../actions/Manager/ClassTotalActions';

import TermPick from "../../component/TermPick";

import $ from "jquery";

import DoubleSingleTable from "../../component/DoubleSingleTable";



class ClassTotal extends Component{

    constructor(props){

        super(props);

        const {dispatch} = this.props;

        dispatch(ManagerIndexActions.ClassTotalInit());

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

        const {dispatch} = this.props;

        dispatch(CTActions.ClassTotalPageUpdate({nextPage:true}));

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


    render(){

        const { PeriodWeekTerm,SubjectCourseGradeClassRoom,ClassTotal } = this.props;

        return <div className="class-total-content">

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

                <Loading spinning={ClassTotal.LoadingShow} tip="正在为您查找，请稍后...">

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
                >

                </DoubleSingleTable>

                </Loading>

            </div>

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