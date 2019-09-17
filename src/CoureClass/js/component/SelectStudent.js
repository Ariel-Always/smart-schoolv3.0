import React from 'react'
import { connect } from 'react-redux';
import actions from '../actions';
import '../../scss/SelectStudent.scss'
import { postData, getData } from '../../../common/js/fetch'
import { Scrollbars } from 'react-custom-scrollbars'

import history from '../containers/history'
import { Input, } from 'antd'
import CONFIG from '../../../common/js/config';
import { Search, Loading } from "../../../common";


class SelectStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            select: false
        }
    }

    componentWillReceiveProps(nextProps) {
        const { DataState, UIState } = nextProps;
        let selectTeacherID = DataState.GetCourseClassDetailsHandleClassMsg.transfer.Teacher.length !== 0 ? DataState.GetCourseClassDetailsHandleClassMsg.transfer.Teacher.value : DataState.GetCourseClassDetailsHandleClassMsg.selectData.Teacher.value;

        this.setState({
            selectTeacherID: selectTeacherID
        })

    }

    //搜索
    onClickSearch = (value) => {
        const { DataState, UIState, dispatch } = this.props;
        console.log(value.value)
        //dispatch(actions.UpDataState.getSubjectTeacherMsg('/AdmSubjectTeacher'))

    }

    render() {
        const { DataState, UIState } = this.props;
        console.log(this.state.selectTeacherID)
        let ClassList = DataState.GetStudentClassMsg.GradeClass ? DataState.GetStudentClassMsg.GradeClass : [];
        return (
            <React.Fragment>
                <div id='SelectStudent' className='selectStudent-box'>
                    <div className='box-top'>
                        <Search
                            className='top-search'
                            placeholder='请输入关键字搜索'
                            width='280'
                            onClickSearch={this.onClickSearch.bind(this)}
                        ></Search>
                    </div>
                    <Loading spinning={UIState.AppLoading.studentLoading}>
                        <div className='box-content'>
                            <Scrollbars
                                style={{ width: 177 + 'px', height: 437 + 'px' }}
                            >
                                <ul className='selectClass'>
                                    {
                                        ClassList.map((child,index) => {
                                            return (
                                                <li key={child.ClassID}>{child.ClassName}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </Scrollbars>
                        </div>
                        <div className='classDetails'>
                            <div>

                            </div>
                        </div>
                    </Loading>

                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    let { UIState, DataState } = state;
    return {
        UIState,
        DataState
    }
};
export default connect(mapStateToProps)(SelectStudent);