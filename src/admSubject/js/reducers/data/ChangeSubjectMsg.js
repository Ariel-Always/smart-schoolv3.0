import UpDataState from  '../../actions/UpDataState';
const ChangeSubjectMsg = (state = {}, actions)=>{
    switch (actions.type) {
        case UpDataState.CHANGE_SUBJECT_MODAL_MSG:
            let data = handleData(actions.data)
            return {...data};
        default:
            return state;
    }
};
function handleData (data){
    
    let GlobalGradeIDs = handleGrade(data.P1Grades).concat(handleGrade(data.P2Grades)).concat(handleGrade(data.P3Grades)).join()
    return {SubjectName:data.SubjectName,
        SubjectID:data.SubjectID,
        GlobalGradeIDs:GlobalGradeIDs}
}

function handleGrade (grade){
    let endGrade = '';
    let gradeArr1 = grade.split(',');
    if(!gradeArr1.length)
    return '';
    let gradeArr2 = gradeArr1.map((child,index) => {
        return child.split('-')[0];
    })
    return gradeArr2
}
export default ChangeSubjectMsg;