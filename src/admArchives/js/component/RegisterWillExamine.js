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




class RegisterWillExamine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            secondDropList: [{ value: 0, title: '全部班级' }],
            DropMenuShow: false,
            columns: [
                {
                    title: '',
                    dataIndex: 'key',
                    key: 'key',
                    align: 'left',
                    render: key => {
                        return (
                            <div className='registerTime-content'>
                                <CheckBox value={key} onChange={this.onCheckChange}></CheckBox>
                                <span className='key-content'>{key >= 10 ? key : '0' + key}</span>
                            </div>
                        )
                    }
                }, {
                    title: '注册时间',
                    align: 'center',
                    dataIndex: 'UserRegisterTime',
                    key: 'UserRegisterTime',
                    sorter: (a, b) => a.name.length - b.name.length,
                    render: time => {
                        return (
                            <div className='registerTime-content'>

                                <span className='registerTime'>{time}</span>
                            </div>
                        )
                    }
                },
                {
                    title: '',
                    align: 'right',
                    dataIndex: 'UserName',
                    key: 'UserImg',
                    width: 60,
                    render: arr => {
                        return (
                            <div className='name-content'>
                                <img alt={arr.UserName} onClick={this.onUserNameClick} className='name-img' width='47' height='47' src={arr.PhotoPath}></img>
                                
                            </div>
                        )
                    }

                },
                {
                    title: '姓名',
                    align: 'left',
                    dataIndex: 'UserName',
                    key: 'UserName',
                    sorter: (a, b) => a.name.length - b.name.length,
                    render: arr => {
                        return (
                            <div className='name-content'>
                                
                                <span className='name-UserName' onClick={this.onUserNameClick}>{arr.UserName}</span>
                            </div>
                        )
                    }

                },
                {
                    title: '学号',
                    align: 'center',
                    dataIndex: 'UserID',
                    key: 'UserID',
                    sorter: (a, b) => a.age - b.age,
                    render: UserID => {
                        return (
                            <span className='UserID'>{UserID}</span>
                        )
                    }
                },
                {
                    title: '性别',
                    align: 'center',
                    dataIndex: 'Gender',
                    key: 'Gender',
                    render: Gender => {
                        return (
                            <span className='Gender'>{Gender}</span>
                        )
                    }
                },
                {
                    title: '年级',
                    align: 'center',
                    dataIndex: 'GradeName',
                    key: 'GradeName',
                    render: GradeName => {
                        return (
                            <span className='GradeName'>{GradeName}</span>
                        )
                    }
                },
                {
                    title: '班级',
                    align: 'center',
                    dataIndex: 'ClassName',
                    key: 'ClassName',
                    render: ClassName => {
                        return (
                            <span className='ClassName'>{ClassName}</span>
                        )
                    }
                },
                {
                    title: '操作',
                    align: 'right',
                    dataIndex: 'Others',
                    key: 'Others',
                    render: (Others) => {

                        return (
                            <div className='handle-content'>
                                <Button color='blue' type='default' disabled={Others.isExamined} onClick={this.onExamineClick.bind(this, Others)} className={`handle-btn `}>{Others.isExamined ? '已审核' : '审核'}</Button>

                            </div>
                        )
                    }
                }
            ],
            data: [{
                key: 1,
                UserRegisterTime: '2019-01-01 12:24',
                UserName: { key: '01', PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg', UserName: '祝泽森' },
                UserID: 'S00001',
                Gender: '男',
                GradeName: '一年级',
                ClassName: '1班',
                Others: {
                    key: 1,
                    userRegisterTime: '2019-01-01',
                    UserName: { key: '01', PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg', UserName: '祝泽森' },
                    UserID: 'S00001',
                    Grader: '男',
                    GradeName: '一年级',
                    ClassName: '1班',
                    isExamined: false,
                }
            },
            {
                key: 2,
                UserRegisterTime: '2019-01-01 12:24',
                UserName: { key: '02', PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg', UserName: '祝泽森' },
                UserID: 'S00001',
                Gender: '男',
                GradeName: '一年级',
                ClassName: '1班',
                Others: {
                    key: 2,
                    userRegisterTime: '2019-01-01',
                    UserName: { key: '02', PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg', UserName: '祝泽森' },
                    UserID: 'S00001',
                    Grader: '男',
                    GradeName: '一年级',
                    ClassName: '1班',
                    isExamined: false,
                }
            },
            {
                key: 3,
                UserRegisterTime: '2019-01-01 12:24',
                UserName: { key: '03', PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg', UserName: '祝泽森' },
                UserID: 'S00001',
                Gender: '男',
                GradeName: '一年级',
                ClassName: '1班',
                Others: {
                    key: 3,
                    userRegisterTime: '2019-01-01',
                    UserName: { key: '03', PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg', UserName: '祝泽森' },
                    UserID: 'S00001',
                    Grader: '男',
                    GradeName: '一年级',
                    ClassName: '1班',
                    isExamined: false,
                }
            },
            {
                key: 4,
                UserRegisterTime: '2019-01-01 12:24',
                UserName: { key: '04', PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg', UserName: '祝泽森' },
                UserID: 'S00001',
                Gender: '男',
                GradeName: '一年级',
                ClassName: '1班',
                Others: {
                    key: 4,
                    userRegisterTime: '2019-01-01',
                    UserName: { key: '04', PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg', UserName: '祝泽森' },
                    UserID: 'S00001',
                    Grader: '男',
                    GradeName: '一年级',
                    ClassName: '1班',
                    isExamined: false,
                }
            },
            {
                key: 5,
                UserRegisterTime: '2019-01-01 12:24',
                UserName: { key: '05', PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg', UserName: '祝泽森' },
                UserID: 'S00001',
                Gender: '男',
                GradeName: '一年级',
                ClassName: '1班',
                Others: {
                    key: 5,
                    userRegisterTime: '2019-01-01',
                    UserName: { key: '05', PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg', UserName: '祝泽森' },
                    UserID: 'S00001',
                    Grader: '男',
                    GradeName: '一年级',
                    ClassName: '1班',
                    isExamined: false,
                }
            },
            {
                key: 6,
                UserRegisterTime: '2019-01-01 12:24',
                UserName: { key: '06', PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg', UserName: '祝泽森' },
                UserID: 'S00001',
                Gender: '男',
                GradeName: '一年级',
                ClassName: '1班',
                Others: {
                    key: 6,
                    userRegisterTime: '2019-01-01',
                    UserName: { key: '06', PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg', UserName: '祝泽森' },
                    UserID: 'S00001',
                    Grader: '男',
                    GradeName: '一年级',
                    ClassName: '1班',
                    isExamined: false,
                }
            },
            {
                key: 7,
                UserRegisterTime: '2019-01-01 12:24',
                UserName: { key: '07', PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg', UserName: '祝泽森' },
                UserID: 'S00001',
                Gender: '男',
                GradeName: '一年级',
                ClassName: '1班',
                Others: {
                    key: 7,
                    userRegisterTime: '2019-01-01',
                    UserName: { key: '07', PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg', UserName: '祝泽森' },
                    UserID: 'S00001',
                    Grader: '男',
                    GradeName: '一年级',
                    ClassName: '1班',
                    isExamined: false,
                }
            },
            {
                key: 8,
                UserRegisterTime: '2019-01-01 12:24',
                UserName: { key: '08', PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg', UserName: '祝泽森' },
                UserID: 'S00001',
                Gender: '男',
                GradeName: '一年级',
                ClassName: '1班',
                Others: {
                    key: 8,
                    userRegisterTime: '2019-01-01',
                    UserName: { key: '08', PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg', UserName: '祝泽森' },
                    UserID: 'S00001',
                    Grader: '男',
                    GradeName: '一年级',
                    ClassName: '1班',
                    isExamined: false,
                }
            },
            {
                key: 9,
                UserRegisterTime: '2019-01-01 12:24',
                UserName: { key: '09', PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg', UserName: '祝泽森' },
                UserID: 'S00001',
                Gender: '男',
                GradeName: '一年级',
                ClassName: '1班',
                Others: {
                    key: 9,
                    userRegisterTime: '2019-01-01',
                    UserName: { key: '09', PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg', UserName: '祝泽森' },
                    UserID: 'S00001',
                    Grader: '男',
                    GradeName: '一年级',
                    ClassName: '1班',
                    isExamined: false,
                }
            },
            {
                key: 10,
                UserRegisterTime: '2019-01-01 12:24',
                UserName: { key: '10', PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg', UserName: '祝泽森' },
                UserID: 'S00001',
                Gender: '男',
                GradeName: '一年级',
                ClassName: '1班',
                Others: {
                    key: 10,
                    userRegisterTime: '2019-01-01',
                    UserName: { key: '10', PhotoPath: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg', UserName: '祝泽森' },
                    UserID: 'S00001',
                    Grader: '男',
                    GradeName: '一年级',
                    ClassName: '1班',
                    isExamined: false,
                }
            },

            ],
            keyList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            loading: false,
            selectedAll: false,
            checkedList: [],
            checkAll: false,
            UserExamineModalVisible: false,
            alertShow: false,
            alertTitle: '提示信息',
            alertQueryShow: false,
            alertQueryTitle: '查询提示~',
        }
        let route = history.location.pathname;
        console.log(route);
    }

    componentWillMount() {

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
        console.log(e.target.checked, this.state.keyList)
        if (e.target.checked) {
            this.setState({
                checkedList: this.state.keyList,
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
            checkAll: checkedList === this.state.keyList ? true : false
        })
    }
    onExamineClick = (Others) => {
        console.log(Others);
        let arr = this.state.data;
        //arr[Others.key-1].Others[isExamined] = !arr[Others.key-1].Others[isExamined];
        this.setState({
            UserExamineModalVisible: true,

        })
    }
    onPagiNationChange = (e) => {
        console.log(e)
    }
    
    onUserNameClick = (e) => {
        this.setState({
            UserExamineModalVisible: true,

        })
    }
    onAgreeAll = (e) => {
        const { dispatch } = this.props;
        console.log(this.state.checkedList)
        let checkedList = this.state.checkedList;
        if (checkedList.length) {
            dispatch(actions.UpUIState.showErrorAlert({
                type: 'btn-query',
                title: "你确定选的通过？",
                ok: this.onAlertQueryOk.bind(this),
                cancel: this.onAlertQueryClose.bind(this),
                close: this.onAlertQueryClose.bind(this)
            }));
        } else {
            dispatch(actions.UpUIState.showErrorAlert({
                type: 'btn-warn',
                title: "您还没有选择哦~",
                ok: this.onAlertWarnOk.bind(this),
                cancel: this.onAlertWarnClose.bind(this),
                close: this.onAlertWarnClose.bind(this)
            }));


        }
    }
    RefuseAll = (e) => {
        const { dispatch } = this.props;
        console.log(this.state.checkedList)
        let checkedList = this.state.checkedList;
        if (checkedList.length) {
            dispatch(actions.UpUIState.showErrorAlert({
                type: 'btn-query',
                title: "你确定选的不通过？",
                ok: this.onAlertQueryOk.bind(this),
                cancel: this.onAlertQueryClose.bind(this),
                close: this.onAlertQueryClose.bind(this)
            }));
        } else {

            dispatch(actions.UpUIState.showErrorAlert({
                type: 'btn-warn',
                title: "您还没有选择哦~",
                ok: this.onAlertWarnOk.bind(this),
                cancel: this.onAlertWarnClose.bind(this),
                close: this.onAlertWarnClose.bind(this)
            }));

        }
    }
    onAlertWarnClose = () => {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    onAlertWarnOk = () => {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    onAlertQueryClose = () => {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    onAlertQueryOk = () => {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    UserExamineMadalCancel = () => {
        this.setState({
            UserExamineModalVisible: false,

        })
    }
    UserExamineMadalOk = () => {
        this.setState({
            UserExamineModalVisible: false,

        })
    }

    render() {
        const { UIState, DataState } = this.props;
        const data = {
            userName: '康欣',
            userImg: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg',
            Gende: '男',
            userText: '学如逆水行舟，不进则退',
            userID: '20170025444',
            userGrade: '一年级',
            userClass: '1班',
            userIDCard: '',
            userPhone: '15626248624',
            userMail: '1519406168@qq.com',
            userAddress: '蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团',
            userRegisterTime: '2019-01-01 12:24',
            userRegisterIP: '190.163.252.198'
        };
        return (
            <React.Fragment>


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
                    <Loading tip='loading...' spinning={this.state.loading}>
                        <CheckBoxGroup style={{ width: '100%' }} value={this.state.checkedList} onChange={this.onCheckBoxGroupChange.bind(this)}>
                            <Table
                                className='table'
                                columns={this.state.columns}
                                pagination={false}
                                loading={this.state.loading}
                                dataSource={this.state.data} >

                            </Table>
                        </CheckBoxGroup>
                    </Loading>
                    <CheckBox className='checkAll-box' onChange={this.OnCheckAllChange} checked={this.state.checkAll}>
                        全选

                                    <Button key='agree' className='agreeAll' color='blue' onClick={this.onAgreeAll.bind(this)}>通过</Button>
                        <Button key='refuse' className='refuseAll' color='red' onClick={this.RefuseAll.bind(this)}>不通过</Button>
                    </CheckBox>
                    <div className='pagination-box'>
                        <PagiNation
                            showQuickJumper
                            total={50}
                            onChange={this.onPagiNationChange}
                        ></PagiNation>
                    </div>

                </div>


                <DetailsModal
                    ref='StudentDetailsMsgModal'
                    visible={this.state.UserExamineModalVisible}
                    onOk = {this.UserExamineMadalOk}
                    onCancel={this.UserExamineMadalCancel}
                    data={data}
                    
                    type='examine'
                >

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

export default connect(mapStateToProps)(RegisterWillExamine)