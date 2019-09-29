import React,{Component} from 'react';


class Header extends Component{


    render() {

        const { HeaderSetting,LoginUser,HeaderMenuToggle } = this.props;

        return (

            <div className="header-wrapper">

                <div className="header-user-info">

                    <div className="header-info-wrapper clearfix">

                        <div className="logo-wrapper">

                            中小学一体化学科教育云

                        </div>

                        <div className="frame-home-header-menus">

                            <div className="frame-home-header-menu clearfix">

                                <div className="down-menu clearfix" id="header-down-menu" onClick={e=>{HeaderMenuToggle(e)}}>

                                    <span className={`arrow ${HeaderSetting.MenuShow?'up':''}`}></span>

                                    <span className="frame-home-username">{LoginUser.UserName}</span>

                                </div>

                                <div className="menu-wrapper" id="header-menu-wrapper" style={{display:`${HeaderSetting.MenuShow?'block':'none'}`}}>

                                    <a className="perMgrLink menu">账号管理</a>

                                    <a className="help menu">帮助</a>

                                    <a className="logout menu">退出登录</a>

                                </div>

                                <span className="frame-home-userpic" style={{backgroundImage:`url(${LoginUser.PhotoPath})`}}></span>

                            </div>

                            <div className="frame-home-header-menu">

                                <a className="frame-home-msg-menu" title="我的消息"></a>

                            </div>

                            <div className="frame-home-header-menu">

                                <a className="frame-home-tel-menu" title="通讯录"></a>

                            </div>

                        </div>

                    </div>

                </div>


                <div className="header-content-wrapper">

                    <div className="circle oline">



                    </div>

                    <div className="circle topVisit">



                    </div>

                    <div className="circle login">



                    </div>

                    <div className="circle login">



                    </div>

                </div>

            </div>

        );

    }

}

export default Header;