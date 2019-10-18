import React,{Component} from 'react';


class Header extends Component{


    //容量大小换算

    diskSize(num){

        if (num === 0) return { num:0,unit:"B" };

        var k = 1024; //设定基础容量大小

        var sizeStr = ['B','K','M','G','T','P','E','Z','Y']; //容量单位

        var i = 0; //单位下标和次幂

        for(var l=0;l<8;l++){   //因为只有8个单位所以循环八次

            if(num / Math.pow(k, l) < 1){ //判断传入数值 除以 基础大小的次幂 是否小于1，这里小于1 就代表已经当前下标的单位已经不合适了所以跳出循环

                break; //小于1跳出循环

            }

            i = l; //不小于1的话这个单位就合适或者还要大于这个单位 接着循环

        }
        // 例： 900 / Math.pow(1024, 0)  1024的0 次幂 是1 所以只要输入的不小于1 这个最小单位就成立了；
        //     900 / Math.pow(1024, 1)  1024的1次幂 是1024  900/1024 < 1 所以跳出循环 下边的 i = l；就不会执行  所以 i = 0； sizeStr[0] = 'B';
        //     以此类推 直到循环结束 或 条件成立
        return {num:this.toDecimal1NoZero(num/Math.pow(k,i)),unit:sizeStr[i]}  //循环结束 或 条件成立 返回字符

    }

    //保留1位小数
    toDecimal1NoZero(x) {

        let f = Math.round(x * 10)/10;

        let str = f.toString();

        return str;

    }



    render() {

        const { HeaderSetting,LoginUser,HeaderMenuToggle,LogOut } = this.props;

        const { TopVisit,OnlineUsers,SuspiciousLogin,OnlineDiskUsed,GroupFileSpaceUsed } = HeaderSetting;

        let onlineNum = OnlineDiskUsed?parseInt(OnlineDiskUsed.split('/')[0]):0;

        let onlineDiskInfo = this.diskSize(onlineNum);

        let groupNum = GroupFileSpaceUsed?parseInt(GroupFileSpaceUsed.split('/')[0]):0;

        let groupInfo = this.diskSize(groupNum);

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

                                    <span className="frame-home-username" title={LoginUser.UserName}>{LoginUser.UserName}</span>

                                </div>

                                <div className="menu-wrapper" id="header-menu-wrapper" style={{display:`${HeaderSetting.MenuShow?'block':'none'}`}}>

                                    <a href="/html/personalMgr" target="_blank" className="perMgrLink menu">账号管理</a>

                                    <a className="help menu">帮助</a>

                                    <a className="logout menu" onClick={()=>LogOut()}>退出登录</a>

                                </div>

                                <a href="/html/personalMgr" target="_blank" className="frame-home-userpic" style={{backgroundImage:`url(${LoginUser.PhotoPath})`}}></a>

                            </div>

                            <div className="frame-home-header-menu">

                                <span id="Assistant_infoCenter" className="frame-home-msg-menu" title="我的消息"></span>

                            </div>

                            <div className="frame-home-header-menu">

                                <a className="frame-home-tel-menu" title="通讯录"></a>

                            </div>

                        </div>

                    </div>

                </div>


                <div className="header-content-wrapper clearfix">

                    <div className="circle online">

                        <div className="num">

                            <span className="num-detail">{TopVisit?TopVisit.split('/')[0]:0}</span>

                            <span className="unit">人</span>

                        </div>

                        <div className="title">当前在线</div>

                    </div>

                    <div className="circle top-visit">

                        <div className="num">

                            <span className="num-detail">{OnlineUsers?OnlineUsers.split('/')[0]:0}</span>

                            <span className="unit">人</span>

                        </div>

                        <div className="title">访问峰值<span className="tips">(24小时内)</span></div>

                    </div>

                    <div className="circle suspicious-login">

                        <div className="num">

                            <span className="num-detail">{SuspiciousLogin?SuspiciousLogin:0}</span>

                            <span className="unit">条</span>

                        </div>

                        <div className="title">可疑登录</div>

                    </div>

                    <div className="circle used-space">

                        <div className="num">

                            <span className="num-detail">{onlineDiskInfo.num}</span>

                            <span className="unit">{onlineDiskInfo.unit}</span>

                        </div>

                        <div className="title">网盘已用空间</div>

                    </div>

                    <div className="circle free-space">

                        <div className="num">

                            <span className="num-detail">{groupInfo.num}</span>

                            <span className="unit">{groupInfo.unit}</span>

                        </div>

                        <div className="title">群文件已用空间</div>

                    </div>

                </div>

            </div>

        );

    }

}

export default Header;