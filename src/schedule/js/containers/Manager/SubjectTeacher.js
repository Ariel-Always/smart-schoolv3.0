import React,{Component} from 'react';

import ChangeTab from '../../component/ChangeTab';

import {HashRouter as Router,Route,Switch} from 'react-router-dom';

import Subject from '../../containers/Manager/Subject';

import { DropDown } from "../../../../common";

class SubjectTeacher extends Component{

    render() {

        const TabLinkList = [

                {link:"/manager/subject-teacher/subject",name:"学科总课表"},

                {link:"/manager/subject-teacher/classroom",name:"教室课表"}

            ];

        return (

            <div className="subject-teacher-wrapper">

                <ChangeTab TabLinkList = {TabLinkList}></ChangeTab>

                <Router>

                    <Switch>

                        <Route path="/manager/subject-teacher/subject" component={Subject}></Route>

                    </Switch>

                </Router>

            </div>

        );

    }

}

export default SubjectTeacher;