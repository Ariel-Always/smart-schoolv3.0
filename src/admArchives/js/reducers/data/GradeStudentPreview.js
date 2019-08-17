import UpDataState from '../../actions/UpDataState';

const GradeStudentPreview = (state={},actions)=>{
    switch (actions.type) {
        case UpDataState.GET_GRADE_STUDENT_PREVIEW:
            return {...state,...actions.data};
        default:
            return state;
    }
} ;

export default  GradeStudentPreview;