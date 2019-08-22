import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../images/admAriHeadImg-1.png'
import { Frame, Menu, Loading, Alert } from "../../../common";
import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import history from '../containers/history'
import TimeBanner from './TimeBanner'
import All from './All'
import Student from './Student'
import Teacher from './Teacher'
import Leader from './Leader'
import $ from 'jquery'
import '../../scss/index.scss'
import '../../scss/RegisterExamine.scss'

import { getData } from '../../../common/js/fetch'




class RegisterExamine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        let route = history.location.pathname;
        console.log(route);
    }

    componentWillMount() {

    }


    render() {
        const { UIState, DataState } = this.props;

        return (
            <React.Fragment>
                <Frame userInfo={{
                    name: DataState.LoginUser.UserName,
                    image: DataState.LoginUser.PhotoPath
                }}

                    module={{
                        cnname: "用户档案管理",
                        enname: "User profile management",
                        image: logo
                    }}
                    type="circle" showLeftMenu={false}
                    showBarner={false}>
                    <div ref="frame-right-content">
                        <div className='content-top'></div>
                    </div>
                </Frame>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    let { UIState, DataState } = state;
    return {
        UIState,
        DataState
    }
};

export default connect(mapStateToProps)(RegisterExamine)