import React from 'react'
import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {Button,Search} from '../../../common'
import '../../scss/TimeBanner.scss'
class TimeBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <React.Fragment>
                <span className='timeBanner_tips'>当前共有{}条更新记录<a to='#' target='_blank' className='tips_handle'>查看详情</a></span>
                <div className='handle-content'>
                    <Button className='content content-button' height='24' type='primary' color='blue' value='添加教学班' shape='round'/>
                    <Button className='content content-button' height='24' type='primary' color='blue' value='导入教学班' shape='round'/>
                    <span className='divide content'>|</span>
                    <Search className='content search' placeholder='请输入关键字搜索...'></Search>
                </div>
            </React.Fragment>
        )
    }
}

export default TimeBanner