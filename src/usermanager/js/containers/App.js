import React,{Component} from 'react';
import {PageNation} from '../../../common/index'
class App extends Component{
    render() {
        return (
            <div>
                <h4>this is a pagenation</h4>
                <PageNation></PageNation>
                <h4>this is a usermanger page click <a href="./login">this</a> to login page</h4>
            </div>
        );
    }
}
export default App;