import React,{Component} from 'react';

import {connect} from 'react-redux';

import { Modal,Loading,Button } from "../../../../common";

import { DatePicker,ConfigProvider } from  'antd';

import ABTMActions from '../../actions/Manager/AdjustByTimeModalActions';

import zhCN from 'antd/es/locale/zh_CN';

import moment from 'moment';

import 'moment/locale/zh-cn';

import date from '../../../images/date.png'

moment.locale('zh-cn');



class AdjustByTimeModal extends Component{

    //当学段被选中的情况下
    periodChecked(opts) {

        const { dispatch } = this.props;

        dispatch(ABTMActions.periodChecked(opts));

    }






    render() {

        const { AdjustByTimeModal } = this.props;

        const { periodClassHours,periodGrades,periodGradesCheckedList,oldClassHours,newClassHours } = AdjustByTimeModal;

        return (

            <Modal className="adjust-by-time-modal"
                   title="按时间调整课程"
                   type={1}
                   visible={AdjustByTimeModal.show}
                   width={1042}
                   bodyStyle={{height:380}}
                   mask={true}
                   cancelText="取消"
                   footer={[

                            <span key="footer-tips" className="footer-tips">注:调整上课时间后，上课节次的数量与顺序须与调整前一致。</span>,

                            <Button key='agree' color='green' >确定</Button>,

                            <Button key='refuse' color='blue' >取消</Button>

                   ]}>

                <div className="ModalContent">

                    <Loading spinning={AdjustByTimeModal.loadingShow} tip="加载中...">

                        <div className="grade-selected-wrapper clearfix">

                            <div className="grade-selected-title">年级:</div>

                            <div className="grade-selected-container">

                                {

                                    periodGrades.map((item,key) => {

                                        let periodChecked = false;
                                        //变量看看是否全选
                                        periodGradesCheckedList.map((itm) => {

                                           if (itm.id === item.id){

                                            if (itm.checked){

                                                periodChecked = true;

                                            }

                                           }

                                        });

                                        return <div key={key} className="period-item-wrapper clearfix">

                                                    <div className="period">

                                                        <div className={`check-item ${periodChecked?'active':''}`} onClick={this.periodChecked.bind(this,{type:"period",id:item.id})}>

                                                            {item.name}

                                                        </div>

                                                    </div>

                                                {

                                                    item.list.map((i,k) => {

                                                     //判断该选项是否是选中

                                                      let itemChecked = false;

                                                      periodGradesCheckedList.map((itm) => {

                                                          if (itm.id === item.id){

                                                              itm.list.map((it) => {

                                                                  if (it === i.id){

                                                                      itemChecked = true;

                                                                  }

                                                              });

                                                          }

                                                      });

                                                      return <div key={k} className={`check-item ${itemChecked?'active':''}`} onClick={this.periodChecked.bind(this,{type:"item",pid:item.id,id:i.id})}>{i.name}</div>

                                                    })

                                                }

                                                </div>

                                    })

                                }

                            </div>

                        </div>

                        <div className="adjust-old-wrapper">

                            <div className="adjust-old-title">时间:</div>

                            <ConfigProvider locale={zhCN}>

                               {/* <DatePicker className="date-pick"  suffixIcon={img}></DatePicker>*/}

                               <DatePicker className="date-pick"></DatePicker>

                               <span className="date-picked-time"></span>

                                <div className="class-hour-wrapper">

                                    {

                                        oldClassHours.map(item => {

                                            return  <div className="class-hour-item clearfix">

                                                        <div className="noon">

                                                            <div className="check-item">

                                                                {item.name}

                                                            </div>

                                                        </div>

                                                        {

                                                            item.list.map(i => {

                                                                return <div className="check-item">

                                                                            {i.name}

                                                                        </div>

                                                            })

                                                        }

                                                    </div>

                                        })

                                    }

                                    {/*<div className="class-hour-item clearfix">

                                          <div className="noon">

                                              <div className="check-item">

                                                  上午

                                              </div>

                                          </div>

                                        <div className="check-item">

                                            上午

                                        </div>

                                        <div className="check-item">

                                            上午

                                        </div>

                                    </div>*/}

                                </div>

                            </ConfigProvider>

                        </div>

                    </Loading>



                </div>

            </Modal>

        );

    }

}

const mapStateToProps = (state) => {

    const { AdjustByTimeModal } = state.Manager;

    return{

        AdjustByTimeModal

    }

};

export default connect(mapStateToProps)(AdjustByTimeModal);