import React,{Component} from 'react';

import { connect } from 'react-redux';

import {Modal, Button} from "../../../../common";

import ABCRActions from "../../actions/Manager/AdjustByClassRoomActions";

import AdjustByClassRoomContent from './AdjustByClassRoomContent';


class AdjustByClassRoom extends Component{


    CloseModal(){

        const { dispatch } = this.props;

        dispatch({type:ABCRActions.ADJUST_BY_TEACHER_HIDE});

    }



    //面板确定
    ModalOk(){

        const { dispatch } = this.props;

        dispatch(ABCRActions.ModalCommit());

    }



    render() {

        const { AdjustByClassRoom } = this.props;

        const {

            Show,LoadingShow,ClassRoomList,OriginClassRoom,TargetClassRoom

        } = AdjustByClassRoom;

        return (

            <Modal className="adjust-by-class-room-modal"
                   title="按教室调整课程"
                   type={1}
                   visible={Show}
                   width={840}
                   mask={true}
                   cancelText="取消"
                   destroyOnClose={true}
                   footer={[

                       <span key="footer-tips" className="footer-tips">注:调整上课时间后，上课节次的数量与顺序须与调整前一致。</span>,

                       <Button key='agree' color='green' onClick={this.ModalOk.bind(this)}>确定</Button>,

                       <Button key='refuse' color='blue' onClick={this.CloseModal.bind(this)}>取消</Button>

                   ]}>

                <AdjustByClassRoomContent></AdjustByClassRoomContent>

            </Modal>

        );

    }

}

const mapStateToProps = (state) => {

    const { AdjustByClassRoom } = state.Manager;

    return{

        AdjustByClassRoom

    }

};

export default connect(mapStateToProps)(AdjustByClassRoom);