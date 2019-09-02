import moduleName from '../../scss/Subject.scss'
import React from 'react';
import { connect } from 'react-redux';
class Subject extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <React.Fragment>
                dasdas
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    let {UIState , DataState} = state;
    return {
        UIState,
        DataState
    }
};
export default connect(mapStateToProps)(Subject)