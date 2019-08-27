import React,{Component} from 'react';
import {Frame,Loading,Alert,LeftMenu,Modal} from "../../../common";
import {connect} from 'react-redux';
import {HashRouter as Router,Route,Switch} from 'react-router-dom';
import UpDataState from "../../../admclass/js/actions/UpDataState";
import UpUIState from "../../../admclass/js/actions/UpUIState";



class App extends Component{

    constructor(props) {
        super(props);
        const {dispatch} = props;
        //判断token是否存在
        if (sessionStorage.getItem('token')){
            //初始化界面
            //dispatch(UpDataState.getPageInit());

        }else{
            //不存在的情况下
          /*  dispatch({type:UpUIState.APP_LOADING_SHOW});
            dispatch(UpUIState.showErrorAlert({
                type:'btn-error',
                title:"登录错误，请重新登录!",
                ok:this.onAppAlertOK.bind(this),
                cancel:this.onAppAlertCancel.bind(this),
                close:this.onAppAlertClose.bind(this)
            }));*/
        }
    }

    render() {
        return (
           <React.Fragment>

               <Loading>

                    <Frame></Frame>

               </Loading>

           </React.Fragment>
        );
    }
}
export default App;