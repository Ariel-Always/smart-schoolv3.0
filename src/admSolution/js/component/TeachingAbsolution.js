import React, { Component } from 'react';
import { Frame, Menu, Loading, Alert } from "../../../common";
import { connect } from 'react-redux';
import '../../scss/TeachingAbsolution.scss'
import { getData, postData } from '../../../common/js/fetch'
import actions from '../actions';

sessionStorage.setItem('token', 'null')
class TeachingAbsolution extends Component {
    constructor(props) {
        super(props);
        const { dispatch } = props;
        this.state = {

        }
    }
    render() {
        return (
            <React.Fragment>
                TeachingAbsolution
            </React.Fragment>
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
export default connect(mapStateToProps)(TeachingAbsolution);