import React,{Component} from 'react';
import TitleBar from '../component/TitleBar';
import {Loading, Search,DropDown} from "../../../common";
import ContentWrapper from '../component/ContentWrapper';
import Statistics from '../component/Statistics'
import PartData from '../component/PartData';
import connect from "react-redux/es/connect/connect";
import UpDataState from '../actions/UpDataState';
import UpUIState from '../actions/UpUIState';

class GradeContent extends Component{

    constructor(props) {

        super(props);

        const {dispatch} = props;

        const {SchoolGradeClasses} = props.DataState;

      //初始化内容区域的数据

       if (Object.keys(SchoolGradeClasses).length!==0){

           dispatch(UpDataState.getAllGradePreview());

       }else{

           setTimeout(function () {

               dispatch(UpDataState.getAllGradePreview());

           },500);
       }

    }

    render() {

        const {UIState,DataState} = this.props;

        const {GradeLoading} = UIState;

        return (
            <Loading tip="加载中..." spinning={GradeLoading.show}  size="large">

                <TitleBar type="icon1" title="班级信息总览"></TitleBar>

                <ContentWrapper>

                    <Search className="admclass-search"></Search>

                    <Statistics classNum={DataState.AllGradePreview.Class} teacherNum={DataState.AllGradePreview.CourseTecher} studentNum={DataState.AllGradePreview.Student}></Statistics>

                    <PartData type="grade" PartDataList={DataState.AllGradePreview.List}></PartData>

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
export default connect(mapStateToProps)(GradeContent);