import React,{Component} from 'react';

import BaseActions from '../../actions/Teacher/BaseActions';

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

                <div className="base-info-wrapper info-wrapper">



                </div>

                <div className="contact-info-wrapper info-wrapper">



                </div>

                <div className="sign-info-wrapper info-wrapper">



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