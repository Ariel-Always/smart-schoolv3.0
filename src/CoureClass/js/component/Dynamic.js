import React, { Component } from 'react';
import { Frame, Menu, CheckBox, Loading, Alert, LeftMenu, Modal, DropDown, Button, Table, CheckBoxGroup } from "../../../common";
import { connect } from 'react-redux';
import '../../scss/Dynamic.scss'
import $ from 'jquery'
import moment from 'moment';
import { postData, getData } from '../../../common/js/fetch'
import actions from '../actions';
import history from '../containers/history'
import { DatePicker, Input } from 'antd'
import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';

class Dynamic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handleTypeSelected: {
                value: 0,
                title: '全部类型'
            },
            handleTypeList: [
                { value: 0, title: '全部类型' },
                { value: 1, title: '录入教学班' },
                { value: 2, title: '删除教学班' },
                { value: 3, title: '调整教学班' },
            ],
            startTime: null,
            endTime: null,
            startMomentTime: null,
            endtMomentTime: null,
            endOpen: false,
            columns: [
                {
                    title: '序号',
                    align: 'center',

                    key: 'OrderNO',
                    width: 100,
                    dataIndex: 'OrderNO',
                    render: OrderNO => {
                        return (
                            <div className='CheckBox-content'>
                                <CheckBox value={OrderNO - 1} ></CheckBox>
                                <span className='key-content'>{OrderNO >= 10 ? OrderNO : '0' + OrderNO}</span>
                            </div>
                        )
                    }

                },
                {
                    title: '操作',
                    align: 'center',
                    dataIndex: 'OperateTypeName',
                    key: 'OperateTypeName',
                    width: 180,
                    render: OperateTypeName => {
                        return (
                            <React.Fragment>
                                <span className='OperateTypeName'>{OperateTypeName}</span>
                            </React.Fragment>
                        )
                    }
                },
                {
                    title: '更新内容',
                    align: 'center',
                    dataIndex: 'OperateParams',
                    width: 400,
                    key: 'OperateParams',
                    render: OperateParams => {
                        return (
                            <p style={{textAlign:'left',marginBottom:0,paddinLeft:10+'px'}}>
                                <span className='OperateParams'>{OperateParams.OperateParams}</span>
                                <span style={{display:OperateParams.Flag===1?'inline-block':'none'}} className='Flag'>查看详情</span>
                            </p>
                        )
                    }
                },
                {
                    title: '操作人工号',
                    align: 'center',
                    dataIndex: 'OperatorID',
                    key: 'OperatorID',
                    width: 146,
                    render: OperatorID => {
                        return (
                            <React.Fragment>
                                <span className='OperatorID'>{OperatorID}</span>
                            </React.Fragment>
                        )
                    }
                },
                {
                    title: '操作人名称',
                    align: 'center',
                    dataIndex: 'OperatorName',
                    key: 'OperatorName',
                    render: OperatorName => {
                        return (
                            <React.Fragment>
                                <span className='OperatorName'>{OperatorName}</span>
                            </React.Fragment>
                        )
                    }
                },
                {
                    title: '更新时间',
                    align: 'center',
                    dataIndex: 'OperateTime',
                    key: 'OperateTime',
                    render: OperateTime => {
                        return (
                            <span className='OperateTime'>{OperateTime}</span>
                        )
                    }
                }
            ],
            checkedList: [],
            checkAll: false
        }
    }
    onHandleTypeChange = (value) => {
        console.log(value.value)
    }
    //操作时间
    disabledStartDate = (current) => {
        const { endMomentTime } = this.state;
        if (!current || !endMomentTime) {
            return current && current > moment().endOf('day');
        }
        return current && (current.valueOf() > endMomentTime.valueOf() || current > moment().endOf('day'));
    }
    disabledEndDate = (current) => {
        const { startMomentTime } = this.state;
        if (!startMomentTime || !current) {
            return current && current > moment().endOf('day');
        }

        return current && (current.valueOf() < startMomentTime.valueOf() || current > moment().endOf('day'));
    }
    //操作时间事件
    onStartTimeSelectOk = (time) => {
        console.log(time)
    }
    onStartTimeSelectChange = (Moment, time) => {
        //console.log(time.valueOf())
        this.setState({
            startTime: time,
            startMomentTime: Moment
        })
    }
    onEndTimeSelectOk = (time) => {
        console.log(time)
    }
    onEndTimeSelectChange = (Moment, time) => {
        console.log(time)
        this.setState({
            endTime: time,
            endMomentTime: Moment
        })
    }
    //时间面板打开，开始的选择结束控制结束的面板打开
    handleStartOpenChange = open => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    };

    handleEndOpenChange = open => {
        this.setState({ endOpen: open });
    }
    //点击查询
    onCheckClick = () => {
        const { dispatch, DataState } = this.props;

        if (!this.state.startTime) {
            dispatch(actions.UpUIState.showErrorAlert({
                type: 'btn-error',
                title: "您还没有选择开始时间哦~",
                ok: this.onAppAlertOK.bind(this),
                cancel: this.onAppAlertCancel.bind(this),
                close: this.onAppAlertClose.bind(this)
            }));
            return;
        }
        if (!this.state.endTime) {
            dispatch(actions.UpUIState.showErrorAlert({
                type: 'btn-error',
                title: "您还没有选择结束时间哦~",
                ok: this.onAppAlertOK.bind(this),
                cancel: this.onAppAlertCancel.bind(this),
                close: this.onAppAlertClose.bind(this)
            }));
            return;
        }
        let userMsg = DataState.LoginUser;
        let handleTypeSelected = this.state.handleTypeSelected;
        dispatch(actions.UpDataState.getCourseClassDynamicMsg('/CourseClass_dynamic?userID=' + userMsg.UserID + '&userType=' + userMsg.UserType + '&schoolID=' + userMsg.SchoolID + '&startDate=' + this.state.startTime + '&endDate=' + this.state.endTime + '&operateType=' + handleTypeSelected.value))
    }

    onAppAlertOK() {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    onAppAlertCancel() {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    onAppAlertClose() {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }

    //列表操作
    //列表多选
    onCheckBoxGroupChange = (value) => {
        let checkAll = false;
        // if (value.length === this.state.options.length) {
        //     checkAll = true;
        // }
        // this.setState({
        //     checkedList: value,
        //     checkAll: checkAll
        // })
    }
    //列表全选
    OnCheckAllChange = (e) => {
        //console.log(e.target,this.state.options)
        const { DataState, UIState } = this.props;

        // let checkList = [];
        // if (e.target.checked) {
        //     checkList = this.state.options;
        // } else {
        //     checkList = []
        // }
        // this.setState({
        //     checkAll: e.target.checked,
        //     checkedList: checkList
        // })
    }
    //全选删除
    onDeleteAllClick = () => {
        // const { dispatch, DataState } = this.props;
        // let checkedList = this.state.checkedList
        // let len = checkedList.length;
        // let courseClassID = '';
        // let source = DataState.GetClassAllMsg.allClass.TableData;
        // checkedList.map((child, index) => {
        //     // if (index !== len - 1)
        //     courseClassID = source[child].CourseClass.ClassID + '-';
        //     // else
        //     //     courseClassID = source[child].CourseClass.ClassID;

        // })

        // console.log(this.state.checkedList)
        // if (len === 0) {
        //     dispatch(actions.UpUIState.showErrorAlert({
        //         type: 'btn-error',
        //         title: "您还没有选择哦~",
        //         ok: this.onAppAlertOK.bind(this),
        //         cancel: this.onAppAlertCancel.bind(this),
        //         close: this.onAppAlertClose.bind(this)
        //     }));
        // } else {
        //     dispatch(actions.UpUIState.showErrorAlert({
        //         type: 'btn-warn',
        //         title: "您确定删除？",
        //         ok: this.onAppAlertDeleteAllOK.bind(this, courseClassID),
        //         cancel: this.onAppAlertCancel.bind(this),
        //         close: this.onAppAlertClose.bind(this)
        //     }));
        // }
    }
    render() {
        const { DataState, UIState } = this.props;

        return (
            <div id='Dynamic'>
                <div className='log-box'>
                    <div className='log-top'>
                        <span className='top-tips'>
                            <span className='tips tip-menu'>{'教学班更新动态'}</span>
                        </span>
                        <Router>
                            <Link to='/Log/Record' className='top-to'>查看历史记录>></Link>
                        </Router>

                    </div>
                    <hr className='log-hr' />
                </div>
                <div className='log-content'>
                    <div className='content-top clearfix'>
                        <DropDown
                            title='操作类型：'
                            className='dropList'
                            width={150}
                            height={168}
                            type='simple'
                            dropSelectd={this.state.handleTypeSelected}
                            dropList={this.state.handleTypeList}
                            onChange={this.onHandleTypeChange.bind(this)}
                        >

                        </DropDown>
                        <div className='handleTimeSelect'>
                            <span className='time-tips'>操作时间：</span>
                            <DatePicker
                                value={this.state.startMomentTime}
                                placeholder="请选择开始时间"
                                onOk={this.onStartTimeSelectOk.bind(this)}
                                onChange={this.onStartTimeSelectChange.bind(this)}
                                disabledDate={this.disabledStartDate}
                                format={'YYYY - MM - DD'}
                                onOpenChange={this.handlestartOpenChange}
                            />
                            <span className='time-to' >至</span>
                            <DatePicker
                                value={this.state.endMomentTime}
                                placeholder="请选择结束时间"
                                onOk={this.onEndTimeSelectOk.bind(this)}
                                onChange={this.onEndTimeSelectChange.bind(this)}
                                disabledDate={this.disabledEndDate}
                                format={'YYYY - MM - DD'}
                                open={this.state.endOpen}
                                onOpenChange={this.handleEndOpenChange}
                            />
                            <Button onClick={this.onCheckClick} className='check-btn' color='blue'>查询</Button>
                        </div>
                    </div>
                    <Loading size="large" spinning={UIState.AppLoading.appDynamicLoading}>
                        <div style={{ minHeight: 640 + 'px' }} className='content-dataShow'>
                            <CheckBoxGroup
                                style={{ width: '100%' }}
                                value={this.state.checkedList}
                                onChange={this.onCheckBoxGroupChange.bind(this)}>
                                <Table
                                
                                    className='table'
                                    columns={this.state.columns}
                                    dataSource={DataState.GetCourseClassDynamicMsg.tableSource?DataState.GetCourseClassDynamicMsg.tableSource:[]}
                                    bordered

                                >

                                </Table>
                            </CheckBoxGroup>
                            {DataState.GetCourseClassDynamicMsg.tableSource?(<CheckBox className='checkAll-box' onChange={this.OnCheckAllChange} checked={this.state.checkAll}>
                                全选
                                    <Button onClick={this.onDeleteAllClick} className='selectAll' color='blue'>标记为已读</Button>
                            </CheckBox>):''}
                        </div>
                    </Loading>

                </div>
            </div >
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
export default connect(mapStateToProps)(Dynamic);