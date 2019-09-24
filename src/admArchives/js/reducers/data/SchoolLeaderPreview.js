import UpDataState from '../../actions/UpDataState';

const SchoolLeaderPreview = (state={},actions)=>{
    switch (actions.type) {
        case UpDataState.GET_SCHOOL_LEADER_PREVIEW:
            return {...state,...actions.data};
        default:
            return state;
    }
} ;

export default  SchoolLeaderPreview;