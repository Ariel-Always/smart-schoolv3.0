import React, { Component } from 'react';
import '../../../sass/SchoolInfoSet.scss'
import { connect } from 'react-redux'
import { Modal, Loading } from '../../../../common';
import DataChange from '../../action/data/DataChange';
import  ApiActions from '../../action/data/Api'
import CONFIG from '../../../../common/js/config'

class SchoolnfoSetting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit_visible: false,
            active:1,
            SchInfoUpdate:{},
            
        }
    }

      

//切换年级的选中状态
    changeActive=(num)=>{
        this.setState({
            active:num
        })

    }


//监听右上角编辑的状态
    openEdite = () => {
        this.setState({
            edit_visible: true
        })

    }
//确认保存编辑好的信息
    editComfirm = () => {

        const {primaryNum ,middleNum ,highNum ,SchoolCode, SchoolName,SchoolLogoUrl}=this.props.schoolInfo
        console.log(primaryNum ,middleNum ,highNum ,SchoolCode, SchoolName,SchoolLogoUrl);
        let total= primaryNum + middleNum+highNum;
        let SchoolType=""
        console.log(total);
        let SchoolSessionType=""
        
        switch(total){
            case 21://小学+初中+高中
            SchoolType=7;
            break;
            case 9://小学+初中
            SchoolType=3;
            break;
            case 5||6://只有小学
            SchoolType=1;
            break;
            case 3||4://只有初中
            SchoolType=2;
            break;
            case 12://只有高中
            SchoolType=4;
            break;
            default:
                SchoolType="error"
                break
            
        }
           //当SchoolType 不是ERROR的时候才执行post数据
        if(SchoolType!=="error"){
                 //根据学制参照情况判断SchoolSessionType
            if(SchoolType===7||SchoolType===3){
                SchoolSessionType= `${primaryNum}/${middleNum}`
            }
            else{
                SchoolSessionType= "6/3"
            }
            this.setState({
                edit_visible: false
            },()=>{
                const {SchoolID,UserID} = JSON.parse(sessionStorage.getItem('UserInfo'))

                ApiActions.postMethod('/SysMgr/Setting/EditSchoolInfo', {
                    "UserID":UserID,
                    "SchoolID": SchoolID,
                    "SchoolName": SchoolName,
                    "SchoolCode": SchoolCode,
                    "SchoolType": SchoolType,
                    "SchoolSessionType":SchoolSessionType,
                    "SchoolImgUrl":SchoolLogoUrl
                }).then(data => {
    
                    if (data === 0) {
                        const {dispatch} =this.props
                        dispatch(DataChange.getCurrentSchoolInfo(SchoolID));
                        console.log('success');
                        alert("修改学校信息成功");
                    }
    
                })
            })
        }
        else{
            this.setState({
                edit_visible: false
            },()=>{
                alert( "小学与初中学制搭配错误!")
            })
        }
        


    }

//取消（关闭）编辑框
    editCancel = () => {
        this.setState({
            edit_visible: false
        })
    }

//监听小学的学制的选择情况
handelSchoolSystem = (e) => {
            let { schoolInfo ,dispatch } = this.props
            console.log("当前点击值" + e.target.value);
            console.log("一开始时的内容" + schoolInfo.primaryNum);
        
            if (Object.keys(schoolInfo).length !== 0) {
                //判断小学的学制选择情况
                    if(e.target.value==="6"||e.target.value==="5"){
                        // 如果后台的也是六年制,视为取消当前选中的六年制
                        //这里因为e.target.value 是String 但schoolInfo.primaryNum中存储的是number
                        //所以一以下下判断时 使用"==" 而不是"==="
                        if(schoolInfo.primaryNum==e.target.value){
                                schoolInfo={
                                    ...schoolInfo,
                                    primaryNum:0
                                }
                                
                        }else{
                            schoolInfo={
                                ...schoolInfo,
                                primaryNum:parseInt(e.target.value)
                            }
                        }

 
                    }
                    //判断初中学制情况
                    else if(e.target.value==="3"||e.target.value==="4"){
                        // 如果点击值符合,判断当前选择中状态
                        //点击一次选中,再次选中则默认取消选中
                        if(schoolInfo.middleNum==e.target.value){
                                schoolInfo={
                                    ...schoolInfo,
                                    middleNum:0
                                }
                                
                        }else{
                            schoolInfo={
                                ...schoolInfo,
                                middleNum:parseInt(e.target.value)
                            }
                        }

                    }
                    //判断高中状态,在默认状态,如果选中点击第一次取消,再次点击选中
                    else {
                        if(schoolInfo.highNum==e.target.value){
                            schoolInfo={
                                ...schoolInfo,
                                highNum:0
                            }
                            
                    }else{
                        schoolInfo={
                            ...schoolInfo,
                            highNum:parseInt(e.target.value)
                        }
                    }

                    }
                 }
                    
                    dispatch({
                        type:DataChange.REFRESH_SCHOOL_INFO,
                        data:schoolInfo
                    })
                 
            }
        
   

//监听学校代码的获取事件
      getSchoolCode=(e)=>{
        let {schoolInfo,dispatch}=this.props
            schoolInfo={
                ...schoolInfo,
                SchoolCode:e.target.value
            }
                
                // console.log(this.state.SchInfoUpdate.SchoolCode)
                dispatch({
                    type:DataChange.REFRESH_SCHOOL_INFO,
                    data:schoolInfo
                })
      }  
//监听学校名字改变的事件
      getSchoolName=(e)=>{
            let {schoolInfo,dispatch}=this.props
            schoolInfo={
                ...schoolInfo,
                SchoolName:e.target.value
            }

            dispatch({
                type:DataChange.REFRESH_SCHOOL_INFO,
                data:schoolInfo
            })

      }
 

//配合使用onClick 无用的onChange回调
    tempFunction=()=>{
        
    }



    render() {
        const {  schoolInfo,semesterloading } = this.props;
        let schoolSys = '';
//根据学校类型选择渲染内容
            switch(schoolInfo.SchoolType){

                    case 7:
                    
                    schoolSys =  `${schoolInfo.primaryType}+${schoolInfo.middleType}+${schoolInfo.highType}`;

                    break;  

                    case 1:
                    
                    schoolSys = schoolInfo.primaryType;

                    break;  

                    case 2:
                    
                    schoolSys = schoolInfo.middleType;

                    break;
                    
                    case 3:
                    
                    schoolSys = `${schoolInfo.primaryType}+${schoolInfo.middleType}`;

                    break;

                    case 4:
                    
                    schoolSys = "三年制初中";

                    break;
                
                    default:

                    schoolSys="学制获取失败";
            }
        
      


        return (
            <Loading spinning={semesterloading} tip="请稍后...">

            <div className="school-InfoSetting" >
        

                <div className="edite-info" onClick={this.openEdite}><span></span>编辑</div>
                <div className="school-logo">
                    <img src={schoolInfo.SchoolLogoUrl} alt="图片丢失"/>
                </div>
        <div className="school-name">{schoolInfo.SchoolName}</div>
                <div className="school-info">
        <div className="school-code">学校代码:<span>{schoolInfo.SchoolCode}</span></div>
                    <div className="school-type">学校类型:
                    
        <span>十二年一贯制</span>({schoolSys})</div>
                </div>
                <Modal
                    type="1"
                    onClick={this.openEdite}
                    title="编辑学校基础资料"
                    onOk={this.editComfirm}
                    onCancel={this.editCancel}
                    width={"724px"}
                    bodyStyle={{ height: "348px" }}
                    visible={this.state.edit_visible}

                >
                    <div className="editContent">
                        <div className="content-left">
                            <div className="school-logo"> <img src={schoolInfo.SchoolLogoUrl} alt=""/></div>
                            <button className="btn choose-pic">选择图片</button>
                            <button className="btn upload-pic">上传图片</button>
                            <p className="upload-tips">上传要求：请上传png/jpg格式的图片，图片大小不能超过2MB</p>
                        </div>


                        <div className="content-right">
                            <div className="win-shcool-name">学校名称:

                                <input type="text"  defaultValue={schoolInfo.SchoolName} onChange={this.getSchoolName}/>
                            </div>
                            <div className="win-school-code">学校代码: 
                            
                            <input type="text"  defaultValue={schoolInfo.SchoolCode} onChange={this.getSchoolCode}/>
                            </div>

                            <div className="win-school-type">学校类型: 
                            
                            <div className="primary-school"> 
                                <span className={`${this.state.active===1?"click":""}`} 
                                onClick={()=>this.changeActive(1)}>小学</span><i></i>
                                <input type="radio" value="5" checked={schoolInfo.primaryNum===5} 
                                onChange={this.tempFunction}
                                onClick={this.handelSchoolSystem}/>五年制
                                <input  type="radio" value="6" checked={schoolInfo.primaryNum===6} 
                                onChange={this.tempFunction}
                                onClick={this.handelSchoolSystem}/>六年制
                                     
                            </div>
                            <div className="middle-school"> 
                                <span className={`${this.state.active===2?"click":""}`}
                                onClick={()=>this.changeActive(2)}>初中</span><i></i>
                                 <input type="radio" value="3" checked={schoolInfo.middleNum===3} 
                                 onClick={this.handelSchoolSystem}
                                 onChange={this.tempFunction}/>三年制
                                 
                                <input type="radio" value="4" checked={schoolInfo.middleNum===4} 
                                onChange={this.tempFunction}
                                onClick={this.handelSchoolSystem}/>四年制
                               
                            </div>
                            <div className="high-school"> 
                                <span className={`${this.state.active===3?"click":""}`}
                                onClick={()=>this.changeActive(3)}>高中</span><i></i>
                                <input type="radio" value="12" checked={schoolInfo.highNum===12} 
                                onChange={this.tempFunction}
                                onClick={this.handelSchoolSystem}/>三年制
                                
                            </div>
                        
                            </div>


                            <div className="edit-tips">
                                <span></span>
                                修改学校代码和学校类型会引起基础数据重新初始化，请谨慎操作
                                {/* {console.log(this.state.SchInfoUpdate)} */}
                            </div>

                        </div>


                    </div>
                </Modal>

            </div>
            </Loading>


        );
    }
        }


const mapStateToProps = (state) => {
    const { DataUpdate } = state;
   
    const   {schoolInfo ,semesterloading}= DataUpdate

    
    return {
          schoolInfo,
          semesterloading
    }
}
export default connect(mapStateToProps)(SchoolnfoSetting);