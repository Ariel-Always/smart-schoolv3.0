import React,{Component} from 'react';
import TitleBar from '../component/TitleBar';
import {Search} from "../../../common";
import ContentWrapper from '../component/ContentWrapper';
import Statistics from '../component/Statistics'
import PartData from '../component/PartData';
class Content extends Component{
    render() {
        const {AllGradePreview} = this.props.data;
        return (
            <React.Fragment>
                <TitleBar title="班级信息总览"></TitleBar>
                <ContentWrapper>
                    <Search className="admclass-search"></Search>
                    <Statistics classNum={AllGradePreview.Class} teacherNum={AllGradePreview.CourseTecher} studentNum={AllGradePreview.Student}></Statistics>
                    <PartData PartDataList={AllGradePreview.List}></PartData>
                </ContentWrapper>
            </React.Fragment>
        );
    }
}
export default Content;