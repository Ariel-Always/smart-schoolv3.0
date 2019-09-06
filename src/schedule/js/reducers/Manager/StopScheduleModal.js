import StopScheduleActions from '../../actions/Manager/StopScheduleActions';

const StopScheduleModal = (state={

    show:false

},actions) => {

    switch (actions.type) {

        case StopScheduleActions.STOP_SCHEDULE_SHOW:

            return{

                ...state,

                show:true

            };

        default:

            return state;

    }

};

export default StopScheduleModal