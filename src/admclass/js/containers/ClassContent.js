import React,{Component} from 'react';
import TitleBar from '../component/TitleBar';
import {Search} from "../../../common";
import ContentWrapper from '../component/ContentWrapper';
import Statistics from '../component/Statistics'
import PartData from '../component/PartData';
import connect from "react-redux/es/connect/connect";
import UpUIState from '../actions/UpUIState';
import UpDataState from '../actions/UpDataState';
import {Loading} from "../../../common";
import TheGradePreview from "../reducers/data/TheGradePreview";

class ClassContent extends Component{
    constructor(props) {
        super(props);
        const {dispatch} = this.props;
        dispatch(UpDataState.getTheGradePreview());//获取数据
        console.log(this.props.match.params);
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps.location.query);
    }
    render() {
        const {UIState,DataState} = this.props;
        const {ClassLoading} = UIState;
        const {TheGradePreview} = DataState;
        return (
            <Loading tip="加载中..." spinning={ClassLoading.show}  size="large">
                <TitleBar title="班级信息总览"></TitleBar>
                <ContentWrapper>
                    <Search className="admclass-search"></Search>
                    <Statistics classNum={DataState.AllGradePreview.Class} teacherNum={DataState.AllGradePreview.CourseTecher} studentNum={DataState.AllGradePreview.Student}></Statistics>
                    <PartData PartDataList={DataState.AllGradePreview.List}></PartData>
                </ContentWrapper>
            </Loading>
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
export default connect(mapStateToProps)(ClassContent);