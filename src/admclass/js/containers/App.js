import React,{Component} from 'react';
import {Table} from '../../../common';
class App extends Component{
    render() {
        return (
            <div>
                <h4>this is a Table</h4>
                <Table></Table>
                <h4>this is a login page click <a href="/index.html">this</a> to desktop</h4>
            </div>
        );
    }
}
export default App;