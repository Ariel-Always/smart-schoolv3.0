import React,{ Component } from 'react';

import {Loading, Modal} from "../../../common";

class ChangeTimeModal extends Component{

    render() {

        const  { Params } = this.props;

        const {

            Show,ModalLoading

        } = Params;

        return (

            <Modal type={1}

                   title='调整时间'

                   visible={Show}

                   width={976}

                   mask={true}

                   className="component-change-time-wrapper"

                //onCancel={this.alertClose.bind(this)}

            >

                <div className="modal-content-wrapper">

                    <Loading spinning={ModalLoading}>



                    </Loading>

                </div>

            </Modal>

        );

    }

}

export default ChangeTimeModal;