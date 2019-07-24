import React,{Component} from 'react';
class BreadCrumb extends Component{
    render() {
        return (
            <div className="frame_time_bar">
                <div className="frame_nav_content">
                    <div className="frame_nav_left_part fl">
                        <span className="frame_nav_title">当前位置:</span>
                        <span>个人账号管理</span>
                    </div>
                </div>
            </div>
        );
    }
}
export default BreadCrumb;