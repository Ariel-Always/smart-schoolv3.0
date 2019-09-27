import React,{Component} from 'react';
import TitleBar from '../component/TitleBar';
import {PagiNation, Search} from "../../../common";
import ContentWrapper from '../component/ContentWrapper';
import Statistics from '../component/Statistics'
import PartData from '../component/PartData';
import connect from "react-redux/es/connect/connect";
import UpDataState from '../actions/UpDataState';
import PaginationActions from '../actions/PaginationActions';
import {Loading} from "../../../common";
import AppAlertActions from "../actions/AppAlertActions";
import SearchActions from "../actions/SearchActions";
import UpUIState from "../actions/UpUIState";
import $ from "jquery";



class ClassContent extends Component{
    constructor(props) {
        super(props);

        const {dispatch,info} = props;

        const {SchoolGradeClasses} = props.DataState;
        //初始化内容区域数据

        dispatch(UpDataState.getTheGradePreview(info.id));//获取数据

    }

    //页码变化

    pageChange(e){

        const { dispatch,info } = this.props;

        dispatch(PaginationActions.GradeClassPageChange(info.id,e-1));

    }

    //班级搜索

    GradeClassSearch(e){

        const key = e.value;

        const { dispatch,info } = this.props;

        if (key){

            dispatch(SearchActions.GradeClassSearch(info.id,key));

        }else {

            dispatch(AppAlertActions.alertWarn("搜索不能为空！"));

        }

    }


    //取消搜索

    GradeClassCancelSearch(){

        const { dispatch,info } = this.props;

        dispatch(SearchActions.GradeClassCloseSearch(info.id));

    }

    //点击班级

    ClassClick({id,name}){

        const { dispatch,info } = this.props;

        dispatch({type:UpUIState.CHANGE_CLASS_ACTIVE,info:{id,name,preName:info.name,preId:info.id}});

        $('.frame_leftmenu_mainitem').removeClass('active');

        $('.frame_leftmenu_mainitem').removeClass('selected');

        $(`.frame_leftmenu_onegrade_ul li`).each((index,that)=>{

            if ($(that).attr('data-id')===id){

                $(that).addClass('active');

                $(that).children('.frame_leftmenu_onegrade_name').addClass('active');

                $(that).closest('.frame_leftmenu_nextgrade_container').prev().addClass('selected');

            }

        })

    }




    render() {

        const {UIState,DataState,info} = this.props;

        const {ClassLoading} = UIState;

        const {TheGradePreview,ClassPagination} = DataState;


        return (
            <Loading tip="加载中..." spinning={ClassLoading.show}  size="large">

                <TitleBar type="icon2" title={info.name}></TitleBar>

                <ContentWrapper>

                    <div className="search-wrapper clearfix">

                        <Search className="admclass-search" onCancelSearch={this.GradeClassCancelSearch.bind(this)} onClickSearch={this.GradeClassSearch.bind(this)} placeHolder="请输入班级名称搜索..."></Search>

                    </div>

                    {

                        TheGradePreview.StaticsShow?

                            <Statistics classNum={TheGradePreview.Class} teacherNum={TheGradePreview.CourseTecher} studentNum={TheGradePreview.Student}></Statistics>

                            :''

                    }

                    <Loading spinning={TheGradePreview.ClassLoading}>

                        <PartData type="class"
                                  PartDataList={TheGradePreview.List}
                                  ClassClick={this.ClassClick.bind(this)}>

                        </PartData>

                    </Loading>

                    <PagiNation pageSize={1} onChange={this.pageChange.bind(this)} current={ClassPagination.CurrentPage} total={ClassPagination.Total}></PagiNation>

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