import UpDataState from '../../actions/UpDataState';
const TheGradePreview = (state={},actions) => {
    switch (actions.type) {
        case UpDataState.GET_THE_GRADE_PREVIEW:
            return{...state,...actions.data};
        default:
            return state;
    }
};
export default TheGradePreview;