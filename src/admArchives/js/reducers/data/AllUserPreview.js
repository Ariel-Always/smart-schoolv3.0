import UpDataState from '../../actions/UpDataState';
import { Children } from 'react';

const AllUserPreview = (state={},actions)=>{
    switch (actions.type) {
        case UpDataState.GET_ALL_USER_PREVIEW:
            let newData = handleData(...actions.data)
            return Object.assign({}, state, {...actions.data});
        default:
            return state;
    }
} ;
function handleData(data){
    const {Grades,Subjects,...oldData} = data;
    let NewGrades = [];
    let NewSubjects = [];
    let GradeNames = [];
    let SubjectNames = []
    Grades.map((child,index) => {
        NewGrades[child.GradeName] = child
        GradeNames.push(child.GradeName);
        
    })
    Subjects.map((child,index) => {
        NewSubjects[Children.SubjectName] = child;
        SubjectNames.push(child.SubjectName)
    })
    return {...data,GradeNames:GradeNames,NewGrades:NewGrades}
}
export default  AllUserPreview;