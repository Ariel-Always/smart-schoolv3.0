import React,{Component} from 'react';
import {Frame,Loading,Alert,LeftMenu} from "../../../common";
import {connect} from 'react-redux';
import {HashRouter as Router,Route,Link} from 'react-router-dom';
import '../../scss/index.scss';
import actions from '../actions';
import logo from '../../images/logo.png';
import Banner from '../component/Banner';
import Content from '../containers/Content';
import Empty from '../component/Empty'
import 'whatwg-fetch';


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
            dispatch({type:actions.UpUIState.APP_LOADING_SHOW});
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
                <Router>
                    <React.Fragment>

                    {/*loading包含Frame*/}
                    <Loading className="AppLoading" tip="加载中..." size="large" spinning={UIState.AppLoading.show}>

                        <Frame type="triangle" showLeftMenu={true} style={{display:`${UIState.AppLoading.show?'none':'block'}`}}
                           userInfo={{name:DataState.LoginUser.UserName,image:DataState.LoginUser.PhotoPath}}
                           module={{cnname:"行政班管理",enname:"Administration class management",image:logo}}>
                                {/*banner*/}
                                 <div ref="frame-time-barner">
                               <Banner></Banner>
                            </div>
                                  {/*  左侧菜单*/}
                                 <div ref="frame-left-menu">
                                <LeftMenu></LeftMenu>
                            </div>
                                    {/*右侧内容区域，Router变化区域*/}
                                 <div ref="frame-right-content">
                                <Route path="/"  component={Content}></Route>
                            </div>
                        </Frame>
                    </Loading>
                        {/*{提示弹出框组件}*/}
                    <Alert  show={UIState.AppAlert.show} type={UIState.AppAlert.type} title={UIState.AppAlert.title}
                    onOk={UIState.AppAlert.onOk} onCancel={UIState.AppAlert.onCancel} onClose={UIState.AppAlert.onClose}>

                    </Alert>

                </React.Fragment>
                </Router>
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