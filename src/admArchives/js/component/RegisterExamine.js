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
import RegisterWillExamine from './RegisterWillExamine'
import RegisterDidExamine from './RegisterDidExamine'
import '../../scss/RegisterExamine.scss'
import { DetailsModal, DropDown, PagiNation, Search, Table, Button, CheckBox, CheckBoxGroup, Modal } from '../../../common/index'

import { getData } from '../../../common/js/fetch'




class RegisterExamine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handleClick: true,
            UserExamineModalVisible: false,
            userMsg: props.DataState.LoginUser

        }
        const { dispatch, DataState } = this.props;

        // if (!DataState.GradeClassMsg.returnData)
        dispatch(actions.UpDataState.getGradeClassMsg('/GetGradeClassTree?schoolID=' + this.state.userMsg.SchoolID));
    }

    componentWillMount() {
        const { DataState, dispatch } = this.props;

        let pathname = history.location.pathname;
        if (pathname.split('/')[2] === 'RegisterDidExamine') {
            this.setState({
                handleClick: false
            })
            dispatch(actions.UpDataState.getDidSignUpLog('/GetSignUpLogToPage?SchoolID=' + this.state.userMsg.SchoolID + '&PageIndex=0&PageSize=10&status=1'))

        } else if (pathname.split('/')[2] === 'RegisterWillExamine') {
            this.setState({
                handleClick: true
            })
            dispatch(actions.UpDataState.getWillSignUpLog('/GetSignUpLogToPage?SchoolID=' + this.state.userMsg.SchoolID + '&PageIndex=0&PageSize=10&status=0'))

        }
        history.listen(() => {//路由监听
            let pathname = history.location.pathname;
          // console.log(pathname.split('/')[2])
            if (pathname.split('/')[2] === 'RegisterDidExamine') {
                this.setState({
                    handleClick: false
                })
                dispatch(actions.UpDataState.setSignUpLogCountMsg(0));

                dispatch(actions.UpDataState.getDidSignUpLog('/GetSignUpLogToPage?SchoolID=' + this.state.userMsg.SchoolID + '&PageIndex=0&PageSize=10&status=1'))

            } else if (pathname.split('/')[2] === 'RegisterWillExamine') {
                this.setState({
                    handleClick: true
                })
                dispatch(actions.UpDataState.getWillSignUpLog('/GetSignUpLogToPage?SchoolID=' + this.state.userMsg.SchoolID + '&PageIndex=0&PageSize=10&status=0'))

            }
        })
    }

    UserExamineMadalOk = (e) => {
      // console.log(e)
        this.setState({
            UserExamineModalVisible: false,
            loading: true
        })
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 3000)
    }
    UserExamineMadalCancel = (e) => {
      // console.log(e)
        this.setState({
            UserExamineModalVisible: false
        })
    }

    // onExaminedClick = () => {
    //     this.setState({
    //         handleClick: false
    //     })
    // }
    // onExaminingClick = () => {
    //     this.setState({
    //         handleClick: true
    //     })
    // }

    render() {
        const { UIState, DataState } = this.props;
        // const data = {
        //     userName: '康欣',
        //     userImg: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg',
        //     Gende: '男',
        //     userText: '学如逆水行舟，不进则退',
        //     userID: '20170025444',
        //     userGrade: '一年级',
        //     userClass: '1班',
        //     userIDCard: '',
        //     userPhone: '15626248624',
        //     userMail: '1519406168@qq.com',
        //     userAddress: '蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团',
        //     userRegisterTime: '2019-01-01 12:24',
        //     userRegisterIP: '190.163.252.198'
        // };
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
                    <div ref="frame-right-content" key={this.props.location.pathname}>
                        <div className='content-top'>
                            <span className='top-tips'><i className='top-icon'></i>学生注册审核</span>
                        </div>
                        <div className='content-main'>
                            <div className='main-handle'>
                                {/* <Link to='/RegisterExamine/RegisterWillExamine'><button onClick={this.onExaminingClick} className={`handle-btn btn-examining ${this.state.handleClick ? 'active' : ''} `} >待审核</button></Link>
                                <Link to='/RegisterExamine/RegisterDidExamine'><button onClick={this.onExaminedClick} className={`handle-btn btn-examined ${!this.state.handleClick ? 'active' : ''} `} >已审核</button></Link> */}
                                <Link to='/RegisterExamine/RegisterWillExamine' onClick={this.onExaminingClick} className={`handle-btn btn-examining ${this.state.handleClick ? 'active' : ''} `} >待审核</Link>
                                <Link to='/RegisterExamine/RegisterDidExamine' onClick={this.onExaminedClick} className={`handle-btn btn-examined ${!this.state.handleClick ? 'active' : ''} `} >已审核
                                <span className='newCount' style={{ display: DataState.GetSignUpLog.newStatus === 0 ? 'none' : 'inline-block' }}>{'+' + DataState.GetSignUpLog.newStatus}</span>
                                </Link>
                            </div>

                            <Router >
                                <Route path='/RegisterExamine/RegisterWillExamine' exact component={RegisterWillExamine}></Route>
                                <Route path='/RegisterExamine/RegisterDidExamine' exact component={RegisterDidExamine}></Route>
                            </Router>

                        </div>

                    </div>
                </Frame>
                {/* <DetailsModal
                    ref='StudentDetailsMsgModal'
                    visible={this.state.UserExamineModalVisible}
                    onOk={this.UserExamineMadalOk}
                    onCancel={this.UserExamineMadalCancel}
                    data={data}
                    type='examine'
                >

                </DetailsModal> */}
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