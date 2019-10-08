import ModuleActions from '../../actions/Teacher/ModuleActions';


const Modules = (state={

    ModuleGroups:[],

    ModulesLoading:true

},actions) => {

    switch (actions.type) {

        case ModuleActions.TEACHER_MODULE_GROUPS_UPDATE:

            return {

                ...state,

                ModuleGroups:actions.data

            };

        default:

            return state;

    }

};

export default Modules;