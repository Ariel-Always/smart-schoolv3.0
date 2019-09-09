import React from 'react'
import { connect } from 'react-redux';
import actions from '../actions';
import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';

class Subject extends React.Component{
    constructor(props){
        super(props);
        this.state=({

        })
    }
    render(){
        return (
            <div>
                Subject
                
            </div>
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
export default connect(mapStateToProps)(Subject);