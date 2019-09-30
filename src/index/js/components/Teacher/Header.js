import React,{Component} from 'react';

class Header extends Component{

    render() {

        const { HeaderSetting,LoginUser,HeaderMenuToggle,SubjectMenuToggle,SubjectClick } = this.props;

        return (

            <div className="desk-header-wrapper clearfix">

                <div className="logo-wrapper">中小学一体化学科教育云</div>

                <div className="subject-wrapper">

                    <button id="subject-pick-btn" className={`subject-pick-btn ${HeaderSetting.SubjectMenuShow?'up':''}`} title={HeaderSetting.SubjectSelect.name} onClick={e=>{SubjectMenuToggle(e)}}>{HeaderSetting.SubjectSelect.name}</button>

                    <div className="subject-item-wrapper" style={{display:`${HeaderSetting.SubjectMenuShow?'block':'none'}`}}>

                        {

                            HeaderSetting.SubjectsInfo.map((item,key)=>{

                                return <div key={key} className="subject-item" title={item.name} onClick={(e)=>SubjectClick({id:item.id,name:item.name})}>{ item.name }</div>

                            })

                        }

                    </div>

                </div>


                <div className="frame-home-header-menus">

                    <div className="frame-home-header-menu clearfix">

                        <div className="down-menu clearfix" id="header-down-menu" onClick={e=>{HeaderMenuToggle(e)}}>

                            <span className={`arrow ${HeaderSetting.MenuShow?'up':''}`}></span>

                            <span className="frame-home-username" title={LoginUser.UserName}>{LoginUser.UserName}</span>

                        </div>

                        <div className="menu-wrapper" id="header-menu-wrapper" style={{display:`${HeaderSetting.MenuShow?'block':'none'}`}}>

                            <a href="/html/personalMgr" target="_blank" className="perMgrLink menu">账号管理</a>

                            <a className="help menu">帮助</a>

                            <a className="logout menu">退出登录</a>

                        </div>

                        <a href="/html/personalMgr" target="_blank" className="frame-home-userpic" style={{backgroundImage:`url(${LoginUser.PhotoPath})`}}></a>

                    </div>

                </div>

                <button className="adopt">桌面定制</button>

            </div>

        );

    }

}

export default Header;