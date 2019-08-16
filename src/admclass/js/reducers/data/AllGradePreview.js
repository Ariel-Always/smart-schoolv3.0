import UpDataState from '../../actions/UpDataState';

const AllGradePreview = (state={},actions)=>{
    switch (actions.type) {
        case UpDataState.GET_ALL_GRADE_PREVIEW:
            return {...state,...actions.data};
        default:
            return state;
    }
} ;

export default  AllGradePreview;