import React,{Component} from 'react';

import {connect} from 'react-redux';

import TitleBar from '../../component/TitleBar';

import {Empty,Modal,CheckBox, CheckBoxGroup, Button, PagiNation, Loading,Search} from "../../../../common";

import CCActions from '../../actions/Teacher/ClassChargeActions'

import StudentInfo from './StudentInfoModal';

import SIMActions from '../../actions/Teacher/StudentInfoModalActions';



class StudentWrapper extends Component{

    constructor(props) {

        super(props);

        const { dispatch } = props;

    }

    //设置取消班长
    MonitorClick(Params){

        const { dispatch } = this.props;

        dispatch(CCActions.SetMonitor(Params))

    }

    //搜索的值发生变化

    StuSearchInputChange(e){

        const { dispatch } = this.props;

        dispatch({type:CCActions.TEACHER_CLASS_CHARGE_STUDENT_SEARCH_VALUE_CHANGE,data:e.target.value});

    }

    //学生点击搜索

    StuSearchClick(e){

        const { dispatch } = this.props;

        dispatch(CCActions.StuSearchClick());

    }

    //学生取消搜索

    StuCancelSearch(){

        const { dispatch } = this.props;

        dispatch(CCActions.StuCancelSearch());

    }

    //学生页码发生变化

    StudentPageChange(e){

        const { dispatch } = this.props;

        dispatch(CCActions.StudentPageChange(e));

    }

    //点击某一个学生

    StuCheckedChange(e){

        const { dispatch } = this.props;

        dispatch(CCActions.StuCheckedChange(e));

    }

    //学生全选或者取消全选

    StudentCheckAll(CheckAll){

        const { dispatch } = this.props;

        dispatch(CCActions.StudentCheckAll(CheckAll));

    }

    //删除学生

    DelStudent(){

        const { dispatch } = this.props;

        dispatch(CCActions.DelStudent());

    }

    //关闭添加或者编辑学生弹窗

    StudentModalHide(e){

        const { dispatch } = this.props;

        dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_ERROR_TIPS_HIDE,data:{type:""}});

        dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_HIDE});

    }

    //点击确定

    StudentModalOk(e){

        const { dispatch } = this.props;

        dispatch(SIMActions.StudentModalOk());

    }

    //点击弹出编辑学生详情弹窗

    EditorModalShow(UserID){

        const { dispatch } = this.props;

        dispatch({type:SIMActions.TEACHER_STUDENT_INFO_EDITOR_STUDENT_ID_CHANGE,data:UserID});

        dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_SHOW});

    }




    render(){

        const { ClassCharge,StudentInfoModal } = this.props;



        const {

            StudentCheckList,StudentAllCheck,StudentPower,TeacherPower,

            StudentSearchValue,StuCancelSearchBtn,StudentLoading,

            StudentPage

        } = ClassCharge;

        const { Total,List } = ClassCharge.Student;

        return <div className="teacher-stu-list-wrapper">

            <TitleBar type="icon3" title="班级学生" abstract={`(共${Total}人)`}></TitleBar>

            <Search onCancelSearch={this.StuCancelSearch.bind(this)} placeHolder="请输入学生名称或学号搜索" Value={StudentSearchValue} CancelBtnShow={StuCancelSearchBtn} onChange={this.StuSearchInputChange.bind(this)} width={240} onClickSearch={this.StuSearchClick.bind(this)}></Search>

            <Loading spinning={StudentLoading}>

                <div className="person-tab-wrapper clearfix">

                {

                    List.length>0?

                        <React.Fragment>

                            <CheckBoxGroup className="clearfix" value={StudentCheckList} onChange={this.StuCheckedChange.bind(this)}>

                                {
                                    List.map((item,key) => {
                                        //是否是班长
                                        let isMonitor = item.UserClass===1?true:false;
                                        //性别男女或者保密
                                        let sex= 'none';

                                        switch (item.Gender) {
                                            case '男':
                                                sex = 'men';
                                                break;
                                            case '女':
                                                sex = 'women';
                                                break;
                                            default:
                                                sex = 'none'
                                        }

                                        return <div key={key} className={`person-item-wrapper ${isMonitor?'monitor':''}`} >

                                            <div className="person-item-content clearfix">

                                                <div className="person-item-photo" style={{backgroundImage:`url(${item.PhotoPath})`}}></div>

                                                <div className="person-item-info-wrapper">

                                                    <div className="person-item-info">

                                                        <div className="person-item-name" title={item.UserName}>{item.UserName}</div>

                                                        <div className={`person-sex-icon ${sex}`}></div>

                                                    </div>

                                                    <div className="person-item-id" title={item.UserID}>{item.UserID}</div>

                                                </div>

                                                {

                                                    StudentPower?

                                                        <CheckBox type="circle" value={item.UserID}></CheckBox>

                                                        :''

                                                }

                                                <div className="cooperate">

                                                    <div className="set-monitor" onClick={()=>{this.MonitorClick({UserID:item.UserID,isMonitor})}}>{isMonitor?'取消班长':'设为班长'}</div>

                                                    {

                                                        StudentPower?

                                                            <React.Fragment>

                                                                <div className="line"></div>

                                                                <div className="editor-stu" onClick={this.EditorModalShow.bind(this,item.UserID)}>编辑</div>

                                                            </React.Fragment>

                                                            :''

                                                    }


                                                </div>

                                            </div>

                                            <div className="person-item-border"></div>

                                        </div>

                                    })
                                }

                            </CheckBoxGroup>

                            {

                                StudentPower?

                                    <div className="person-checkgroup-wrapper">

                                        <CheckBox checked={StudentAllCheck} onChange={this.StudentCheckAll.bind(this,StudentAllCheck)}>全选</CheckBox>

                                        <Button size="small" className="person-adjust-btn" color="red" onClick={this.DelStudent.bind(this)}>删除</Button>

                                    </div>

                                    :''

                            }


                            <PagiNation  className={`${StudentPower?'right':'center'}`} pageSize={20} onChange={e=>this.StudentPageChange(e)} total={Total} current={StudentPage}></PagiNation>

                        </React.Fragment>

                        :
                        <Empty type="3" title="没有对应的学生数据"></Empty>


                }

            </div>

            </Loading>

            <Modal type={1} title={StudentInfoModal.Title}

                   visible={StudentInfoModal.Show}

                   mask={true} width={810}

                   bodyStyle={{height:420}}

                   maskClosable={true}

                   className="student-modal"

                   cancelText = "取消"

                   onCancel={this.StudentModalHide.bind(this)}

                   onOk = {this.StudentModalOk.bind(this)}
            >

                <Loading spinning={StudentInfoModal.Loading}>

                    {

                        StudentInfoModal.Show?

                            <StudentInfo></StudentInfo>

                            :''

                    }

                </Loading>


            </Modal>

        </div>

    }

}

const mapStateToProps = (state)=>{

    const{ ClassCharge,StudentInfoModal } = state.Teacher;

    return {

        ClassCharge,

        StudentInfoModal

    }

};

export default connect(mapStateToProps)(StudentWrapper);