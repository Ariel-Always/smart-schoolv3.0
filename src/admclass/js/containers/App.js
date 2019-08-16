import React,{Component} from 'react';
import {Frame,Loading,Alert} from "../../../common";
import {connect} from 'react-redux';
import {HashRouter as Router,Route,Link} from 'react-router-dom';
import '../../scss/index.scss';
import actions from '../actions';
import logo from '../../images/logo.png';
import Banner from '../component/Banner';
import Content from '../containers/Content';



class App extends Component{
    constructor(props) {
        super(props);
        const {dispatch} = props;
        //判断token是否存在
        if (sessionStorage.getItem('token')){
            dispatch(actions.UpDataState.getLoginUser('/Login?method=GetUserInfo'));
            dispatch(actions.UpDataState.getAllGradePreview('/classPreview'));
            dispatch({type:actions.UpUIState.APP_LOADING_CLOSE});
        }else{
            //不存在的情况下
            dispatch(actions.UpUIState.APP_LOADING_CLOSE);
            dispatch(actions.UpUIState.showErrorAlert({
                type:'btn-error',
                title:"登录错误，请重新登录!",
                ok:this.onAppAlertOK.bind(this),
                cancel:this.onAppAlertCancel.bind(this),
                close:this.onAppAlertClose.bind(this)
            }));
        }
    }
    onAppAlertOK(){
        const {dispatch}= this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
        window.location.href="/html/login"
    }
    onAppAlertCancel(){
        const {dispatch}= this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    onAppAlertClose(){
        const {dispatch}= this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }

    render() {
        const {UIState,DataState} = this.props;
        return (
            <React.Fragment>
            <Loading tip="加载中..." size="large" spinning={UIState.AppLoading.appLoading}>
                {/*userInfo={{name:LoginUserInfo.username,image:LoginUserInfo.image}}*/}
                <Frame type="triangle" showLeftMenu={true}
                       userInfo={{name:DataState.LoginUser.UserName,image:DataState.LoginUser.PhotoPath}}
                       module={{cnname:"行政班管理",enname:"Administration class management",image:logo}}>
                    <div ref="frame-time-barner">
                       <Banner></Banner>
                    </div>
                    <div ref="frame-left-menu">

                    </div>
                    <div ref="frame-right-content">
                        <Content data={DataState}></Content>
                    </div>
                </Frame>

            </Loading>
            <Alert show={UIState.AppAlert.appAlert} type={UIState.AppAlert.type} title={UIState.AppAlert.title}
            onOk={UIState.AppAlert.onOk} onCancel={UIState.AppAlert.onCancel} onClose={UIState.AppAlert.onClose}
            ></Alert>
            </React.Fragment>
        );
    }
}
const  mapStateToProps = (state) => {
    let {UIState,DataState} = state;
    return {
        UIState,
        DataState
    }
};
export default connect(mapStateToProps)(App);