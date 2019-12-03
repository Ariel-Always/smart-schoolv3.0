import React, { Component } from 'react';
import '../../../sass/subSystemAccessSet.scss';
import { connect } from 'react-redux';
import { DropDown, Search } from '../../../../common'
class SubsystemAccessSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            simpleSearch: '',
        }

    }

    //搜索框的查询时间

 

    simpleClickSearch(e) {
        this.setState({ simpleSearch: e.value });
    }

    render() {

        return (
            <div className="subsystem-access">
                <div className="guide">
                    <div className="subsystem-logo"></div>
                    <span>子系统访问设置</span>
                </div>
                <div className="access-status">
                    访问状态:
                    <DropDown
                        width={120}

                        dropSelectd={{ value: `01`, title: `开启访问` }}

                        dropList={[
                            {

                                value: `01`,
                                title: "开启访问"

                            },
                            {
                                value: `02`,
                                title: `关闭访问`
                            }
                        ]}

                        height={120}

                        style={{ zIndex: 1100 }}
                    // onChange={this.dropChange}
                    >

                    </DropDown>
                </div>
                <div className="users-type">
                    用户类型:
                    <DropDown
                        width={120}

                        dropSelectd={{ value: `01`, title: `教师` }}

                        dropList={[
                            {

                                value: `01`,
                                title: "教师"

                            },
                            {
                                value: `02`,
                                title: `管理员`
                            },
                            {
                                value: `03`,
                                title: `学生`
                            },
                        ]}

                        height={120}

                        style={{ zIndex: 1100 }}

                    >

                    </DropDown>
                </div>
                <div className="subsystem-search">
                    <Search placeHolder="输入关键词快速搜索" onClickSearch={this.simpleClickSearch}></Search>
                </div>

                <div className="subsystem-detail">
                    共计<span>6</span>个系统，其中<span>1</span>个已关闭访问</div>

                 <div className=""></div>           



            </div>

        );
    }
}

const mapStateToProps = (state) => {
    const { ToggleActive } = state;
    return {

    }
}
export default connect(mapStateToProps)(SubsystemAccessSetting);