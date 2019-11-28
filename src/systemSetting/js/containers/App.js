import React, { Component } from 'react';

import MainContent from '../component/Navigator/MainContent'
import UIChange from '../action/UI/UIChange'
import { connect } from 'react-redux'


class App extends Component {
    constructor(props) {
        super(props);




    }
    // cancelModify = () => {
    //     const { dispatch } = this.props
    //     dispatch({
    //         type: UIChange.MODIFY_SEMESTER_LIMIT_CLOSE,
    //     })
    // }
    // cancelCreate = () => {
    //     const { dispatch } = this.props
    //     dispatch({
    //         type: UIChange.CREATE_NEW_TERM_CLOSE,
    //     })
    // }

    render() {
        const { maskActive, modifyActive, createActive } = this.props
        return (
            <div>
                {/* <div className="mask" style={{ display: maskActive }}></div>
                <div className="modify-semester-limit" style={{ display: modifyActive }}>
                    <div className="bg_top">
                        调整学期期限
                            <span onClick={() => this.cancelModify()}></span>
                    </div>
                    <div className="term-name">学期名称: <span className="word">2017-2018学年 第一学期</span></div>
                    <div className="start-date">开学时间:
                    <DatePicker></DatePicker>
                    </div>
                    <div className="end-date">放假时间:
                    <DatePicker></DatePicker>
                        </div>
                    <div className="bg_bottom">
                        <button className="btn modify-comfirm">确认</button>
                        <button className="btn modify-cancel" onClick={() => this.cancelModify()}>取消</button>
                    </div>
                </div>


                <div className="create-new-term" style={{ display: createActive }}>
                    <div className="bg_top">
                        启用新学期
                            <span onClick={() => this.cancelCreate()}></span>
                    </div>

                    <div className="new-term">新的学期:
                    <select name="" id="">
                            <option value="">2017-2018学年 第一学期</option>
                            <option value="">2017-2018学年 第二学期</option>
                        </select>
                    </div>
                    <div className="start-date">开始时间:
                        
                        <DatePicker></DatePicker>
                        
                        </div>

                       

                    <div className="end-date" >结束时间:
                        {/* <input type="text" /> */}
                        
                        {/* </div>

                    <div className="bg_bottom">
                        <button className="btn create-comfirm">启用新学期</button>
                        <button className="btn create-cancel" onClick={() => this.cancelCreate()}>取消</button>
                    </div>
                    <div className="tips-info">
                        <i></i>启用新学期后,系统会对上一学期教务信息等进行归档处理
                    </div> */}


                <MainContent></MainContent>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    const { ToggleActive } = state;
    return {
        // maskActive: ToggleActive.maskActive,
        // modifyActive: ToggleActive.modifyActive,
        // createActive: ToggleActive.createActive
    }
}

export default connect(mapStateToProps)(App);