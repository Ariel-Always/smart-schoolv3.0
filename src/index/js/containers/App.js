import React,{Component} from 'react';

import { Loading,Alert } from "../../../common";

import AppAlertActions from '../actions/AppAlertActions'

import { connect } from 'react-redux';

class App extends Component {

    constructor(props){

        super(props);

        this.PageBefore();

    }


    //界面加载前的操作
    PageBefore(){

        const { dispatch } = this.props;

        //判断本地token是否存在
        if(sessionStorage.getItem("token")){

            //获取用户信息并且加载界面

            dispatch()

        }else{

            const lg_tk = this.getQueryString('lg_tk');

            //判断URL中token是否存在

            if (lg_tk){

                //获取用户信息并且加载界面

            }else{

                //弹出登录提示警告弹窗

                dispatch(AppAlertActions.alertWarn(

                    {title:"您还没有登录，请重新登录",ok:()=>{ return this.GoToLogin}}

                    ));

            }

        }

    }


    //跳转到login界面

    GoToLogin(){

        //获取本地的地址。

        let lg_preurl = encodeURIComponent(window.location.href);

        //在这里做异步获取login的地址然后跳转

        window.location.href = 'http://www.baidu.com';

    }


    //拦截并获取界面参数

     getQueryString(name) {

        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");

        var r = window.location.search.substr(1).match(reg);

        if (r != null) return (r[2]); return null;

    }


    componentWillMount(){



    }


    render() {

        const { AppAlert } = this.props;

        return (

            <div className="desk-top-wrapper">

                <Loading tip="加载中请稍后..." size="large" opacity={false}>



                </Loading>

                <div className="">123</div>


                <Alert
                    type={AppAlert.type}
                    title={AppAlert.title}
                    onOk={AppAlert.ok}
                    onCancel={AppAlert.cancel}
                    onHide={AppAlert.hide}
                    onClose={AppAlert.close}
                    show={AppAlert.show}
                >

                </Alert>


            </div>

        );

    }

}


const mapStateToProps = (state)=>{

    const { LoginUser,AppAlert } = state;

    return {

        LoginUser,

        AppAlert

    }

};

export default connect(mapStateToProps)(App);