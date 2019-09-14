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


    render() {

        const { BaseSetting,LoginUser } = this.props;

        const { editor, baseInfo } = BaseSetting;

        const {

            UserID,

            UserName,

            ShortName

        } = baseInfo;

        return (

            <div className="base-setting-wrapper">

                <div className="title-bar">

                    <input className="edit-btn" type="button" value="编辑资料"/>

                </div>

                <div className="base-info-wrapper base-item-setting">

                    <div className="title base">基本信息</div>

                    <div className="content-wrapper">

                        {

                            editor?

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

                                editor?

                                    <Input value={ShortName}/>

                                    :

                                    <span className="val">{ShortName}</span>

                            }

                        </div>

                    </div>

                </div>

                <div className="concact-info-wrapper base-item-setting">

                    <div className="title concact">联系方式</div>

                    <div className="content-wrapper">



                    </div>

                </div>

                <div className="sign-info-wrapper base-item-setting">

                    <div className="title sign">个性签名</div>

                    <div className="content-wrapper">



                    </div>

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