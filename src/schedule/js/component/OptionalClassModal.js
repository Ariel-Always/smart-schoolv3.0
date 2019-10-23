import React,{Component} from 'react';

import { Modal,Table } from '../../../common';

class OptionalClassModal extends Component{

    render() {

        const { Show,LoadingShow,DataSource } = this.props;

        return (

            <Modal
                type="1"
                title="走班课程详情"
                visible={true}
                footer={null}
                width={720}
                bodyStyle={{height:484}}
            >

                <Table></Table>

            </Modal>

        );

    }

}

export default OptionalClassModal;