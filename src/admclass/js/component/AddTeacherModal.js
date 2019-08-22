import React,{Component} from 'react';
import {Modal} from "../../../common";
import {DropDown,Loading} from "../../../common";

class AddTeacherModal extends Component{
    render() {

        const {
            loadingShow
        } = this.props;


        return (

            <div className="add-teacher-wrapper clearfix">

                <Loading className="add-teacher-loading" size="large" spin={loadingShow} type="loading" tip="加载中...">

                    <div className="left-wrapper">

                        <div className="subject-select">

                            <span className="props">所教学科:</span>

                            <DropDown></DropDown>

                        </div>

                    </div>

                    <div className="right-wrapper">

                    </div>

                </Loading>

            </div>

        );
    }
}
export default AddTeacherModal;