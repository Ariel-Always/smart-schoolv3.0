import React,{Component} from 'react';

import {connect} from 'react-redux';

import { Modal,DropDown } from "../../../../common";

class AdjustScheduleModal extends Component{

    render() {

        const { AddScheduleModal } =this.props;

        return (

            <Modal className="add-schedule-modal-wrapper" visible={AddScheduleModal.show}
                   title="添加临时课程"
                   type={1}
                   width={680}
                   bodyStyle={{height:286}}
                   mask={true}
                   maskClosable={true}
                   cancelText="取消">

                <div className="ModalContent">

                    <table>

                        <tbody>

                            <tr>

                                <td className="props">学科:</td>

                                <td>

                                    <DropDown ></DropDown>

                                </td>

                            </tr>

                            <tr>

                                <td className="props">上课班级:</td>

                                <td>



                                </td>

                            </tr>

                            <tr>

                                <td className="props">上课老师:</td>

                            </tr>

                            <tr>

                                <td className="props">上课时间:</td>

                            </tr>

                            <tr>

                                <td className="props">上课教室:</td>

                            </tr>

                        </tbody>

                    </table>



                </div>

            </Modal>

        );

    }

}

const mapStateToState = (state) => {

    const { AddScheduleModal } = state.Manager;

    return{

        AddScheduleModal

    }

};

export default connect(mapStateToState)(AdjustScheduleModal);