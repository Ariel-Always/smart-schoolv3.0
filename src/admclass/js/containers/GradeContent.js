import React,{Component} from 'react';
import TitleBar from '../component/TitleBar';
import {Search} from "../../../common";
import ContentWrapper from '../component/ContentWrapper';
import Statistics from '../component/Statistics'
import PartData from '../component/PartData';
import connect from "react-redux/es/connect/connect";

class GradeContent extends Component{
    render() {
        const {UIState,DataState} = this.props;

        return (
            <React.Fragment>
                <TitleBar title="班级信息总览"></TitleBar>
                <ContentWrapper>
                    <Search className="admclass-search"></Search>
                    <Statistics classNum={DataState.AllGradePreview.Class} teacherNum={DataState.AllGradePreview.CourseTecher} studentNum={DataState.AllGradePreview.Student}></Statistics>
                    <PartData PartDataList={DataState.AllGradePreview.List}></PartData>
                </ContentWrapper>
            </React.Fragment>
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
export default connect(mapStateToProps)(GradeContent);