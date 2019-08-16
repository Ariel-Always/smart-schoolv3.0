import React, { Component } from 'react';
import { Frame, Menu } from "../../../common";
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import history from './history'
import logo from '../../images/admAriHeadImg-1.png'
import TimeBanner from '../component/TimeBanner'
import All from '../component/All'
import Student from '../component/Student'
import Teacher from '../component/Teacher'
import Leader from '../component/Leader'
import '../../scss/index.scss'
import $ from 'jquery'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MenuParams: {
                MenuBox: {
                    display: true,
                    width: 240,
                    MenuBoxTopPic: 'pic1'
                },
                children: [{
                    key: 'All',
                    title: '用户档案总览',
                    icon: 'menu10',
                    onTitleClick: this.handleClick,
                    // active: true,
                    // selected: true
                },
                {
                    key: 'Student',
                    title: '学生档案',
                    icon: 'menu39',
                    onTitleClick: this.handleClick,
                },
                {
                    key: 'Teacher',
                    title: '教师档案',
                    icon: 'menu33',
                    onTitleClick: this.handleClick,
                },
                {
                    key: 'Leader',
                    title: '领导档案',
                    icon: 'menu35',
                    onTitleClick: this.handleClick,
                }]
            }
        }
    }

    componentWillMount() {
        this.handleMenu()

        history.listen(() => {
            $('.frame_leftmenu_mainitem').removeClass('selected active');
            $('.frame_leftmenu_mainitem').children('*').removeClass('active');
            this.handleMenu()
        })
    }
    componentWillUpdate() {

    }
    componentDidUpdate() {

    }


    handleMenu = () => {

        let path = history.location.pathname.substr(1);
        let param = this.state.MenuParams;
        let len = param.children.length;

        for (let i = 0; i < len; i++) {
            param.children[i]['active'] = false;
            param.children[i]['selected'] = false;
            if (path === param.children[i].key) {
                param.children[i]['active'] = true;
                param.children[i]['selected'] = true;
                this.setState({
                    MenuParams: param
                })
            }
        }
        //this.refs[path+'_title']


        console.log(this.state.MenuParams)
    }

    handleClick = (key) => {
        console.log(key)
        history.push('/' + key);

    }
    render() {
        const { LoginUserInfo } = this.props;

        return (
            <Frame userInfo={{
                name: "张三",
                image: "http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg?t=1565715681.39251"
            }}
                module={{
                    cnname: "用户档案管理",
                    enname: "User profile management",
                    image: logo
                }}
                type="circle" showLeftMenu={true}>
                <div ref="frame-time-barner"><TimeBanner /></div>
                <div ref="frame-left-menu"><Menu params={this.state.MenuParams}></Menu></div>
                <div ref="frame-right-content">
                    <Router history={BrowserRouter}>
                        <Route path='/All' history={history} component={All}></Route>
                        <Route path='/Student' history={history} component={Student}></Route>
                        <Route path='/Teacher' history={history} component={Teacher}></Route>
                        <Route path='/Leader' history={history} component={Leader}></Route>
                    </Router>
                </div>
            </Frame>
        );
    }
}
const mapStateToProps = (state) => {
    let { LoginUserInfo } = state;
    return {
        LoginUserInfo
    }
};
export default connect(mapStateToProps)(App);