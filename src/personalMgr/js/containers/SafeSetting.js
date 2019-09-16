import React,{Component} from 'react';

import { Loading } from "../../../common";

import { connect } from 'react-redux';

class SafeSetting extends Component{

    render() {

        return (

            <div className="safe-setting-wrapper">

                <div className="title-bar">

                    <div className="title-bar-name">账号安全</div>

                </div>

            </div>

        );

    }

}

const mapStateToProps = (state) => {

    const { SafeSetting } = state;

    return {

        SafeSetting

    }

};

export default connect(mapStateToProps)(SafeSetting);