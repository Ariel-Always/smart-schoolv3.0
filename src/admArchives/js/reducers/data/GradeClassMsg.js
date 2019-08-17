import UpDataState from '../../actions/UpDataState';

const GradeClassMsg = (state={},actions)=>{
    switch (actions.type) {
        case UpDataState.GET_GRADE_CLASS_MSG:
            return {...state,...actions.data};
        default:
            return state;
    }
} ;

export default  GradeClassMsg;