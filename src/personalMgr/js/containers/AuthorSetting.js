import React,{Component} from 'react';

import { Loading } from "../../../common";

import { connect } from 'react-redux';

class AuthorSetting extends Component{
    render() {
        return (
            <div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {

    const { AuthorSetting } = state;

    return {

        AuthorSetting

    }

};

export default connect(mapStateToProps)(AuthorSetting);