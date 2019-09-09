import ABTActions from '../../actions/Manager/AdjustByTeacherActions';

const AdjustByTeacherModal = (state={

    show:false,

    replaceSchedule:{

        loadingShow:true,

        teacherOptions:{

            dropSelectd:null,

            dropList:[]

        }

    }

}, actions) => {

    switch (actions.type) {

        case ABTActions.ADJUST_BY_TEACHER_SHOW:

            return {

                ...state,

                show:true,

                replaceSchedule:{

                    loadingShow:true,

                    teacherOptions:{

                        dropSelectd:null,

                        dropList:[]

                    }

                }

            };

        case ABTActions.ADJUST_BY_TEACHER_HIDE:

            return {

                ...state,

                show:false,

            };

        case ABTActions.REPLACE_SHCEDULE_LOADING_HIDE:

            return {...state,replaceSchedule:{...state.replaceSchedule,loadingShow:false}};

        case ABTActions.REPLACE_SHCEDULE_LOADING_SHOW:

            return {...state,replaceSchedule:{...state.replaceSchedule,loadingShow:true}};

        case ABTActions.REPLACE_SHCEDULE_TEACHER_LIST_UPDATE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    teacherOptions:{

                        ...state.replaceSchedule.teacherOptions,

                        dropList:actions.data

                    }

                }

            };

        default:

            return state;

    }

};

export default AdjustByTeacherModal