import HeaderActions from '../../actions/Teacher/HeaderActions';
const TeacherCustomModalShow = (state={Show:false,key:'tool'},actions) => {
    switch (actions.type) {
        case HeaderActions.TEACHER_CUSTOM_MODAL_OPEN:
            return Object.assign({},state,{Show:true,key:actions.key});
        case HeaderActions.TEACHER_CUSTOM_MODAL_CLOSE:
            return Object.assign({},state,{Show:false,key:actions.key});            
        default:
            return state;
    }
};
export default  TeacherCustomModalShow;