import React,{Component} from 'react';
import TitleBar from '../component/TitleBar';
import {Search} from "../../../common";
import ContentWrapper from '../component/ContentWrapper';
import Statistics from '../component/Statistics'
import PartData from '../component/PartData';
import connect from "react-redux/es/connect/connect";
import UpDataState from '../actions/UpDataState';
import {Loading} from "../../../common";



class StudentContent extends Component{
    constructor(props) {
        super(props);

        const {dispatch} = this.props;

        dispatch(UpDataState.getTheGradePreview());//获取数据

    }

    render() {
        const {UIState,DataState} = this.props;
        const {ClassLoading} = UIState;
        const {TheGradePreview} = DataState;
        return (
            <div>
                is
            </div>
        );
    }
}
const  mapStateToProps = (state) => {
    let {UIState,DataState} = state;
    return {
        UIState,
        DataState
    }
};
export default connect(mapStateToProps)(StudentContent);