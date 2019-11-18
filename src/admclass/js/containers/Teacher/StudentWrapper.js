import React,{Component} from 'react';

import {connect} from 'react-redux';

import TitleBar from '../../component/TitleBar';

import {Empty, CheckBox, CheckBoxGroup, Button, PagiNation, Loading,Search} from "../../../../common";

import CCActions from '../../actions/Teacher/ClassChargeActions'



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

        console.log(e);

        dispatch(CCActions.StudentPageChange(e));

    }




    render(){

        const { ClassCharge } = this.props;



        const {

            StuCheckList,allChecked,StudentPower,TeacherPower,

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

                            <CheckBoxGroup className="clearfix" value={StuCheckList} onChange={(e)=>{onCheckChange(e)}}>

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

                                                        <CheckBox  type="gray" value={JSON.stringify({id:item.UserID,name:item.UserName})}></CheckBox>

                                                        :''

                                                }

                                                <div className="cooperate">

                                                    <div className="set-monitor" onClick={()=>{this.MonitorClick({UserID:item.UserID,isMonitor})}}>{isMonitor?'取消班长':'设为班长'}</div>

                                                    {

                                                        StudentPower?

                                                            <React.Fragment>

                                                                <div className="line"></div>

                                                                <div className="editor-stu">编辑</div>

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

                                        <CheckBox checked={allChecked} onChange={()=>{this.onChangeAll()}}>全选</CheckBox>

                                        <Button size="small" className="person-adjust-btn" color="red" onClick={e=>adjustBtnClick(e)}>删除</Button>

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

        </div>

    }

}

const mapStateToProps = (state)=>{

    const{ ClassCharge } = state.Teacher;

    return {

        ClassCharge

    }

};

export default connect(mapStateToProps)(StudentWrapper);