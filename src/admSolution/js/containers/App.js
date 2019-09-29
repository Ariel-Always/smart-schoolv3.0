import React, { Component } from 'react';
import { Frame, Menu, Loading, Alert, Modal,Button } from "../../../common";
import { connect } from 'react-redux';

import {  Modal as AntdModal,Input} from 'antd'
import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import history from './history'
import TeachingAbsolution from '../component/TeachingSolution'
import SolutionDetails from '../component/SolutionDetails'
import logo from '../../images/SubjectLogo.png'
//import TimeBanner from '../component/TimeBanner'
import { postData, getData } from '../../../common/js/fetch'
import CONFIG from '../../../common/js/config';


import '../../scss/index.scss'
import $ from 'jquery'
import actions from '../actions';
//import { urlAll, proxy } from './config'

sessionStorage.setItem('token', 'null')
class App extends Component {
    constructor(props) {
        super(props);
        const { dispatch } = props;
        this.state = {

        }
    }

    componentWillMount() {
        const { dispatch, DataState } = this.props;
        let route = history.location.pathname;
        sessionStorage.setItem('token', 'aaa')
        //判断token是否存在
        if (sessionStorage.getItem('token')) {
            // dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
            dispatch(actions.UpDataState.getTeachingSolutionMsg('/ListTeachingSolutions?pageSize=9&currentPage=1'))

        } else {
            //不存在的情况下
            dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
            dispatch(actions.UpUIState.showErrorAlert({
                type: 'btn-error',
                title: "登录错误，请重新登录!",
                ok: this.onAppAlertOK.bind(this),
                cancel: this.onAppAlertCancel.bind(this),
                close: this.onAppAlertClose.bind(this)
            }));
        }
    }
    //查看弹窗
    TeachingSolutionDetailsModalOk = () => {
        const {dispatch} = this.props;
        dispatch(actions.UpUIState.TeachingSolutionDetailsModalClose())
    }
    TeachingSolutionDetailsModalCancel = () => {
        const {dispatch} = this.props;

        dispatch(actions.UpUIState.TeachingSolutionDetailsModalClose())
    }
    //重命名
    onResetNameChange = (e) => {
        console.log(e.target.value)
        const {dispatch} = this.props;
        this.setState({
            resetName:e.target.value
        })
    }
    //重命名弹窗ok回调
    onResetNameOk = () => {
        const {DataState,dispatch} = this.props;
        let url = '/EditTeachingSolution'
        postData(CONFIG.TeachingSolutionProxy + url, {
            SolutionID: DataState.GetSolutionID.Solution.SolutionID,
            UserID:'1235',
            SolutionName:DataState.GetSolutionID.Solution.SolutionName
        }).then(res => {
            return res.json()
        }).then(json => {
            if (json.StatusCode === 400) {
                console.log('错误码：' + json.StatusCode)
            } else if (json.StatusCode === 200) {
                dispatch(actions.UpUIState.showErrorAlert({
                    type: 'success',
                    title: "成功",
                    onHide: this.onAlertWarnHide.bind(this)
                }));
                dispatch(actions.UpDataState.getTeachingSolutionMsg('/ListTeachingSolutions?pageSize=9&currentPage=1'))

            }
        })

        dispatch(actions.UpUIState.ResetNameModalClose())

    }
    //重命名弹窗取消回调
    onResetNameCancel = () => {
        dispatch(actions.UpUIState.ResetNameModalClose())
    }
    render() {
        const { UIState, DataState } = this.props;

        return (
            <React.Fragment>
                <Loading tip="加载中..." size="large" spinning={UIState.AppLoading.appLoading}>


                    <Frame userInfo={{
                        name: DataState.LoginUser.UserName,
                        image: DataState.LoginUser.PhotoPath
                    }}

                        module={{
                            cnname: "教学方案管理",
                            enname: "Teaching Absolution",
                            image: logo
                        }}
                        type="triangle" showBarner={false} showLeftMenu={false}>
                        {/* <div ref="frame-time-barner"><TimeBanner /></div> */}

                        <div ref="frame-right-content">
                            <TeachingAbsolution></TeachingAbsolution>
                        </div>
                    </Frame>



                </Loading>
                <Alert show={UIState.AppAlert.appAlert}
                    type={UIState.AppAlert.type}
                    abstract={UIState.AppAlert.littleTitle}
                    title={UIState.AppAlert.title}
                    onOk={UIState.AppAlert.onOk}
                    onHide={UIState.AppAlert.onHide}
                    onCancel={UIState.AppAlert.onCancel}
                    onClose={UIState.AppAlert.onClose}
                ></Alert>
                {/* 模态框 */}
                <Modal ref='CourseClassDetailsMadal'
                    bodyStyle={{ padding: 0 }}
                    type='1'
                    footer={null}
                    title={'教学方案详情'}
                    visible={UIState.TeachingSolutionDetailsModal.Show}
                    onOk={this.TeachingSolutionDetailsModalOk}
                    onCancel={this.TeachingSolutionDetailsModalCancel}>
                    <Loading  spinning={UIState.AppLoading.modalLoading}>
                        <SolutionDetails></SolutionDetails>
                    </Loading>
                </Modal>
                {/* 重命名 */}
                <AntdModal
                
                width={300}
                title={'重命名'}
                onOk={this.onResetNameOk}
                onCancel={this.onResetNameCancel}
                visible={UIState.TeachingSolutionDetailsModal.ResetNameShow}
                >
                    <div className='resetName'>
                        <span className='left'>方案名称：</span>
                        <Input 
                        className='right' 
                        placeholder='请输入新的方案名称'
                        onChange={this.onResetNameChange.bind(this)}>
                        </Input>

                    </div>
                    
                </AntdModal>

            </React.Fragment >

        );
    }
}
const mapStateToProps = (state) => {
    let { UIState, DataState } = state;
    return {
        UIState,
        DataState
    }
};
export default connect(mapStateToProps)(App);