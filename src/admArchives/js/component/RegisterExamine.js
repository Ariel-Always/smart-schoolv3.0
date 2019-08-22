import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../images/admAriHeadImg-1.png'
import { Frame, Menu, Loading, Alert } from "../../../common";
import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import history from '../containers/history'
import TimeBanner from './TimeBanner'
import All from './All'
import Student from './Student'
import Teacher from './Teacher'
import Leader from './Leader'
import actions from '../actions';
import $ from 'jquery'
import '../../scss/index.scss'
import '../../scss/RegisterExamine.scss'
import { DetailsModal, DropDown, PagiNation, Search, Table, Button, CheckBox, CheckBoxGroup, Modal } from '../../../common/index'

import { getData } from '../../../common/js/fetch'




class RegisterExamine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handleClick: true,
            secondDropList: [{ value: 0, title: '全部班级' }],
            DropMenuShow: false,
            columns: [
                {
                    title: '姓名',
                    dataIndex: 'UserName',
                    sorter: (a, b) => a.name.length - b.name.length,
                    render: arr => {
                        return (
                            <div className='name-content'>
                                <CheckBox value={arr.key} onChange={this.onCheckChange}></CheckBox>
                                <span onMouseEnter={this.onMouseEnterName} className='name-key'>{(arr.key + 1) >= 10 ? (arr.key + 1) : '0' + (arr.key + 1)}</span>
                                <img alt={arr.UserName} onClick={this.onUserNameClick} className='name-img' width='47' height='47' src={arr.PhotoPath}></img>
                                <span className='name-UserName' onClick={this.onUserNameClick}>{arr.UserName}</span>
                            </div>
                        )
                    }

                },
                {
                    title: '学号',
                    dataIndex: 'UserID',
                    sorter: (a, b) => a.age - b.age,
                    render: UserID => {
                        return (
                            <span className='UserID'>{UserID}</span>
                        )
                    }
                },
                {
                    title: '性别',
                    dataIndex: 'Gender',
                    render: Gender => {
                        return (
                            <span className='Gender'>{Gender}</span>
                        )
                    }
                },
                {
                    title: '年级',
                    dataIndex: 'GradeName',
                    render: GradeName => {
                        return (
                            <span className='GradeName'>{GradeName}</span>
                        )
                    }
                },
                {
                    title: '班级',
                    dataIndex: 'ClassName',
                    render: ClassName => {
                        return (
                            <span className='ClassName'>{ClassName}</span>
                        )
                    }
                },
                {
                    title: '操作',
                    dataIndex: 'key',
                    render: (key) => {

                        return (
                            <div className='handle-content'>
                                <Button color='blue' type='default' onClick={this.onExamineClick.bind(this, key)} className='handle-btn'>审核</Button>
                                
                            </div>
                        )
                    }
                }
            ],
            data: [{
                key: 1,
                UserName: { key: '01', PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg', UserName: '祝泽森' },
                UserID: 'S00001',
                Grader: '男',
                GradeName: '一年级',
                ClassName: '一年1班',
                Others: {}
            }],
            loading: false,
            selectedAll: false,
            checkedList: [],
            checkAll: false,
        }
        let route = history.location.pathname;
        console.log(route);
    }

    componentWillMount() {

    }

    onExaminedClick = () => {
        this.setState({
            handleClick: false
        })
    }
    onExaminingClick = () => {
        this.setState({
            handleClick: true
        })
    }
    StudentDropMenu = (e) => {
        const { dispatch } = this.props;
        console.log(e);
        let Classes = [{ value: 0, title: '全部班级' }];

        //console.log(this.refs.dropMenuSecond)
        if (e.value !== 0) {
            let ClassArr = this.props.DataState.GradeClassMsg.returnData.AllClasses[e.value];
            ClassArr.map((Class) => {
                Classes.push(Class);
            })
            //Classes.push(this.props.DataState.GradeClassMsg.returnData.AllClasses[e.value]);
            //this.refs.dropMenuSecond.state.dropList = Classes;]
            this.setState({
                secondDropList: Classes,
            })
            dispatch(actions.UpDataState.getGradeStudentPreview('/ArchivesStudent?SchoolID=schoolID&GradeID=gradeID&ClassID=ClassID&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC'));
            this.setState({
                DropMenuShow: true
            })
        } else {
            dispatch(actions.UpDataState.getGradeStudentPreview('/ArchivesStudent?SchoolID=schoolID&GradeID=gradeID&ClassID=ClassID&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC'));
            this.setState({
                DropMenuShow: false
            })
        }

    }

    StudentDropMenuSecond = (e) => {
        const { dispatch } = this.props;
        console.log(e);
        //dispatch(actions.UpDataState.getGradeStudentPreview('/ArchivesStudent?SchoolID=schoolID&GradeID=gradeID&ClassID=ClassID&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC'));
    }

    OnCheckAllChange = (e) => {
        console.log(e)
        if (e.target.checked) {
            this.setState({
                checkedList: this.props.DataState.GradeStudentPreview.keyList,
                checkAll: e.target.checked
            })
        } else {
            this.setState({
                checkedList: [],
                checkAll: e.target.checked
            })
        }
    }
    onCheckBoxGroupChange = (checkedList) => {
        console.log(checkedList)
        this.setState({
            checkedList,
            checkAll: checkedList.length === this.props.DataState.GradeStudentPreview.keyList ? true : false
        })
    }
    onExamineClick = (key) => {

    }
    onPagiNationChange = (e) => {
        console.log(e)
    }
    render() {
        const { UIState, DataState } = this.props;
        const data = {
            userName:'康欣',
            userImg:'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg',
            Gende:'男',
            userText:'学如逆水行舟，不进则退',
            userID:'20170025444',
            userGrade:'一年级',
            userClass:'1班',
            userIDCard:'',
            userPhone:'15626248624',
            userMail:'1519406168@qq.com',
            userAddress:'蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团'
        };
        return (
            <React.Fragment>
                <Frame userInfo={{
                    name: DataState.LoginUser.UserName,
                    image: DataState.LoginUser.PhotoPath
                }}

                    module={{
                        cnname: "用户档案管理",
                        enname: "User profile management",
                        image: logo
                    }}
                    type="circle" showLeftMenu={false}
                    showBarner={false}>
                    <div ref="frame-right-content">
                        <div className='content-top'>
                            <span className='top-tips'><i className='top-icon'></i>学生注册审核</span>
                        </div>
                        <div className='content-main'>
                            <div className='main-handle'>
                                <button onClick={this.onExaminingClick} className={`handle-btn btn-examining ${this.state.handleClick ? 'active' : ''} `} >待审核</button>
                                <button onClick={this.onExaminedClick} className={`handle-btn btn-examined ${!this.state.handleClick ? 'active' : ''} `} >已审核</button>
                            </div>
                            <div className='main-select'>
                                <DropDown

                                    onChange={this.StudentDropMenu}
                                    width={120}
                                    height={72}

                                    dropSelectd={{ value: 0, title: '全部年级' }}
                                    dropList={DataState.GradeClassMsg.returnData ? DataState.GradeClassMsg.returnData.grades : [{ value: 0, title: '全部年级' }]}
                                ></DropDown>
                                <DropDown

                                    width={120}
                                    height={72}

                                    style={{ display: this.state.DropMenuShow ? 'block' : 'none' }}
                                    dropSelectd={{ value: 0, title: '全部班级' }}
                                    dropList={this.state.secondDropList}
                                    onChange={this.StudentDropMenuSecond}
                                ></DropDown>
                                <Search placeHolder='搜索'
                                    onClickSearch={this.StudentSearch}
                                    height={30}
                                    width={80}
                                ></Search>
                            </div>
                            <div className='content-render'>
                            
                                <CheckBoxGroup style={{ width: '100%' }} value={this.state.checkedList} onChange={this.onCheckBoxGroupChange.bind(this)}>
                                    <Table
                                        className='table'
                                        columns={this.state.columns}
                                        pagination={false}
                                        loading={this.state.loading}
                                        dataSource={this.state.data} >

                                    </Table>
                                </CheckBoxGroup>
                                <CheckBox className='checkAll-box' onChange={this.OnCheckAllChange} checked={this.state.checkAll}>
                                    全选
                                    <Button onClick={this.onDeleteAllClick} className='deleteAll' color='blue'>删除</Button>
                                </CheckBox>
                                <div className='pagination-box'>
                                    <PagiNation 
                                    showQuickJumper  
                                    total={50} 
                                    onChange={this.onPagiNationChange}
                                    ></PagiNation>
                                </div>
                            
                        </div>
                        </div>
                    </div>
                </Frame>
                <DetailsModal
                    ref='StudentDetailsMsgModal'
                    visible={this.state.StudentDetailsMsgModalVisible}
                    onOk={this.StudentDetailsMsgModalOk}
                    onCancel={this.StudentDetailsMsgModalCancel}
                    data={data}
                    type='student'
                >
                    <div className='modal-top'>

                    </div>
                    <div className='modal-content'></div>
                </DetailsModal>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    let { UIState, DataState } = state;
    return {
        UIState,
        DataState
    }
};

export default connect(mapStateToProps)(RegisterExamine)