import Tabheader from '../components/Tabheader/Tabheader'
import Content from '../components/Content/Content'
import { Alert } from '../../../common/index'
import {connect} from 'react-redux'

import React, { Component } from 'react';
class APP extends Component {



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