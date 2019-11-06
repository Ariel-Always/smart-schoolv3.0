import React,{Component} from 'react';

import ChangeTab from "../../component/ChangeTab";

import {HashRouter as Router, Route, Switch} from "react-router-dom";

import ClassTotal from './ClassTotal';

import ClassStudent from './ClassStudent';




class ClassTotalStudent extends Component{


    render(){

        const TabLinkList = [

            {link:"/teacher/class/total",name:"班级总课表"},

            {link:"/teacher/class/student",name:"学生课表"}

        ];

        return <div className="class-total-student-wrapper">

            <ChangeTab TabLinkList = {TabLinkList}></ChangeTab>

            <Router>

                <Switch>

                    <Route path="/teacher/class/total"  component={ClassTotal}></Route>

                    <Route path="/teacher/class/student"  component={ClassStudent}></Route>

                </Switch>

            </Router>

        </div>

    }

}



export default ClassTotalStudent;