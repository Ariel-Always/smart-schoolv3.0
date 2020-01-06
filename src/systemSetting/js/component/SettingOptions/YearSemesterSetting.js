import React, { Component } from 'react';
import '../../../sass/yearSemesterSet.scss'
import { connect } from 'react-redux';
import { Modal, Loading, DropDown} from '../../../../common';
import moment from 'moment';

import ApiActions from '../../action/data/Api';
import CONFIG from '../../../../common/js/config'
import DataChange from '../../action/data/DataChange'

import { DatePicker ,Button} from 'antd'
import AppAlertAction from '../../action/UI/AppAlertAction';




class YearSemesterSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible_create: false,
            visible_modify: false,
            modifyInfo: {},
            createInfo: {

            },
            available: false,


        }
        const{dispatch}=props
        if(sessionStorage.getItem('UserInfo')){
            const {SchoolID}=JSON.parse(sessionStorage.getItem('UserInfo'))
            dispatch(DataChange.getCurrentSemester(SchoolID));
        }

    }

    //监听调整学期期限的按钮
    modifyLimit = () => {
        // const { dispatch } = this.props
        // dispatch({
        //     type: UIChange.MODIFY_SEMESTER_LIMIT_OPEN,
        // })
        this.setState({
            visible_modify: true
        })
    }
    //启用新学年按钮点击事件
    createNewTerm = () => {
        // const { dispatch } = this.props
        // dispatch({
        //     type: UIChange.CREATE_NEW_TERM_OPEN
        // })

        this.setState({
            visible_create: true
        })
    }
    //确认提交前检查,是否正确,如果是undefined 就后台返回的默认事件 和默认学期名
    checkData = (StartDate, EndDate, TermName) => {
        const { semesterInfo } = this.props;
        const defaultStartDate = semesterInfo.TermStartDate.substring(0, 10)
        const defaultEndDate = semesterInfo.TermEndDate.substring(0, 10)
        const defaultTermName = semesterInfo.Term

        // defaultStartDate ,defaultEndDate,defaultTermName
        if (typeof (StartDate) === "undefined") {
            StartDate = defaultStartDate

        }
        if (typeof (EndDate) === "undefined") {
            EndDate = defaultEndDate
        }
        if (typeof TermName === "undefined") {
            TermName = defaultTermName
            this.setState({
                createInfo: {
                    ...this.state.createInfo,
                    "TermName": defaultTermName

                },
                modifyInfo: {
                    ...this.state.modifyInfo,
                    "TermName": defaultTermName

                }
            })

        }
        //    console.log( defaultStartDate ,defaultEndDate,defaultTermName)
        //    console.log( StartDate ,EndDate,TermName)
        return { StartDate, EndDate, TermName }

    }


    //确认启用新学年按钮
    handUpComfirm = () => {
        const { dispatch } = this.props
        this.setState({
            visible_create: false,
        }, () => {

            const { SchoolID, UserID } = JSON.parse(sessionStorage.getItem('UserInfo'));

            let { StartDate, EndDate, TermName } = this.state.createInfo;
            let checkedData = this.checkData(StartDate, EndDate, TermName);

            console.log(checkedData.StartDate, checkedData.EndDate, checkedData.TermName)
            ApiActions.postMethod('/SysMgr/Setting/SetNewTermInfo', {
                "UserID": UserID,
                "StartDate": checkedData.StartDate,
                "EndDate": checkedData.EndDate,
                "TermName": checkedData.TermName,
                "SchoolID": SchoolID
            }).then(data => {

                if (data === 0) {
                    dispatch(AppAlertAction.alertSuccess({ title: "成功启用新学年!" }))
                    dispatch(DataChange.getCurrentSemester(SchoolID));
                    console.log('success');


                }
                else {
                    dispatch(AppAlertAction.alertError({ title: `启用新学期失败!${data.ErrCode}` }))
                }

            })

        })
    }

    //弹层取消的点击事件
    modalCancel = () => {
        this.setState({
            visible_modify: false,
            visible_create: false,
        },()=>{
            const { dispatch}=this.props
            const {SchoolID}=JSON.parse(sessionStorage.getItem('UserInfo'))
            dispatch(DataChange.getCurrentSemester(SchoolID));
        })

    }
 

    //监听确认修改按钮
    modifyComfirm = () => {
        const { dispatch } = this.props
        this.setState({
            visible_modify: false
        }, () => {
            const { SchoolID, UserID } = JSON.parse(sessionStorage.getItem('UserInfo'));
            const token = sessionStorage.getItem('token');
            let { StartDate, EndDate, TermName } = this.state.modifyInfo;
            let checkedData = this.checkData(StartDate, EndDate, TermName);
 
            ApiActions.postMethod('/SysMgr/Setting/SetTermInfo', {
                "UserID": UserID,
                "StartDate": checkedData.StartDate,
                "EndDate": checkedData.EndDate,
                "TermName": checkedData.TermName,
                "SchoolID": SchoolID,
                "token": token
            }).then(data => {


                if (data === 0) {

                    dispatch(AppAlertAction.alertSuccess({ title: "成功调整学期期限!" }))
                    dispatch(DataChange.getCurrentSemester(SchoolID));
                    console.log('success');


                }
                else {
                    dispatch(AppAlertAction.alertError({ title: "调整学期期限失败!" }))
                }

            })

        })





    }
    //监听启用新学期中下拉框的值的变化
    dropChange = (checked, value) => {
        // alert( "hhhhh"+ );
        console.log(checked.value)
        // this.setState({
        //     modifyInfo:{
        //         ...this.state.createInfo,
        //         Term:checked.title
        //     }
        // })
        let {semesterInfo,dispatch}=this.props
        let  newName =checked.value.substring(0,9)
        let  chineseName=checked.title.substring(10,14)
        console.log(newName)
        console.log(chineseName)

        semesterInfo={
            ...semesterInfo,
            SemesterName:newName,
            ChineseName:chineseName
        }
        dispatch({
            type:DataChange.REFRESH_SEMESTER_INFO,
            data:semesterInfo
        })
        
        this.setState({
            createInfo: {
                ...this.state.createInfo,
                TermName: checked.value
            },
            modifyInfo: {
                ...this.state.modifyInfo,

                TermName: checked.value
            },
            // TermNameValue: checked.value
        })


    }

    //监听启用新学期中开始学期的输入框中值的变化
    // getStartDate = (value, datastring) => {
    //     // console.log(value);
    //     console.log("学期开始" + datastring)
    //     this.setState({
    //         createInfo: {
    //             ...this.state.createInfo,
    //             StartDate: datastring

    //         }
    //     })

    // }
    //监听启用新学期中结束学期的输入框中的值变化
    // getEndDate = (value, datastring) => {
    //     // console.log("学期结束" + datastring)
    //     this.setState({
    //         createInfo: {
    //             ...this.state.createInfo,
    //             EndDate: datastring

    //         }
    //     })
    // }



    //监听调整学期期限中开始时间输入框中值的变化
    getPainDate = (value, datastring) => {
        // console.log("开学时间" + datastring)

        this.setState({
            modifyInfo: {
                ...this.state.modifyInfo,
                StartDate: datastring
            }
        })
        let {dispatch,semesterInfo}=this.props    
        semesterInfo={
            ...semesterInfo,
            TermStartDate:datastring
        }
        dispatch({
            type:DataChange.REFRESH_SEMESTER_INFO,
            data:semesterInfo
        })
    }

    //监听调整学期期限中放假时间输入框中值的变化

    getOffDate = (value, datastring) => {
        // console.log("放假时间" + datastring);
        this.setState({
            modifyInfo: {
                ...this.state.modifyInfo,
                EndDate: datastring
            }
        })
        let {dispatch,semesterInfo}=this.props    
        semesterInfo={
            ...semesterInfo,
            TermEndDate:datastring
        }
        dispatch({
            type:DataChange.REFRESH_SEMESTER_INFO,
            data:semesterInfo
        })
    }
    // 不可选日期
    disabledDate = (current,targetTime) => {

        
        const str = targetTime

        // console.log(moment().endOf('day'));
       
            return  current >  moment(str).add(2, 'months')||current < moment(str).subtract(2, 'months');

    }




    render() {

        const { semesterInfo, semesterloading } = this.props;


        return (

            <Loading spinning={semesterloading} opacity={false} tip="请稍后...">

                <div className="year-semester" >
                    <div className="guide">
                        <div className="semester-logo"></div>
                        <span>学年学期设置</span>
                    </div>
                    <i></i>
                    <div className="semester-info">

                        <p>本学期共<span>{semesterInfo.TotalWeeks}</span>周 , 当前<span>{semesterInfo.TermStatus === 2 ? "学期已经结束" :
                            semesterInfo.TermStatus === 0 ? "学期未开始" :
                                semesterInfo.TermStatus === 1 ? `第${semesterInfo.CurrentWeek}周` : "学期状态有误"} </span>  </p>


                    </div>
                    <div className="current-semester">
                                <p className="term">当前学年学期</p>
                                <div className="term-year">
                                    <div className="year-num">
                                        {
                                            
                                            // `${semesterInfo.StartYear} - ${semesterInfo.EndYear}`
                                           `${semesterInfo.SemesterName}` 
                                        }
                                    </div>
                                    <span>学年</span>

                                </div>
                                <div className="current-term">
                                    <span>第</span>
                                    <div className="term-num">
                                        {semesterInfo.termNum}
                                    </div>
                                    <span>学期</span>
                                </div>
 
                             <button className={`btn create-newTerm ${semesterInfo.TermStatus === 2 ? '':'disabled bander'}`}
                                // onClick={semesterInfo.TermStatus===2?() => this.createNewTerm():()=>this.nothing()}
                                disabled={semesterInfo!==2?false:true}    
                                onClick={ this.createNewTerm}
                                    
                        > 启用新学期</button>
                                
                                <Modal
                                    type="1"
                                    title="启用新学年"
                                    visible={this.state.visible_create}
                                    onOk={this.handUpComfirm}
                                    onCancel={this.modalCancel}
                                    width={"600px"}
                                    bodyStyle={{ height: "216px" }}
                                >
                                    <div className="ModalNewtermContent">
                                        <div className="new-term">新的学期:
        
                                    <DropDown
                                        width={231}

                                        dropSelectd={{ value: `${semesterInfo.Term}`, 
                                        title:`${semesterInfo.SemesterName} ${semesterInfo.ChineseName}` }}

                                        dropList={[
                                            {
                                            
                                                value: `${semesterInfo.SemesterName}01`,
                                                title: `${semesterInfo.SemesterName} 第一学期`
                                                
                                            },
                                            {
                                                value: `${semesterInfo.SemesterName}02`,
                                                title: `${semesterInfo.SemesterName} 第二学期`
                                            }
                                        ]}

                                        height={120}

                                        style={{ zIndex: 1100 }}
                                        onChange={this.dropChange}

                                            ></DropDown>
                                        </div>
                                        <div className="start-date">开始时间:
        
                                <DatePicker
                                                format="YYYY-MM-DD"
                                                value={moment(semesterInfo.TermStartDate)}
                                                // onChange={this.getStartDate}
                                                onChange={this.getPainDate}
                                                disabledDate={(e)=>this.disabledDate(e,semesterInfo.TermStartDate)}
                                               showToday={false}

                                            ></DatePicker>

                                        </div>

                                        <div className="end-date" >结束时间:
        
                                <DatePicker
                                                onChange={this.getOffDate}
                                                value={moment(semesterInfo.TermEndDate)}
                                                format="YYYY-MM-DD"
                                                disabledDate={(e)=>this.disabledDate(e,semesterInfo.TermEndDate)}
                                                showToday={false}
                                               

                                            ></DatePicker>
                                        </div>
                                        <div className="tips-info"> <i></i>启用新学期后,系统会对上一学期教务信息等进行归档处理</div>

                                    </div>
                                </Modal>
                                {
                                   semesterInfo.TermStatus === 2 ? "" : <p className="tips" >学期结束后才能启用新学期</p>
                                }

                            </div>

                            <div className="semester-limit">
                                <p className="limit">当前学期期限</p>
                                <div className="start-date">
                                    <div className="year"> {semesterInfo.StartYear}</div>
                                    年
                            <div className="month">
                                        {semesterInfo.StartMonth < 10 ? `0${semesterInfo.StartMonth}` : semesterInfo.StartMonth}
                                    </div>
                                    月
                          <div className="day">
                                        {semesterInfo.StartDay < 10 ? `0${semesterInfo.StartDay}` : semesterInfo.StartDay}
                                    </div>
                                    日
                    </div>
                                <div className="to-logo"></div>
                                <div className="end-date">
                                    <div className="year"> {semesterInfo.EndYear}</div>
                                    年
                        <div className="month">
                                        {semesterInfo.EndMonth < 10 ? `0${semesterInfo.EndMonth}` : semesterInfo.EndMonth}
                                    </div>
                                    月
    <div className="day">{semesterInfo.EndDay < 10 ? `0${semesterInfo.EndDay}` : semesterInfo.EndDay}</div>
                                    日
                    </div>
                                <Button className="btn adjust-limit" onClick={(e) => this.modifyLimit()}>调整学期期限</Button>
                        
                                <Modal
                                    type="1"
                                    title="调整学年期限"
                                    visible={this.state.visible_modify}
                                    onOk={this.modifyComfirm}
                                    onCancel={this.modalCancel}
                                    width={"458px"}
                                    bodyStyle={{ height: "176px" }}
                                >
                                    <div className="ModalModifyContent">
                                        <div className="term-name">学期名称: <span className="word">{semesterInfo.StartYear}-{semesterInfo.EndYear}学年 第{semesterInfo.termNum}学期</span></div>
                                        <div className="start-date">开学时间:
                    <DatePicker
                                                value={moment(semesterInfo.TermStartDate)}
                                                format="YYYY-MM-DD"
                                                onChange={this.getPainDate}
                                                disabledDate={(e)=>this.disabledDate(e,semesterInfo.TermStartDate)}
                                                showToday={false}

                                            ></DatePicker>
                                        </div>
                                        <div className="end-date">放假时间:
                    <DatePicker
                                                value={moment(semesterInfo.TermEndDate)}
                                                format="YYYY-MM-DD"
                                                onChange={this.getOffDate}
                                                disabledDate={(e)=>this.disabledDate(e,semesterInfo.TermEndDate)}
                                                showToday={false}
                                            ></DatePicker>
                                        </div>
                                    </div>
                                </Modal>

                            </div>
                            <div className="tips-info">
                    <div className="light"></div>
                    <span>为避免系统的正常运行,请勿随意修改学年学期信息</span>
                </div>

                </div>

            </Loading >


                    );
    }
}
const mapStateToProps = (state) => {
    const { DataUpdate } = state;

    const { semesterInfo, semesterloading } = DataUpdate;

    return {

        semesterInfo,

        semesterloading

    }
}

export default connect(mapStateToProps)(YearSemesterSetting);