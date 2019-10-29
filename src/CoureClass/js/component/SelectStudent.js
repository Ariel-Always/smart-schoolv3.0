import React from 'react'
import { connect } from 'react-redux';
import actions from '../actions';
import '../../scss/SelectStudent.scss'
import { postData, getData } from '../../../common/js/fetch'
import { Scrollbars } from 'react-custom-scrollbars'

import history from '../containers/history'
import { Input, } from 'antd'
import CONFIG from '../../../common/js/config';
import { Search, Loading, CheckBox, CheckBoxGroup,Empty } from "../../../common";


class SelectStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            select: false,
            selectClassTab: '',
            checkAll: false,
            checkList: [],
            show: false,
            UserMsg:props.DataState.LoginUser,
            leftShow:true

        }
    }
    componentWillMount() {
        const { DataState, UIState } = this.props;
        let selectStudent = DataState.GetCourseClassDetailsHandleClassMsg.selectData ? DataState.GetCourseClassDetailsHandleClassMsg.selectData.Student : [];
        let checkList = selectStudent.map((child, index) => {
            return child.StudentID;
        })

        this.setState({
            checkList: checkList
        })
    }
    componentWillReceiveProps(nextProps) {
        const { DataState, UIState } = nextProps;
        let transfer = nextProps.DataState.GetCourseClassDetailsHandleClassMsg.transfer.Student;
        let selectStudent = DataState.GetCourseClassDetailsHandleClassMsg.selectData ? DataState.GetCourseClassDetailsHandleClassMsg.selectData.Student : [];
        let ClassStudent = DataState.GetStudentClassMsg.ClassStudent ? DataState.GetStudentClassMsg.ClassStudent : [];
        let checkList = transfer.map((child, index) => {
            return child.StudentID;
        })
        let defaultCheckList = selectStudent.map((child, index) => {
            return child.StudentID;
        })
        // console.log(ClassStudent)
        let plainOptions = ClassStudent.propStudent ? ClassStudent.propStudent.map((child, index) => {
            return child.StudentID
        }) : []

        let selectList = [];
        let len = plainOptions.length;
        checkList.map((child,index) => {
            
            plainOptions.map(key => {
                if(key===child){
                    len--;
                }
            })
            
        })
        this.setState({
            checkList: checkList,
            plainOptions: plainOptions,
            checkAll: len===0 ? true : false
        })
        if(!this.state.selectClassTab&&DataState.GetStudentClassMsg.GradeClass.length){
            this.setState({
                selectClassTab:DataState.GetStudentClassMsg.GradeClass[0].ClassID
            })
            this.onClickTabClick(DataState.GetStudentClassMsg.GradeClass[0].ClassID)
        }

    }

    //搜索
    onClickSearch = (value) => {
        const { DataState, UIState, dispatch } = this.props;
        let gradeID = DataState.GetCourseClassDetailsHandleClassMsg.GradeID;
        console.log(value.value);
        this.setState({
            show: true,
            CancelBtnShow: 'y',
            keyword: value.value,
            selectClassTab:'',
            leftShow:false
        })
        dispatch(actions.UpDataState.searchClassStudentMsg('/GetStudentForAddOrEditCourseClassByKey?schoolID='+this.state.UserMsg.SchoolID+'&gradeID='+gradeID+'&key='+value.value))

    }
    //点击左侧
    onClickTabClick = (id) => {
        const { DataState, UIState, dispatch } = this.props;
        this.setState({
            selectClassTab: id,
            show: true,
            checkAll:false
        })
        let oldStudent = DataState.GetCourseClassDetailsHandleClassMsg.selectData.Student;
        dispatch(actions.UpDataState.setClassStudentTransferMsg(oldStudent))
        dispatch(actions.UpDataState.getClassStudentMsg('/GetStudentForAddOrEditCourseClassByGroupID?schoolID='+this.state.UserMsg.SchoolID+'&classID=' + id))

    }
    //全选
    onSelectAllClick = (e) => {
        const { DataState, UIState, dispatch } = this.props;
        let oldCheckedList = this.state.checkList;
        let transfer = DataState.GetCourseClassDetailsHandleClassMsg.transfer.Student;
        let popStudent = DataState.GetStudentClassMsg.ClassStudent.propStudent;//数据类型[{id:id,name:name}]
        let studentList = DataState.GetStudentClassMsg.ClassStudent.studentList;//数据类型：{id：name}
        let oldStudent = DataState.GetCourseClassDetailsHandleClassMsg.selectData.Student;//上次改变生成的数据

        let checkAll = e.target.checked;
        console.log(this.state.plainOptions)
        if (checkAll) {
            let newStudent = []
            popStudent.map((child, index) => {//全选的
                let isNewStudent = false;
                let unEqual = true;
                oldStudent.map((oldChild, oldIndex) => {
                    // if (oldChild.StudentID !== child.StudentID && oldIndex === oldStudent.length - 1 && unEqual) {
                    //     isNewStudent = true;
                    // } else if (oldChild.StudentID === child.StudentID) {
                    //     unEqual = false;
                    // }
                    if (oldChild.StudentID === child.StudentID) {
                        unEqual = false;
                    }
                })
                if (!isNewStudent) {
                    newStudent.push(child);
                }
            })

            //生成全选后的数组
            let transferStudent = newStudent.concat(oldStudent);
            let newCheckList = transferStudent.map((child, index) => {
                return child.StudentID
            })
            console.log(newCheckList)
            this.setState({
                checkAll: true,
                checkList: newCheckList
            })
            //dispatch(actions.UpDataState.setClassStudentTransferMsg('/CourseClass_searchStudentID?gradeID='+this.state.selectClassTab+'&school=sss&key'+value))
            dispatch(actions.UpDataState.setClassStudentTransferMsg(transferStudent))
        } else {
            let newStudent = []
            oldStudent.map((child, index) => {//取消全选的
                let Equal = false;
                popStudent.map((oldChild, oldIndex) => {
                    if (oldChild.StudentID === child.StudentID) {
                        Equal = true;
                    }
                })
                if (!Equal) {
                    return newStudent.push(child);
                }
            })

            //生成全选后的数组
            let transferStudent = newStudent;
            let newCheckList = transferStudent.map((child, index) => {
                return child.StudentID
            })
            this.setState({
                checkAll: false,
                checkList: newCheckList
            })
            dispatch(actions.UpDataState.setClassStudentTransferMsg(transferStudent))
        }


    }
    //点击checkBox组
    onChangeCheckBox = (value) => {
        const { DataState, UIState, dispatch } = this.props;
        let plainOptions = this.state.plainOptions;
        let oldCheckList = this.state.checkList;
        let popStudent = DataState.GetStudentClassMsg.ClassStudent.propStudent;//数据类型[{id:id,name:name}]
        let studentList = DataState.GetStudentClassMsg.ClassStudent.studentList;//数据类型：{id：name}
        let oldStudent = DataState.GetCourseClassDetailsHandleClassMsg.selectData.Student;//上次改变生成的数据
        let transfer = DataState.GetCourseClassDetailsHandleClassMsg.transfer.Student;
        //获得列表没选的
        let newCheckList = [] ;
        plainOptions.map((child, index) => {
            let unSelect = true;
            value.map((valueChild) => {
                if (child === valueChild) {
                    unSelect = false
                }
            })
            if (unSelect) {
                newCheckList.push(child) ;
            }
        })
        //checklist去掉未选的
        let newTransfer = transfer;
        let newTrans = [];
        console.log(newTransfer,oldCheckList,newCheckList)
        let isSelectList = [];
        oldCheckList.map((child, index) => {
            let isSelect = true;
            let isTranSelect = true
            newCheckList.map((list) => {
                if (list === child) {//进来就是没选择的
                    isSelect = false;
                    newTransfer.map((trans, key) => {
                
                        if (trans.StudentID === child) {
                            isTranSelect = false
                            newTrans.push(key)
                        }
                        
                        
                    })
                    
                }
            })
            
             
            if (isSelect) {
                isSelectList.push(child)
            }
        })
        console.log(newTrans)
        let transtrans = [];
        newTransfer.map((child,index) => {
            let a = true;
            newTrans.map(key => {
                if(key===index){
                    a = false
                }
            })
            if(a){
                transtrans.push(child);
            }
        })
        

        //旧选中加新选
        let transerNewData = []
        let newList = [];
        value.map((child,index) => {
            let isNew = true;
            isSelectList.map((valueChild) => {
                if(valueChild===child){
                    isNew = false
                }
            })
            
            if(isNew){
                popStudent.map((pop,index) => {
                    if(pop.StudentID === child){
                        transerNewData.push(pop)
                    }
                })
                newList.push(child) ;
            }
        })
        console.log(transtrans,transerNewData)
        newTrans = transtrans.concat(transerNewData);
        let endCheckList = isSelectList.concat(newList);

        console.log(value,endCheckList)
        this.setState({
            checkList: endCheckList,
            checkAll: value.length === this.state.plainOptions.length ? true : false
        })
        dispatch(actions.UpDataState.setClassStudentTransferMsg(newTrans))
    }
    //搜索change
    onChangeSearch = (e) => {
        this.setState({
            searchValue: e.target.value
        })
    }
    // 取消搜索
    onCancelSearch = (e) => {
        const { dispatch, DataState } = this.props
        this.setState({
            CancelBtnShow: 'n',
            keyword: '',
            searchValue:'',
            selectClassTab:'',
            leftShow:true,
        })
        if(DataState.GetStudentClassMsg.GradeClass.length){
            this.setState({
                selectClassTab:DataState.GetStudentClassMsg.GradeClass[0].ClassID
            })
            this.onClickTabClick(DataState.GetStudentClassMsg.GradeClass[0].ClassID)
        }
    }
    render() {
        const { DataState, UIState } = this.props;
        let ClassList = DataState.GetStudentClassMsg.GradeClass ? DataState.GetStudentClassMsg.GradeClass : [];
        let StudentList = DataState.GetStudentClassMsg.ClassStudent ? DataState.GetStudentClassMsg.ClassStudent : [];
        let propStudent = StudentList.propStudent ? StudentList.propStudent : []
        // if(ClassList[0].ClassID){
        //     this.onClickTabClick(ClassList[0].ClassID)
        // }
        //console.log(this.state.checkList)
        return (
            <React.Fragment>
                <div id='SelectStudent' className='selectStudent-box'>
                    <div className='box-top'>
                        <Search
                            className='top-search'
                            placeholder='请输入关键字搜索'
                            width='280'
                            Value={this.state.searchValue}
                                    onChange={this.onChangeSearch.bind(this)}
                                    onCancelSearch={this.onCancelSearch}
                                    CancelBtnShow={this.state.CancelBtnShow}
                            onClickSearch={this.onClickSearch.bind(this)}
                        ></Search>
                    </div>
                    <Loading spinning={UIState.AppLoading.studentLoading} >
                        {ClassList.length?(<div className='box-content' style={{height:'437px'}}>
                            <Scrollbars
                                style={{ width: 177 + 'px', height: 437 + 'px', float: 'left',margin:0 ,display:this.state.leftShow?'block':'none'}}
                            >
                                <ul className='selectClassBox'
                                    style={{ width: 177 + 'px', height: 437 + 'px',margin:0 }}
                                >
                                    {
                                        ClassList.map((child, index) => {
                                            return (
                                                <li
                                                    onClick={this.onClickTabClick.bind(this, child.ClassID)}
                                                    className={`selectContent ${this.state.selectClassTab === child.ClassID ? 'active' : ''}`}
                                                    key={child.ClassID}
                                                >{child.ClassName}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </Scrollbars>
                            <Loading spinning={UIState.AppLoading.classStudentLoading} style={{height:'437px'}}>
                                <ul className='selectStudent' style={{width:this.state.leftShow? 475 + 'px': 680 + 'px', height: 437 + 'px', display: this.state.show ? 'block' : 'none' }}>
                                {propStudent.length?<li className='selectAllBox'>
                                        <CheckBox
                                            className='selectAll'
                                            onClick={this.onSelectAllClick.bind(this)}
                                            checked={this.state.checkAll}
                                        >全选</CheckBox>
                                    </li>:<Empty type='4' noTitle style={{marginTop:'238.5px',transform:'translateY(-50%)'}}></Empty>}
                                    <Scrollbars
                                        style={{ width: 100 + '%', height: 387 + 'px' }}
                                    >
                                        <CheckBoxGroup name="123" value={this.state.checkList}
                                            onChange={this.onChangeCheckBox.bind(this)}>
                                            {
                                                propStudent.map((child, index) => {

                                                    return (
                                                        <li className='selectContent' key={child.StudentID}>
                                                            <CheckBox value={child.StudentID}>
                                                                <span className='studentName'>{child.StudentName}</span>
                                                                <span className='studentID'>{'[' + child.StudentID + ']'}</span>
                                                            </CheckBox>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </CheckBoxGroup>
                                    </Scrollbars>
                                </ul>
                            </Loading>
                        </div>):<Empty type='4' noTitle style={{marginTop:'238.5px',transform:'translateY(-50%)'}}></Empty>}
                    </Loading>

                </div>
            </React.Fragment >
        )
    }
}

const mapStateToProps = (state) => {
    let { UIState, DataState } = state;
    return {
        UIState,
        DataState
    }
};
export default connect(mapStateToProps)(SelectStudent);