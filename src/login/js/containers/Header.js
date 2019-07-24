import React,{Component} from 'react';
class Header extends Component{
    render() {
        return (
            <div className="frame_new_header">
                <div className="frame_header_bg query_vip_info">
                    <div className="frame_header_star_bg">
                        <div className="page_sub_title_container">
                            <div className="page_sub_title">- 1292中小学校</div>
                        </div>

                        <div className="query_vip_info_bubble1"></div>
                        <div className="query_vip_info_bubble2"></div>
                        <div className="query_vip_info_bubble3"></div>
                        <div className="query_vip_info_bubble4"></div>
                        <div className="query_vip_info_bubble5"></div>
                        <div className="query_vip_info_bubble6"></div>

                    </div>
                </div>
                <div className="frame_home_header">
                    <div className="frame_home_header_content">
                        <div className="frame_home_logo">
                            <a href="KTCloudTradeIndex.aspx" target="_self">蓝鸽网上课堂 - <span
                                className="frame_header_sub_title">华南课堂云</span></a>
                        </div>
                        <div className="frame_home_header_menus">


                            <div id="frame_ci_block" className="" data-version="2019-01-14">


                                <div className="frame_home_header_menus">
                                    <div className="frame_home_header_menu">
                                        <input id="frame_ci_btn_logout" className="frame_home_logout" title="退出"
                                               type="button" value="" />
                                                <a href="javascript:;" className="frame_home_user_name">
                                                    <span id="ctl08_frame_ci_txt_userName" title="蓝鸽监事员"
                                                          className="frame_ci_txt_userName frame_ci_link"
                                                          data-login="true"
                                                          data-url="http://192.168.129.2:20102/UserMgr/PersonalMgr/Default.aspx?lg_tk=ca6271de-1012-432f-a763-e7dee533579c">蓝鸽监事员</span>
                                                </a>
                                    </div>
                                </div>


                            </div>


                        </div>
                    </div>
                </div>

                <div className="frame_block_container query_vip_info">
                    <div className="frame_block_zh_name">VIP会员信息查询</div>
                    <div className="frame_block_en_name">VIP Member Information</div>
                </div>
            </div>
        );
    }
}
export default Header;