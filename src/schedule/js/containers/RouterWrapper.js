import React,{Component} from "react";

import {HashRouter as Router, Redirect,withRouter,Route, Switch} from "react-router-dom";

import ManagerComponent from "./Manager";

import TeacherComponent from "./Teacher";

import StudentComponent from "./Student";

import { connect } from 'react-redux';


class RouterWrapper extends Component{

    render() {

        const {state} = this.props;

        const { LoginUser } = state;

        return (

            <Router>

                <Switch>

                    <Route path="/manager/*"  component={ManagerComponent}></Route>

                    <Route path="/teacher/*"  component={TeacherComponent}></Route>

                    <Route path="/student/*"  component={StudentComponent}></Route>

                    {

                        LoginUser&&parseInt(LoginUser.UserType)===0?

                            <Redirect path="/*"  to={{pathname:"/manager/subject-teacher/subject"}}></Redirect>

                            :''

                    }

                    {

                        LoginUser&&parseInt(LoginUser.UserType)===1?

                            <Redirect path="/*" to={{pathname:"/teacher/subject-teacher/subject"}}></Redirect>

                            :''

                    }

                    {

                        LoginUser&&parseInt(LoginUser.UserType)===1?

                            <Redirect path="/" to={{pathname:"/student/my"}}></Redirect>

                            :''

                    }
                </Switch>

            </Router>


        );

    }

}

const mapStateToProps = (state) => {

    return{
        state
    }

};

export default connect(mapStateToProps)(withRouter(RouterWrapper));

