import React,{Component} from 'react';

import { Modal,Loading } from "../../../../common";

import { connect } from 'react-redux';

class StopScheduleModal extends Component{

    render() {

        const { StopScheduleModal } = this.props;

        return (

            <Modal className="adjust-by-time-modal"
                   title="停课"
                   type={1}
                   visible={StopScheduleModal.show}
                   width={780}
                   bodyStyle={{height:332}}
                   mask={true}
                   cancelText="取消">



            </Modal>

        );

    }

}

const mapStateToProps = (state) => {

  const { StopScheduleModal } = state.Manager

  return{

      StopScheduleModal

  }

};

export default connect(mapStateToProps)(StopScheduleModal);