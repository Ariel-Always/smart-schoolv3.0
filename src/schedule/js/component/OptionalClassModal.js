import React,{Component} from 'react';

import { Modal,Table,Loading,PagiNation } from '../../../common';

class OptionalClassModal extends Component{

    render() {

        const { Show,Close,LoadingShow,DataSource,CurrentPage,PageChange } = this.props;

        let Columns = [

            {
                title:"教学班名称",

                align:"center",

                dataIndex:"CourseClassName",

                key:"CourseClassName"

            },
            {

                title:"任课教师",

                align:"center",

                dataIndex:"TeacherName",

                key:"TeacherName"
                
            },

            {

                title:"上课教室",

                align:"center",

                dataIndex:"ClassRoomName",

                key:"ClassRoomName"

            }

        ];



        return (

            <Modal
                type="1"
                title="走班课程详情"
                visible={Show}
                footer={null}
                width={720}
                bodyStyle={{height:484}}
                className="optional-class-modal"
                onCancel={()=>Close()}
                destroyOnClose={true}
            >
                <Loading spinning={LoadingShow}>

                    <Table columns={Columns} dataSource={DataSource} pagination={{hideOnSinglePage:true,pageSize:7,current:CurrentPage,onChange:PageChange}}></Table>

                    {/*<PagiNation></PagiNation>*/}

                </Loading>

            </Modal>

        );

    }

}

export default OptionalClassModal;