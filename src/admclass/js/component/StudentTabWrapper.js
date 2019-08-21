import React,{Component} from 'react';
import {CheckBox,CheckBoxGroup,Button} from "../../../common";


class StudentTabWrapper extends Component{

    render() {

        const {StudentList,CheckList,onCheckChange,allChecked,onChangeAll} = this.props;

        return (

                <div className="person-tab-wrapper clearfix">

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

                                    <CheckBox  value={item.UserID}></CheckBox>

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

                        <Button size="small" className="person-adjust-btn" color="blue">调班</Button>

                    </div>

                </div>
        );
    }
}
export default StudentTabWrapper;