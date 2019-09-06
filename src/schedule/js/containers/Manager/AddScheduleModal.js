import React,{Component} from 'react';

import {connect} from 'react-redux';

import { Modal,DropDown,Loading } from "../../../../common";

import ASMActions from '../../actions/Manager/AddScheduleModalActions'

import { Tooltip } from 'antd';

class AddScheduleModal extends Component{

    //学科选项改变
    subjectChange(e){

       const {dispatch} = this.props;

       dispatch({type:ASMActions.ADD_SHEDULE_MODAL_SUBJECT_CHANGE,data:e});

       dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_SUBJECT_ERROR_HIDE});

    }

    //班级选项改变
    classChange(e){

        const {dispatch} = this.props;

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_CLASS_CHANGE,data:{title:e.value,value:e.id}});

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASS_ERROR_HIDE});

    }

    //老师改变
    teacherChange(e){

        const {dispatch} = this.props;

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_TEACHER_CHANGE,data:{title:e.value,value:e.id}});

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_TEACHER_ERROR_HIDE});

    }
    //周次变更
    weekChange(e){

        const {dispatch} = this.props;

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_WEEK_CHANGE,data:e});

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_DATE_ABLED});

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_WEEK_ERROR_HIDE});

    }

    //星期变更
    dateChange(e){

        const {dispatch} = this.props;

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_DATE_CHANGE,data:e});

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_CLASSHOUR_ABLED});

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_DATE_ERROR_HIDE});

    }

    //课时变更
    classHourChange(e){

        const {dispatch} = this.props;

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_CLASSHOUR_CHANGE,data:e});

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_HIDE});

    }

    //教室变更
    classRoomChange(e){

        const {dispatch} = this.props;

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_CLASSROOM_CHANGE,data:{title:e.value,value:e.id}});

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_HIDE});

    }
    //点击OK按钮
    ok(e) {

        const {AddScheduleModal,dispatch} = this.props;

        if (Object.keys(AddScheduleModal.checkedSubject).length <= 0){

            dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_SUBJECT_ERROR_SHOW});

        }

        if (Object.keys(AddScheduleModal.checkedClass).length <= 0){

            dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASS_ERROR_SHOW});

        }

        if (Object.keys(AddScheduleModal.checkedTeacher).length <= 0){

            dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_TEACHER_ERROR_SHOW});

        }

        if (Object.keys(AddScheduleModal.checkedWeek).length <= 0){

            dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_WEEK_ERROR_SHOW});

        }

        if (Object.keys(AddScheduleModal.checkedDate).length <= 0){

            dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_DATE_ERROR_SHOW});

        }

        if (Object.keys(AddScheduleModal.checkedClassHour).length <= 0){

            dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_SHOW});

        }

        if (Object.keys(AddScheduleModal.checkedClassRoom).length <= 0){

            dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_SHOW});

        }

        if (

            (Object.keys(AddScheduleModal.checkedSubject).length > 0)&&

            (Object.keys(AddScheduleModal.checkedClass).length > 0)&&

            (Object.keys(AddScheduleModal.checkedTeacher).length > 0)&&

            (Object.keys(AddScheduleModal.checkedWeek).length > 0)&&

            (Object.keys(AddScheduleModal.checkedDate).length > 0)&&

            (Object.keys(AddScheduleModal.checkedClassHour).length>0)&&

            (Object.keys(AddScheduleModal.checkedClassRoom).length > 0)

        ){

            dispatch(ASMActions.commitInfo())

        }

    }

    //点击取消交互
    cancel(){

        const {dispatch} = this.props;

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_HIDE});

    }

    //点击班级的搜索
    classSearchClick(e){

        const { dispatch } = this.props;

        const {value} = e;

        dispatch(ASMActions.classSearch(value));

    }

    //取消班级搜索
    classSearchClose(){

        const {dispatch} = this.props;

        dispatch(ASMActions.classSearchClose());

    }


    //点击教室搜索
    classRoomSearchClick(e){

        const { dispatch } = this.props;

        const {value} = e;

        dispatch(ASMActions.classRoomSearch(value));

    }

    //取消教室搜索
    classRoomSearchClose(){

        const {dispatch} = this.props;

        dispatch(ASMActions.classRoomSearchClose());

    }

    //点击教师
    teacherSearchClick(e){

        const { dispatch } = this.props;

        const {value} = e;

        dispatch(ASMActions.teacherSearch(value));

    }

    //教师取消搜索
    teacherSearchClose(){

        const {dispatch} = this.props;

        dispatch(ASMActions.teacherSearchClose());

    }


    render() {

        const { AddScheduleModal } =this.props;

        return (

            <Modal className="add-schedule-modal-wrapper" visible={AddScheduleModal.show}
                   title="添加临时课程"
                   type={1}
                   width={680}
                   bodyStyle={{height:286}}
                   mask={true}
                   maskClosable={true}
                   cancelText="取消"
                   onOk={this.ok.bind(this)}
                   onCancel={this.cancel.bind(this)} >

                <div className="ModalContent">

                    <Loading spinning={AddScheduleModal.loadingShow} tip="加载中...">

                        <table className="modalTable">

                        <tbody>

                            <tr>

                                <td className="props">学科:</td>

                                <td>

                                    <Tooltip title="请选择学科" visible={AddScheduleModal.subjectErrorShow} placement="right">

                                        <DropDown
                                            width={150}
                                            height={108}
                                            onChange={this.subjectChange.bind(this)}
                                            style={{zIndex:10}}
                                            dropSelectd={AddScheduleModal.checkedSubject?AddScheduleModal.checkedSubject:{value:"none",title:"请选择学科"}}
                                            dropList = {AddScheduleModal.subject}>

                                        </DropDown>

                                    </Tooltip>

                                </td>

                            </tr>

                            <tr>

                                <td className="props">上课班级:</td>

                                <td>

                                    <Tooltip title="请选择班级" visible={AddScheduleModal.classErrorShow} placement="right">

                                        <DropDown
                                        width={150}
                                        type="multiple"
                                        dropSelectd={AddScheduleModal.checkedClass?AddScheduleModal.checkedClass:{value:"none",title:"请选择班级"}}

                                        mutipleOptions={{
                                            range:2,
                                            dropMultipleList:AddScheduleModal.gradeClass,
                                            dropMultipleChange:this.classChange.bind(this),
                                            dropClickSearch:this.classSearchClick.bind(this),
                                            dropCancelSearch:this.classSearchClose.bind(this),
                                            searchList:AddScheduleModal.classSearchList,
                                            searchPlaceholder:"请输入班级名称进行搜索...",
                                            searchOpen:AddScheduleModal.classSearchOpen,
                                            searchLoadingShow:AddScheduleModal.classSearchLoadingShow
                                        }}
                                        style={{zIndex:9}}>

                                    </DropDown>

                                    </Tooltip>

                                </td>

                            </tr>

                            <tr>

                                <td className="props">上课老师:</td>

                                <td>

                                    <Tooltip title="请选择教师" visible={AddScheduleModal.teacherErrorShow} placement="right">

                                        <DropDown
                                        width={150}
                                        type="multiple"
                                        dropSelectd={AddScheduleModal.checkedTeacher?AddScheduleModal.checkedTeacher:{value:"none",title:"请选择老师"}}
                                        mutipleOptions={{
                                            range:2,
                                            dropMultipleList:AddScheduleModal.teachers,
                                            dropMultipleChange:this.teacherChange.bind(this),
                                            dropClickSearch:this.teacherSearchClick.bind(this),

                                            searchList:AddScheduleModal.teacherSearchList,
                                            dropCancelSearch:this.teacherSearchClose.bind(this),
                                            searchOpen:AddScheduleModal.teacherSearchOpen,
                                            searchPlaceholder:"请输入教师工号或者教师姓名进行搜索...",
                                            searchLoadingShow:AddScheduleModal.teacherSearchLoadingShow
                                        }}
                                        style={{zIndex:8}}>

                                    </DropDown>

                                    </Tooltip>

                                </td>

                            </tr>

                            <tr>

                                <td className="props">上课时间:</td>

                                <td>

                                    <Tooltip title="请选择周次" visible={AddScheduleModal.weekErrorShow} placement="right">

                                        <DropDown
                                        width={150}
                                        style={{zIndex:7}}
                                        height={108}
                                        className="week"
                                        dropSelectd={AddScheduleModal.checkedWeek?AddScheduleModal.checkedWeek:{value:"none",title:"请选择周次"}}
                                        dropList={AddScheduleModal.week}
                                        onChange={this.weekChange.bind(this)}>

                                    </DropDown>

                                    </Tooltip>

                                    <Tooltip title="请选择星期" visible={AddScheduleModal.dateErrorShow} placement="right">

                                        <DropDown
                                        width={150}
                                        style={{zIndex:7}}
                                        height={108}
                                        className="date"
                                        disabled={AddScheduleModal.dateDisabled}
                                        dropSelectd={AddScheduleModal.checkedDate?AddScheduleModal.checkedDate:{value:"none",title:"请选择星期"}}
                                        dropList={AddScheduleModal.date}
                                        onChange={this.dateChange.bind(this)}>

                                    </DropDown>

                                    </Tooltip>

                                    <Tooltip title="请选择课时" visible={AddScheduleModal.classHourErrorShow} placement="right">

                                        <DropDown
                                        width={150}
                                        style={{zIndex:7}}
                                        height={108}
                                        className="classHour"
                                        disabled={AddScheduleModal.classHourDisabled}
                                        dropSelectd={AddScheduleModal.checkedClassHour?AddScheduleModal.checkedClassHour:{value:"none",title:"请选择课时"}}
                                        dropList={AddScheduleModal.classHour}
                                        onChange={this.classHourChange.bind(this)}>

                                    </DropDown>

                                    </Tooltip>

                                </td>

                            </tr>

                            <tr>

                                <td className="props">上课教室:</td>

                                <td>

                                    <Tooltip title="请选择教室" visible={AddScheduleModal.classRoomErrorShow} placement="right">

                                        <DropDown
                                        width={470}
                                        type="multiple"
                                        dropSelectd={AddScheduleModal.checkedClassRoom?AddScheduleModal.checkedClassRoom:{value:"none",title:"请选择教室"}}
                                        mutipleOptions={{
                                            range:2,
                                            dropMultipleList:AddScheduleModal.classRoom,
                                            dropMultipleChange:this.classRoomChange.bind(this),
                                            dropClickSearch:this.classRoomSearchClick.bind(this),
                                            searchList:AddScheduleModal.classRoomSearchList,
                                            searchPlaceholder:"请输入教室名称进行搜索...",
                                            searchLoadingShow:AddScheduleModal.classRoomSearchLoadingShow,
                                            dropCancelSearch:this.classRoomSearchClose.bind(this),
                                            searchOpen:AddScheduleModal.classRoomSearchOpen,
                                        }}
                                        style={{zIndex:6}}>

                                    </DropDown>

                                    </Tooltip>

                                </td>

                            </tr>

                        </tbody>

                    </table>

                    </Loading>

                </div>

            </Modal>

        );

    }

}

const mapStateToState = (state) => {

    const { AddScheduleModal } = state.Manager;

    return{

        AddScheduleModal

    }

};

export default connect(mapStateToState)(AddScheduleModal);