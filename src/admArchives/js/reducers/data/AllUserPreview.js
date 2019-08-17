import UpDataState from '../../actions/UpDataState';

const AllUserPreview = (state={},actions)=>{
    switch (actions.type) {
        case UpDataState.GET_ALL_USER_PREVIEW:
            return {...state,...actions.data};
        default:
            return state;
    }
} ;

export default  AllUserPreview;