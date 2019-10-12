import React, { Component } from 'react';
import { Frame, Menu, Loading, Alert, LeftMenu, Modal } from "../../../common";
import { connect } from 'react-redux';
import TimeBanner from '../component/TimeBanner'
import CONFIG from '../../../common/js/config';
import deepCompare from '../../../common/js/public';

import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import history from './history'

import logo from '../../images/image-MyClass.png'
import All from '../component/All'
import Subject from '../component/Subject'
import Search from '../component/Search'
import Class from '../component/Class'
import Dynamic from '../component/Dynamic'
import Record from '../component/Record'
import ImportFile from '../component/ImportFile'
import LogDetails from '../component/LogDetails'
import HandleCourseClass from '../component/HandleCourseClass'
import AddCourseClass from '../component/AddCourseClass'
import { TokenCheck_Connect, TokenCheck, getUserInfo } from '../../../common/js/disconnect'

import CourseClassDetails from '../component/CourseClassDetails'
import Teacher from '../component/Teacher'

//import Subject from '../component/Subject'
import '../../scss/index.scss'
import $ from 'jquery'
import { postData, getData } from '../../../common/js/fetch'

import actions from '../actions';
//import { urlAll, proxy } from './config'


class App extends Component {
    constructor(props) {
        super(props);
        const { dispatch } = props;
        this.state = {
            MenuParams: {},
            showBarner: true,
            showLeftMenu: true,
            UserMsg: props.DataState.LoginUser

        }

    }



    componentWillMount() {
        const { dispatch, DataState } = this.props;
        let route = history.location.pathname;

        //判断token是否存在
        TokenCheck_Connect()
        this.requestData(route);
        let token = sessionStorage.getItem('token')
        // sessionStorage.setItem('UserInfo', '')
        if (sessionStorage.getItem('UserInfo')) {
            dispatch(actions.UpDataState.getLoginUser(JSON.parse(sessionStorage.getItem('UserInfo'))));
        }
        else {
            getUserInfo(token, '000');
            let timeRun = setInterval(function () {
                if (sessionStorage.getItem('UserInfo')) {
                    dispatch(actions.UpDataState.getLoginUser(JSON.parse(sessionStorage.getItem('UserInfo'))));
                    clearInterval(timeRun)
                }
            },1000)
            //dispatch(actions.UpDataState.getLoginUser(JSON.parse(sessionStorage.getItem('UserInfo'))));
        }

        dispatch(actions.UpDataState.getCoureClassAllMsg('/GetCouseclassSumarry?schoolID='+this.state.UserMsg.SchoolID, this.MenuClcik));






        // 获取接口数据


        history.listen(() => {//路由监听
            let route = history.location.pathname;
            //this.requestData(route);
            this.requestData(route);

        })


    }
    componentWillUpdate() {
        //this.requestData(route);
    }
    componentDidUpdate() {

    }
    componentWillReceiveProps(nextProps) {

        this.setState({
            MenuParams: nextProps.DataState.GetCoureClassAllMsg.MenuParams
        })
    }

    onAppAlertOK() {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
        //window.location.href = "/html/login"
    }
    onAppAlertCancel() {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    onAppAlertClose() {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    // 请求每个组件主要渲染的数据
    requestData = (route) => {

        const { dispatch, DataState } = this.props;
        let UserMsg = DataState.LoginUser.SchoolID?DataState.LoginUser:JSON.parse(sessionStorage.getItem('UserInfo'))
        

        let pathArr = route.split('/');
        let handleRoute = pathArr[1];
        let routeID = pathArr[2];
        let subjectID = pathArr[3];
        let classID = pathArr[4];
        this.setState({
            showBarner: true,
            showLeftMenu: true
        })
        console.log(route, routeID, subjectID)
        dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
        if (route === '/') {
            history.push('/All')
            dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
            if (!DataState.GetCoureClassAllMsg.MenuParams)
                return;
            dispatch(actions.UpDataState.setCoureClassAllMsg('all'));
        } else if (handleRoute === 'All') {

            dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
            if (!DataState.GetCoureClassAllMsg.MenuParams)
                return;
            dispatch(actions.UpDataState.setCoureClassAllMsg('all'));

        } else if (handleRoute === 'Subject' && subjectID === 'all') {


            dispatch({ type: actions.UpUIState.RIGHT_LOADING_OPEN });
            //if (DataState.getSubjectAllMsg[routeID] === undefined)
            dispatch(actions.UpDataState.getSubjectAllMsg('/GetSubjectCouseclassSumarry?subjectID='+routeID, routeID));
            if (!DataState.GetCoureClassAllMsg.MenuParams)
                return;
            dispatch(actions.UpDataState.setCoureClassAllMsg(routeID));

        } else if (handleRoute === 'Subject' && subjectID === 'Class') {
            dispatch(actions.UpDataState.getSubjectAllMsg('/GetSubjectCouseclassSumarry?subjectID='+routeID, routeID));
            dispatch(actions.UpDataState.getClassAllMsg('/GetGradeCouseclassDetailForPage?schoolID='+UserMsg.SchoolID+'&key=&pageIndex=1&pageSize=10&subjectID='+routeID+'&gradeID='+classID, routeID, classID));

            if (!DataState.GetCoureClassAllMsg.MenuParams)
                return;
            dispatch(actions.UpDataState.setCoureClassAllMsg(classID, routeID));

        } else if (handleRoute === 'Search') {
            // if (!DataState.GetCoureClassAllMsg.MenuParams)
            //     return;
            dispatch(actions.UpDataState.getClassAllMsg('/GetGradeCouseclassDetailForPage?schoolID='+UserMsg.SchoolID+'&key=&pageIndex=1&pageSize=10&subjectID='+routeID+'&gradeID='+classID));


        } else if (handleRoute === 'Log') {
            // if (!DataState.GetCoureClassAllMsg.MenuParams)
            //     return;
            //dispatch(actions.UpDataState.getClassAllMsg('/CoureClass_Class?schoolID=sss'));
            this.setState({
                showBarner: true,
                showLeftMenu: false
            })

        } else if (handleRoute === 'Teacher') {
            dispatch(actions.UpDataState.getTeacherCourseClassMsg('/GetCourseClassByUserID?schoolID='+UserMsg.SchoolID+'&userID='+UserMsg.UserID));

            this.setState({
                showBarner: true,
                showLeftMenu: false
            })

        } else if (handleRoute === 'ImportFile') {

            this.setState({
                showBarner: false,
                showLeftMenu: false
            })

        } else {
            history.push('/All')
        }


    }

    MenuClcik = (id, type, sub = null) => {
        console.log(id, type)
        if (type === 'All') {
            history.push('/All')
        } else if (type === 'Subject') {
            history.push('/Subject/' + id + '/all')
        } else if (type === 'Class') {
            history.push('/Subject/' + sub + '/Class/' + id)
        }
        //history.push('/'+id)
    }


    //模态框关闭
    CourseClassDetailsModalOk = () => {
        const { dispatch, DataState } = this.props;
        dispatch(actions.UpUIState.CourseClassDetailsModalClose())
    }
    CourseClassDetailsModalCancel = () => {
        const { dispatch, DataState } = this.props;
        dispatch(actions.UpUIState.CourseClassDetailsModalClose())
    }
    //日志模态框关闭
    LogDetailsModalOk = () => {
        const { dispatch, DataState } = this.props;
        dispatch(actions.UpUIState.LogDetailsModalClose())
    }
    LogDetailsModalCancel = () => {
        const { dispatch, DataState } = this.props;
        dispatch(actions.UpUIState.LogDetailsModalClose())
    }
    //编辑教学班模态框
    ChangeCourseClassModalOk = () => {
        const { dispatch, DataState } = this.props;
        let userMsg = DataState.LoginUser;
        let data = DataState.GetCourseClassDetailsHandleClassMsg;
        let route = history.location.pathname;
        let pathArr = route.split('/');
        let handleRoute = pathArr[1];
        let routeID = pathArr[2];
        let subjectID = pathArr[3];
        let classID = pathArr[4];

        if (data.selectData.Teacher.value === data.TeacherID && data.selectData.CourseClass.CourseClassName === data.CourseClassName && deepCompare.deepCompare(data.selectData.Student, data.TableSource)) {
            dispatch(actions.UpUIState.showErrorAlert({
                type: 'btn-error',
                title: "您还没有选择哦~",
                ok: this.onAppAlertOK.bind(this),
                cancel: this.onAppAlertCancel.bind(this),
                close: this.onAppAlertClose.bind(this)
            }));
            return;
        }
        // console.log(data.selectData.Student,data.TableSource,deepCompare.deepCompare(data.selectData.Student, data.TableSource))
        let courseClassStus = data.selectData.Student.map((child, index) => {
            return child.StudentID
        }).join();
        let url = '/InsertOrEditCourseClass'
        //dispatch(actions.UpDataState.setCourseClassStudentMsg(Student))

        postData(CONFIG.CourseClassProxy + url, {
            userID: userMsg.UserID,
            userType: userMsg.UserType,
            schoolID: userMsg.SchoolID,
            courseClassName: data.selectData.CourseClass.CourseClassName,
            teacherID: data.selectData.Teacher.value,
            gradeID: data.GradeID,
            subjectID: data.SubjectID,
            courseClassStus: courseClassStus
        }).then(res => {
            return res.json()
        }).then(json => {
            if (json.Status === 400) {
                console.log('错误码：' + json.Status)
            } else if (json.Status === 200) {
                dispatch(actions.UpUIState.showErrorAlert({
                    type: 'success',
                    title: "成功",
                    onHide: this.onAlertWarnHide.bind(this)
                }));

                dispatch(actions.UpDataState.getClassAllMsg('/GetGradeCouseclassDetailForPage?schoolID='+this.state.UserMsg.SchoolID+'&pageIndex=1&pageSize=10', routeID, classID));

            }
        })

        dispatch(actions.UpUIState.ChangeCourseClassModalClose())
        dispatch(actions.UpDataState.setCourseClassName([]))
        dispatch(actions.UpDataState.setCourseClassStudentMsg([]))
        dispatch(actions.UpDataState.setSubjectTeacherMsg([]))
        dispatch(actions.UpDataState.setClassStudentTransferMsg([]))
        dispatch(actions.UpDataState.setSubjectTeacherTransferMsg([]))
    }
    //关闭
    onAlertWarnHide = () => {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert())

    }
    ChangeCourseClassModalCancel = () => {
        const { dispatch, DataState } = this.props;
        // let Student = DataState.GetCourseClassDetailsHandleClassMsg.TableSource;
        // let Teacher = {value:DataState.GetCourseClassDetailsHandleClassMsg.TeacherID,title:DataState.GetCourseClassDetailsHandleClassMsg.TeacherName}
        dispatch(actions.UpDataState.setCourseClassName([]))
        dispatch(actions.UpDataState.setCourseClassStudentMsg([]))
        dispatch(actions.UpDataState.setSubjectTeacherMsg([]))
        dispatch(actions.UpDataState.setClassStudentTransferMsg([]))
        dispatch(actions.UpDataState.setSubjectTeacherTransferMsg([]))
        dispatch(actions.UpUIState.ChangeCourseClassModalClose())

    }
    //添加教学班模态框
    AddCourseClassModalOk = () => {
        const { dispatch, DataState } = this.props;
        let Student = DataState.GetCourseClassDetailsHandleClassMsg.selectData.Student;
        //dispatch(actions.UpDataState.setCourseClassStudentMsg(Student))
        dispatch(actions.UpUIState.AddCourseClassModalClose())
    }
    AddCourseClassModalCancel = () => {
        const { dispatch, DataState } = this.props;
        let Student = DataState.GetCourseClassDetailsHandleClassMsg.TableSource;
        let Teacher = { value: DataState.GetCourseClassDetailsHandleClassMsg.TeacherID, title: DataState.GetCourseClassDetailsHandleClassMsg.TeacherName }
        dispatch(actions.UpUIState.AddCourseClassModalClose())
    }
    render() {
        const { UIState, DataState } = this.props;
        let route = history.location.pathname.split('/');
        let cnname = '教学班管理';
        let enname = 'CoureClass Management'
        if (route[1] === 'Teacher') {
            cnname = '我的教学班管理';
            enname = 'My class Management'
        }
        return (
            <React.Fragment>
                <Loading tip="加载中..." opacity={false} size="large" spinning={UIState.AppLoading.appLoading}>


                    <Frame userInfo={{
                        name: DataState.LoginUser.UserName,
                        image: DataState.LoginUser.PhotoPath
                    }}

                        module={{
                            cnname: cnname,
                            enname: enname,
                            image: logo
                        }}
                        type="triangle" showBarner={this.state.showBarner} showLeftMenu={this.state.showLeftMenu}>
                        <div ref="frame-time-barner">
                            <TimeBanner />
                        </div>

                        <div ref="frame-left-menu">
                            <Menu
                                params={DataState.GetCoureClassAllMsg.MenuParams}
                            >

                            </Menu>
                        </div>

                        <div ref="frame-right-content">
                            <Loading tip="加载中..." size="large" spinning={UIState.AppLoading.rightLoading}>
                                <Router>
                                    <Route path='/All' exact component={All}></Route>
                                    <Route path='/Subject/:subjectID/all' component={Subject}></Route>
                                    <Route path='/Subject/:subjectID/Class/:classID' component={Class}></Route>
                                    <Route path='/Search' component={Search}></Route>
                                    <Route path='/Log/Record' component={Record}></Route>
                                    <Route path='/Log/Dynamic' component={Dynamic}></Route>
                                    <Route path='/Teacher' component={Teacher}></Route>
                                    <Route path='/ImportFile' component={ImportFile}></Route>
                                </Router>

                                {/* <Route path='/UserArchives/All' exact history={history} component={All}></Route>
                            <Route path='/UserArchives/Student' exact history={history} component={Student}></Route>
                            <Route path='/UserArchives/Teacher' exact history={history} component={Teacher}></Route>
                            <Route path='/UserArchives/Leader' exact history={history} component={Leader}></Route> */}
                            </Loading>
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
                    title={'教学班详情'}
                    visible={UIState.SetCourseClassDetailsModalShow.setCourseClassDetailsMadalShow}
                    onOk={this.CourseClassDetailsModalOk}
                    onCancel={this.CourseClassDetailsModalCancel}>
                    <Loading spinning={UIState.AppLoading.modalLoading}>
                        <CourseClassDetails></CourseClassDetails>
                    </Loading>
                </Modal>
                <Modal ref='CourseClassDetailsMadal'
                    type='1'
                    width={680}
                    title={'编辑教学班'}
                    bodyStyle={{ height: 305 + 'px', padding: 0 }}
                    visible={UIState.ChangeCourseClassModalShow.Show}
                    onOk={this.ChangeCourseClassModalOk}
                    onCancel={this.ChangeCourseClassModalCancel}>
                    <Loading spinning={UIState.AppLoading.modalLoading}>
                        {UIState.ChangeCourseClassModalShow.Show ? (<HandleCourseClass></HandleCourseClass>) : ''}
                    </Loading>
                </Modal>
                <Modal ref='AddCourseClassDetailsMadal'
                    type='1'
                    width={680}
                    title={'添加教学班'}
                    bodyStyle={{ height: 305 + 'px', padding: 0 }}
                    visible={UIState.AddCourseClassModalShow.Show}
                    onOk={this.AddCourseClassModalOk}
                    onCancel={this.AddCourseClassModalCancel}>
                    <Loading spinning={UIState.AppLoading.modalLoading}>
                        {UIState.AddCourseClassModalShow.Show ? (<AddCourseClass></AddCourseClass>) : ''}
                    </Loading>
                </Modal>
                <Modal ref='LogDetailsMadal'
                    type='1'
                    width={720}
                    title={'教学班调整详情'}
                    bodyStyle={{ height: 532 + 'px', padding: 0 }}
                    visible={UIState.LogDetailsModalShow.Show}
                    footer={null}
                    onOk={this.LogDetailsModalOk}
                    onCancel={this.LogDetailsModalCancel}>

                    {UIState.LogDetailsModalShow.Show ? (<LogDetails></LogDetails>) : ''}

                </Modal>
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