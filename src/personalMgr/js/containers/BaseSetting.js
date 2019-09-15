import React,{Component} from 'react';

import BaseActions from '../actions/BaseActions';

import { Loading } from "../../../common";

import { Input } from "antd";

import { connect } from 'react-redux';

class BaseSetting extends Component{

    constructor(props) {

        super(props);

        const { dispatch } = props;

        dispatch(BaseActions.Init());

    }


    editorStatusChange(){

        const { dispatch,BaseSetting } = this.props;

        dispatch({type:BaseActions.BASE_SETTING_STATUS_CHANGE,data:!BaseSetting.editorStatus});

    }

    roleLook(){

        const { dispatch } = this.props;

    }

    UserNameChange(e){

        console.log(e);

    }


    render() {

        const { BaseSetting,LoginUser } = this.props;

        const { editorStatus, baseInfo } = BaseSetting;

        const {

            UserID,

            UserName,

            ShortName,

            Gender,

            SubjectName,

            Modules,

            QQ,

            Weixin,

            Weibo,

            Telephone,

            Sign

        } = baseInfo;

        return (

            <div className="base-setting-wrapper">

                {

                    editorStatus?

                       ''

                        : <div className="title-bar">

                            <input className="edit-btn" type="button" value="编辑资料" onClick={this.editorStatusChange.bind(this)}/>

                        </div>

                }

                <div className="base-info-wrapper base-item-setting" style={editorStatus?{paddingTop:"36px"}:{}}>

                    <div className="title base">基本信息</div>

                    <div className="content-wrapper">

                        {

                            editorStatus?

                            <div className="user-photo-wrapper clearfix">

                                <span className="props">头像:</span>



                            </div>

                            :''

                        }

                        <div className="user-id-wrapper clearfix">

                            <span className="props">

                                {

                                    LoginUser.UserType === 2?

                                        '学号:':'工号:'

                                }

                            </span>

                            <span className="val">{UserID}</span>

                        </div>

                        <div className="account-name-wrapper clearfix">

                            <span className="props">

                                {

                                    LoginUser.UserType === 0?

                                        '账号名称:':'姓名:'

                                }

                            </span>

                            <span className="val">{UserName}</span>

                        </div>

                        <div className="user-name-wrapper clearfix">

                            <span className="props">用户名:</span>

                            {

                                editorStatus?

                                    <React.Fragment>

                                        <Input value={ShortName}min={3} max={15} onChange={this.UserNameChange.bind(this)}/>

                                        <span className="set-tips">(由3-15位英文/数字组成，可用于登录)</span>

                                    </React.Fragment>

                                    :

                                    <span className={`val ${ShortName?'':'unset'}`}>{ShortName?ShortName:'未设置'}</span>

                            }

                        </div>

                        {

                            LoginUser.UserType === 1?

                                <div className="sex-wrapper clearfix">

                                    <span className="props">性别:</span>


                                    <span className="val">{Gender}</span>


                                </div>

                                :''

                        }

                        {

                            LoginUser.UserType === 1?

                                <div className="subject-wrapper clearfix">

                                    <span className="props">所教学科:</span>


                                    <span className="val">{SubjectName}</span>


                                </div>

                                :''

                        }

                        <div className="role-wrapper clearfix">

                            <span className="props">身份:</span>

                            {

                                LoginUser.UserType === 0?

                                <React.Fragment>

                                    <span className={`val ${Modules?'link':''}`} onClick={this.roleLook.bind(this)}>{ShortName}</span>

                                    {

                                        Modules?

                                            <span className="set-tips">(点击可查看子系统访问权限)</span>

                                            :''

                                    }

                                </React.Fragment>

                                    :''

                            }

                        </div>

                    </div>

                </div>

                <div className="concact-info-wrapper base-item-setting">

                    <div className="title concact">联系方式</div>

                    <div className="content-wrapper">

                        <div className="qq-wrapper clearfix">

                            <span className="props">QQ:</span>

                            {


                                editorStatus?

                                    <Input value={QQ}/>

                                    :

                                    <span className={`val ${QQ?'':'unset'}`}>{QQ?QQ:'未设置'}</span>

                            }

                        </div>

                        <div className="weixin-wrapper clearfix">

                            <span className="props">微信:</span>

                            {


                                editorStatus?

                                    <Input value={Weixin}/>

                                    :

                                    <span className={`val ${Weixin?'':'unset'}`}>{Weixin?Weixin:'未设置'}</span>

                            }

                        </div>

                        <div className="weibo-wrapper clearfix">

                            <span className="props">微博:</span>

                            {


                                editorStatus?

                                    <Input value={Weibo}/>

                                    :

                                    <span className={`val ${Weibo?'':'unset'}`}>{Weibo?Weibo:'未设置'}</span>

                            }

                        </div>

                        <div className="tel-wrapper clearfix">

                            <span className="props">微博:</span>

                            {


                                editorStatus?

                                    <Input value={Telephone}/>

                                    :

                                    <span className={`val ${Telephone?'':'unset'}`}>{Telephone?Telephone:'未设置'}</span>

                            }

                        </div>

                    </div>

                </div>

                <div className="sign-info-wrapper base-item-setting">

                    <div className="title sign">个性签名</div>

                    <div className="content-wrapper">


                        <div className="sign-wrapper clearfix">

                            {

                                editorStatus?

                                    <React.Fragment>

                                        <span className="props">个性签名:</span>

                                        <Input.TextArea value={Sign}/>

                                    </React.Fragment>

                                    :

                                    <span className={`val ${Sign?'':'unset'}`}>{Sign?Sign:'未设置'}</span>

                            }

                        </div>


                    </div>

                </div>

                <div className="btn-wrapper clearfix">

                        {

                            editorStatus?

                                <React.Fragment>

                                    <input type="button" className="btn-save" value="保存"/>

                                    <input type="button" className="btn-cancel" value="取消"/>

                                </React.Fragment>

                                :''

                        }

                    </div>

            </div>

        );

    }

}

const mapStateToProps = (state) => {

    const { BaseSetting,LoginUser } = state;

    return {

        BaseSetting,

        LoginUser

    }

};

export default connect(mapStateToProps)(BaseSetting);