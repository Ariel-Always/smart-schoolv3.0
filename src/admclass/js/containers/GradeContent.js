import React,{Component} from 'react';
import TitleBar from '../component/TitleBar';
import {Loading, Search,DropDown,PagiNation} from "../../../common";
import ContentWrapper from '../component/ContentWrapper';
import Statistics from '../component/Statistics'
import PartData from '../component/PartData';
import connect from "react-redux/es/connect/connect";
import UpDataState from '../actions/UpDataState';
import UpUIState from '../actions/UpUIState';

import $ from 'jquery';

import SearchActions from '../actions/SearchActions';

import AppAlertActions from '../actions/AppAlertActions';

import PaginationActions from "../actions/PaginationActions";

class GradeContent extends Component{

    constructor(props) {

        super(props);

        const {dispatch} = props;

      //初始化内容区域的数据

      dispatch(UpDataState.getAllGradePreview());

    }
    //点击搜索
    SchoolClassSearch(e){

        const key = e.value;

        const { dispatch } = this.props;

        if (key){

            dispatch(SearchActions.SchoolClassSearch(key));

        }else{

            dispatch(AppAlertActions.alertWarn("搜索内容不能为空!"));

        }

    }

    //取消搜索

    SchoolCancelClassSearch(){

        const { dispatch } = this.props;

        dispatch(SearchActions.SchoolCancelClassSearch());

    }


    //翻页发生改变

    pageChange(e){

        const { dispatch } = this.props;

        dispatch(PaginationActions.SchoolClassPageChange(e-1));

    }

    //点击某一个年级跳转到相对应的年级界面

    GradeClick({id,name}) {

        const {dispatch} = this.props;

        dispatch({type: UpUIState.CHANGE_GRADE_ACTIVE, info: {id: id, name: name}});


        $('.frame_leftmenu_mainitem').removeClass('active');

        $('.frame_leftmenu_mainitem').removeClass('selected');

        $(`.frame_leftmenu_mainitem`).each((index,that)=>{

            if ($(that).attr('data-id')===id){

                $(that).addClass('active','selectd');

            }

        })

    }



    render() {

        const {UIState,DataState} = this.props;

        const {GradeLoading} = UIState;

        const { AllGradePreview,GradePagination } = DataState;

        return (
            <Loading tip="加载中..." spinning={GradeLoading.show}  size="large">

                <TitleBar type="icon1" title="班级信息总览"></TitleBar>

                <ContentWrapper>

                    <div className="search-wrapper clearfix">

                        <Search className="admclass-search" onCancelSearch={this.SchoolCancelClassSearch.bind(this)} onClickSearch={this.SchoolClassSearch.bind(this)} placeHolder="请输入班级名称搜索"></Search>

                    </div>

                    {

                        AllGradePreview.ClassContentShow? ''

                            :

                            <React.Fragment>

                                <Statistics classNum={AllGradePreview.Class} teacherNum={AllGradePreview.CourseTecher} studentNum={AllGradePreview.Student}></Statistics>

                                <PartData GradeClick={this.GradeClick.bind(this)} type="grade" PartDataList={AllGradePreview.List}></PartData>

                            </React.Fragment>

                    }


                    {

                        AllGradePreview.ClassContentShow?

                            <React.Fragment>

                                <Loading spinning={AllGradePreview.ClassLoading}>

                                <PartData type="class"
                                          PartDataList={AllGradePreview.ClassInfo.List}>

                                </PartData>

                                <PagiNation pageSize={1} onChange={this.pageChange.bind(this)} current={GradePagination.CurrentPage} total={GradePagination.Total}></PagiNation>

                            </Loading>

                            </React.Fragment>

                            :''

                    }

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