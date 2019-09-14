import React from 'react'
import { connect } from 'react-redux';
import actions from '../actions';
import '../../scss/HandleCourseClass.scss'
import { postData, getData } from '../../../common/js/fetch'

import history from '../containers/history'
import {Input,} from 'antd'
import CONFIG from '../../../common/js/config';
import { Table, Button, PagiNation, CheckBox, CheckBoxGroup } from "../../../common";
import Class from './Class';

class HandleCourseClass extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentWillReceiveProps(nextProps){
        const {DataState,UIState} = nextProps;
        
        this.setState({
            courseClassName:nextProps.DataState.GetCourseClassDetailsHandleClassMsg.CourseClassName
        })
    }
    //数据绑定
    onCourseClassNameChange = (e) => {
        console.log(this.state.courseClassName,e.target.value)
        this.setState({
            courseClassName:e.target.value
        })
    }
    render(){
        const { DataState, UIState } = this.props;
        let data = DataState.GetCourseClassDetailsHandleClassMsg;
        return (
            <div id='HandleCourseClass' className='HandleCourseClass'>
                <div className='row clearfix'>
                    <div className='row-column'>
                        <span className='left'>教学班名称：</span>
                        <Input type='text' onChange={this.onCourseClassNameChange.bind(this)} className='right' value={this.state.courseClassName}/>
                        {/* <span className='right text-style'>{data.CourseClassName}</span> */}
                    </div>
                    <div className='row-column'>
                    <span className='left'>教学班名称：</span>
                        {/* <input type='text'  className='right' value=''/> */}
                        <span className='right text-style'>{data.CourseClassName}</span>
                    </div>
                </div>
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
export default connect(mapStateToProps)(HandleCourseClass);