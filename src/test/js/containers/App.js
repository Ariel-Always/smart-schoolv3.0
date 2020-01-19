import React, { Component } from "react";
import { connect } from "react-redux";


import Aniamtion from '../../../common/js/Aniamtion/index'
//import { urlAll, proxy } from './config'

class App extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
     
    };
  }

  componentWillMount() {
    console.log(Aniamtion)
  }

  
  render() {
  
    return (
      <div style={{width:'100%',height:'100%'}}>
       <Aniamtion.WaveRound></Aniamtion.WaveRound>
      </div>
    );
  }
}
const mapStateToProps = state => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState
  };
};
export default connect(mapStateToProps)(App);
