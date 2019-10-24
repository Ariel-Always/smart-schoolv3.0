import React,{Component} from 'react';

import { connect } from 'react-redux';


class ScheduleSetting extends Component{

    constructor(props){

        super(props);

    }


    render(){

        const { Manager } = this.props;

        return <div>


        </div>

    }

}

const  mapStateToProps = (state) => {

    let { Manager } = state;

    return {

        Manager

    }

};

export default connect(mapStateToProps)(ScheduleSetting);