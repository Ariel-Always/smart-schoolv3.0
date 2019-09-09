import React from 'react'
import { connect } from 'react-redux';
import actions from '../actions';
class Class extends React.Component{
    constructor(props){
        super(props);
        this.state=({

        })
    }
    render(){
        return (
            <div>
                Class
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
export default connect(mapStateToProps)(Class);