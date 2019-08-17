import UpDataState from '../../actions/UpDataState';

const SchoolLeaderPreview = (state={},actions)=>{
    switch (actions.type) {
        case UpDataState.GET_SUBJECT_TEACHER_PREVIEW:
            return {...state,...actions.data};
        default:
            return state;
    }
} ;

export default  SchoolLeaderPreview;