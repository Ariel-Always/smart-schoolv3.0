import React,{Component} from 'react';

import {connect} from 'react-redux';

import { Modal,DropDown,Loading } from "../../../../common";

import ATSMActions from '../../actions/Teacher/AddTempScheduleModalActions'

import { Tooltip } from 'antd';



class AddTempScheduleModal extends Component{

    //学科选项改变
    subjectChange(e){

       const {dispatch,AddTempScheduleModal} = this.props;

       dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_SUBJECT_CHANGE,data:e});

       dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_SUBJECT_ERROR_HIDE});

        const { SubjectList,gradeClass,teachers,classDisabled,teacherDisabled,checkedClass,checkedTeacher } = AddTempScheduleModal;

        if (classDisabled){

            dispatch({type: ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_DROP_ABLED});

        }

        const SubjectGrades = SubjectList.find(item=>item.SubjectID===e.value).Grades;

        const SubjectGradeList = SubjectGrades.split(',');

        const classList = gradeClass.map(item=>{

            if (SubjectGradeList.findIndex(i=>i===item.id)>=0){

                return item

            }else{

                return;

            }

        }).filter(item=>item!==undefined);

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_LIST_UPDATE,data:classList});

        dispatch({type: ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_CHANGE,data:''});


    }

    //班级选项改变
    classChange(e){

        const {dispatch} = this.props;

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_CHANGE,data:{title:e.value,value:e.id}});

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_ERROR_HIDE});

    }

    //老师改变
    teacherChange(e){

        const {dispatch} = this.props;

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_TEACHER_CHANGE,data:{title:e.value,value:e.id}});

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_TEACHER_ERROR_HIDE});

    }
    //周次变更
    weekChange(e){

        const {dispatch} = this.props;

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_WEEK_CHANGE,data:e});

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_DATE_ABLED});

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_WEEK_ERROR_HIDE});

    }

    //星期变更
    dateChange(e){

        const {dispatch} = this.props;

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_DATE_CHANGE,data:e});

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_ABLED});

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_DATE_ERROR_HIDE});

    }

    //课时变更
    classHourChange(e){

        const {dispatch} = this.props;

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_CHANGE,data:e});

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_HIDE});

    }

    //教室变更
    classRoomChange(e){

        const {dispatch} = this.props;

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_CHANGE,data:{title:e.value,value:e.id}});

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_HIDE});

    }
    //点击OK按钮
    ok(e) {

        const {AddTempScheduleModal,dispatch} = this.props;

        let SubjectOK,ClassOk,WeekOk,DateOk,ClassHourOk,ClassRoomOk = false;

        console.log(AddTempScheduleModal,AddTempScheduleModal.SubjectDropShow);

        if (AddTempScheduleModal.SubjectDropShow){

            if (Object.keys(AddTempScheduleModal.checkedSubject).length <= 0){

                dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_SUBJECT_ERROR_SHOW});

            }else{

                SubjectOK = true;

            }

        }else {

            if(AddTempScheduleModal.SubjectID){

                SubjectOK = true;

            }else{

                dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_SUBJECT_ERROR_SHOW});

            }

        }

        if (Object.keys(AddTempScheduleModal.checkedClass).length <= 0){

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_ERROR_SHOW});

        }else{

            ClassOk = true;

        }


        if (Object.keys(AddTempScheduleModal.checkedWeek).length <= 0){

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_WEEK_ERROR_SHOW});

        }else{

            WeekOk = true;

        }

        if (Object.keys(AddTempScheduleModal.checkedDate).length <= 0){

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_DATE_ERROR_SHOW});

        }else{

            DateOk = true;

        }

        if (Object.keys(AddTempScheduleModal.checkedClassHour).length <= 0){

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_SHOW});

        }else {

            ClassHourOk = true;

        }

        if (Object.keys(AddTempScheduleModal.checkedClassRoom).length <= 0){

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_SHOW});

        }else{

            ClassRoomOk = true;

        }

        if (SubjectOK&&ClassOk&&WeekOk&&DateOk&&ClassHourOk&&ClassRoomOk){

            dispatch(ATSMActions.commitInfo());

        }

    }

    //点击取消交互
    cancel(){

        const {dispatch} = this.props;

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_HIDE});

    }

    //点击班级的搜索
    classSearchClick(e){

        const { dispatch } = this.props;

        const {value} = e;

        dispatch(ATSMActions.classSearch(value));

    }

    //取消班级搜索
    classSearchClose(){

        const {dispatch} = this.props;

        dispatch(ATSMActions.classSearchClose());

    }


    //点击教室搜索
    classRoomSearchClick(e){

        const { dispatch } = this.props;

        const {value} = e;

        dispatch(ATSMActions.classRoomSearch(value));

    }

    //取消教室搜索
    classRoomSearchClose(){

        const {dispatch} = this.props;

        dispatch(ATSMActions.classRoomSearchClose());

    }

    //点击教师
    teacherSearchClick(e){

        const { dispatch } = this.props;

        const {value} = e;

        dispatch(ATSMActions.teacherSearch(value));

    }

    //教师取消搜索
    teacherSearchClose(){

        const {dispatch} = this.props;

        dispatch(ATSMActions.teacherSearchClose());

    }


    render() {

        const { AddTempScheduleModal,UserName,UserID } =this.props;

        return (

            <Modal className="add-schedule-modal-wrapper" visible={AddTempScheduleModal.show}
                   title="添加临时课程"
                   type={1}
                   width={680}
                   bodyStyle={{height:286}}
                   mask={true}
                   maskClosable={false}
                   cancelText="取消"
                   onOk={this.ok.bind(this)}
                   onCancel={this.cancel.bind(this)}
                   destroyOnClose={true}>

                <div className="ModalContent">

                    <Loading spinning={AddTempScheduleModal.loadingShow} tip="加载中...">

                        <table className="modalTable">

                        <tbody>

                            <tr>

                                <td className="props">学科:</td>

                                <td style={{position:'relative',zIndex:4}}>

                                    <Tooltip title="请选择学科" getPopupContainer={trigger=>trigger.parentNode} visible={AddTempScheduleModal.subjectErrorShow} placement="right">

                                        {

                                            AddTempScheduleModal.SubjectDropShow?

                                                <DropDown
                                                    width={150}
                                                    height={108}
                                                    onChange={this.subjectChange.bind(this)}
                                                    style={{zIndex:10}}
                                                    dropSelectd={AddTempScheduleModal.checkedSubject?AddTempScheduleModal.checkedSubject:{value:"none",title:"请选择学科"}}
                                                    dropList = {AddTempScheduleModal.subject}>

                                                </DropDown>

                                                :

                                                <div className={`subject-name ${AddTempScheduleModal.SubjectID?'':'none'}`}>{AddTempScheduleModal.SubjectID?AddTempScheduleModal.SubjectName:'您暂未担任任何课程'}</div>

                                        }



                                    </Tooltip>

                                </td>

                            </tr>

                            <tr>

                                <td className="props">上课班级:</td>

                                <td style={{position:'relative',zIndex:3}}>

                                    <Tooltip title="请选择班级" getPopupContainer={trigger=>trigger.parentNode} visible={AddTempScheduleModal.classErrorShow} placement="right">

                                        <DropDown
                                        width={150}
                                        type="multiple"
                                        dropSelectd={AddTempScheduleModal.checkedClass?AddTempScheduleModal.checkedClass:{value:"none",title:"请选择班级"}}
                                        disabled={AddTempScheduleModal.classDisabled}
                                        mutipleOptions={{
                                            range:2,
                                            dropMultipleList:AddTempScheduleModal.classList,
                                            dropMultipleChange:this.classChange.bind(this),
                                            dropClickSearch:this.classSearchClick.bind(this),
                                            dropCancelSearch:this.classSearchClose.bind(this),
                                            searchList:AddTempScheduleModal.classSearchList,
                                            searchPlaceholder:"请输入班级名称搜索...",
                                            searchOpen:AddTempScheduleModal.classSearchOpen,
                                            searchLoadingShow:AddTempScheduleModal.classSearchLoadingShow,
                                            CancelBtnShow:AddTempScheduleModal.classSearchCancelShow
                                        }}
                                        style={{zIndex:9}}>

                                    </DropDown>

                                    </Tooltip>

                                </td>

                            </tr>

                            <tr>

                                <td className="props">上课老师:</td>

                                <td>

                                   <div className="teacher-name" >{UserName}</div>

                                </td>

                            </tr>

                            <tr>

                                <td className="props">上课时间:</td>

                                <td style={{position:'relative',zIndex:2}}>

                                    <Tooltip title="请选择周次" getPopupContainer={trigger=>trigger.parentNode} visible={AddTempScheduleModal.weekErrorShow} placement="right">

                                        <DropDown
                                        width={150}
                                        style={{zIndex:7}}
                                        TitleShow={false}
                                        height={200}
                                        className="week"
                                        dropSelectd={AddTempScheduleModal.checkedWeek?AddTempScheduleModal.checkedWeek:{value:"none",title:"请选择周次"}}
                                        dropList={AddTempScheduleModal.week}
                                        onChange={this.weekChange.bind(this)}>

                                    </DropDown>

                                    </Tooltip>

                                    <Tooltip title="请选择星期" getPopupContainer={trigger=>trigger.parentNode} visible={AddTempScheduleModal.dateErrorShow} placement="right">

                                        <DropDown
                                        width={150}
                                        style={{zIndex:7}}
                                        height={200}
                                        className="date"
                                        disabled={AddTempScheduleModal.dateDisabled}
                                        dropSelectd={AddTempScheduleModal.checkedDate?AddTempScheduleModal.checkedDate:{value:"none",title:"请选择星期"}}
                                        dropList={AddTempScheduleModal.date}
                                        onChange={this.dateChange.bind(this)}>

                                    </DropDown>

                                    </Tooltip>

                                    <Tooltip title="请选择课时" getPopupContainer={trigger=>trigger.parentNode} visible={AddTempScheduleModal.classHourErrorShow} placement="right">

                                        <DropDown
                                        width={150}
                                        style={{zIndex:7}}
                                        height={108}
                                        TitleShow={false}
                                        className="classHour"
                                        disabled={AddTempScheduleModal.classHourDisabled}
                                        dropSelectd={AddTempScheduleModal.checkedClassHour?AddTempScheduleModal.checkedClassHour:{value:"none",title:"请选择课时"}}
                                        dropList={AddTempScheduleModal.classHour}
                                        onChange={this.classHourChange.bind(this)}>

                                    </DropDown>

                                    </Tooltip>

                                </td>

                            </tr>

                            <tr>

                                <td className="props">上课教室:</td>

                                <td style={{position:'relative',zIndex:1}}>

                                    <Tooltip title="请选择教室" getPopupContainer={trigger=>trigger.parentNode} visible={AddTempScheduleModal.classRoomErrorShow} placement="right">

                                        <DropDown
                                        width={470}
                                        type="multiple"
                                        dropSelectd={AddTempScheduleModal.checkedClassRoom?AddTempScheduleModal.checkedClassRoom:{value:"none",title:"请选择教室"}}
                                        mutipleOptions={{
                                            range:2,
                                            dropMultipleList:AddTempScheduleModal.classRoom,
                                            dropMultipleChange:this.classRoomChange.bind(this),
                                            dropClickSearch:this.classRoomSearchClick.bind(this),
                                            searchList:AddTempScheduleModal.classRoomSearchList,
                                            searchPlaceholder:"请输入教室名称或ID搜索...",
                                            searchLoadingShow:AddTempScheduleModal.classRoomSearchLoadingShow,
                                            dropCancelSearch:this.classRoomSearchClose.bind(this),
                                            searchOpen:AddTempScheduleModal.classRoomSearchOpen,
                                            CancelBtnShow:AddTempScheduleModal.classRoomSearchCancelShow
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

    const { AddTempScheduleModal } = state.Teacher;

    const { UserName,UserID } = state.LoginUser;

    return{

        AddTempScheduleModal,

        UserName,

        UserID

    }

};

export default connect(mapStateToState)(AddTempScheduleModal);