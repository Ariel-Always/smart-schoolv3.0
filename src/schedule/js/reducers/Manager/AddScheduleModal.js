import ASMActions from '../../actions/Manager/AddScheduleModalActions'

const AddScheduleModal = (state={

    show:false

}, actions) => {

    switch (actions.type) {

        case ASMActions.ADD_SCHEDULE_MODAL_SHOW:

            return {...state,show:true};

        case ASMActions.ADD_SCHEDULE_MODAL_HIDE:

            return {...state,show:false};

        default:

            return state;

    }

};

export default AddScheduleModal