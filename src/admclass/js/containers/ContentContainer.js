import React,{Component} from 'react';
import GradeContent from "./GradeContent";
import ClassContent from "./ClassContent";
import StudentContent from "./StudentContent";
import {withRouter,Route,Switch} from 'react-router-dom';

class ContentContainer extends Component{
    render() {
        return (
                <div key={this.props.location.pathname}>

                    <Switch>

                        <Route path="/" exact component={GradeContent}></Route>

                        <Route path="/:GradeId" exact component={ClassContent}></Route>

                        <Route path="/:GradeId/:ClassId" exact component={StudentContent}></Route>

                    </Switch>

                </div>
        );
    }
}
export default withRouter(ContentContainer);