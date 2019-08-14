import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from '../serviceWorker';
import logo from '../common/images/frame/logo.png';
class App extends Component{
    render() {
        return (
            <React.Fragment>
                <div className="login_header">
                    <div className="login_logo" style={{backgroundImage:`url(${logo})`,backgroundPosition:"left center",backgroundSize:"64px 44px"}}>
                        <span id="lbHeadTitle">蓝鸽学科教学云</span><span id="lbHeadTitleVersion" style={{color:"Red"}}></span>
                    </div>
                    <div className="login_app_download">
                        <a className="login_alink"  target="_blank">
                            下载移动客户端</a>
                        <div className="login_app_code_container" data-menu="secondary">
                            <div className="login_app_code"
                                 style={{backgroundImage: "url(http://192.168.129.2:20103/Lgktftp/Base/Product/app-code.png)"}}>
                            </div>
                            <p className="login_app_code_text">
                                扫码下载</p>
                        </div>
                    </div>
                    <div className="login_box">
                        <div className="login_box_tab" id="div_notbrowser" >
                            <div className="login_box_tab" id="div_set" >
                                <p className="login_title ">
                                    账号密码登录</p>
                                <div className="login_form">
                                    <div className="username_box">
                                        <input className="midAccountInput login_input" type="text" maxLength="30"
                                               style={{imeMode:"disabled"}} placeholder="请输入学号/工号/编号/用户名..."
                                               id="txtAccount" />
                                    </div>
                                    <div className="password_box">
                                        <input className="midPwdInput" id="txtPwd" maxLength="30" title="请输入登录密码"
                                               placeholder="请输入登录密码" autoComplete="off" type="text"
                                              style={{imeMode:"disabled"}} />
                                    </div>
                                    <div className="login_forget_password ">
                                        <a  className="midGetPwdSp">
                                            忘记密码?</a>
                                    </div>

                                    <div className="login_box_btn_bar">
                                        <input className="login_btn midBtn" type="button" value="登录" title="点击登录" /></div>
                                </div>
                                <div id="OpenDiv" className="other">
                                    <div className="login_thirdpart">
                                        <div className="thirdpart_left_line">
                                        </div>
                                        <span>第三方登录</span>
                                        <div className="thirdpart_right_line">
                                        </div>
                                        <div className="clear">
                                        </div>
                                    </div>
                                    <div id="OpenList" className="login_thirdpart_icon">
                                        <div className="qq"></div>
                                        <div className="xinlang"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="clear">
                </div>
                <div id="login_wrapper" className="login_wrapper">
                    <div className="login_banner_img" style={{opacity:"0.798638",left:"-248.5px"}}>
                        <div className="login_banner_img_div "
                             style={{backgroundImage:"url(http://192.168.129.2:20103/Lgktftp/Base/Product/banner3.png)"}}>
                        </div>
                    </div>
                </div>
                <div className="login_footer">
                    <span className="login_copyrights">蓝鸽科技 版权所有</span>
                </div>
            </React.Fragment>
        );
    }
}
export {App};
ReactDOM.render(<App />,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();