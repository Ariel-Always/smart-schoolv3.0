import React,{Component} from 'react';

import AppAlertActions from '../../actions/AppAlertActions';

import AppLoadingActions from '../../actions/AppLoadingActions';

import HeaderActions from '../../actions/Teacher/HeaderActions';

import TeacherPageActions from '../../actions/Teacher/TeacherPageActions';

import Header from '../../components/Teacher/Header';

import { connect } from 'react-redux';

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

    }

   //点击学科按钮
    SubjectMenuToggle(e){

        e.stopPropagation();

        const { dispatch } = this.props;

        dispatch({type:HeaderActions.TEACHER_SUBJECT_MENU_TOGGLE});

    }

    SubjectClick(info){

        const { dispatch } = this.props;

        dispatch(HeaderActions.SubjectClick(info));

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


    }

    //点击menu之外
    componentDidMount(){

        addEventListener('click',this.OutMenuEvent.bind(this));

    }


    render() {

        const { LoginUser,Teacher } = this.props;

        const { HeaderSetting } = Teacher;

        return (

            <div className="teacher-desk-top">

                <Header
                    LoginUser={LoginUser}
                    HeaderSetting={HeaderSetting}
                    HeaderMenuToggle={this.HeaderMenuToggle.bind(this)}
                    SubjectMenuToggle={this.SubjectMenuToggle.bind(this)}
                    SubjectClick={this.SubjectClick.bind(this)}
                >

                </Header>

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