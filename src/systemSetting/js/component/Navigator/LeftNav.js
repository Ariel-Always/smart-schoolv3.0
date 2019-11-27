import React, { Component } from 'react';
import '../../../sass/LeftNav.scss';
import { connect } from 'react-redux';
class LeftNav extends Component {
    constructor(props) {
        super(props);
    }
    changeActive(name) {
        const { dispatch } = this.props;
        dispatch({
            type: name
        })
    }
    render() {
        const { tabActive } = this.props;
        console.log( tabActive);
        return (
            <div className="left-nav">
                <div className="tab-top"></div>
                <div className="tab-bottom">
                    <ul className="tab-content">
                        <li className={tabActive==="termSetting"?"selected":""} onClick={(e) => this.changeActive("termSetting")}> <i></i>
                            学年学期设置<span></span></li>

                        <li className={tabActive==="baseInfo"?"selected":""} onClick={(e) => this.changeActive("baseInfo")}><i></i>
                            学校基础资料设置<span></span></li>

                        <li className={tabActive==="subSystem"?"selected":""} onClick={(e) => this.changeActive("subSystem")}><i></i>
                            子系统访问设置<span></span>
                        </li>
                    </ul>
                </div>

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { ToggleActive } = state
    return {
        tabActive:ToggleActive.tabActive
    }
}
export default connect(mapStateToProps)(LeftNav);
