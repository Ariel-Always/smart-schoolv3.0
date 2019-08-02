import React from 'react';
import {
    Button, Input, Empty, Radio, Modal, CheckBox,
    CheckBoxGroup, RadioGroup, Table, PagiNation, Search, DropDown
} from '../../../common'
import {DatePicker} from 'antd';
import { Icon } from 'antd';
import '../../css/App.scss';

/*日历子组件*/
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
function handleClick(event) {
    "use strict";
    console.log(event.target)
}
function handleValue(event) {
    "use strict";
    console.log(event.target.value)
}

function DateChange(event){
    "use strict";
    console.log(event)
}

class App extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            visible_1: false,
            visible_2: false,
            visible_3: false,
            radioValue:'windows',
            plainOptions:["windows","iOS","Android","Linux"],
            checkedList:[],
            checkAll:false,
            simpleTable:{
                columns:[
                    {
                        title:"姓名",
                        dataIndex:"name",
                        width:200,
                        align:"center",
                        filterMultiple:true
                    },
                    {

                        title:"性别",
                        dataIndex:"sex",
                        width:200,
                        align:"center"
                    },
                    {

                        title:"年龄",
                        dataIndex:"age",
                        width:100,
                        align:"center"
                    },
                    {
                        title:"电话",
                        dataIndex:"tel",
                        align:"center"
                    }
                ],
                dataSource:[
                    {
                        key:1,
                        name:"张三",
                        sex:"男",
                        age:21,
                        tel:18848962905
                    },
                    {
                        key:2,
                        name:"李四",
                        sex:"男",
                        age:64,
                        tel:18848962905
                    },
                    {
                        key:3,
                        name:"王五",
                        sex:"男",
                        age:15,
                        tel:18848962905
                    }
                ]
            },
            sortTable:{
                columns:[
                    {
                        title:"姓名",
                        dataIndex:"name",
                        width:150,
                        align:"center",
                    },
                    {

                        title:"性别",
                        dataIndex:"sex",
                        width:200,
                        align:"center"
                    },
                    {

                        title:"年龄",
                        dataIndex:"age",
                        width:100,
                        align:"center",
                        sorter:function (a,b) {
                            return a.age-b.age;
                        }
                    },
                    {
                        title:"电话",
                        dataIndex:"tel",
                        align:"center"
                    }
                ],
                dataSource:[
                    {
                        key:1,
                        name:"张三",
                        sex:"男",
                        age:21,
                        tel:18848962905
                    },
                    {
                        key:2,
                        name:"李四",
                        sex:"男",
                        age:64,
                        tel:18848962905
                    },
                    {
                        key:3,
                        name:"王五",
                        sex:"男",
                        age:15,
                        tel:18848962905
                    }
                ]
            },
            checkTable:{
                columns:[
                    {
                        title:"序号",
                        width:100,
                        align:"center",
                        dataIndex:"key",
                        render:(i)=>{
                           return <CheckBox key={i} value={i}>{i}</CheckBox>
                        }
                    },
                    {
                        title:"姓名",
                        dataIndex:"name",
                        width:150,
                        align:"center",
                        render:(item)=>{
                            return <a href="">{item}</a>
                        }
                    },
                    {

                        title:"性别",
                        dataIndex:"sex",
                        width:200,
                        align:"center"
                    },
                    {

                        title:"年龄",
                        dataIndex:"age",
                        width:100,
                        align:"center"
                    },
                    {
                        title:"电话",
                        dataIndex:"tel",
                        align:"center"
                    },
                    {
                        title:"操作",
                        align:"center",
                        dataIndex:"action",
                        width:200,
                        render:(item)=>{

                          return item.map((i)=>{
                              if(i==="编辑"){
                                  return  <Button type="primary" size="small" color="blue" value={i} style={{display:"inline-block",margin:"0 10px 0 0" }}/>
                              }else{
                                  return  <Button type="primary" size="small" color="red" value={i} style={{display:"inline-block",margin:0}}/>
                              }
                           });
                        }
                    }
                ],
                dataSource:[
                    {
                        key:1,
                        name:"张三",
                        sex:"男",
                        age:21,
                        tel:18848962905,
                        action:["编辑","删除"]
                    },
                    {
                        key:2,
                        name:"李四",
                        sex:"男",
                        age:64,
                        tel:18848962905,
                        action:["编辑","删除"]
                    },
                    {
                        key:3,
                        name:"王五",
                        sex:"男",
                        age:15,
                        tel:18848962905,
                        action:["删除"]
                    }
                ]
            },
            currentPage:1,
            currentSmallPage:1,
            simpleSearch:'',
            selectSearch:{
                selectValue:'',
                value:''
            },
            dropSearchList:[],
            dropIdShow:false
        }
    }

    showModal_1 = () => {
        console.log(this.state.visible)
        this.setState({
            visible_1: true,
        });
    };

    handleOk_1 = e => {
        console.log(e);
        this.setState({
            visible_1: false,
        });
    };

    handleCancel_1 = e => {
        console.log(e);
        this.setState({
            visible_1: false,
        });
    };
    showModal_2 = () => {

        this.setState({
            visible_2: true,
        });
    };

    handleOk_2 = e => {
        console.log(e);
        this.setState({
            visible_2: false,
        });
    };

    handleCancel_2 = e => {
        console.log(e);
        this.setState({
            visible_2: false,
        });
    };
    showModal_3 = () => {
        console.log(this.state.visible)
        this.setState({
            visible_3: true,
        });
    };

    handleOk_3 = e => {
        console.log(e);
        this.setState({
            visible_3: false,
        });
    };

    handleCancel_3 = e => {
        console.log(e);
        this.setState({
            visible_3: false,
        });
    };
    changeRadio(e){
        this.setState({radioValue:e.target.value});
    }
    changeCheckBox(checkedList){
        this.setState({checkedList,checkAll:checkedList.length===this.state.plainOptions.length?true:false});
    }
    changeAllCheckBox(e){
        if (e.target.checked){
            this.setState({checkedList:this.state.plainOptions,checkAll: e.target.checked})
        } else{
            this.setState({checkedList:[],checkAll: e.target.checked})
        }
    }
    changePage(e){
        this.setState({currentPage:e});
    }
    changeSmallPage(e){
        this.setState({currentSmallPage:e});
    }
    selectClickSearch(e){
        this.setState({selectSearch:{
                selectValue:e.selectdValue,
                value:e.value
            }})
    }
    simpleClickSearch(e){
        this.setState({ simpleSearch:e.value});
    }
    dropClickSearch(e){
        if (e.value){
            this.setState({dropIdShow:true,dropSearchList:[
                    {
                        id:145687254,
                        name:"张三"
                    },
                    {
                        id:5545045,
                        name:"李四"
                    },
                    {
                        id:545121545,
                        name:"王五"
                    },
                    {
                        id:5285656886,
                        name:"马六"
                    }
                ]});
        }
    }
    dropMultipleChange(e){
    }
    dropCancelSearch(e){
        this.setState({
            dropIdShow:false
        });
    }
 render(){
     return (
         <div className="App">
             {/*
              按钮组件
              */}
             <div className="Box ButtonBox">
                 <div className="BoxTop">
                     <p className="BoxTop_title">按钮组件</p>
                 </div>
                 <div className="Box-btn">
                     <div className="Box-flex">
                         <div className="Box-tips">
                             <p className="tips">最大尺度：正常状态-鼠标悬停状态-禁用状态</p>
                         </div>
                         <div className="Box-content-show">
                             <Button type="primary" style={{color:'red'}} size="large" shape="round" color="orange" value="按钮" />
                             <Button type="primary" size="large" color="green" value="按钮"/>
                             <Button type="primary" className="circle"  shape="circle" color="blue" value="按钮"/>
                             <Button type="primary" size="large" color="red" value="按钮"/>
                             <Button type="primary" size="large" color="mazarine" value="按钮"/>
                             <Button  size="large" disabled value="按钮"/>
                         </div>
                     </div>
                 </div>
                 <div className="Box-btn">
                     <div className="Box-flex">
                         <div className="Box-tips">
                             <p className="tips">中等尺度：正常状态-鼠标悬停状态-禁用状态</p>
                         </div>
                         <div className="Box-content-show">
                             <Button type="primary" size="normal" value="按钮"/>
                             <Button type="primary" size="normal" color="green" value="按钮"/>
                             <Button type="default" size="normal" color="blue" value="按钮"/>
                             <Button type="primary" size="normal" color="red" value="按钮"/>
                             <Button type="default" size="normal" color="mazarine" value="按钮"/>
                             <Button type="primary" size="normal" disabled value="按钮"/>
                         </div>
                     </div>
                 </div>
                 <div className="Box-btn">
                     <div className="Box-flex">
                         <div className="Box-tips">
                             <p className="tips">最小尺度：正常状态-鼠标悬停状态-禁用状态</p>
                         </div>
                         <div className="Box-content-show">
                             <Button type="primary" size="small" value="按钮dddddddd"/>
                             <Button type="primary" size="small" value="按钮"/>
                             <Button type="primary" size="small" color="green" value="按钮"/>
                             <Button type="primary" size="small" color="blue" value="按钮"/>
                             <Button type="primary" size="small" color="red" value="按钮"/>
                             <Button type="primary" size="small" onClick={handleClick} color="mazarine" value="按钮"/>
                             <Button type="default" size="small"  shape="round" disabled value="按钮"/>
                         </div>
                     </div>
                 </div>

             </div>
             {/*输入框组件*/}
             <div className="Box InputBox">
                 <div className="BoxTop">
                     <p className="BoxTop_title">输入框组件</p>
                 </div>
                 <div className="Box-content">
                     <div className="Box-flex">
                         <div className="Box-tips">
                             <p className="tips">多行输入框：</p>
                         </div>
                         <div className="Box-content-show">
                             <Input
                                 placeholder="输入框"
                                 type="textarea"
                                 rows="3"
                                 cols="30"
                                 name="textarea1"
                             />
                             <Input
                                 placeholder="输入框"
                                 type="textarea"
                                 name="textarea2"
                             />
                             <Input
                                 placeholder="输入框"
                                 type="textarea"
                                 name="textarea3"
                                 disabled
                             />

                         </div>
                     </div>

                 </div>
                 <div className="Box-content">
                     <div className="Box-flex">
                         <div className="Box-tips">
                             <p className="tips">单行密码输入框：</p>
                         </div>
                         <div className="Box-content-show">
                             <Input
                                 placeholder="输入密码"
                                 type="password"
                                 name="password1"
                             />
                             <Input
                                 placeholder="输入密码"
                                 type="password"
                                 name="password2"
                                 prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                             />
                             <Input
                                 placeholder="输入密码"
                                 type="password"
                                 name="password3"
                                 disabled
                             />
                         </div>
                     </div>
                 </div>
                 <div className="Box-content">
                     <div className="Box-flex">
                         <div className="Box-tips">
                             <p className="tips">其他输入框：</p>
                         </div>
                         <div className="Box-content-show">
                             <Input
                                 placeholder="输入框"
                                 type="text"
                                 name="text1"
                             />
                             <Input
                                 placeholder="输入框"
                                 type="text"
                                 name="text2"
                                 onClick={handleValue}
                                 onChange={handleValue}
                                 prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                             />
                             <Input
                                 placeholder="输入框"
                                 type="text"
                                 name="text3"
                                 disabled
                             />
                         </div>
                     </div>
                 </div>
             </div>
             {/*日历组件*/}
             <div className="Box DatePikerBox">
                 <div className="BoxTop">
                     <p className="BoxTop_title">日历组件</p>
                 </div>
                 <div className="Box-content">
                     <div className="Box-flex">
                         <div className="Box-tips">
                             <p className="tips">日历-1：</p>
                         </div>
                         <div className="Box-content-show Box-DatePicker-show">
                             <DatePicker onChange={DateChange} format="YYYY-MM-DD HH:mm" placeholder="选择日期"></DatePicker>
                             <MonthPicker onChange={DateChange} placeholder="选择Moth"></MonthPicker>
                             <RangePicker onChange={DateChange} placeholder={['Start Time', 'End Time']}></RangePicker>
                             <WeekPicker onChange={DateChange} placeholder="选择日期" ></WeekPicker>
                             <DatePicker onChange={DateChange} disabled placeholder="选择日期"></DatePicker>
                         </div>
                     </div>

                 </div>
             </div>
             {/*空数据组件*/}
             <div className="Box DatePikerBox">
                 <div className="BoxTop">
                     <p className="BoxTop_title">空数据组件</p>
                 </div>
                 <div className="Box-content">
                     <div className="Box-flex">
                         <div className="Box-tips">
                             <p className="tips">空数据：</p>
                         </div>
                         <div className="Box-content-show">
                             <Empty type="1" className="Empty" title={'请选择要查看的学校'}/>
                             <Empty type="1"  className="Empty" title={'请选择要查看的文案'}/>
                             <Empty type="2" className="Empty" />
                             <Empty type="2" className="Empty" noTitle/>
                             <Empty  className="Empty" imageStyle={{width:100+'px',height:100+'px'}} type="3" />
                             <Empty  className="Empty" type="4" />
                             <Empty className="Empty" type="5" />
                         </div>
                     </div>

                 </div>
             </div>
             {/*弹出框组件*/}
             <div className="Box DatePikerBox">
                 <div className="BoxTop">
                     <p className="BoxTop_title">弹出框组件</p>
                 </div>
                 <div className="Box-content">
                     <div className="Box-flex">
                         <div className="Box-tips">
                             <p className="tips">弹出框组件：</p>
                         </div>
                         <div className="Box-content-show">
                             <Button type="primary" onClick={this.showModal_1} value="弹框-1">
                             </Button>
                             <Modal
                                 type="1"
                                 title="弹出层-1"
                                 visible={this.state.visible_1}
                                 onOk={this.handleOk_1}
                                 onCancel={this.handleCancel_1}
                             >
                                 <div className="ModalContent">内容</div>

                             </Modal>

                             <Button type="primary" onClick={this.showModal_2} value="弹框-2">
                             </Button>
                             <Modal
                                 type="2"
                                 title="弹出层-1"
                                 visible={this.state.visible_2}
                                 onOk={this.handleOk_2}
                                 onCancel={this.handleCancel_2}
                             >
                                 <div className="ModalContent">内容</div>

                             </Modal>
                             <Button type="primary" onClick={this.showModal_3} value="弹框-3">
                             </Button>
                             <Modal
                                 type="3"
                                 title="弹出层-1"
                                 visible={this.state.visible_3}
                                 onOk={this.handleOk_3}
                                 onCancel={this.handleCancel_3}
                             >
                                 <div className="ModalContent">内容</div>

                             </Modal>
                         </div>
                     </div>

                 </div>
             </div>
             {/*单选组件*/}
             <div className="Box InputBox">
                 <div className="BoxTop">
                     <p className="BoxTop_title">单选组件</p>
                 </div>
                 <div className="Box-content">
                     <div className="Box-flex">
                         <div className="Box-tips">
                             <p className="tips">禁用状态：</p>
                         </div>
                         <div className="Box-content-show">
                             <Radio value="windows" disabled>windows</Radio>
                             <Radio value="iOS" disabled>iOS</Radio>
                             <Radio value="Android" defaultChecked={true} disabled>Android</Radio>
                             <Radio value="Linux" defaultChecked={true} disabled>Linux</Radio>
                         </div>
                     </div>
                 </div>
                 <div className="Box-content">
                     <div className="Box-flex">
                         <div className="Box-tips">
                             <p className="tips">可点击状态：</p>
                         </div>
                         <div className="Box-content-show">
                             <Radio value="windows" >windows</Radio>
                             <Radio value="iOS" >iOS</Radio>
                             <Radio value="Android" defaultChecked={true} >Android</Radio>
                             <Radio value="Linux" defaultChecked={true} >Linux</Radio>
                         </div>
                     </div>
                 </div>
                 <div className="Box-content">
                     <div className="Box-flex">
                         <div className="Box-tips">
                             <p className="tips">单选组：</p>
                         </div>
                         <div className="Box-content-show">
                             <RadioGroup name="radio" value={this.state.radioValue} onChange={this.changeRadio.bind(this)}>
                                 <Radio value="windows">windows</Radio>
                                 <Radio value="iOS">iOS</Radio>
                                 <Radio value="Android">Android</Radio>
                                 <Radio value="Linux">Linux</Radio>
                                 <br/>
                                 <br/>
                                 <div style={{textAlign:"left"}}>已选中：{this.state.radioValue}</div>
                             </RadioGroup>
                         </div>
                     </div>
                 </div>
             </div>
             {/*多选组件*/}
             <div className="Box InputBox">
                 <div className="BoxTop">
                     <p className="BoxTop_title">多选组件</p>
                 </div>
                 <div className="Box-content">
                     <div className="Box-flex">
                         <div className="Box-tips">
                             <p className="tips">禁用状态：</p>
                         </div>
                         <div className="Box-content-show">
                             <CheckBox value="windows" disabled>windows</CheckBox>
                             <CheckBox value="iOS" disabled>iOS</CheckBox>
                             <CheckBox value="Android" defaultChecked={true}  disabled>Android</CheckBox>
                             <CheckBox value="Linux" defaultChecked={true} disabled>Linux</CheckBox>
                         </div>
                     </div>
                 </div>
                 <div className="Box-content">
                     <div className="Box-flex">
                         <div className="Box-tips">
                             <p className="tips">可点击状态：</p>
                         </div>
                         <div className="Box-content-show">
                             <CheckBox value="windows">windows</CheckBox>
                             <CheckBox value="iOS">iOS</CheckBox>
                             <CheckBox value="Android" defaultChecked={true}>Android</CheckBox>
                             <CheckBox value="Linux" defaultChecked={true}>Linux</CheckBox>
                         </div>
                     </div>
                 </div>
                 <div className="Box-content">
                     <div className="Box-flex">
                         <div className="Box-tips">
                             <p className="tips">多选组：</p>
                         </div>
                         <div className="Box-content-show">
                             <CheckBoxGroup value={this.state.checkedList} onChange={this.changeCheckBox.bind(this)}>
                                 <CheckBox value="windows">windows</CheckBox>
                                 <CheckBox value="iOS">iOS</CheckBox>
                                 <CheckBox value="Android">Android</CheckBox>
                                 <CheckBox value="Linux">Linux</CheckBox>
                             </CheckBoxGroup>
                             <CheckBox onChange={this.changeAllCheckBox.bind(this)} checked={this.state.checkAll} >全选</CheckBox>
                             <div>已选中：{this.state.checkedList.map((item)=>{return `${item}、`})}</div>
                         </div>
                     </div>
                 </div>
             </div>
             {/*表格组件*/}
             <div className="Box InputBox">
                 <div className="BoxTop">
                     <p className="BoxTop_title">表格组件</p>
                 </div>
                 <div className="Box-content">
                     <div className="Box-flex">
                         <div className="Box-tips">
                             <p className="tips">普通表格：</p>
                         </div>
                         <div className="Box-content-show">
                             <Table dataSource={this.state.simpleTable.dataSource} columns={this.state.simpleTable.columns}
                                    pagination={false}>
                             </Table>
                         </div>
                     </div>
                 </div>
                 <div className="Box-content">
                     <div className="Box-flex">
                         <div className="Box-tips">
                             <p className="tips">具有筛选功能的表格：</p>
                         </div>
                         <div className="Box-content-show">
                             <Table dataSource={this.state.sortTable.dataSource} columns={this.state.sortTable.columns}
                                    pagination={false}>
                             </Table>
                         </div>
                     </div>
                 </div>
                 <div className="Box-content">
                     <div className="Box-flex">
                         <div className="Box-tips">
                             <p className="tips">选择+表格组：</p>
                         </div>
                         <div className="Box-content-show">
                             <Table dataSource={this.state.checkTable.dataSource} columns={this.state.checkTable.columns}
                                    pagination={false}>
                             </Table>
                         </div>
                     </div>
                 </div>
             </div>
             {/*分页组件*/}
             <div className="Box InputBox">
                 <div className="BoxTop">
                     <p className="BoxTop_title">分页组件</p>
                 </div>
                 <div className="Box-content">
                     <div className="Box-flex">
                         <div className="Box-tips">
                             <p className="tips">正常尺寸的分页：</p>
                         </div>
                         <div className="Box-content-show">
                             <PagiNation defaultCurrent={1} onChange={this.changePage.bind(this)} total={200}></PagiNation>
                             <div style={{marginLeft:30}}>当前的页码数为:{this.state.currentPage}</div>
                         </div>
                     </div>
                 </div>
                 <div className="Box-content">
                     <div className="Box-flex">
                         <div className="Box-tips">
                             <p className="tips">小尺寸的分页：</p>
                         </div>
                         <div className="Box-content-show">
                             <PagiNation defaultCurrent={1} size="small" onChange={this.changeSmallPage.bind(this)} total={200}></PagiNation>
                             <div style={{marginLeft:30}}>当前的页码数为:{this.state.currentSmallPage}</div>
                         </div>
                     </div>
                 </div>

             </div>
             {/*搜索组件*/}
             <div className="Box InputBox">
                 <div className="BoxTop">
                     <p className="BoxTop_title">搜索组件</p>
                 </div>
                 <div className="Box-content">
                     <div className="Box-flex">
                         <div className="Box-tips">
                             <p className="tips">简单搜索：</p>
                         </div>
                         <div className="Box-content-show">
                             <Search  placeHolder="输入关键词快速搜索" onClickSearch={this.simpleClickSearch.bind(this)}></Search>
                             <div style={{marginLeft:30}}>搜索的关键词为：{this.state.simpleSearch}</div>
                         </div>
                     </div>
                 </div>
                 <div className="Box-content">
                     <div className="Box-flex">
                         <div className="Box-tips">
                             <p className="tips">选项搜索：</p>
                         </div>
                         <div className="Box-content-show">
                             <Search  placeHolder="输入关键词快速搜索"
                                      select
                                      selectOptions={{
                                          width:80,
                                          selectdValue:{
                                              value:"一年级",
                                              title:"一年级"
                                          },
                                          selectList:[
                                              {
                                                  value:"一年级",
                                                  title:"一年级"
                                              },
                                              {
                                                  value:"二年级",
                                                  title:"二年级"
                                              }
                                          ]
                                      }}
                                      onClickSearch={this.selectClickSearch.bind(this)}
                             >
                             </Search>
                             <div style={{marginLeft:30}}>搜索的类型为：{this.state.selectSearch.selectValue},搜索的关键词为：{this.state.selectSearch.value}</div>
                         </div>
                     </div>
                 </div>

             </div>
             {/*下拉组件*/}
             <div className="Box InputBox">
                 <div className="BoxTop">
                     <p className="BoxTop_title">下拉组件</p>
                 </div>
                 <div className="Box-content">
                     <div className="Box-flex">
                         <div className="Box-tips">
                             <p className="tips">简单下拉组件：</p>
                         </div>
                         <div className="Box-content-show">
                             <DropDown
                                 title="课表筛选:"
                                 width={140}
                                 dropSelectd={{
                                     value:0,
                                     title:"全部课表"
                                 }}
                                 dropList={[
                                     {
                                         value:0,
                                         title:"全部课表"
                                     },
                                     {
                                         value:1,
                                         title:"教师课表"
                                     },
                                     {
                                         value:2,
                                         title:"教室课表"
                                     }
                                 ]}
                                 onChange={this.onDropChange}
                             >
                             </DropDown>
                         </div>
                     </div>
                 </div>
                 <div className="Box-content">
                     <div className="Box-flex">
                         <div className="Box-tips">
                             <p className="tips">多级下拉：</p>
                         </div>
                         <div className="Box-content-show">
                             <DropDown
                                 title="课表筛选:"
                                 type="multiple"
                                 width={140}
                                 dropSelectd={{
                                     value:0,
                                     title:"全部课表"
                                 }}
                                 mutipleOptions={{
                                     range:2,
                                     /*   width:540,
                                        height:300,*/
                                     /*searchPlaceholder:"输入关键词快速搜索",*/
                                     searchWidth:280,
                                     dropMultipleList:[
                                         {
                                             name:"一年级",
                                             list:[
                                                 {
                                                     id:1,
                                                     name:"一班"
                                                 },
                                                 {
                                                     id:2,
                                                     name:"二班"
                                                 },
                                                 {
                                                     id:3,
                                                     name:"三班"
                                                 },
                                                 {
                                                     id:4,
                                                     name:"四班"
                                                 }
                                             ]
                                         },
                                         {
                                             name:"二年级",
                                             list:[
                                                 {
                                                     id:1,
                                                     name:"一班"
                                                 },
                                                 {
                                                     id:2,
                                                     name:"二班"
                                                 },
                                                 {
                                                     id:3,
                                                     name:"三班"
                                                 },
                                                 {
                                                     id:4,
                                                     name:"四班"
                                                 }
                                             ]
                                         }
                                     ],
                                     dropMultipleChange:this.dropMultipleChange.bind(this),
                                     dropIdShow:this.state.dropIdShow,
                                     dropClickSearch:this.dropClickSearch.bind(this),
                                     dropCancelSearch:this.dropCancelSearch.bind(this),
                                     searchList:this.state.dropSearchList
                                 }}
                             >
                             </DropDown>
                         </div>
                     </div>
                 </div>

             </div>
         </div>
     );
 }
}

export default App;
