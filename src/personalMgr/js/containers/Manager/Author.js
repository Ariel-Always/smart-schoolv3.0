import React,{Component} from 'react';

import { Loading } from "../../../../common";

import { connect } from 'react-redux';

class Author extends Component{
    render() {
        return (
            <div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {

    const { Author } = state.Manager;

    return {

        Author

    }

};

export default connect(mapStateToProps)(Author);