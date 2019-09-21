import React,{Component} from 'react';

import { connect } from 'react-redux';

import { Tabs } from 'antd';

import { Modal } from "../../../../common";

import ABTAction from "../../actions/Manager/AdjustByTeacherActions";

import ReplaceSchedule from './ReplaceSchedule';

import ChangeSchedule from './ChangeSchedule'

import ChangeTime from './ChangeTime';

import ChangeClassRoom from './ChangeClassRoom';

import StopSchedule from './StopSchedule';


const { TabPane  } = Tabs;


class AdjustByTeacherModal extends Component{

    CloseModal(){

        const { dispatch } = this.props;

        dispatch({type:ABTAction.ADJUST_BY_TEACHER_HIDE});

    }

    //面板发生变化
    tabChange(activeKey){

        const { dispatch } = this.props;

        dispatch({type:ABTAction.ADJUST_BY_TEACHER_TAB_CHANGE,data:activeKey});

    }



    render() {

        const { AdjustByTeacherModal } = this.props;

        const {

            show,

            activeKey

        } = AdjustByTeacherModal;

        return (

            <Modal className="adjust-by-teacher-modal"
                   title="按老师调整课程"
                   type={1}
                   visible={show}
                   width={840}
                   mask={true}
                   cancelText="取消"
                   onCancel={this.CloseModal.bind(this)} >

                <div className="modal-wrapper">

                    <Tabs type="card" onChange={this.tabChange.bind(this)} activeKey={activeKey} tabBarStyle={{width:840}} tabBarGutter={0}>

                        <TabPane tab="找人代课" key="1" >

                            <ReplaceSchedule></ReplaceSchedule>

                        </TabPane>

                        <TabPane tab="与人换课" key="2" >

                            <ChangeSchedule></ChangeSchedule>

                        </TabPane>

                        <TabPane tab="调整时间" key="3">

                            <ChangeTime></ChangeTime>

                        </TabPane>

                        <TabPane tab="更换教室" key="4" >

                            <ChangeClassRoom></ChangeClassRoom>

                        </TabPane>

                        <TabPane tab="停课" key="5">

                            <StopSchedule></StopSchedule>

                        </TabPane>

                    </Tabs>

                </div>

            </Modal>

        );

    }

}

const mapStateToProps = (state) => {

    const { AdjustByTeacherModal } = state.Manager;

    return{

        AdjustByTeacherModal

    }

};

export default connect(mapStateToProps)(AdjustByTeacherModal);