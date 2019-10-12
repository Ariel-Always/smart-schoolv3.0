import React,{Component} from 'react';

import AppAlertActions from '../../actions/AppAlertActions';

import ManagerPageActions from '../../actions/Manager/ManagerPageActions';

import HeaderActions from '../../actions/Manager/HeaderActions';

import Header from '../../components/Manager/Header';

import ModulesContent from '../../components/Manager/ModulesContent';

import { LogOut } from "../../../../common/js/disconnect";

import { connect } from 'react-redux';

class Index extends Component{

    constructor(props) {

        super(props);

        const { dispatch } = props;

        dispatch(ManagerPageActions.PageInit());

    }

    //头部点击menu

    HeaderMenuToggle(e){

        e.stopPropagation();

        const { dispatch } = this.props;

        dispatch({type:HeaderActions.HEADER_MENU_TOGGLE});

    }


    OutMenuEvent(e){

        const { dispatch } = this.props;

        let HDM =  document.getElementById('header-down-menu');

        let HMW = document.getElementById('header-menu-wrapper');

        if (!HDM.contains(e.target)){

            dispatch({type:HeaderActions.HEADER_MENU_HIDE});

        }

    }


    //点击menu之外
    componentDidMount(){

        addEventListener('click',this.OutMenuEvent.bind(this));

    }


    //点击模块的时候调用
    ModuleClick({AccessType,AccessParam,ModuleStatus}){

        const { dispatch } = this.props;

        if (AccessType === 'href'){

            if (ModuleStatus===1){

                window.open(AccessParam);

            }else{
                
                switch (ModuleStatus) {


                    case 2:

                        dispatch(AppAlertActions.alertTips({title:"您还购买该模块，请先购买"}));

                        break;

                    case 3:

                        dispatch(AppAlertActions.alertTips({title:"该模块未安装，请先安装"}));

                        break;

                    case 4:

                        dispatch(AppAlertActions.alertTips({title:"该模块维护中"}));

                        break;

                    case 5:

                        dispatch(AppAlertActions.alertTips({title:"该模块已过期"}));

                        break;

                    default:

                        return;

                }

            }

        }else{

            //后期做处理

        }

    }

    //退出登录
    LogOut(){

        const { dispatch } = this.props;

        dispatch(AppAlertActions.alertError({title:"您确定要退出登录么?",ok:()=>{ return this.GoOut}}));

    }


    GoOut(){

        LogOut();

    }


    render() {

        const { LoginUser,Manager } = this.props;

        const { HeaderSetting,Modules } = Manager;

        return (

            <div className="manager-desk-top">

                <Header LoginUser={LoginUser} LogOut={this.LogOut.bind(this)}   HeaderSetting={HeaderSetting} HeaderMenuToggle={this.HeaderMenuToggle.bind(this)}></Header>

                <ModulesContent Modules={Modules} ModuleClick={this.ModuleClick.bind(this)}></ModulesContent>

                <div className="footer">

                    蓝鸽科技 版权所有

                </div>

            </div>

        );

    }

}

const mapStateToProps = (state) => {

    const { LoginUser,Manager } = state;

    return {

        LoginUser,

        Manager

    }

};

export default connect(mapStateToProps)(Index);