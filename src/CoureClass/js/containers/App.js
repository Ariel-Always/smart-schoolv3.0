import React, { Component } from 'react';
import { Frame, Menu, Loading, Alert, LeftMenu, Modal } from "../../../common";
import { connect } from 'react-redux';
import TimeBanner from '../component/TimeBanner'
import CONFIG from '../../../common/js/config';

import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import history from './history'

import logo from '../../images/image-MyClass.png'
import All from '../component/All'
import Subject from '../component/Subject'
import Search from '../component/Search'
import Class from '../component/Class'
import HandleCourseClass from '../component/HandleCourseClass'
import AddCourseClass from '../component/AddCourseClass'

import CourseClassDetails from '../component/CourseClassDetails'

//import Subject from '../component/Subject'
import '../../scss/index.scss'
import $ from 'jquery'
import { postData, getData } from '../../../common/js/fetch'

import actions from '../actions';
//import { urlAll, proxy } from './config'

sessionStorage.setItem('token', 'null')
class App extends Component {
    constructor(props) {
        super(props);
        const { dispatch } = props;
        this.state = {
            MenuParams: {}
        }
        let route = history.location.pathname;
        //判断token是否存在
        if (sessionStorage.getItem('token')) {
            dispatch(actions.UpDataState.getLoginUser('/Login?method=GetUserInfo'));
            dispatch(actions.UpDataState.getCoureClassAllMsg('/CoureClass_All?schoolID=sss', this.MenuClcik));
            this.requestData(route);

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



    componentWillMount() {

        let route = history.location.pathname;
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
        window.location.href = "/html/login"
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
        let pathArr = route.split('/');
        let handleRoute = pathArr[1];
        let routeID = pathArr[2];
        let subjectID = pathArr[3];
        let classID = pathArr[4];
        console.log(route, routeID, subjectID)
        dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
        if (route === '/' || handleRoute === 'All') {

            dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
            if (!DataState.GetCoureClassAllMsg.MenuParams)
                return;
            dispatch(actions.UpDataState.setCoureClassAllMsg('all'));

        } else if (handleRoute === 'Subject' && subjectID === 'all') {


            dispatch({ type: actions.UpUIState.RIGHT_LOADING_OPEN });
            //if (DataState.getSubjectAllMsg[routeID] === undefined)
            dispatch(actions.UpDataState.getSubjectAllMsg('/CoureClass_Subject?schoolID=sss', routeID));
            if (!DataState.GetCoureClassAllMsg.MenuParams)
                return;
            dispatch(actions.UpDataState.setCoureClassAllMsg(routeID));

        } else if (handleRoute === 'Subject' && subjectID === 'Class') {
            dispatch(actions.UpDataState.getSubjectAllMsg('/CoureClass_Subject?schoolID=sss', routeID));
            dispatch(actions.UpDataState.getClassAllMsg('/CoureClass_Class?schoolID=sss', routeID, classID));

            if (!DataState.GetCoureClassAllMsg.MenuParams)
                return;
            dispatch(actions.UpDataState.setCoureClassAllMsg(classID, routeID));


        } else if (handleRoute === 'Search') {
            if (!DataState.GetCoureClassAllMsg.MenuParams)
                return;
            dispatch(actions.UpDataState.setCoureClassAllMsg(routeID));


        } else {
            history.push('/')
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
        
        if(data.selectData.Teacher.value===data.TeacherID&&data.selectData.CourseClass.CourseClassName===data.CourseClassName&&data.selectData.Student==data.TableSource){
            dispatch(actions.UpUIState.showErrorAlert({
                type: 'btn-error',
                title: "您还没有选择哦~",
                ok: this.onAppAlertOK.bind(this),
                cancel: this.onAppAlertCancel.bind(this),
                close: this.onAppAlertClose.bind(this)
            }));
            return ;
        }
        let courseClassStus = data.selectData.Student.map((child,index) => {
            return child.StudentID
        }).join();
        let url = '/DeleteSubject'
        //dispatch(actions.UpDataState.setCourseClassStudentMsg(Student))
        
        postData(CONFIG.proxy + url, {
            userID: userMsg.UserID,
            userType:userMsg.UserType,
            schoolID:userMsg.SchoolID,
            courseClassName:data.selectData.CourseClass.CourseClassName,
            teacherID:data.selectData.Teacher.value,
            gradeID:data.GradeID,
            subjectID:data.SubjectID,
            courseClassStus:courseClassStus
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
                
                dispatch(actions.UpDataState.getClassAllMsg('/CoureClass_Class?schoolID=sss&pageIndex=' + 1 + '&pageSize=10', routeID, classID));

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
        console.log(DataState.GetCoureClassAllMsg.MenuParams)
        return (
            <React.Fragment>
                <Loading tip="加载中..." size="large" spinning={UIState.AppLoading.appLoading}>


                    <Frame userInfo={{
                        name: DataState.LoginUser.UserName,
                        image: DataState.LoginUser.PhotoPath
                    }}

                        module={{
                            cnname: "教学班管理",
                            enname: "CoureClass Management",
                            image: logo
                        }}
                        type="triangle" showBarner={true} showLeftMenu={true}>
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
                        {UIState.ChangeCourseClassModalShow.Show?(<HandleCourseClass></HandleCourseClass>):''}
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
                        {UIState.AddCourseClassModalShow.Show?(<AddCourseClass></AddCourseClass>):''}
                    </Loading>
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