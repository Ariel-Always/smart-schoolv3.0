import React,{Component} from 'react';

import { Loading,DropDown } from "../../../../common";

import { connect } from 'react-redux';

import ABTActions from '../../actions/Manager/AdjustByTeacherActions';

class ReplaceSchedule extends Component{

    constructor(props) {

        super(props);

        const { dispatch } = props;

        dispatch({type:ABTActions.REPLACE_SHCEDULE_LOADING_SHOW});

        dispatch(ABTActions.replaceScheduleInit());

    }

    //教师选择
    teacherDropChange(info){

        const { dispatch } = this.props;

        dispatch(ABTActions.teacherDropChange(info));

    }



    render() {

        const { replaceSchedule } = this.props;

        const {

            loadingShow,

            teacherOptions

        } = replaceSchedule;

    console.log(teacherOptions.dropList);
        return (

            <Loading spinning={loadingShow} opacity={false} tip="加载中...">

                <div className="replace-schedule-wrapper">

                    <div className="teacher-wrapper clearfix">

                        <div className="props">老师:</div>

                        <DropDown
                            width={160}
                            dropSelectd={teacherOptions.dropSelectd?teacherOptions.dropSelectd:{value:"none",title:"请选择任课教师"}}
                            type="multiple"
                            style={{zIndex:8}}
                            mutipleOptions={{
                                range:2,
                                dropMultipleList:teacherOptions.dropList,
                                dropMultipleChange:this.teacherDropChange.bind(this),
                                //dropClickSearch:this.classSearchClick.bind(this),
                                //dropCancelSearch:this.classSearchClose.bind(this),
                                searchList:teacherOptions.dropList,
                                searchPlaceholder:"请输入教师名称进行搜索...",
                                searchOpen:false,
                                //searchLoadingShow:AddScheduleModal.classSearchLoadingShow
                            }}
                        >

                        </DropDown>

                    </div>

                    <div className="subject-wrapper clearfix">

                        <div className="props">学科:</div>



                    </div>

                    <div className="class-wrapper clearfix">

                        <div className="props">代课班级:</div>


                    </div>

                    <div className="replace-teacher-wrapper clearfix">

                        <div className="props">代课老师:</div>

                        <DropDown></DropDown>

                    </div>

                    <div className="deadline-wrapper clearfix">

                        <div className="props">代课期限:</div>

                    </div>

                </div>

            </Loading>

        );
    }
}

const mapStateToProps = (state) => {

    const { replaceSchedule } = state.Manager.AdjustByTeacherModal;

    return{

        replaceSchedule

    }

};

export default connect(mapStateToProps)(ReplaceSchedule);