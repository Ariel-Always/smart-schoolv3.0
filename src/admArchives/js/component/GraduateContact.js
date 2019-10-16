import React from 'react'
import { connect } from 'react-redux';
import { Button, Radio, RadioGroup, Tips } from '../../../common/index'
import { Input } from 'antd'
import CONFIG from '../../../common/js/config';
import actions from '../actions';
import '../../scss/GraduateContact.scss'

class GraduateContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TelephoneTipsVisible: false,
            TelephoneTipsTitle: '电话由数字及-/组成',
            EmailTipsVisible: false,
            EmailTipsTitle: '邮箱格式错误',
            IDCardNoTipsVisible: false,
            IDCardNoTipsTitle: '身份证格式错误',
            HomeAdressTipsVisible: false,
            HomeAdressTipsTitle: '家庭住址格式错误',
        }
    }

    onTelephoneChange = (e) => {
        const { dispatch } = this.props;
        let value = e.target.value;
        let Test = /^[0-9]{11}$/.test(value)
        if (Test || !e.target.value) {
            dispatch(actions.UpUIState.editModalTipsVisible({ TelephoneTipsVisible: false }))
        } else {
            dispatch(actions.UpUIState.editModalTipsVisible({ TelephoneTipsVisible: true }))

        }
        dispatch(actions.UpDataState.setGraduateContactMsg({ Telephone: e.target.value }))
    }
    onEmailChange = (e) => {
        const { dispatch } = this.props;
        let value = e.target.value;
        let Test = false
        if (!/^(\S)+@(\S)+\.[a-zA-Z]{2,3}$/.test(value)) {
            Test = false;
        }
        else {
            Test = /^([a-zA-Z0-9]+[_|\-|\.]*)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]*)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/gi.test(value);
        }
        if (Test || !e.target.value) {
            dispatch(actions.UpUIState.editModalTipsVisible({ EmailTipsVisible: false }))
        } else {
            dispatch(actions.UpUIState.editModalTipsVisible({ EmailTipsVisible: true }))

        }
        dispatch(actions.UpDataState.setGraduateContactMsg({ Email: e.target.value }))
    }
    onHomeAddressChange = (e) => {
        const { dispatch } = this.props;
        let value = e.target.value;
        let Test = /^[A-Za-z0-9_()\u4e00-\u9fa5]{0,100}$/.test(value);
        if (Test || !e.target.value) {
            dispatch(actions.UpUIState.editModalTipsVisible({ HomeAdressTipsVisible: false }))
        } else {
            dispatch(actions.UpUIState.editModalTipsVisible({ HomeAdressTipsVisible: true }))

        }
        dispatch(actions.UpDataState.setGraduateContactMsg({ HomeAddress: e.target.value }))
    }
    render() {
        const { DataState, UIState } = this.props;
        let { GraduateContactInitMsg, GraduateContactChangeMsg } = DataState.GetGraduateMsg;
        let EditModalTipsVisible = UIState.EditModalTipsVisible;

        return (
            <div className='GraduateContact'>
                <div className='row'>
                    <span className='left'>联系电话：</span>
                    <span className='right'>
                        <Tips visible={EditModalTipsVisible.TelephoneTipsVisible} title={this.state.TelephoneTipsTitle} >

                            <Input
                                placeholder='请输入联系电话'
                                maxLength={11}
                                type='text'
                                className='Telephone'
                                value={GraduateContactChangeMsg.Telephone}
                                onChange={this.onTelephoneChange.bind(this)}
                                style={{ display: 'inline-block' }}
                            >
                            </Input>
                        </Tips>
                    </span>
                </div>
                <div className='row'>
                    <span className='left'>电子邮箱：</span>
                    <span className='right'>
                        <Tips visible={EditModalTipsVisible.EmailTipsVisible} title={this.state.EmailTipsTitle} >

                            <Input
                                placeholder='请输入电子邮箱'
                                type='text'
                                className='Email'
                                value={GraduateContactChangeMsg.Email}
                                onChange={this.onEmailChange.bind(this)}
                                style={{ display: 'inline-block' }}
                            >
                            </Input>
                        </Tips>
                    </span>
                </div>
                <div className='row'>
                    <span className='left'>家庭住址：</span>
                    <span className='right'>
                        <Tips visible={EditModalTipsVisible.HomeAdressTipsVisible} title={this.state.HomeAdressTipsTitle} >

                            <Input.TextArea
                                placeholder='请输入家庭住址'
                                className='HomeAddress'
                                value={GraduateContactChangeMsg.HomeAddress}
                                onChange={this.onHomeAddressChange.bind(this)}
                                height={56}
                                width={354}
                            ></Input.TextArea>
                        </Tips>
                    </span>
                </div>
                <span className='tips' style={{ display: UIState.EditModalTipsVisible.GraduateJobTypeVisible ? 'inline-block' : 'none' }}>
                    <span className='error'></span>
                    <span style={{ verticalAlign: 'middle' }}>输入内容含有非法字符</span>
                </span>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    let { UIState, DataState } = state;
    return {
        UIState,
        DataState
    }
};
export default connect(mapStateToProps)(GraduateContact)