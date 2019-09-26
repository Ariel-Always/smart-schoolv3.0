import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../images/admAriHeadImg-1.png'
import { Frame, Menu, Loading, Alert } from "../../../common";
import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import history from '../containers/history'
import CONFIG from '../../../common/js/config';
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

import { getData, postData } from '../../../common/js/fetch'




class RegisterWillExamine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            secondDropList: [{ value: 0, title: '全部班级' }],
            DropMenuShow: false,
            columns: [
                {
                    title: '',
                    dataIndex: 'OrderNo',
                    key: 'OrderNo',
                    width: 70,
                    align: 'center',
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
                    width: 130,
                    dataIndex: 'SignUpTime',
                    key: 'SignUpTime',
                    sorter: true,
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
                                <img alt={arr.UserName} onClick={this.onUserNameClick.bind(this, arr.key)} className='name-img' width='47' height='47' src={arr.PhotoPath}></img>

                            </div>
                        )
                    }

                },
                {
                    title: '姓名',
                    align: 'left',
                    dataIndex: 'UserName',
                    width: 70,
                    key: 'UserName',
                    sorter: true,
                    render: arr => {
                        return (
                            <div className='name-content'>

                                <span className='name-UserName' onClick={this.onUserNameClick.bind(this, arr.key)}>{arr.UserName}</span>
                            </div>
                        )
                    }

                },
                {
                    title: '学号',
                    align: 'center',
                    dataIndex: 'UserID',
                    key: 'UserID',
                    width: 120,
                    sorter: true,
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
                    width: 70,
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
                    dataIndex: 'Grade',
                    width: 70,
                    key: 'Grade',
                    render: Grade => {
                        return (
                            <span className='GradeName'>{Grade.GradeName}</span>
                        )
                    }
                },
                {
                    title: '班级',
                    align: 'center',
                    width: 70,
                    dataIndex: 'Class',
                    key: 'Class',
                    render: Class => {
                        return (
                            <span className='ClassName'>{Class.ClassName}</span>
                        )
                    }
                },
                {
                    title: '操作',
                    align: 'center',
                    dataIndex: 'key',
                    width: 150,
                    key: 'Others',
                    render: (key) => {

                        return (
                            <div className='handle-content'>
                                <Button color='blue' type='default' disabled={false} onClick={this.onExamineClick.bind(this, key)} className={`handle-btn `}>{'审核'}</Button>
                            </div>
                        )
                    }
                }
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
            firstSelect: { value: 0, title: '全部年级' },
            secondSelect: { value: 0, title: '全部班级' },
            handleUserMsg: [],
            pageindex: 0,
            StudentDetailsMsgModalVisible: false
        }

    }

    componentWillMount() {

    }


    StudentDropMenu = (e) => {
        const { dispatch } = this.props;
        console.log(e);
        let Classes = [{ value: 0, title: '全部班级' }];
        this.setState({
            firstSelect: e
        })
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
            dispatch(actions.UpDataState.getWillSignUpLog('/GetSignUpLogToPage?SchoolID=school1&PageIndex=0&PageSize=10&status=0&gradeID=' + e.value))

            this.setState({
                DropMenuShow: true
            })
        } else {
            dispatch(actions.UpDataState.getWillSignUpLog('/GetSignUpLogToPage?SchoolID=school1&PageIndex=0&PageSize=10&status=0'))
            this.setState({
                DropMenuShow: false,
                secondSelect: { value: 0, title: '全部班级' }
            })
        }

    }

    StudentDropMenuSecond = (e) => {
        const { dispatch } = this.props;

        this.setState({
            secondSelect: e
        })
        if (e.value === 0) {
            dispatch(actions.UpDataState.getWillSignUpLog('/GetSignUpLogToPage?SchoolID=school1&PageIndex=0&PageSize=10&status=0&gradeID=' + this.state.firstSelect.value))
        } else {
            dispatch(actions.UpDataState.getWillSignUpLog('/GetSignUpLogToPage?SchoolID=school1&PageIndex=0&PageSize=10&status=0&gradeID=' + this.state.firstSelect.value + '&classID=' + e.value))

        }

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
    onExamineClick = (key) => {
        const { DataState } = this.props
        let arr = this.state.data;
        //arr[Others.key-1].Others[isExamined] = !arr[Others.key-1].Others[isExamined];
        this.setState({
            UserExamineModalVisible: true,
            handleUserMsg: DataState.GetSignUpLog.WillData.returnData[key].UserMsg
        })
    }
    onPagiNationChange = (e) => {

        const { dispatch } = this.props;
        this.setState({
            pageindex: e - 1
        })
        if (this.state.firstSelect.value === 0) {
            dispatch(actions.UpDataState.getWillSignUpLog('/GetSignUpLogToPage?SchoolID=school1&PageIndex=' + (--e) + '&PageSize=10&status=0'))
        } else if (this.state.secondSelect.value === 0)
            dispatch(actions.UpDataState.getWillSignUpLog('/GetSignUpLogToPage?SchoolID=school1&PageIndex=' + (--e) + '&PageSize=10&status=0&gradeID=' + this.state.firstSelect.value))
        else {
            dispatch(actions.UpDataState.getWillSignUpLog('/GetSignUpLogToPage?SchoolID=school1&PageIndex=' + (--e) + '&PageSize=10&status=0&gradeID=' + this.state.firstSelect.value + '&classID=' + this.state.secondSelect.value))
        }
    }

    onUserNameClick = (key) => {
        const { DataState } = this.props
        this.setState({
            StudentDetailsMsgModalVisible: true,
            handleUserMsg: DataState.GetSignUpLog.WillData.returnData[key].UserMsg
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
                ok: this.onPassQueryOk.bind(this),
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
                ok: this.onFailQueryOk.bind(this),
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

    onPassQueryOk = () => {
        const { dispatch, DataState } = this.props;
        let checkList = this.state.checkedList;
        let StatusCount = DataState.GetSignUpLog.newStatus;
        let logID = checkList.map((child, index) => {
            return DataState.GetSignUpLog.WillData.returnData[child - 1].UserMsg.logID;
        })
        let url = '/SignUpLogAudit'
        dispatch(actions.UpDataState.setSignUpLogCountMsg(StatusCount + logID.length));
        console.log(StatusCount)
        postData(CONFIG.UserInfoProxy + url, {
            LogID: logID.join(),
            Status: 1
        }, 2).then(res => {
            return res.json()
        }).then(json => {
            if (json.Status === 400) {
                console.log('错误码：400' + json);
                dispatch(actions.UpUIState.hideErrorAlert());
            } else if (json.Status === 200) {
                dispatch(actions.UpUIState.hideErrorAlert());

                this.setState({
                    checkAll: false,
                    checkList: []
                })

                // dispatch(actions.UpDataState.setSignUpLogCountMsg(++StatusCount))

                if (this.state.firstSelect.value === 0) {
                    dispatch(actions.UpDataState.getWillSignUpLog('/GetSignUpLogToPage?SchoolID=school1&PageIndex=0&PageSize=10&status=0'))
                } else if (this.state.secondSelect.value === 0)
                    dispatch(actions.UpDataState.getWillSignUpLog('/GetSignUpLogToPage?SchoolID=school1&PageIndex=0&PageSize=10&status=0&gradeID=' + this.state.firstSelect.value))
                else {
                    dispatch(actions.UpDataState.getWillSignUpLog('/GetSignUpLogToPage?SchoolID=school1&PageIndex=0&PageSize=10&status=0&gradeID=' + this.state.firstSelect.value + '&classID=' + this.state.secondSelect.value))
                }
            }
        });
    }
    //批量不通过
    onFailQueryOk = () => {
        const { dispatch, DataState } = this.props;
        let checkList = this.state.checkedList;
        let logID = checkList.map((child, index) => {
            return DataState.GetSignUpLog.WillData.returnData[child - 1].UserMsg.logID;
        })
        let StatusCount = DataState.GetSignUpLog.newStatus;
        let url = '/SignUpLogAudit'
        dispatch(actions.UpDataState.setSignUpLogCountMsg(StatusCount + logID.length));

        postData(CONFIG.UserInfoProxy + url, {
            LogID: logID.join(),
            Status: 2
        }, 2).then(res => {
            return res.json()
        }).then(json => {
            if (json.Status === 400) {
                console.log('错误码：400' + json)
            } else if (json.Status === 200) {
                dispatch(actions.UpUIState.hideErrorAlert());

                this.setState({
                    checkAll: false,
                    checkList: []
                })
                // dispatch(actions.UpDataState.setSignUpLogCountMsg(StatusCount + logID.length));

                if (this.state.firstSelect.value === 0) {
                    dispatch(actions.UpDataState.getWillSignUpLog('/GetSignUpLogToPage?SchoolID=school1&PageIndex=0&PageSize=10&status=0'))
                } else if (this.state.secondSelect.value === 0)
                    dispatch(actions.UpDataState.getWillSignUpLog('/GetSignUpLogToPage?SchoolID=school1&PageIndex=0&PageSize=10&status=0&gradeID=' + this.state.firstSelect.value))
                else {
                    dispatch(actions.UpDataState.getWillSignUpLog('/GetSignUpLogToPage?SchoolID=school1&PageIndex=0&PageSize=10&status=0&gradeID=' + this.state.firstSelect.value + '&classID=' + this.state.secondSelect.value))
                }
            }
        });
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
    //审核窗口事件
    UserExamineMadalCancel = () => {
        this.setState({
            UserExamineModalVisible: false,

        })
    }
    //不通过
    UserExamineMadalFail = (userMsg) => {
        const { dispatch,DataState } = this.props;
        let StatusCount = DataState.GetSignUpLog.newStatus;
        let url = '/SignUpLogAudit'
        dispatch(actions.UpDataState.setSignUpLogCountMsg(++StatusCount));

        postData(CONFIG.UserInfoProxy + url, {
            LogID: userMsg.logID,
            Status: 2
        }, 2).then(res => {
            return res.json()
        }).then(json => {
            if (json.Status === 400) {
                console.log('错误码：400' + json)
            } else if (json.Status === 200) {
                this.setState({
                    UserExamineModalVisible: false,
                })
                if (this.state.firstSelect.value === 0) {
                    dispatch(actions.UpDataState.getWillSignUpLog('/GetSignUpLogToPage?SchoolID=school1&PageIndex=0&PageSize=10&status=0'))
                } else if (this.state.secondSelect.value === 0)
                    dispatch(actions.UpDataState.getWillSignUpLog('/GetSignUpLogToPage?SchoolID=school1&PageIndex=0&PageSize=10&status=0&gradeID=' + this.state.firstSelect.value))
                else {
                    dispatch(actions.UpDataState.getWillSignUpLog('/GetSignUpLogToPage?SchoolID=school1&PageIndex=0&PageSize=10&status=0&gradeID=' + this.state.firstSelect.value + '&classID=' + this.state.secondSelect.value))
                }
            }
        });
    }
    //通过
    UserExamineMadalOk = (userMsg) => {
        const { dispatch,DataState } = this.props;
        let url = '/SignUpLogAudit'
        let StatusCount = DataState.GetSignUpLog.newStatus;
        dispatch(actions.UpDataState.setSignUpLogCountMsg(++StatusCount));
        postData(CONFIG.UserInfoProxy + url, {
            LogID: userMsg.logID,
            Status: 1
        }, 2).then(res => {
            return res.json()
        }).then(json => {
            if (json.Status === 400) {
                console.log('错误码：400' + json)
            } else if (json.Status === 200) {
                this.setState({
                    UserExamineModalVisible: false,
                })
                // dispatch(actions.UpDataState.setSignUpLogCountMsg(++StatusCount));

                if (this.state.firstSelect.value === 0) {
                    dispatch(actions.UpDataState.getWillSignUpLog('/GetSignUpLogToPage?SchoolID=school1&PageIndex=0&PageSize=10&status=0'))
                } else if (this.state.secondSelect.value === 0)
                    dispatch(actions.UpDataState.getWillSignUpLog('/GetSignUpLogToPage?SchoolID=school1&PageIndex=0&PageSize=10&status=0&gradeID=' + this.state.firstSelect.value))
                else {
                    dispatch(actions.UpDataState.getWillSignUpLog('/GetSignUpLogToPage?SchoolID=school1&PageIndex=0&PageSize=10&status=0&gradeID=' + this.state.firstSelect.value + '&classID=' + this.state.secondSelect.value))
                }
            }
        });

    }
    //搜索
    LogSearch = (e) => {
        const { dispatch } = this.props
        if (e.value === '') {
            dispatch(actions.UpUIState.showErrorAlert({
                type: 'btn-warn',
                title: "你还没有输入关键字哦~",
                ok: this.onAlertWarnOk.bind(this),
                cancel: this.onAlertWarnClose.bind(this),
                close: this.onAlertWarnClose.bind(this)
            }));
            return;
        } else
            dispatch(actions.UpDataState.getWillSignUpLog('/GetSignUpLogToPage?SchoolID=school1&PageIndex=0&PageSize=10&status=0&keyword=' + e.value))
    }
    //监听table的change进行排序操作
    onTableChange = (page, filters, sorter) => {
        const { DataState, dispatch } = this.props;
        console.log(sorter)
        if (sorter && (sorter.columnKey === 'SignUpTime' || sorter.columnKey === 'UserName' || sorter.columnKey === 'UserID')) {
            let sortType = sorter.order === "descend" ? 'SortType=DESC' : sorter.order === "ascend" ? 'SortType=ASC' : '';
            dispatch(actions.UpDataState.getWillSignUpLog('/GetSignUpLogToPage?SchoolID=school1&PageIndex=0&PageSize=10&status=0&sortFiled=' + sorter.columnKey + '&PageSize=10&' + sortType))

        }
    }
    //学生详情信息
    StudentDetailsMsgModalOk = () => {
        this.setState({
            StudentDetailsMsgModalVisible: false,

        })
    }
    StudentDetailsMsgModalCancel = () => {
        this.setState({
            StudentDetailsMsgModalVisible: false,

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

                        dropSelectd={this.state.firstSelect}
                        dropList={DataState.GradeClassMsg.returnData ? DataState.GradeClassMsg.returnData.grades : [{ value: 0, title: '全部年级' }]}
                    ></DropDown>
                    <DropDown

                        width={120}
                        height={72}

                        style={{ display: this.state.DropMenuShow ? 'block' : 'none' }}
                        dropSelectd={this.state.secondSelect}
                        dropList={this.state.secondDropList}
                        onChange={this.StudentDropMenuSecond}
                    ></DropDown>
                    <Search placeHolder='搜索'
                        onClickSearch={this.LogSearch.bind(this)}
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
                                loading={UIState.AppLoading.TableLoading}
                                dataSource={DataState.GetSignUpLog.WillData.returnData}
                                onChange={this.onTableChange.bind(this)}
                            >

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
                            total={DataState.GetSignUpLog.WillData.Total}
                            onChange={this.onPagiNationChange}
                        ></PagiNation>
                    </div>

                </div>


                <DetailsModal
                    ref='StudentDetailsMsgModal'
                    visible={this.state.UserExamineModalVisible}
                    onOk={this.UserExamineMadalOk.bind(this, this.state.handleUserMsg)}
                    onCancel={this.UserExamineMadalCancel}
                    onFail={this.UserExamineMadalFail.bind(this, this.state.handleUserMsg)}
                    data={this.state.handleUserMsg}
                    type='examine'
                >
                </DetailsModal>
                <DetailsModal
                    ref='StudentDetailsMsgModal'
                    visible={this.state.StudentDetailsMsgModalVisible}
                    onOk={this.StudentDetailsMsgModalOk}
                    onCancel={this.StudentDetailsMsgModalCancel}
                    data={this.state.handleUserMsg}
                    type='student'
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