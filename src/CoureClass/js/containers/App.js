import React, { Component } from 'react';
import { Frame, Menu, Loading, Alert, LeftMenu ,Modal} from "../../../common";
import { connect } from 'react-redux';
import TimeBanner from '../component/TimeBanner'

import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import history from './history'

import logo from '../../images/image-MyClass.png'
import All from '../component/All'
import Subject from '../component/Subject'
import Search from '../component/Search'
import Class from '../component/Class'


//import Subject from '../component/Subject'
import '../../scss/index.scss'
import $ from 'jquery'
import { getData } from '../../../common/js/fetch'
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
            dispatch(actions.UpDataState.getClassAllMsg('/CoureClass_Class?schoolID=sss', routeID,classID));

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
        } else if (type === 'Search') {
            history.push('/Search/' + id)
        }
        //history.push('/'+id)
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
                    onOk={this.SetSubjectTeacherModalOk}
                    onCancel={this.SetSubjectTeacherModalCancel}>

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