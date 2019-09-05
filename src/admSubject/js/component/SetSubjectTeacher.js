import React from 'react';
import '../../scss/SetSubjectTeacher.scss'
import { connect } from 'react-redux'
import { Input } from 'antd'
import { CheckBox, CheckBoxGroup, Loading, DropDown } from '../../../common'
import { defaultGrades } from '../containers/config'
import actions from '../actions';

class SetSubjectTeacher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,
            GlobalGradeIDs: '',
            SubjectName: '',
            selectGrade: [],
            showInput: true,
            SubjectInput:'',
            dropSelected: { value: 0, title: '自定义',GlabalGrades:[] }
        }
    }
    componentWillMount() {
        const { DataState, UIState } = this.props;
        // let selectGrade = []
        // DataState.PeriodMsg.map((child, index) => {
        //     if (index === 0)
        //         return;
        //     selectGrade.push(child)
        // })
        // this.setState({
        //     selectGrade: selectGrade,

        // })
        let selectGrade = [];
        // if (this.state.type === 'change') {
        //     DataState.PeriodMsg.value.map((child, index) => {
        //         console.log(child)
        //         if (index === 0)
        //             return;
        //         let GradesArr = child.Grades.split(',');

        //         let selectGrades = DataState.ChangeSubjectMsg.GlobalGradeIDs.split(',');
        //         console.log(selectGrades)
        //         let mySelect = [];

        //         GradesArr.map((child2, index) => {
        //             selectGrades.map((child3, index2) => {
        //                 if (child2 === child3)
        //                     mySelect.push(child3);
        //             })
        //         })


        //         selectGrade.push(mySelect)
        //         console.log(selectGrade)

        //     })
        //     this.setState({
        //         selectGrade: selectGrade
        //     })
        // }
        DataState.PeriodMsg.value.map((child, index) => {
            console.log(child)
            if (index === 0)
                return;
            let GradesArr = child.Grades.split(',');

            let selectGrades = DataState.ChangeSubjectMsg.GlobalGradeIDs.split(',');
            console.log(selectGrades)
            let mySelect = [];

            GradesArr.map((child2, index) => {
                selectGrades.map((child3, index2) => {
                    if (child2 === child3)
                        mySelect.push(child3);
                })
            })


            selectGrade.push(mySelect)
            console.log(selectGrade)

        })
        this.setState({
            selectGrade: selectGrade
        })



    }

    componentWillUpdate() {

    }
    componentWillReceiveProps(nextProps) {
        const { DataState, UIState } = nextProps;
        //console.log(nextProps)
        if (this.state.type === 'change')
            this.setState({
                GlobalGradeIDs: DataState.ChangeSubjectMsg.GlobalGradeIDs,
                SubjectName: DataState.ChangeSubjectMsg.SubjectName
            })
        let selectGrade = [];

        DataState.PeriodMsg.value.map((child, index) => {
            //console.log(child)
            if (index === 0)
                return;
            let GradesArr = child.Grades.split(',');

            let selectGrades = DataState.ChangeSubjectMsg.GlobalGradeIDs.split(',');
            //console.log(selectGrades)
            let mySelect = [];

            GradesArr.map((child2, index) => {
                selectGrades.map((child3, index2) => {
                    if (child2 === child3)
                        mySelect.push(child3);
                })
            })


            selectGrade.push(mySelect)
            //console.log(selectGrade)
            this.setState({
                selectGrade: selectGrade
            })
        })
    }

    onCheckBoxGroupChange = (index, value) => {

        const { dispatch, DataState, UIState } = this.props;

        let selectGrade = this.state.selectGrade;
        value.sort();


        selectGrade = selectGrade.map((child, key) => {
            if (index - 1 === key)
                return value;
            return child
        })

        let grade = selectGrade.join();
        if (grade.slice(0, 1) === ',')
            grade = grade.slice(1)

        dispatch(actions.UpDataState.handleSubjectModalMsg(grade))
    }
    onCheckBoxChange = (index, e) => {

        const { dispatch, DataState, UIState } = this.props;
        let selectGrade = this.state.selectGrade;
        let checkValue = []

        DataState.PeriodMsg.value.map((child, key) => {
            if (index === key)
                checkValue = child.Grades;
        })

        if (e.target.checked) {
            selectGrade = selectGrade.map((child, key) => {
                if (index - 1 === key)
                    return checkValue;
                return child
            })
        }
        else {
            selectGrade = selectGrade.map((child, key) => {
                if (index - 1 === key)
                    return [];
                return child
            })
        }
        let grade = selectGrade.join();
        if (grade.slice(0, 1) === ',')
            grade = grade.slice(1)
        dispatch(actions.UpDataState.handleSubjectModalMsg(grade))
    }

    //添加学科下拉菜单
    dropMenuSubject = (value) => {
        const { dispatch, DataState, UIState } = this.props;
        console.log(value)
        let GlabalGrades ='';
        if (value.value === 0) {
            this.setState({
                showInput: true,
                dropSelected:value
            })
        } else {
            this.setState({
                showInput: false,
                dropSelected:value
            })
        }
        DataState.SubjectMsg.addSubjectMsg.map((child,index) => {
            if(child.value === value.value)
            GlabalGrades = child.GlabalGrades
        })
        dispatch(actions.UpDataState.handleSubjectNameModalMsg({
            SubjectName:value.title,
            SubjectID:value.value
        }))
        dispatch(actions.UpDataState.handleSubjectModalMsg(GlabalGrades))
    }

    onSubjectInputChange = (e) => {
        const {dispatch,DataState} = this.props;
        
        this.setState({
            SubjectInput:e.target.value,

        })
        dispatch(actions.UpDataState.handleSubjectNameModalMsg({
            SubjectName:e.target.value,
            SubjectID:''
        }))
        dispatch(actions.UpDataState.handleSubjectModalMsg(''))
    }
    render() {
        const { DataState, UIState } = this.props;
        let data = {};
        return (
            <Loading size="large" spinning={UIState.AppLoading.modalLoading}>

                <div className='SetSubjectTeacher'>
                    <div className='row clearfix'>
                        <span className='culonm-1'>学科名称：</span>
                        <span className='culonm-2'><span className='subjectName'>{DataState.ChangeSubjectMsg.SubjectName}</span></span>
                        <div className='culonm-2 dropMenuBox' style={{ display: this.state.type === 'add' ? 'block' : 'none' }}>
                            <DropDown
                                ref='dropMenuSubject'
                                style={{zIndex:2}}
                                className ={'DropMenu'}
                                onChange={this.dropMenuSubject.bind(this)}
                                width={120}
                                height={96}
                                dropSelectd={this.state.dropSelected}
                                dropList={DataState.SubjectMsg.addSubjectMsg ? DataState.SubjectMsg.addSubjectMsg : [{ value: 0, title: '自定义',GlabalGrades:[] }]}
                            ></DropDown>
                            <Input type='text' width={200} onChange={this.onSubjectInputChange.bind(this)} value={this.state.SubjectInput} className='box-input' style={{ display: this.state.showInput ? 'inline-block' : 'none' }} placeholder='输入学科名称...'></Input>
                        </div>

                    </div>
                    <div className='row clearfix'>
                        <span className='culonm-1'>小学教研组长：</span>
                        <div className='culonm-2 culonm-3'>{
                           <DropDown
                           ref='dropMenuSubject'
                           style={{zIndex:2}}
                           className ={'DropMenu'}
                           onChange={this.dropMenuSubject.bind(this)}
                           width={120}
                           height={96}
                           dropSelectd={this.state.dropSelected}
                           dropList={DataState.SubjectMsg.addSubjectMsg ? DataState.SubjectMsg.addSubjectMsg : [{ value: 0, title: '自定义',GlabalGrades:[] }]}
                       ></DropDown>
                        }</div>
                    </div>
                    <div className='row clearfix'>
                        <span className='culonm-1'>初中教研组长：</span>
                        <div className='culonm-2 culonm-3'>{
                           <DropDown
                           ref='dropMenuSubject'
                           style={{zIndex:2}}
                           className ={'DropMenu'}
                           onChange={this.dropMenuSubject.bind(this)}
                           width={120}
                           height={96}
                           dropSelectd={this.state.dropSelected}
                           dropList={DataState.SubjectMsg.addSubjectMsg ? DataState.SubjectMsg.addSubjectMsg : [{ value: 0, title: '自定义',GlabalGrades:[] }]}
                       ></DropDown>
                        }</div>
                    </div>
                    <div className='row clearfix'>
                        <span className='culonm-1'>高中教研组长：</span>
                        <div className='culonm-2 culonm-3'>{
                           <DropDown
                           ref='dropMenuSubject'
                           style={{zIndex:2}}
                           className ={'DropMenu'}
                           onChange={this.dropMenuSubject.bind(this)}
                           width={120}
                           height={96}
                           dropSelectd={this.state.dropSelected}
                           dropList={DataState.SubjectMsg.addSubjectMsg ? DataState.SubjectMsg.addSubjectMsg : [{ value: 0, title: '自定义',GlabalGrades:[] }]}
                       ></DropDown>
                        }</div>
                    </div>
                </div>
            </Loading>
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
export default connect(mapStateToProps)(SetSubjectTeacher)