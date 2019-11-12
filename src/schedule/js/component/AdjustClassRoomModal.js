import React,{ Component } from 'react';

import { Modal,Loading,Search } from "../../../common";

import ScrollBars from 'react-custom-scrollbars';

class AdjustClassRoomModal extends Component{

    render() {

        const  { Params } = this.props;

        const { Show,ModalLoading,ClassRoomList=[],ClassRoomTabActive } = Params;

        return (

            <Modal type={1}

                   title='调整教室'

                   visible={Show}

                   width={680}

                   mask={true}

                   bodyStyle={{height:480}}

                   className="component-adjust-classroom-wrapper"

                  /* onCancel={e=>CloseChangeTime()}

                   onOk={e=>ChangeTimeCommit()}*/

            >

                <Loading spinning={false}>

                    <div className="content-wrapper">

                        <div className="header-search clearfix">

                            <Search width={220} placeHolder='输入教室名称进行搜索'></Search>

                        </div>

                        <div className="left-classroom-type">

                            <ScrollBars style={{width:178,height:390}}>

                            {

                                ClassRoomList.map((item,key)=>{

                                    return <div key={key} className={`class-room-type-item ${key===ClassRoomTabActive?'active':''}`}>

                                            {item.Name}

                                    </div>

                                })

                            }

                            </ScrollBars>

                        </div>

                        <div className="right-classroom-content">

                            <ScrollBars style={{width:502,height:390}}>

                                {

                                    ClassRoomList[ClassRoomTabActive]?ClassRoomList[ClassRoomTabActive].List.map((item,key)=>{

                                        return <div className="right-classroom-item">{item.Name}</div>

                                    }):''

                                }

                            </ScrollBars>

                        </div>

                    </div>

                </Loading>

            </Modal>

        );

    }

}

export default AdjustClassRoomModal;