import UpDataState from '../../actions/UpDataState';
const ChangeSubjectMsg = (state = {}, actions) => {
    switch (actions.type) {
        case UpDataState.CHANGE_SUBJECT_MODAL_MSG:
            let data = handleData(actions.data)
            return { ...data };
        case UpDataState.ADD_SUBJECT_MODAL_MSG:
            let add = {
                GlobalGradeIDs: "",
                SubjectID: 0,
                SubjectName: ""
            }
            return { ...add };
        case UpDataState.HANDLE_SUBJECT_MODAL_MSG:
            return Object.assign({}, state, {
                GlobalGradeIDs: actions.data
            })
        case UpDataState.HANDLE_SUBJECT_NAME_MODAL_MSG:
            return Object.assign({}, state, {
                SubjectName: actions.data.SubjectName,
                SubjectID:actions.data.SubjectID
            })
        default:
            return state;
    }
};
function handleData(data) {

    let GlobalGradeIDs = handleGrade(data.P1Grades).concat(handleGrade(data.P2Grades)).concat(handleGrade(data.P3Grades)).join();
    if (GlobalGradeIDs.slice(0, 1) === ',') {
        GlobalGradeIDs = GlobalGradeIDs.slice(1)
    }
    return {
        SubjectName: data.SubjectName,
        SubjectID: data.SubjectID,
        GlobalGradeIDs: GlobalGradeIDs
    }
}

function handleGrade(grade) {
    let endGrade = '';
    let gradeArr1 = grade.split(',');
    if (!gradeArr1.length)
        return '';
    let gradeArr2 = gradeArr1.map((child, index) => {
        return child.split('-')[0];
    })
    return gradeArr2
}
export default ChangeSubjectMsg;