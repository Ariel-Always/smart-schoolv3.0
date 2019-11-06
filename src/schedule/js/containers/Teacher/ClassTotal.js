import React,{Component} from 'react';

import { connect } from 'react-redux';

import {Loading} from "../../../../common";

import TeacherIndexActions from "../../actions/Teacher/TeacherIndexActions";

import CTActions from '../../actions/Teacher/ClassTotalActions';

import ComPageRefresh from '../../actions/ComPageRefresh';

import TermPick from "../../component/TermPick";

import SingleDoubleTable from "../../component/SingleDoubleTable";

import OptionalClassModal from "../../component/OptionalClassModal";


class ClassTotal extends Component{

    constructor(props){

        super(props);

        const {dispatch} = this.props;

        ComPageRefresh.ComPageInit(dispatch,TeacherIndexActions.ClassTotalInit());

    }


    //班级下拉改变

    /*ClassChange(e){

        const {dispatch} = this.props;

        let data = {};

        if (e.value!=="none"){

            data = {value:e.value,title:e.title};

        }

        dispatch({type:CTActions.TEACHER_CLASS_TOTAL_GRADE_SELECT_CHANGE,data:data});

        $('#tb').find('div.ant-table-body').scrollTop(0);

        dispatch(CTActions.ClassTotalPageUpdate());

    }*/

    //选择某一周次
    weekPickEvent(e){

        const {dispatch} = this.props;

        dispatch({type:CTActions.TEACHER_CLASS_TOTAL_WEEK_CHANGE,data:e.value});

        dispatch(CTActions.ClassTotalPageUpdate());

    }

    //选择下一周次
    weekNextEvent(){

        const {dispatch,ClassTotal} = this.props;

        const {WeekNO} = ClassTotal;

        dispatch({type:CTActions.TEACHER_CLASS_TOTAL_WEEK_CHANGE,data:(WeekNO+1)});

        dispatch(CTActions.ClassTotalPageUpdate());

    }

    //选择上一周次
    weekPrevEvent(){

        const {dispatch,ClassTotal} = this.props;

        const {WeekNO} = ClassTotal;

        dispatch({type:CTActions.TEACHER_CLASS_TOTAL_WEEK_CHANGE,data:(WeekNO-1)});

        dispatch(CTActions.ClassTotalPageUpdate());

    }

    //走班详情弹窗打开

    OptionalClassShow({ClassHourNO,WeekDay}){

        const { dispatch,ClassTotal } = this.props;

        let {ClassID,WeekNO } = ClassTotal;

        dispatch(CTActions.OptionalClassInit({ClassHourNO,WeekDay,ClassID,WeekNO}))

    }

    //走班详情弹窗关闭

    OptionalClassModalClose(){

        const { dispatch } = this.props;

        dispatch({type:CTActions.TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_MODAL_HIDE});


    }


    //走班详情页码变化
    OptionalClassPageChange(e){

        const { dispatch } = this.props;

        dispatch({type:CTActions.TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_PAGE_CHANGE,data:e});

    }







    render(){

        const { PeriodWeekTerm,ClassTotal } = this.props;

        return <div className="class-total-content">

            <Loading spinning={ClassTotal.LoadingShow} tip="正在为您查找，请稍后...">

                {/*{

                    ClassTotal.ClassDropShow?

                        <DropDown

                            dropSelectd={ClassTotal.ClassDropSelectd}

                            dropList={ClassTotal.ClassDropList}

                            style={{zIndex:5}}

                            height={108}

                            onChange={this.ClassChange.bind(this)}>

                        </DropDown>

                        :*/}

                        <div className={`class-name ${ClassTotal.ClassName===''?'unset':''}`}>{ClassTotal.ClassName?ClassTotal.ClassName:'您未有授课班级'}</div>

                {/*}*/}

                <TermPick

                    ItemTermName={PeriodWeekTerm.ItemTerm?PeriodWeekTerm.ItemTerm.TermName:''}

                    NowWeekNo={ClassTotal.WeekNO}

                    ItemWeek ={ClassTotal.WeekList}

                    weekPickEvent = {this.weekPickEvent.bind(this)}

                    weekNextEvent = {this.weekNextEvent.bind(this)}

                    weekPrevEvent = {this.weekPrevEvent.bind(this)}
                >

                </TermPick>

                <div className="single-double-table-wrapper" style={{marginTop:20}}>

                    <SingleDoubleTable
                        topHeight = {64}
                        commonHeight = {90}
                        commonWidth={136}
                        leftOneWidth ={56}
                        leftTwoWidth = {136}
                        ItemClassHourCount={ClassTotal.ItemClassHourCount}
                        ItemClassHour={ClassTotal.ItemClassHour}
                        ItemWeek = {PeriodWeekTerm.ItemWeek}
                        NowWeekNo={ClassTotal.WeekNO}
                        schedule={ClassTotal.Schedule}
                        NowDate={PeriodWeekTerm.NowDate}
                        OptionalClassShow={this.OptionalClassShow.bind(this)}>

                    </SingleDoubleTable>

                </div>

            </Loading>

            <OptionalClassModal
                Show={ClassTotal.OptionalClassShow}
                LoadingShow={ClassTotal.OptionalClassLoading}
                DataSource={ClassTotal.OptionalClassData}
                Close={this.OptionalClassModalClose.bind(this)}
                PageChange={this.OptionalClassPageChange.bind(this)}
                CurrentPage={ClassTotal.OptionalClassCurrentPage}>



            </OptionalClassModal>

        </div>

    }

}

const  mapStateToProps = (state) => {

    let { PeriodWeekTerm,Teacher } = state;

    let { ClassTotal,SubjectCourseGradeClassRoom } = Teacher;

    return {

        PeriodWeekTerm,ClassTotal,SubjectCourseGradeClassRoom

    }

};

export default connect(mapStateToProps)(ClassTotal);