import React,{Component} from 'react';
import TitleBar from '../component/TitleBar';
import {Search, Button, Loading, Modal} from "../../../common";
import connect from "react-redux/es/connect/connect";
import UpDataState from '../actions/UpDataState';
import UpUIState from '../actions/UpUIState';
import ContentWrapper from '../component/ContentWrapper';
import TeacherTabWrapper from '../component/TeacherTabWrapper'
import StudentTabWrapper from '../component/StudentTabWrapper';
import AdjustClassModal from '../component/AdjustClassModal';



class StudentContent extends Component{
    constructor(props) {
        super(props);

        const {dispatch,DataState} = this.props;

        const {SchoolGradeClasses} = DataState;

        if (Object.keys(SchoolGradeClasses).length!==0){
            dispatch(UpDataState.getTheClassPreview());//获取数据
        }else{
            setTimeout(()=>{
                dispatch(UpDataState.getTheClassPreview());//获取数据
            },500)
        }

    }

    onCheckChange(checkList){

        const {dispatch,DataState} = this.props;

        dispatch(UpDataState.changeStudentCheckList(checkList));


    }

    onChangeAll(){

        const {DataState,dispatch} = this.props;

        const {StudentsCheckAll,StudentsPlainOptions} = DataState;
        //判断是点击的取消全选还是进行全选
        if (StudentsCheckAll.checkAll){

            dispatch({type:UpDataState.STUDENTS_CHECKED_NONE});

            dispatch({type:UpDataState.STUDENTS_CHECK_LIST_CHANGE,list:[]});

        } else{

            dispatch({type:UpDataState.STUDENTS_CHECKED_ALL});

            dispatch({type:UpDataState.STUDENTS_CHECK_LIST_CHANGE,list:StudentsPlainOptions});

        }

    }
    //点击调班按钮
    adjustBtnClick(e){

        const {dispatch,DataState} = this.props;

        const {StudentsCheckList} = DataState;

        //判断是否有选中的项

        if (StudentsCheckList.length===0){

            dispatch({type:UpUIState.SHOW_ERROR_ALERT,
                msg:{
                type:"btn-tips",
                title:"您还没有选中任何学生，请先选择学生！",
                cancel:this.hide.bind(this),
                close:this.hide.bind(this)
            }})

        }else{

            //弹出弹窗
            dispatch({type:UpUIState.ADJUST_CLASS_MODAL_SHOW});

        }


    }

    hide(e){
        const {dispatch} = this.props
        dispatch({type:UpUIState.CLOSE_ERROR_ALERT});
    }


    //调班模态框点击OK事件
    adjustClassOk(e){



    }
    //调班模态框点击Cancel事件
    adjustClassCancel(e){

        const {dispatch} = this.props;

        dispatch({type:UpUIState.ADJUST_CLASS_MODAL_HIDE});

    }

    //调班模态框年级选择改变

    gradeSelectChange(e){
        const {value} = e;
        //如果选择的是请选择年级的话
        if (value===0){

        }
    }


    //调班模态框班级选择改变
    classSelectChange(e){

    }


    render() {
        const {UIState,DataState} = this.props;

        const {StudentLoading} = UIState;

        const {TheTeachersList,TheStudentList,SchoolGradeClasses,StudentsCheckList,StudentsCheckAll} = DataState;

        return (
            <Loading tip="加载中..." spinning={StudentLoading.show}  size="large">

                <TitleBar type="icon2" title="一年级 > 1班教师名单" abstract={`(${TheTeachersList.Total}人)`}></TitleBar>

                <ContentWrapper>

                    <Button size="small" color="blue" className="addTeacher">添加任课教师</Button>

                    <TeacherTabWrapper Teachers={TheTeachersList}></TeacherTabWrapper>

                </ContentWrapper>

                <TitleBar type="icon2" title="一年级 > 1班学生名单" abstract={`（${TheStudentList.Total}人）`}></TitleBar>

                <ContentWrapper>

                    <Search className="admclass-search-student"></Search>

                    <StudentTabWrapper  CheckList={StudentsCheckList}
                                        onChangeAll={this.onChangeAll.bind(this)}
                                        allChecked={StudentsCheckAll.checkAll}
                                        onCheckChange={this.onCheckChange.bind(this)}
                                        StudentList={TheStudentList}
                                        adjustBtnClick ={this.adjustBtnClick.bind(this)}>
                    </StudentTabWrapper>

                </ContentWrapper>

                {/*调班弹出窗*/}

                <Modal type={1} title="调班"
                       visible={UIState.AdjustClassModal.show}
                       mask={true}
                       maskClosable={true}
                       width={540}
                       bodyStyle={{height:236}}
                       className="adjustClassModal"
                       onOk={this.adjustClassOk.bind(this)}
                       onCancel={this.adjustClassCancel.bind(this)}>

                    {/*弹出层内容区域*/}

                    <div className="ModalContent">

                        <AdjustClassModal
                            schoolClassList={SchoolGradeClasses.Grades}
                            gradeSelecd={UIState.AdjustClassModal.gradeDropSelectd}
                            classSelectd ={UIState.AdjustClassModal.classDropSelectd}
                            checkList={StudentsCheckList}
                            classDisabled={UIState.AdjustClassModal.classDisabled}
                            classSelectChange={this.classSelectChange.bind(this)}
                            gradeSelectChange={this.gradeSelectChange.bind(this)}>

                        </AdjustClassModal>

                    </div>

                </Modal>


            </Loading>
        );
    }
}
const  mapStateToProps = (state) => {
    let {UIState,DataState} = state;
    return {
        UIState,
        DataState
    }
};
export default connect(mapStateToProps)(StudentContent);