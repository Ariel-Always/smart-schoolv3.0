import React,{Component} from 'react';

import {Loading,Alert,Modal,MenuLeftNoLink} from "../../../common";

import Frame from '../../../common/Frame';

import { HashRouter as Router,Route,Switch} from 'react-router-dom';

import {TokenCheck_Connect,LogOut} from "../../../common/js/disconnect";

import {connect} from 'react-redux';

import '../../scss/index.scss';

import UpUIState from '../actions/UpUIState';

import UpDataState from '../actions/UpDataState';

import RouterSetActions from '../actions/RouterSetActions';

import ModuleActions from '../actions/ModuleActions';

import Banner from '../component/Banner';

import TeacherBtnBanner from '../component/Teacher/TeacherBtnBanner';

import ContentContainer from './ContentContainer';

import AddClassModal from '../component/AddClassModal';

import Import from "./Import";

import logo from "../../images/logo.png";

import TeacherLogo from '../../images/teacher-logo.png';

import AppAlertActions from "../actions/AppAlertActions";

import TMActions from '../actions/Teacher/TeacherModalActions';


class App extends Component{

    constructor(props) {

        super(props);

        const {dispatch} = props;

        //判断token是否存在

        TokenCheck_Connect();

        const hash = location.hash;

        if (sessionStorage.getItem('UserInfo')){

            let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

            const {UserType,UserClass} = UserInfo;

            dispatch({type:UpDataState.GET_LOGIN_USER_INFO,data:UserInfo});

            if (hash.includes('Import')){//导入界面

                dispatch({type:RouterSetActions.ROUTER_SET_TO_IMPORT});

                //判断用户类型
                if (parseInt(UserType)===0){

                    dispatch({type:ModuleActions.MODULE_SETTING_INFO_UPDATE,data:{

                            ShowLeftMenu:false,

                            ShowBarner:false,

                            ModuleInfo:{

                                cnname:'行政班管理',

                                enname:"Administration class management",

                                image:logo

                            }

                        }});

                }else if (parseInt(UserType)===1) {

                    dispatch({type:ModuleActions.MODULE_SETTING_INFO_UPDATE,data:{

                            ShowLeftMenu:false,

                            ShowBarner:false,

                            ModuleInfo:{

                                cnname:'班级管理',

                                enname:"Class management",

                                image:TeacherLogo

                            }

                        }});

                }

            }else{//非导入界面

                dispatch({type:RouterSetActions.ROUTER_SET_TO_DEFAULT});

                let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

                if (parseInt(UserType)===0){

                    dispatch({type:ModuleActions.MODULE_SETTING_INFO_UPDATE,data:{

                            ShowLeftMenu:true,

                            ShowBarner:true,

                            ModuleInfo:{

                                cnname:'行政班管理',

                                enname:"Administration class management",

                                image:logo

                            }

                        }});

                }else if (parseInt(UserType)===1) {

                    dispatch({type:ModuleActions.MODULE_SETTING_INFO_UPDATE,data:{

                            ShowLeftMenu:false,

                            ShowBarner:true,

                            ModuleInfo:{

                                cnname:'班级管理',

                                enname:"Class management",

                                image:TeacherLogo

                            }

                        }});

                }

                dispatch(UpDataState.getPageInit());

            }

        }else{

            let getUserInfo = setInterval(()=>{

                if (sessionStorage.getItem('UserInfo')){

                    let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

                    const { UserType } = UserInfo;

                    dispatch({type:UpDataState.GET_LOGIN_USER_INFO,data:UserInfo});

                    if (hash.includes('Import')){//导入界面

                        dispatch({type:RouterSetActions.ROUTER_SET_TO_IMPORT});

                        //判断用户类型
                        if (parseInt(UserType)===0){

                            dispatch({type:ModuleActions.MODULE_SETTING_INFO_UPDATE,data:{

                                    ShowLeftMenu:false,

                                    ShowBarner:false,

                                    ModuleInfo:{

                                        cnname:'行政班管理',

                                        enname:"Administration class management",

                                        image:logo

                                    }

                                }});

                        }else if (parseInt(UserType)===1) {

                            dispatch({type:ModuleActions.MODULE_SETTING_INFO_UPDATE,data:{

                                    ShowLeftMenu:false,

                                    ShowBarner:false,

                                    ModuleInfo:{

                                        cnname:'班级管理',

                                        enname:"Class management",

                                        image:TeacherLogo

                                    }

                                }});

                        }

                    }else{//非导入界面

                        dispatch({type:RouterSetActions.ROUTER_SET_TO_DEFAULT});

                        if (parseInt(UserType)===0){

                            dispatch({type:ModuleActions.MODULE_SETTING_INFO_UPDATE,data:{

                                    ShowLeftMenu:true,

                                    ShowBarner:true,

                                    ModuleInfo:{

                                        cnname:'行政班管理',

                                        enname:"Administration class management",

                                        image:logo

                                    }

                                }});

                        }else if (parseInt(UserType)===1) {

                            dispatch({type:ModuleActions.MODULE_SETTING_INFO_UPDATE,data:{

                                    ShowLeftMenu:false,

                                    ShowBarner:true,

                                    ModuleInfo:{

                                        cnname:'班级管理',

                                        enname:"Class management",

                                        image:TeacherLogo

                                    }

                                }});

                        }

                        dispatch(UpDataState.getPageInit());

                    }

                    clearInterval(getUserInfo);

                }

            },20);

        }

    }


    addClass(e){

        const {dispatch} = this.props;

        dispatch({type:UpUIState.ADD_CLASS_MODAL_SHOW});

    }

    addClassDropChange(e){//添加班级的下拉选择产生变化

        const {dispatch} = this.props;

        const {value}= e;

        if (value===0){

            dispatch({type:UpUIState.ADD_CLASS_SELECT_CHANGE,selectValue:e});

            dispatch({type:UpUIState.ADD_CLASS_INPUT_DISABLED});
            //修改input的值
            dispatch({type:UpUIState.ADD_CLASS_INPUT_CHANGE,value:''});

            dispatch({type:UpUIState.ADD_CLASS_INPUT_TIPS_HIDE});

        }else{

            dispatch({type:UpUIState.ADD_CLASS_SELECT_CHANGE,selectValue:e});

            //取消警告如果有的话

            dispatch({type:UpUIState.ADD_CLASS_SELECT_TIPS_HIDE});

            dispatch({type:UpUIState.ADD_CLASS_INPUT_TIPS_HIDE});

            dispatch({type:UpUIState.ADD_CLASS_INPUT_ABLED});

        }

    }

    //添加班级输入框值变化
    addClassInputChange(e){

        const {dispatch} = this.props;

        dispatch({type:UpUIState.ADD_CLASS_INPUT_CHANGE,value:e.target.value});

        dispatch({type:UpUIState.ADD_CLASS_INPUT_TIPS_HIDE});

    }
    //添加班级点击确定
    addClassOk(e) {

        const {dispatch,DataState} = this.props;

        const {SchoolGradeClasses,TheGradePreview} = DataState;

        let TheGradePreviewID = TheGradePreview.GradeID?TheGradePreview.GradeID:'';

        const {AddClassModal} = this.props.UIState;


        //判断是否已经选择了年级
        if (AddClassModal.selectValue.value===0){

            dispatch({type:UpUIState.ADD_CLASS_SELECT_TIPS_SHOW});

        }else{
            //输入为空
            if (AddClassModal.inputValue===''){

                dispatch({type:UpUIState.ADD_CLASS_INPUT_TIPS_SHOW});

                dispatch({type:UpUIState.ADD_CLASS_INPUT_TIPS,tips:'班级名称不能为空！'});

            }else{
                //输入合法和不合法的情况
                if (this.UserComm_CheckGroupName(AddClassModal.inputValue)){

                    dispatch({type:UpUIState.ADD_CLASS_INPUT_TIPS_HIDE});

                    //判断是否重名问题
                   let selectGrade = SchoolGradeClasses.Grades.find((item) => {return item.GradeID === AddClassModal.selectValue.value});
                    //返回这个数组
                   if (selectGrade){
                       //如果同名返回该同名数组index，如果不同名返回-1
                       let classIndex  = selectGrade.Classes.findIndex((item) => {return item.ClassName === AddClassModal.inputValue});

                       if (classIndex>=0){
                            //有同名
                           dispatch({type:UpUIState.ADD_CLASS_INPUT_TIPS_SHOW});

                           dispatch({type:UpUIState.ADD_CLASS_INPUT_TIPS,tips:"该班级已存在，请重新输入！"});

                       }else{

                           //向后台请求添加班级的接口
                           dispatch(UpDataState.addClass({GradeID:AddClassModal.selectValue.value,ClassName:AddClassModal.inputValue,TheGradePreviewID}));

                       }

                   }


                }else{

                    dispatch({type:UpUIState.ADD_CLASS_INPUT_TIPS_SHOW});

                    dispatch({type:UpUIState.ADD_CLASS_INPUT_TIPS,tips:'班级名称由1-20位的汉字、字母、数字以及括号组成'});

                }

            }

        }

    }
    //添加班级点击取消和（x）的按钮
    addClassCancel(){

        const {dispatch} = this.props;

        dispatch({type:UpUIState.ADD_CLASS_MODAL_HIDE});

    }

    UserComm_CheckGroupName(strInput) {
        //用户群名称检测（学校、年级、班级、教师组、专家组）
        return /^[0-9a-zA-Z()（）\u4E00-\u9FA5\uF900-\uFA2D-]{1,20}$/.test(strInput);

    }

    //点击左侧的菜单

    menuClick(e){

        const {ident,id,name,preName,preId} = e;

       const {dispatch} = this.props;

       switch (ident) {

           case 'stu':

               dispatch({type:UpUIState.CHANGE_STU_ACTIVE,info:{id:id,name:name}});

               break;

           case 'grade':

               dispatch({type:UpUIState.CHANGE_GRADE_ACTIVE,info:{id:id,name:name}});

               break;

           case 'class':

               dispatch({type:UpUIState.CHANGE_CLASS_ACTIVE,info:{id:id,name:name,preName:preName,preId:preId}});

               break;

           default:

               dispatch({type:UpUIState.CHANGE_STU_ACTIVE});
       }

    }

    //点击导入

    Import(type){

        if (type===1){

            window.open('/html/admclass/#/Import/Teacher');

        }

        if (type===2){

            window.open('/html/admclass/#/Import/Genger');

        }

    }


    //教师端弹出教师弹窗
    TeacherTeacherModalShow(opt){

        const {dispatch,ClassCharge} = this.props;

        switch (opt.type) {

            case 1:
                dispatch({type:TMActions.TEACHER_TEACHER_MODAL_SHOW});

                break;

            case 2:

                dispatch({type:TMActions.TEACHER_TEACHER_MODAL_SHOW,options:{

                        originTeacherShow:true,

                        originTeacherInfo:opt.originTeacherInfo,

                        originTeacherTitle:"原任课教师",

                        newTeacherTitle:"新任课教师",

                        modalTitle:"更改任课教师",

                        type:2,

                        SubjectID:opt.originTeacherInfo.SubjectID

                    }});

                break;

            default:

                dispatch({type:TMActions.TEACHER_TEACHER_MODAL_SHOW});

        }
        //初始化所有的教师和学科的数据

        dispatch(TMActions.getTeacherData({ClassID:ClassCharge.ActiveClassID,...opt}));

    }




    render() {

        const {UIState,DataState,RouterSet,ModuleSetting} = this.props;

        const { Grades = []} = DataState.SchoolGradeClasses;//左侧菜单的年级和班级信息

        let Menu =[{name:"班级信息总览",link:"/",menu:"menu10",ident:"stu",id:"all",default:true}];

        //遍历年级和班级将menu填充

        Grades.map((item,key)=>{

            let Data = {
                name:item.GradeName,
                id:item.GradeID,
                menu:"menu20",
                link:`/${item.GradeID}`,
                ident:"grade",
                List:[]
            };
            if (item.Classes){
                item.Classes.map((i,k)=>{
                    Data['List'].push({
                       name:i.ClassName,
                       id:i.ClassID,
                       ident:"class",
                        link:`/${item.GradeID}/${i.ClassID}`
                    });
                })
            }
            Menu.push(Data);

        });




        return (


                <Router>
                    {/*loading包含Frame*/}

                    {

                        UIState.AppLoading.show?

                            <Loading className="AppLoading" tip="加载中..." size="large" delay={200}></Loading>

                            :''

                    }

                        <Frame type="triangle"
                               showLeftMenu={ModuleSetting.ShowLeftMenu}
                               showBarner={ModuleSetting.ShowBarner}
                               style={{display:`${UIState.AppLoading.show?'none':'block'}`}}
                               userInfo={{name:DataState.LoginUser.UserName,image:DataState.LoginUser.PhotoPath}}
                               module={ModuleSetting.ModuleInfo}
                        >
                            {/*banner*/}

                            <div ref="frame-time-barner">



                                {

                                    parseInt(DataState.LoginUser.UserType)===0?

                                        <Banner addClass={this.addClass.bind(this)}
                                                Import={this.Import.bind(this)}>

                                        </Banner>

                                        :''

                                }

                                {

                                    parseInt(DataState.LoginUser.UserType)===1?

                                        <TeacherBtnBanner TeacherModalShow ={this.TeacherTeacherModalShow.bind(this)}>

                                        </TeacherBtnBanner>

                                        :''

                                }

                            </div>


                            {/*左侧菜单*/}

                            <div ref="frame-left-menu">

                               {/* <LeftMenu Menu={Menu} Icon="pic3"></LeftMenu>*/}

                                <MenuLeftNoLink Menu={Menu} menuClick={this.menuClick.bind(this)} Icon="pic3"></MenuLeftNoLink>

                            </div>

                            {/*右侧内容区域，Router变化区域*/}
                            <div ref="frame-right-content">



                                    <Switch>

                                        <Route path="/Import*" component={Import}></Route>

                                        <Route path="/*" exact component={ContentContainer}></Route>

                                    </Switch>



                            </div>

                        </Frame>

                            {/*提示弹出框组件*/}
                        <Alert  show={UIState.AppAlert.show}  type={UIState.AppAlert.type} title={UIState.AppAlert.title}
                        onOk={UIState.AppAlert.ok} onCancel={UIState.AppAlert.cancel} onClose={UIState.AppAlert.close}
                        onHide = {UIState.AppAlert.hide } abstract={UIState.AppAlert.abstract}>

                        </Alert>

                       {/* 添加班级弹出层*/}

                        <Modal type={1} title="添加班级"
                               visible={UIState.AddClassModal.show} mask={true}
                               maskClosable={true} width={540}
                               bodyStyle={{height:176}}
                               className="addClassModal" onOk={this.addClassOk.bind(this)}
                               onCancel={this.addClassCancel.bind(this)}>

                            {/*弹出层内容区域*/}

                            <div className="ModalContent">

                                <AddClassModal grade={Grades} addClassDropChange={this.addClassDropChange.bind(this)}
                                                inputDisabled ={UIState.AddClassModal.inputDisabled}
                                                inputValue={UIState.AddClassModal.inputValue}
                                                inputChange={this.addClassInputChange.bind(this)}
                                                selectTipsShow = {UIState.AddClassModal.selectTipsShow}
                                                selectTips = {UIState.AddClassModal.selectTips}
                                                inputTips = {UIState.AddClassModal.inputTips}
                                                inputTipsShow = {UIState.AddClassModal.inputTipsShow}
                                                selectedValue={UIState.AddClassModal.selectValue}>
                                </AddClassModal>

                            </div>

                        </Modal>

                </Router>


        );
    }
}
const  mapStateToProps = (state) => {

    let {UIState,DataState,RouterSet,ModuleSetting,Teacher} = state;

    const { ClassCharge } = Teacher;

    return {

        UIState,

        DataState,

        RouterSet,

        ModuleSetting,

        ClassCharge

    }

};

export default connect(mapStateToProps)(App);