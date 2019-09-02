import React,{Component} from 'react';

import {connect} from  'react-redux';

import {HashRouter as Router,Route,Switch,Redirect} from  'react-router-dom';

import HeaderRouter from '../../component/HeaderRouter';

import SubjectTeacher from './SubjectTeacher';



class Index extends Component{

    render() {

        const HeaderLinkList = [

            {link:"/teacher/subject-teacher",name:"学科教师课表",logo:"subject"},

            {link:"/teacher/mine",name:"我的课表",logo:"mine"},

            {link:"/teacher/class",name:"班级课表",logo:"class"},

        ];

        return (

            <React.Fragment>

                {/*头部的路由选项卡*/}

                <HeaderRouter HeaderLinkList={HeaderLinkList}></HeaderRouter>
                {/* 泡泡型标签链接按钮*/}

                <Router>

                    <Switch>

                        <Route path="/teacher/subject-teacher/*" component={SubjectTeacher}></Route>

                        <Redirect path="/teacher/subject-teacher*" to={{pathname:"/teacher/subject-teacher/subject"}}></Redirect>

                    </Switch>

                </Router>

            </React.Fragment>

        );

    }

}

export default Index;