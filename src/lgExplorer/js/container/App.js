import Tabheader from '../components/Tabheader/Tabheader'
import Content from '../components/Content/Content'
import { Alert } from '../../../common/index'
import { connect } from 'react-redux'
import { TokenCheck_Connect } from '../../../common/js/disconnect';
import HomeData from '../action/HomeData'

import React, { Component } from 'react';
class APP extends Component {

    constructor(props) {
        super(props);
        this.state={

        }
        const { dispatch } = this.props;
        //获取接口一种的数据
        // dispatch(LoadingData.getLinkData());
        //获取接口二中的数据
        // dispatch(LoadingData.getResBaseData());
        TokenCheck_Connect()

        if (sessionStorage.getItem('userInfo')) {
            dispatch(HomeData.getLinkData("P1"))
            dispatch(HomeData.getPeriodList())
            // dispatch(HomeData.getResLinkList());
            // dispatch(HomeData.getMyResLibList())



        } else {
            let timerID = setInterval(() => {
                if (sessionStorage.getItem('UserInfo')) {
                    dispatch(HomeData.getLinkData("P1"));
                    dispatch(HomeData.getPeriodList());
                    // dispatch(HomeData.getResLinkList());
                    // dispatch(HomeData.getMyResLibList())
                    clearInterval(timerID)
                }
            }, 20)
        }

    }


    render() {

        const { AppAlert } = this.props
        console.log(AppAlert.type)
        return (
            <div style={{ background: "#FFF" }}>
                <Tabheader></Tabheader>
                <Content ></Content>
                <Alert type={AppAlert.type} show={AppAlert.show} title={AppAlert.title}
                    //关闭按钮
                    onClose={AppAlert.close}
                    //确定按钮
                    onOk={AppAlert.ok}
                    //取消按钮的点击事件
                    onCancel={AppAlert.cancel}
                    okTitle={AppAlert.okTitle}
                    cancelTitle={AppAlert.cancelTitle}
                    onHide={AppAlert.hide}
                >
                </Alert>




            </div >
        );
    }
}

const mapStateToProps = (state) => {
    const { AppAlert } = state;
    return {
        AppAlert: AppAlert
    }
}

export default connect(mapStateToProps)(APP);