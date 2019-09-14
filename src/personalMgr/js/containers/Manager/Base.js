import React,{Component} from 'react';

import BaseActions from '../../actions/Manager/BaseActions';

import { Loading } from "../../../../common";

import { connect } from 'react-redux';

class Base extends Component{

    constructor(props) {

        super(props);

        const { dispatch } = props;

        dispatch(BaseActions.Init());

    }


    render() {

        const { Base } = this.props;

        return (

            <div className="base-setting-wrapper">

                <div className="title-bar">

                    <input className="edit-btn" type="button" value="编辑资料"/>

                </div>

            </div>

        );

    }

}

const mapStateToProps = (state) => {

    const { Base } = state.Manager;

    return {

        Base

    }

};

export default connect(mapStateToProps)(Base);