import React,{Component} from 'react';
import {Frame,Loading,Alert,LeftMenu} from "../../../common";
import {connect} from 'react-redux';
import '../../scss/index.scss';
import UpUIState from '../actions/UpUIState';
import UpDataState from '../actions/UpDataState';
import logo from '../../images/logo.png';
import Banner from '../component/Banner';
import ContentWrapper from './ContentWrapper';
import {HashRouter as Router} from 'react-router-dom';


class App extends Component{
    constructor(props) {
        super(props);

        const {dispatch} = props;
        //判断token是否存在
        if (sessionStorage.getItem('token')){
            //初始化界面
            dispatch(UpDataState.getPageInit());

        }else{
            //不存在的情况下
            dispatch({type:UpUIState.APP_LOADING_SHOW});
            dispatch(UpUIState.showErrorAlert({
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
        dispatch(UpUIState.hideErrorAlert());
        window.location.href="/html/login"
    }
    onAppAlertCancel(){
        const {dispatch}= this.props;
        dispatch(UpUIState.hideErrorAlert());
    }
    onAppAlertClose(){
        const {dispatch}= this.props;
        dispatch(UpUIState.hideErrorAlert());
    }

    render() {
        const {UIState,DataState} = this.props;
        const {Grades=[]} = DataState.SchoolGradeClasses;//左侧菜单的年级和班级信息
        let Menu =[{name:"班级信息总览",link:"/",menu:"menu10",id:"all"}];

        //遍历年级和班级将menu填充
        Grades.map((item,key)=>{

            let Data = {
                name:item.GradeName,
                id:item.GradeID,
                menu:"menu20",
                link:`/${item.GradeID}`,
                List:[]
            };
            if (item.Classes){
                item.Classes.map((i,k)=>{
                    Data['List'].push({
                       name:i.ClassName,
                       id:i.ClassID,
                        link:`/${item.GradeID}/${i.ClassID}`
                    });
                })
            }
            Menu.push(Data);
        });


        return (
                <Router>
                    <React.Fragment>
                    {/*loading包含Frame*/}
                    <Loading className="AppLoading" tip="加载中..." size="large" delay={200} spinning={UIState.AppLoading.show}>

                        <Frame type="triangle" showLeftMenu={true} style={{display:`${UIState.AppLoading.show?'none':'block'}`}}
                           userInfo={{name:DataState.LoginUser.UserName,image:DataState.LoginUser.PhotoPath}}
                           module={{cnname:"行政班管理",enname:"Administration class management",image:logo}}>
                                {/*banner*/}
                                 <div ref="frame-time-barner">
                                   <Banner></Banner>
                                </div>
                                  {/*  左侧菜单*/}
                                 <div ref="frame-left-menu">
                                    <LeftMenu Menu={Menu} Icon="pic3"></LeftMenu>
                                </div>
                                    {/*右侧内容区域，Router变化区域*/}
                                 <div ref="frame-right-content">
                                     <ContentWrapper></ContentWrapper>
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