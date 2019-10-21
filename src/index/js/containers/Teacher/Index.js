import React,{Component} from 'react';

import $ from 'jquery';

import AppAlertActions from '../../actions/AppAlertActions';

import HeaderActions from '../../actions/Teacher/HeaderActions';

import TeacherPageActions from '../../actions/Teacher/TeacherPageActions';

import ModuleActions from '../../actions/Teacher/ModuleActions';

import Header from '../../components/Teacher/Header';

import Content from '../../components/Teacher/Content';

import { connect } from 'react-redux';

import {getQueryVariable, LogOut} from "../../../../common/js/disconnect";

class Index extends Component{

    constructor(props) {

        super(props);

        const { dispatch } = props;

        dispatch(TeacherPageActions.PageInit());

    }

    //点击header的menu按钮

    HeaderMenuToggle(e){

        e.stopPropagation();

        const { dispatch } = this.props;

        dispatch({type:HeaderActions.TEACHER_HEADER_MENU_TOGGLE});

        $('.content-wrapper').css("zIndex","5");

    }

   //点击学科按钮
    SubjectMenuToggle(e){

        e.stopPropagation();

        const { dispatch } = this.props;

        dispatch({type:HeaderActions.TEACHER_SUBJECT_MENU_TOGGLE});

        $('.content-wrapper').css("zIndex","5");

    }

    SubjectClick(info){

        const { dispatch } = this.props;

        dispatch(HeaderActions.SubjectClick(info));

    }


    //图片加载成功调用
    ModuleImgLoad({GroupID,PNO,CNO}){

        const { dispatch } = this.props;

        dispatch(ModuleActions.ImgLoad({GroupID,PNO,CNO}));

    }


    //图片加载失败调用
    ModuleImgErrorLoad({GroupID,PNO,CNO}){

        const { dispatch } = this.props;

        dispatch(ModuleActions.ImgErrorLoad({GroupID,PNO,CNO}));

    }

    //点击了组合
    GroupToggle({GroupID,OrderNo,Event}){

        const { dispatch } = this.props;

        //Event.stopPropagation();

        //dispatch(ModuleActions.GroupToggle({GroupID,OrderNo}));

        let itemGroup = $(Event.target).closest('.module-item.group');

        let detailWrapper = itemGroup.children('.module-detail-wrapper');

        //判断是否需要向下展开
        if(itemGroup.offset().top+40-detailWrapper.height()<0){

            detailWrapper.css({bottom:"auto",top:"40px"});

        }

        detailWrapper.slideToggle();

        //将下层的zindex覆盖住上层的zindex
        $('.content-wrapper').css("zIndex","101");


    }


    //点击了模块

    ClickModule({ModuleStatus,AccessType,AccessParam,SysID,Event}){

        const { dispatch } = this.props;

        Event.stopPropagation();

        switch (ModuleStatus) {

            case 1:

               if (AccessType === 'href'){

                   if (SysID!=='000'){

                       let lg_tk = getQueryVariable('lg_tk')||sessionStorage.getItem('token');

                       window.open(`${AccessParam}?lg_tk=${lg_tk}`);

                   }else{

                       window.open(AccessParam);

                   }

               }else{



               }

               break;

            case 2:

                dispatch(AppAlertActions.alertWarn({title:"该模块未购买，请先购买该模块"}));

                break;

            case 3:

                dispatch(AppAlertActions.alertWarn({title:"该模块未安装，请安装该模块"}));

                break;

            case 4:

                dispatch(AppAlertActions.alertWarn({title:"该模块维护中"}));

                break;

            case 5:

                dispatch(AppAlertActions.alertWarn({title:"该模块已过期"}))

                break;

            default:

                return;

        }

        //将其他的module-detail-wrapper隐藏

        $('.module-item.group').children('.module-detail-wrapper').hide();

    }



    OutMenuEvent(e){

        const { dispatch } = this.props;

        let HDM =  document.getElementById('header-down-menu');

        let HSM = document.getElementById('subject-pick-btn');

        if (!HDM.contains(e.target)){

            dispatch({type:HeaderActions.TEACHER_HEADER_MENU_HIDE});

        }

        if (!HSM.contains(e.target)){

            dispatch({type:HeaderActions.TEACHER_SUBJECT_MENU_HIDE});

        }

        /*dispatch(ModuleActions.GroupDetailHide());*/

        $('.module-item.group').each((i,that)=>{

            if (!that.contains(e.target)){

                $(that).children('.module-detail-wrapper').hide();

            }

        });

    }

    //点击menu之外
    componentDidMount(){

        addEventListener('click',this.OutMenuEvent.bind(this));

        $(document).scroll((e)=>{

            this.EmptyLoad();

        });

    }

    //退出登录
    LogOut(){

        const { dispatch } = this.props;

        dispatch(AppAlertActions.alertError({title:"您确定要退出登录么?",ok:()=>{ return this.GoOut}}));

    }


    GoOut(){

        LogOut();

    }


    EmptyLoad(){

       let WHeight  = $(window).height();

       let ScrollTop = $(window).scrollTop();

       $('.teacher-empty').each((index,that)=>{

            let OffSetTop = $(that).offset().top;

            //console.log(ScrollTop);

       });

    }





    render() {

        const { LoginUser,Teacher } = this.props;

        const { HeaderSetting,Modules } = Teacher;

        const { ModuleGroups,ModulesLoading } = Modules;

        return (

            <div className="teacher-desk-top">

                <Header
                    LoginUser={LoginUser}
                    HeaderSetting={HeaderSetting}
                    HeaderMenuToggle={this.HeaderMenuToggle.bind(this)}
                    SubjectMenuToggle={this.SubjectMenuToggle.bind(this)}
                    SubjectClick={this.SubjectClick.bind(this)}
                    LogOut={this.LogOut.bind(this)}
                >

                </Header>

                <Content ModuleGroups={ModuleGroups}
                          ImgLoad={this.ModuleImgLoad.bind(this)}
                          ImgErrorLoad={this.ModuleImgErrorLoad.bind(this)}
                         GroupToggle={this.GroupToggle.bind(this)}
                         ClickModule={this.ClickModule.bind(this)}
                         ModulesLoading={ModulesLoading}
                         EmptyLoad={this.EmptyLoad.bind(this)}
                >

                </Content>

            </div>

        );

    }

}

const mapStateToProps = (state) => {

    const { LoginUser,Teacher } = state;

    return {

        LoginUser,

        Teacher

    }

};

export default connect(mapStateToProps)(Index);