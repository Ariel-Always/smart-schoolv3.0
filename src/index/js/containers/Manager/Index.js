import React,{Component} from 'react';

import AppAlertActions from '../../actions/AppAlertActions';

import ManagerPageActions from '../../actions/Manager/ManagerPageActions';

import AppLoadingActions from '../../actions/AppLoadingActions';

import HeaderActions from '../../actions/Manager/HeaderActions';

import Header from '../../components/Manager/Header'

import { connect } from 'react-redux';

class Index extends Component{

    constructor(props) {

        super(props);

        const { dispatch } = props;

        dispatch(ManagerPageActions.PageInit());

        dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

    }

    //头部点击menu

    HeaderMenuToggle(e){

        e.stopPropagation();

        const { dispatch,Manager } = this.props;
        
        const { HeaderSetting } = Manager;

        dispatch({type:HeaderActions.HEADER_MENU_TOGGLE});

    }


    OutMenuEvent(e){

        const { dispatch } = this.props;

        let HDM =  document.getElementById('header-down-menu');

        let HMW = document.getElementById('header-menu-wrapper');

        if ((!HDM.contains(e.target))&&(!HMW.contains(e.target))){

            dispatch({type:HeaderActions.HEADER_MENU_HIDE});


        }

    }


    //点击menu之外
    componentDidMount(){

        addEventListener('click',this.OutMenuEvent.bind(this));

    }


    render() {

        const { LoginUser,Manager } = this.props;

        const { HeaderSetting } = Manager;

        return (

            <div className="manager-desk-top">


                <Header LoginUser={LoginUser} HeaderSetting={HeaderSetting} HeaderMenuToggle={this.HeaderMenuToggle.bind(this)}></Header>


            </div>

        );

    }

}

const mapStateToProps = (state) => {

    const { LoginUser,Manager } = state;

    return {

        LoginUser,

        Manager

    }

};

export default connect(mapStateToProps)(Index);