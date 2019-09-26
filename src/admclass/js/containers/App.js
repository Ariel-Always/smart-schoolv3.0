import React,{Component} from 'react';
import {Frame,Loading,Alert,LeftMenu,Modal,MenuLeftNoLink} from "../../../common";
import {connect} from 'react-redux';
import '../../scss/index.scss';
import UpUIState from '../actions/UpUIState';
import UpDataState from '../actions/UpDataState';
import AppAlertActions from '../actions/AppAlertActions';
import logo from '../../images/logo.png';
import Banner from '../component/Banner';
import ContentContainer from './ContentContainer';
import AddClassModal from '../component/AddClassModal';
import {HashRouter as Router,Route,Switch} from 'react-router-dom';




class App extends Component{
    constructor(props) {
        super(props);

        const {dispatch} = props;
        //判断token是否存在
        if (sessionStorage.getItem('token')){
            //初始化界面
            dispatch(UpDataState.getPageInit());

        }else{
            //不存在的情况下
            dispatch({type:UpUIState.APP_LOADING_SHOW});

            dispatch(UpUIState.showErrorAlert({
                type:'btn-error',
                title:"登录错误，请重新登录!",
                ok:this.onAppAlertOK.bind(this),
                cancel:this.onAppAlertCancel.bind(this),
                close:this.onAppAlertClose.bind(this)
            }));
        }

    }
    onAppAlertOK(){
        const {dispatch}= this.props;
        dispatch({type:UpUIState.CLOSE_ERROR_ALERT});
        window.location.href="/html/login"
    }
    onAppAlertCancel(){
        const {dispatch}= this.props;
        dispatch({type:UpUIState.CLOSE_ERROR_ALERT});
    }
    onAppAlertClose(){
        const {dispatch}= this.props;
        dispatch({type:UpUIState.CLOSE_ERROR_ALERT});
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

        const {SchoolGradeClasses} = DataState;

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
                           dispatch(UpDataState.addClass());

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


    render() {
        const {UIState,DataState} = this.props;

        const {Grades=[]} = DataState.SchoolGradeClasses;//左侧菜单的年级和班级信息

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

                    <React.Fragment>
                    {/*loading包含Frame*/}
                        <Loading className="AppLoading" tip="加载中..." size="large" delay={200} spinning={UIState.AppLoading.show}>

                            <Frame type="triangle" showLeftMenu={true} style={{display:`${UIState.AppLoading.show?'none':'block'}`}}
                                   userInfo={{name:DataState.LoginUser.UserName,image:DataState.LoginUser.PhotoPath}}
                                   module={{cnname:"行政班管理",enname:"Administration class management",image:logo}}>
                                {/*banner*/}

                                <div ref="frame-time-barner">

                                    <Banner addClass={this.addClass.bind(this)}></Banner>

                                </div>


                                {/*左侧菜单*/}

                                <div ref="frame-left-menu">

                                   {/* <LeftMenu Menu={Menu} Icon="pic3"></LeftMenu>*/}

                                    <MenuLeftNoLink Menu={Menu} menuClick={this.menuClick.bind(this)} Icon="pic3"></MenuLeftNoLink>

                                </div>

                                {/*右侧内容区域，Router变化区域*/}
                                <div ref="frame-right-content">

                                    <ContentContainer></ContentContainer>

                                </div>

                            </Frame>

                        </Loading>
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
export default connect(mapStateToProps)(App);