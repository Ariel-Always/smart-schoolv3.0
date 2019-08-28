import React,{Component} from 'react';

import {DropDown} from "../../../../common";

import SCGCRActions from '../../actions/Manager/SCGCRActions';

import TermPick from '../../component/TermPick';

import DoubleSingleTable from '../../component/DoubleSingleTable';

import {Scrollbars } from 'react-custom-scrollbars';

import {connect} from 'react-redux';

class Subject extends Component{

    constructor(props) {

        super(props);

        const {PeriodWeekTerm,dispatch} = this.props;

        dispatch(SCGCRActions.getSCGCData());

    }


    render() {

        const {Manager,PeriodWeekTerm} = this.props;

        const {SubjectCourseGradeClassRoom} = Manager;

        let dropList = [];
        //封装获取到的学科列表
        if (SubjectCourseGradeClassRoom.ItemSubject){

            dropList = SubjectCourseGradeClassRoom.ItemSubject.map((item) => {

               return {

                            value:item.SubjectID,

                            title:item.SubjectName

                       }

            });

        }

        dropList.unshift({value:0,title:"全部学科"});

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

                    dropSelectd={SubjectCourseGradeClassRoom.ItemSubjectSelect}

                    dropList={dropList}

                    style={{zIndex:5}}

                    height={108}>

                </DropDown>

                <TermPick

                    ItemTermName={PeriodWeekTerm.ItemTerm?PeriodWeekTerm.ItemTerm.TermName:''}

                    NowWeek={SubjectCourseGradeClassRoom.ItemWeekPicked?SubjectCourseGradeClassRoom.ItemWeekPicked:{}}

                    ItemWeek ={ItemWeek}>

                </TermPick>

                <div className="double-single-table-wrapper">

                    <Scrollbars

                        style={{width:1148}}

                        autoHeight={true}

                        autoHeightMax={748}

                        renderTrackHorizontal={()=>{

                            return <div className="scrollbar-horizo​​ntal" style={{position:"absolute",bottom:0,width:"100%",left:0,height:4,borderRadius:2}}></div>
                        }}

                       /* renderThumbHorizontal={()=>{

                            //return <div className="thumb-horizo​​ntal" style={{height:4,borderRadius:2}}></div>

                        }}*/
                    >

                    <DoubleSingleTable
                        ItemClassHourCount={SubjectCourseGradeClassRoom.ItemClassHourCount}
                        ItemClassHour={SubjectCourseGradeClassRoom.ItemClassHour}
                        ItemWeek = {PeriodWeekTerm.ItemWeek}
                        NowWeekNo={PeriodWeekTerm.NowWeekNo}>

                    </DoubleSingleTable>

                    </Scrollbars>

                </div>

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