import React, { Component } from 'react';
import { Frame, Menu, Loading, Alert, LeftMenu, Modal } from "../../../common";
import { connect } from 'react-redux';
import '../../scss/Record.scss'
import $ from 'jquery'
import { postData, getData } from '../../../common/js/fetch'
import actions from '../actions';
import history from '../containers/history'

class Record extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <div id='Record'>
                Dynamic
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
export default connect(mapStateToProps)(Record);