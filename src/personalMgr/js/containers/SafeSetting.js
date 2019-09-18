import React,{Component} from 'react';

import { Loading,DropDown } from "../../../common";

import { Input } from "antd";

import SafeSettingActions from  '../actions/SafeSettingAcions';

import $ from 'jquery';

import { connect } from 'react-redux';

class SafeSetting extends Component{

    constructor(props) {

        super(props);

        const { dispatch } = props;

        dispatch(SafeSettingActions.Init());

    }

    //点击下拉需要设置的地方
    setSlide(type){

        const { dispatch,SafeSetting } = this.props;

        const { pwdSetShow,emailSetShow,qaSetShow } = SafeSetting;

        switch (type) {

            case 'pwd':

                if (pwdSetShow){

                    $(this.refs['pwd-content']).slideUp();

                    dispatch({ type:SafeSettingActions.SAFE_SETTING_CONTENT_SLIDE_UP,data:type});

                }else{

                    $(this.refs['pwd-content']).slideDown();

                    dispatch({ type:SafeSettingActions.SAFE_SETTING_CONTENT_SLIDE_DOWN,data:type});

                }

                break;

            case 'email':

                if (emailSetShow){

                    $(this.refs['email-content']).slideUp();

                    dispatch({ type:SafeSettingActions.SAFE_SETTING_CONTENT_SLIDE_UP,data:type});

                }else{

                    $(this.refs['email-content']).slideDown();

                    dispatch({ type:SafeSettingActions.SAFE_SETTING_CONTENT_SLIDE_DOWN,data:type});

                }

                break;

            case 'qa':

                if (qaSetShow){

                    $(this.refs['qa-content']).slideUp();

                    dispatch({ type:SafeSettingActions.SAFE_SETTING_CONTENT_SLIDE_UP,data:type});

                }else{

                    $(this.refs['qa-content']).slideDown();

                    dispatch({ type:SafeSettingActions.SAFE_SETTING_CONTENT_SLIDE_DOWN,data:type});

                }

                break;

            default:

                return;

        }

    }

    //密码更改
    PwdChange(e,type){

        const { dispatch } = this.props;

        dispatch({type:SafeSettingActions.SAFE_SETTING_PWD_VALUE_CHANGE,data:{type:type,value:e.target.value}});

    }

    //提交密码
    commitPwd(e){

        const { dispatch } = this.props;

        dispatch(SafeSettingActions.commitPwd())

    }
    //设置密保问题
    addQuestion() {

        const {dispatch} = this.props;

        let {addQaShow} = this.props.SafeSetting;

        dispatch({type:SafeSettingActions.SAFE_SETTING_QUESTIONS_WRAPPER_SHOW});

        dispatch(SafeSettingActions.getQuestions());

        $(this.refs['add-qa-wrapper']).slideDown();

    }

    //设置密保问题取消
    addQuestionHide(){

        const {dispatch} = this.props;

        let {addQaShow} = this.props.SafeSetting;

        dispatch({type:SafeSettingActions.SAFE_SETTING_QUESTIONS_WRAPPER_HIDE});

        $(this.refs['add-qa-wrapper']).slideUp();

    }

    //密保问题选项改变
    questionChange(e){

       const { dispatch } = this.props;

       dispatch({type:SafeSettingActions.SAFE_SETTING_QUESTIONS_PICK_CHANGE,data:e});

    }





    render() {

        const { SafeSetting } = this.props;

        const {

            initData,qaSetShow,emailSetShow,pwdSetShow,pwdErrorTips,Questions,questionsList,

            qaErrorTips,emailErrorTips,addQaShow,pwdValue,qaSelectd

        } = SafeSetting;

        const { HasSetPwd,HasSetEmail,HasSetQA,EmailQuestions,LastTimeEditPwd,LastTimeLogin,LastTimeIP,Logs } = initData;


        return (

            <div className="safe-setting-wrapper">

                <div className="title-bar">

                    <div className="title-bar-name">账号安全</div>

                </div>

                <div className="safe-setting-content">

                    <div className={`safe-pwd-wrapper safe-item-wrapper ${HasSetPwd?'set':''}`}>

                        <div className={`safe-item-title clearfix ${pwdSetShow?'no-border':''}`}>

                            <div className="safe-title-name">登录密码</div>

                            <div className="safe-title-explains">

                                {HasSetPwd?`建议您定期更换密码，且设置一个包含数据和字母，并长度超过6位以上的密码,上次修改时间:  ${LastTimeEditPwd}`:'密码为初始密码，请尽快修改。'}

                            </div>

                            <span className={`set-drop-btn ${pwdSetShow?'up':''}`} onClick={this.setSlide.bind(this,'pwd')}>设置</span>

                        </div>

                        <div className="safe-pwd-setting safe-item-setting" ref="pwd-content">

                            <table className="safe-setting-table">

                                <tbody>

                                    <tr>

                                        <td className="col1">原密码:</td>


                                        <td className="col2"><Input type="password" value={pwdValue.originPwd} maxLength={20} onChange={e=>this.PwdChange(e,'origin')}/></td>

                                        <td className="col3"><span className="error-tips" style={{display:`${pwdErrorTips.origin?'block':'none'}`}}>{pwdErrorTips.originTips}</span></td>

                                    </tr>

                                    <tr>

                                        <td className="col1">新密码:</td>

                                        <td className="col2"><Input type="password" maxLength={20} onChange={e=>this.PwdChange(e,'new')}/></td>

                                        <td className="col3"><span className="error-tips" style={{display:`${pwdErrorTips.new?'block':'none'}`}}>{pwdErrorTips.newTips}</span></td>

                                    </tr>

                                    <tr>

                                        <td className="col1">确认密码:</td>

                                        <td className="col2"><Input type="password" maxLength={20} onChange={e=>this.PwdChange(e,'reNew')}/></td>

                                        <td className="col3"><span className="error-tips" style={{display:`${pwdErrorTips.reNew?'block':'none'}`}}>{pwdErrorTips.reNewTips}</span></td>

                                    </tr>

                                </tbody>

                            </table>

                            <div className="btn-wrapper">

                                <input className="commit" onClick={this.commitPwd.bind(this)} type="button" value="确定"/>

                            </div>

                        </div>

                    </div>

                    <div className={`safe-questions-wrapper safe-item-wrapper ${HasSetQA?'set':''}`}>

                        <div className={`safe-item-title clearfix ${qaSetShow?'no-border':''}`}>

                            <div className={`safe-title-name`}>密保问题</div>

                            <div className="safe-title-explains">

                                是您找回密码的方式之一。建议您设置一个容易记住但不容易被他人获取的问题及答案，更有效保障您的密码安全。

                            </div>

                            <span className={`set-drop-btn ${qaSetShow?'up':''}`} onClick={this.setSlide.bind(this,'qa')}>设置</span>

                        </div>

                        <div className="safe-pwd-setting safe-item-setting" ref="qa-content">

                            {

                                    Questions&&Questions.map((item,key) => {

                                        return <div key={key} className="seted-questions-wrapper">

                                                    <span className="qa-no">问题{key+1}:</span>

                                                    <span className="question">{item}</span>

                                                    <span className="question-btn-wrapper">

                                                        <input type="button" className="edit-question" value="编辑"/>

                                                        <input type="button" className="del-question" value="删除"/>

                                                    </span>

                                                </div>

                                    })

                            }



                            <div className="add-question-wrapper" style={{display:`${addQaShow?'none':'block'}`}}>

                                <input type="button" className="add-questions" value="+&nbsp;添加密保问题" onClick={this.addQuestion.bind(this)}/>

                                <span className="can-set-tips">(您还可以设置{Questions?3-Questions.length:3}个)</span>

                            </div>

                            <div className="safe-qa-setting-content" ref="add-qa-wrapper">

                                <table className="safe-setting-table safe-qa-table">

                                    <tbody>

                                    <tr>

                                        <td className="col1">新密保问题:</td>

                                        <td className="col2">

                                            <DropDown width={240} height={108}
                                                      dropSelectd={qaSelectd}
                                                      dropList={questionsList}
                                                      style={{zIndex:8}}
                                                      onChange={this.questionChange.bind(this)}  >

                                            </DropDown>

                                        </td>

                                        <td className="col3"></td>

                                    </tr>

                                    {
                                        qaSelectd&&qaSelectd.value==='self'?

                                            <tr>

                                                <td className="col1">自定义问题:</td>

                                                <td className="col2"><Input type="password" maxLength={20}/></td>

                                                <td className="col3"><span className="error-tips" style={{display:`${qaErrorTips.self?'block':'none'}`}}>输入不符合规范</span></td>

                                            </tr>

                                            :<React.Fragment></React.Fragment>
                                    }

                                    <tr>

                                        <td className="col1">密保答案:</td>

                                        <td className="col2"><Input type="password" maxLength={20}/></td>

                                        <td className="col3"><span className="error-tips" style={{display:`${qaErrorTips.answer?'block':'none'}`}}>输入不符合规范</span></td>

                                    </tr>

                                    <tr>

                                        <td className="col1">登录密码:</td>

                                        <td className="col2"><Input type="password" maxLength={20}/></td>

                                        <td className="col3"><span className="error-tips" style={{display:`${qaErrorTips.pwd?'block':'none'}`}}>输入不符合规范</span></td>

                                    </tr>

                                    </tbody>

                                </table>

                                <div className="btn-wrapper">

                                    <input className="commit" type="button" value="确定"/>

                                    <input type="button" className="cancel" value="取消" onClick={this.addQuestionHide.bind(this)}/>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className={`safe-email-wrapper safe-item-wrapper ${HasSetEmail?'set':''}`}>

                        <div className={`safe-item-title clearfix ${emailSetShow?'no-border':''}`}>

                            <div className={`safe-title-name`}>密保邮箱</div>

                            <div className="safe-title-explains">

                                是您找回密码的方式之一。建议您设置一个记住且不容易被他人获取的密保邮箱，更有效保障您的密码安全。

                            </div>

                            <span className={`set-drop-btn ${emailSetShow?'up':''}`} onClick={this.setSlide.bind(this,'email')}>设置</span>

                        </div>

                        <div className="safe-pwd-setting safe-item-setting" ref="email-content">

                            <table className="safe-setting-table">

                                <tbody>

                                <tr>
                                    <td className="col1">原邮箱:</td>
                                    <td className="col2"><Input type="password" maxLength={20}/></td>
                                    <td className="col3"></td>
                                </tr>
                                <tr>
                                    <td className="col1">新邮箱:</td>
                                    <td className="col2"><Input type="password" maxLength={20}/></td>
                                    <td className="col3"><span className="error-tips" style={{display:`${emailErrorTips.newEmail?'block':'none'}`}}>输入不符合规范</span></td>
                                </tr>
                                <tr>
                                    <td className="col1">登录密码:</td>
                                    <td className="col2"><Input type="password" maxLength={20}/></td>
                                    <td className="col3"><span className="error-tips" style={{display:`${emailErrorTips.pwd?'block':'none'}`}}>输入不符合规范</span></td>
                                </tr>

                                </tbody>

                            </table>

                            <div className="btn-wrapper">

                                <input className="commit" type="button" value="确定"/>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        );

    }

}

const mapStateToProps = (state) => {

    const { SafeSetting } = state;

    return {

        SafeSetting

    }

};

export default connect(mapStateToProps)(SafeSetting);