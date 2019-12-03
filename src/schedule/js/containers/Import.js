import React,{Component} from 'react';

import { connect } from 'react-redux';

import $ from "jquery";

import AppLoadingActions from '../actions/AppLoadingActions';

import ImportExcel from '../../../common/js/Import/ImportExcel';


class Import extends Component{

    constructor(props) {

        super(props);

        const { dispatch } = props;

        if (sessionStorage.getItem('UserInfo')){

            const token = sessionStorage.getItem('token');

            let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

            let { SchoolID,UserName,UserID } = UserInfo;

            dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

        }else{


            let getUserInfo = setInterval(()=>{

                if (sessionStorage.getItem('UserInfo')){

                    const token = sessionStorage.getItem('token');

                    let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

                    let { SchoolID,UserName,UserID } = UserInfo;

                    dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                    clearInterval(getUserInfo);

                }

            },20)

        }


    }


    componentDidMount(){

        const { dispatch } = this.props;

        $('.frame-content-rightside').css({

            'margin-top':'0px',

            "border-radius":"12px",

            "border-top":"0px"

        });

    }


    render(){

        const { LoginUser } = this.props;

        return <div id="import-wrapper">

            <ImportExcel ImportTitle="导入课表" ImportTarget="scheduleMiddle"></ImportExcel>

        </div>

    }

}

const  mapStateToProps = (state) => {

    let { LoginUser } = state;

    return {

        LoginUser

    }

};

export default connect(mapStateToProps)(Import);