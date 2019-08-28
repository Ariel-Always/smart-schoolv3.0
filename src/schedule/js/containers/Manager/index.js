import React,{Component} from 'react';

import {connect} from  'react-redux';

import {HashRouter as Router,Route,Switch,Redirect} from  'react-router-dom';

import HeaderRouter from '../../component/HeaderRouter';

import SubjectTeacher from './SubjectTeacher';





class Index extends Component{

    constructor(props) {

        super(props);

        const {dispatch} = props;

    }


    render() {

        const HeaderLinkList = [

            {link:"/manager/subject-teacher",name:"学科教师课表",logo:"subject"},

            {link:"/manager/class",name:"班级课表",logo:"class"},

            {link:"/manager/classroom",name:"教室课表",logo:"classroom"},

        ];


        return (

            <React.Fragment>
                {/*头部的路由选项卡*/}

                <HeaderRouter HeaderLinkList={HeaderLinkList}></HeaderRouter>
               {/* 泡泡型标签链接按钮*/}

                <Router>

                    <Switch>

                        <Route path="/manager/subject-teacher/*" component={SubjectTeacher}></Route>

                        <Redirect path="/manager/subject-teacher*" to={{pathname:"/manager/subject-teacher/subject"}}></Redirect>

                    </Switch>

                </Router>


            </React.Fragment>

        );

    }

}

const mapStateToProps = (state) => {

      const {Manager} = state;

      return {
          Manager
      }

};

export default connect(mapStateToProps)(Index);