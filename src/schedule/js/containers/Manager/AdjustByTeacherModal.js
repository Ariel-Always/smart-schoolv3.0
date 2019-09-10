import React,{Component} from 'react';

import { connect } from 'react-redux';

import { Tabs } from 'antd';

import { Modal } from "../../../../common";

import ReplaceSchedule from './ReplaceSchedule';


const { TabPane  } = Tabs;


class AdjustByTeacherModal extends Component{
    render() {

        const { AdjustByTeacherModal } = this.props;

        const {

            show

        } = AdjustByTeacherModal;

        return (
            <Modal className="adjust-by-teacher-modal"
                   title="按老师调整课程"
                   type={1}
                   visible={show}
                   width={840}
                   bodyStyle={{height:330}}
                   mask={true}
                   cancelText="取消">

                <div className="modal-wrapper">

                    <Tabs type="card" tabBarStyle={{width:840}} tabBarGutter={0}>

                        <TabPane tab="找人代课" key="1" forceRender={true}>

                            <ReplaceSchedule></ReplaceSchedule>

                        </TabPane>

                        <TabPane tab="与人换课" key="2" forceRender={true}></TabPane>

                        <TabPane tab="调整时间" key="3" forceRender={true}></TabPane>

                        <TabPane tab="更换教室" key="4" forceRender={true}></TabPane>

                        <TabPane tab="停课" key="5" forceRender={true}></TabPane>

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