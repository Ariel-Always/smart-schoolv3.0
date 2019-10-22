import React,{Component} from 'react';

import { Loading,DropDown,Modal,Table } from "../../../common";



import { Input,Tooltip } from "antd";

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

                    dispatch(SafeSettingActions.clearPwd());

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

        if (addQaShow){

            dispatch({type:SafeSettingActions.SAFE_SETTING_QUESTIONS_WRAPPER_HIDE});

            $(this.refs['add-qa-wrapper']).slideUp();

        }else{

            dispatch({type:SafeSettingActions.SAFE_SETTING_QUESTIONS_WRAPPER_SHOW});

            $(this.refs['add-qa-wrapper']).slideDown();

            dispatch(SafeSettingActions.clearQuestions());

        }

    }

    //密保问题选项改变
    questionPickChange(e){

       const { dispatch } = this.props;

       dispatch({type:SafeSettingActions.SAFE_SETTING_QUESTIONS_PICK_CHANGE,data:e});

    }

    //密保输入改变
    questionInputChange(e,type){

        const { dispatch } = this.props;

        dispatch({type:SafeSettingActions.SAFE_SETTING_QUESTIONS_INPUT_CHANGE,data:{type:type,value:e.target.value}});

    }
    //提交问题
    commitQuestion(){

        const { dispatch } = this.props;

        dispatch(SafeSettingActions.commitQuestion());

    }
    //删除密保问题弹窗
    delQuestionsModal(opts){

        const { type,value,id } = opts;

        const { dispatch } = this.props;

        if (type==='close'){

            dispatch({type:SafeSettingActions.SAFE_SETTING_DEL_QUESTIONS_MODAL_HIDE});

        }else{

            dispatch({type:SafeSettingActions.SAFE_SETTING_DEL_QUESTIONS_MODAL_SHOW,data:{value:value,id:id}});

        }

    }
    //删除弹窗输入改变
    delQaInputChange(e){

        const { dispatch } = this.props;

        dispatch({type:SafeSettingActions.SAFE_SETTING_DEL_QUESTIONS_INPUT_CHANGE,data:e.target.value});

    }
    //弹出弹窗提交
    commitDelQuestion(){

        const  { dispatch } = this.props;

        dispatch(SafeSettingActions.commitDelQuestion());

    }

    //编辑密保问题的弹窗
    editQuestionsModal(opts){

        const { type,value,id } = opts;

        const { dispatch } = this.props;

        if (type==='close'){

            dispatch({type:SafeSettingActions.SAFE_SETTING_EDIT_QUESTIONS_MODAL_HIDE});

        }else{

            dispatch({type:SafeSettingActions.SAFE_SETTING_EDIT_QUESTIONS_MODAL_SHOW,data:{value:value,id:id}});

        }

    }

    //编辑问题弹窗选项发生改变
    editQuestionsPicked(e){

        const { dispatch } = this.props;

        dispatch({type:SafeSettingActions.SAFE_SETTING_EDIT_QUESTIONS_PICK,data:e});

    }

    //提交密保弹窗

    commitEditQuestion(){

        const  { dispatch } = this.props;

        dispatch(SafeSettingActions.commitEditQuestion());

    }

    //编辑问题弹窗inpu变化
    editQaInputChange(e,type){

       const { dispatch } = this.props;

       dispatch({type:SafeSettingActions.SAFE_SETTING_EDIT_QUESTIONS_INPUT_CHANGE,data:{type:type,value:e.target.value}});

    }
    //邮箱输入变化
    emailInputChange(e,type){

        const { dispatch } = this.props;

        dispatch({type:SafeSettingActions.SAFE_SETTING_EMAIL_INPUT_CHANGE,data:{type:type,value:e.target.value}});

    }
    //提交邮箱
    emailCommit(e){

        const { dispatch } = this.props;

        dispatch(SafeSettingActions.emailCommit());

    }

    //history的弹窗
    historyModal(){


        const { dispatch,SafeSetting } = this.props;

        const { show } = SafeSetting.loginHistory;
        
        if (show){

            dispatch({type:SafeSettingActions.SAFE_SETTING_LOGIN_HISTORY_HIDE});

        }else{

            dispatch({type:SafeSettingActions.SAFE_SETTING_LOGIN_HISTORY_SHOW});

        }


    }














    render() {

        const { SafeSetting } = this.props;

        const {

            initData,qaSetShow,emailSetShow,pwdSetShow,pwdErrorTips,questionsList,

            qaErrorTips,emailErrorTips,addQaShow,pwdValue,qaValue,qaSelectd,delQuestionsModal,

            editQuestionsModal,emailValue,loginHistory,loadingShow

        } = SafeSetting;

        const { HasSetPwd,HasSetEmail,HasSetQA,Email,Questions,LastTimeEditPwd,LastTimeLogin,LastTimeIP,Logs } = initData;


        const Columns = [

            {

                title:"登录时间",

                dataIndex:"LoginTime",

                key:"LoginTime",

                align:"center",

                render:(i,k)=>{

                    if (i === ''){

                        return <span className="login">--</span>;

                    }else{

                        return <span className="login">{i}</span>;

                    }

                },

                width:200

            },
            {

                title:"登出时间",

                dataIndex:"LogoutTime",

                key:"LogoutTime",

                align:"center",

                render:(i,k)=>{

                    if (i === ''){

                        return <span className="logout">--</span>;

                    }else{

                        return <span className="logout">{i}</span>;

                    }

                },

                width:200

            },
            {

                title:"IP",

                dataIndex:"IPAddress",

                key:"IPAddress",

                align:"center",

                render:(i,k)=>{

                    if (i === ''){

                        return <span className="ip">--</span>;

                    }else{

                        return <span className="ip">{i}</span>;

                    }

                },

                width:180

            },
            {

                title:"登录方式",

                dataIndex:"LoginTypeTxt",

                key:"LoginTypeTxt",

                align:"center",

                render:(i,k)=>{

                    if (i === ''){

                        return <span className="method">--</span>;

                    }else{

                        return <span className="method">{i}</span>;

                    }

                },

                width:180

            },
            {

                title:"登录设备",

                dataIndex:"MachineTypeTxt",

                key:"MachineTypeTxt",

                align:"center",

                render:(i,k)=>{

                    if (i === ''){

                        return <span className="device">--</span>;

                    }else{

                        return <span className="device">{i}</span>;

                    }

                },

            }

        ];

        const data = Logs&&Logs.map(item=>{


            return {


                key:item.LogID,

                LoginTime:item.LoginTime,

                LogoutTime:item.LogoutTime,

                IPAddress:item.IPAddress,

                LoginTypeTxt:item.LoginTypeTxt,

                MachineTypeTxt:item.MachineTypeTxt

            }


        });



        return (

            <Loading spinning={loadingShow}>

                <div className="safe-setting-wrapper">

                <div className="title-bar">

                    <div className="title-bar-name">账号安全</div>

                </div>

                <div className="safe-history-bar">

                    <span className="props">上次登录时间:</span>

                    <span className="login-time">{LastTimeLogin}</span>

                    <span className="props">IP:</span>

                    <span className="login-ip">{LastTimeIP}</span>

                    <input type="button" className="more-log" value="更多记录>>" onClick={this.historyModal.bind(this)}/>

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

                                        <td className="col2"><Input type="password" value={pwdValue.newPwd} maxLength={20} onChange={e=>this.PwdChange(e,'new')}/></td>

                                        <td className="col3"><span className="error-tips" style={{display:`${pwdErrorTips.new?'block':'none'}`}}>{pwdErrorTips.newTips}</span></td>

                                    </tr>

                                    <tr>

                                        <td className="col1">确认密码:</td>

                                        <td className="col2"><Input type="password" value={pwdValue.reNewPwd} maxLength={20} onChange={e=>this.PwdChange(e,'reNew')}/></td>

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

                                                    <span className="question">{item.Question}</span>

                                                    <span className="question-btn-wrapper">

                                                        <input type="button" className="edit-question" value="编辑" onClick={this.editQuestionsModal.bind(this,{type:'show',id:item.ID,value:item.Question})}/>

                                                        <input type="button" className="del-question" value="删除" onClick={this.delQuestionsModal.bind(this,{type:'show',id:item.ID,value:item.Question})}/>

                                                    </span>

                                                </div>

                                    })

                            }

                            <div className="add-question-wrapper">

                                {/*<input type="button" className="add-questions" value="+&nbsp;添加密保问题" onClick={this.addQuestion.bind(this)}/>*/}

                                <span className={`add-question-drop ${addQaShow?'up':''}`} onClick={this.addQuestion.bind(this)}>添加密保问题</span>


                                {

                                    Questions&&(3-Questions.length>0)?

                                        <span className="can-set-tips">(您还可以设置{Questions?3-Questions.length:3}个)</span>

                                        :

                                        <span className="can-set-tips">请删除一个问题再进行添加！</span>

                                }

                            </div>

                            {

                                Questions && (3 - Questions.length > 0) ?

                                    <div className="safe-qa-setting-content" ref="add-qa-wrapper">

                                        <table className="safe-setting-table safe-qa-table">

                                            <tbody>

                                            <tr>

                                                <td className="col1">新密保问题:</td>

                                                <td className="col2">

                                                    <DropDown width={240} height={108}
                                                              dropSelectd={qaSelectd}
                                                              dropList={questionsList}
                                                              style={{zIndex: 8}}
                                                              onChange={this.questionPickChange.bind(this)}>

                                                    </DropDown>

                                                </td>

                                                <td className="col3"></td>

                                            </tr>

                                            {
                                                qaSelectd && qaSelectd.value === 'self' ?

                                                    <tr>

                                                        <td className="col1">自定义问题:</td>

                                                        <td className="col2"><Input maxLength={30}
                                                                                    value={qaValue.selfQa}
                                                                                    onChange={e => {
                                                                                        this.questionInputChange(e, 'self')
                                                                                    }}/></td>

                                                        <td className="col3"><span className="error-tips"
                                                                                   style={{display: `${qaErrorTips.self ? 'block' : 'none'}`}}>{qaErrorTips.selfTips}</span>
                                                        </td>

                                                    </tr>

                                                    : <React.Fragment></React.Fragment>
                                            }

                                            <tr>

                                                <td className="col1">密保答案:</td>

                                                <td className="col2"><Input value={qaValue.answer}
                                                                            onChange={e => this.questionInputChange(e, 'answer')}
                                                                            maxLength={30}/></td>

                                                <td className="col3"><span className="error-tips"
                                                                           style={{display: `${qaErrorTips.answer ? 'block' : 'none'}`}}>{qaErrorTips.answerTips}</span>
                                                </td>

                                            </tr>

                                            <tr>

                                                <td className="col1">登录密码:</td>

                                                <td className="col2"><Input type="password" value={qaValue.pwd}
                                                                            onChange={e => this.questionInputChange(e, 'pwd')}
                                                                            maxLength={20}/></td>

                                                <td className="col3"><span className="error-tips"
                                                                           style={{display: `${qaErrorTips.pwd ? 'block' : 'none'}`}}>{qaErrorTips.pwdTips}</span>
                                                </td>

                                            </tr>

                                            </tbody>

                                        </table>

                                        <div className="btn-wrapper">

                                            <input className="commit" type="button" value="确定"
                                                   onClick={this.commitQuestion.bind(this)}/>

                                            <input type="button" className="cancel" value="取消"
                                                   onClick={this.addQuestion.bind(this)}/>

                                        </div>

                                    </div>

                                    :''

                            }

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

                                {
                                    HasSetEmail&&HasSetEmail?

                                        <tr>

                                            <td className="col1">原邮箱:</td>

                                            <td className="col2"><span className="origin-email">{Email}</span></td>

                                            <td className="col3"></td>

                                        </tr>

                                        :

                                        <React.Fragment></React.Fragment>

                                }

                                <tr>

                                    <td className="col1">新邮箱:</td>

                                    <td className="col2"><Input value={emailValue.newEmail} onChange={e=>this.emailInputChange(e,'new')} maxLength={20}/></td>

                                    <td className="col3"><span className="error-tips" style={{display:`${emailErrorTips.newEmail?'block':'none'}`}}>{emailErrorTips.newEmailTips}</span></td>

                                </tr>

                                <tr>

                                    <td className="col1">登录密码:</td>

                                    <td className="col2"><Input type="password" value={emailValue.pwd} onChange={e=>this.emailInputChange(e,'pwd')} maxLength={20}/></td>

                                    <td className="col3">

                                        <span className="error-tips" style={{display: `${emailErrorTips.pwd ? 'block' : 'none'}`}}>{emailErrorTips.pwdTips}</span>

                                    </td>

                                </tr>


                                </tbody>

                            </table>

                            <div className="btn-wrapper">

                                <input className="commit" onClick={this.emailCommit.bind(this)} type="button" value="确定"/>

                            </div>

                        </div>

                    </div>

                </div>

                <Modal
                    className="del-question-modal"
                    title="删除密保问题"
                    type={1}
                    visible={delQuestionsModal.show}
                    width={560}
                    bodyStyle={{height:156}}
                    mask={true}
                    onCancel={this.delQuestionsModal.bind(this,{type:'close'})}
                    onOk={this.commitDelQuestion.bind(this)}>

                    <div className="ModalContent">

                        <div className="del-question-wrapper clearfix">

                            <span className="props">密保问题:</span>

                            <span className="question-content">{delQuestionsModal.question.value}</span>

                        </div>

                        <div className="del-answer-wrapper clearfix">

                            <span className="props">密码:</span>


                            <Input type="password" className="answer-content" maxLength={20} value={delQuestionsModal.pwd} onChange={this.delQaInputChange.bind(this)}/>


                            <div className="error-tips" style={{display:`${delQuestionsModal.pwdTipsShow?'block':'none'}`}}>

                                {delQuestionsModal.pwdTips}

                            </div>

                        </div>

                    </div>

                </Modal>

                <Modal
                    className="edit-question-modal"
                    title="编辑密保问题"
                    type={1}
                    visible={editQuestionsModal.show}
                    width={560}
                    bodyStyle={{height:356}}
                    mask={true}
                    onCancel={this.editQuestionsModal.bind(this,{type:'close'})}
                    onOk={this.commitEditQuestion.bind(this)}>

                    <div className="ModalContent">

                        <div className="edit-origin-question-wrapper clearfix">

                            <span className="props">原密保问题:</span>

                            <span className="question-content">{editQuestionsModal.originQuestion.value}</span>

                        </div>

                        <div className="new-question-pick clearfix">

                            <span className="props">新密保问题:</span>

                            <DropDown
                                dropSelectd={editQuestionsModal.newQuestionDropSelectd}
                                dropList={questionsList}
                                width={320}
                                style={{zIndex:8,marginLeft:-8}}
                                height={84}
                                onChange={this.editQuestionsPicked.bind(this)}>

                            </DropDown>

                        </div>

                        {

                            editQuestionsModal.newQuestionDropSelectd.value==='self'?

                                <div className="new-self-question clearfix">

                                    <span className="props">自定义问题:</span>

                                    <Input  maxLength={30} value={editQuestionsModal.selfQa} onChange={(e)=>this.editQaInputChange(e,'self')}/>

                                    <div className="error-tips" style={{display:`${editQuestionsModal.selfQaTipsShow?'block':'none'}`}}>

                                        {editQuestionsModal.selfQaTips}

                                    </div>

                                </div>:''

                        }

                        <div className="edit-new-answer clearfix">

                            <span className="props">新密保答案:</span>

                            <Input  className="answer-content" maxLength={30} value={editQuestionsModal.newAnswer} onChange={(e)=>this.editQaInputChange(e,'newAnswer')}/>

                            <div className="error-tips" style={{display:`${editQuestionsModal.newAnswerTipsShow?'block':'none'}`}}>

                                {editQuestionsModal.newAnswerTips}

                            </div>

                        </div>

                        <div className="edit-pwd clearfix">

                            <span className="props">密码:</span>

                            <Input type="password"  maxLength={20} value={editQuestionsModal.pwd} onChange={(e)=>this.editQaInputChange(e,'pwd')}/>

                            <div className="error-tips" style={{display:`${editQuestionsModal.pwdTipsShow?'block':'none'}`}}>

                                {editQuestionsModal.pwdTips}

                            </div>

                        </div>

                    </div>

                </Modal>

                <Modal
                    className="login-history-modal"
                    title="登录历史详情"
                    type={1}
                    visible={loginHistory.show}
                    width={936}
                    bodyStyle={{height:466}}
                    mask={true}
                    footer={null}
                    onCancel={this.historyModal.bind(this)}>

                    <div className="ModalContent">

                        <Table dataSource={data} pagination={false} rowKey={(r,i)=>r.key} columns={Columns}></Table>

                    </div>

                </Modal>

            </div>

            </Loading>

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