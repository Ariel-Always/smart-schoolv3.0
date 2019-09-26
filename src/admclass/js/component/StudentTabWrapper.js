import React,{Component} from 'react';

import {CheckBox,CheckBoxGroup,Button,Empty,Loading} from "../../../common";


class StudentTabWrapper extends Component{

    render() {

        const {StudentSearchLoading,StudentList,CheckList,onCheckChange,allChecked,onChangeAll,adjustBtnClick} = this.props;

        return (

                <Loading type="loading" spinning={StudentSearchLoading.show}>

                    <div className="person-tab-wrapper clearfix">

                    {

                        StudentList&&StudentList.Total>0?

                            <React.Fragment>

                                <CheckBoxGroup  value={CheckList} onChange={(e)=>{onCheckChange(e)}}>

                                    {
                                        StudentList.List&&StudentList.List.map((item,key) => {
                                            //是否是班长
                                            let isMonitor = item.UserClass===1?true:false;
                                            //性别男女或者保密
                                            let sex= 'none';

                                            switch (item.Gender) {
                                                case '男':
                                                    sex = 'men';
                                                    break;
                                                case '女':
                                                    sex = 'women';
                                                    break;
                                                default:
                                                    sex = 'none'
                                            }

                                            return <div key={key} className={`person-item-wrapper ${isMonitor?'monitor':''}`} >

                                                <div className="person-item-content clearfix">

                                                    <div className="person-item-photo" style={{backgroundImage:`url(${item.PhotoPath})`}}></div>

                                                    <div className="person-item-info-wrapper">

                                                        <div className="person-item-info">

                                                            <div className="person-item-name" title={item.UserName}>{item.UserName}</div>

                                                            <div className={`person-sex-icon ${sex}`}></div>

                                                        </div>

                                                        <div className="person-item-id" title={item.UserID}>{item.UserID}</div>

                                                    </div>

                                                    <CheckBox  value={JSON.stringify({id:item.UserID,name:item.UserName})}></CheckBox>

                                                    <div className="cooperate">

                                                        <div>{isMonitor?'取消班长':'设为班长'}</div>

                                                    </div>

                                                </div>

                                                <div className="person-item-border"></div>

                                            </div>

                                        })
                                    }

                                </CheckBoxGroup>

                                <div className="person-checkgroup-wrapper">

                                    <CheckBox checked={allChecked} onChange={()=>{onChangeAll()}}>全选</CheckBox>

                                    <Button size="small" className="person-adjust-btn" color="blue" onClick={e=>adjustBtnClick(e)}>调班</Button>

                                </div>

                            </React.Fragment>

                            :
                            <Empty type="5"></Empty>


                    }

                </div>

                </Loading>
        );
    }
}
export default StudentTabWrapper;