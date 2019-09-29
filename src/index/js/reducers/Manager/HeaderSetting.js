import HeaderActions from '../../actions/Manager/HeaderActions';

const HeaderSetting = (state={

    MenuShow:false,

    StaticsInfo:""

},actions) => {

    switch (actions.type) {

        case HeaderActions.HEADER_MENU_TOGGLE:

            return {

                ...state,

                MenuShow:!state.MenuShow

            };

        case HeaderActions.HEADER_MENU_SHOW:

            return {

                ...state,

                MenuShow:true

            };

        case HeaderActions.HEADER_MENU_HIDE:

            return {

                ...state,

                MenuShow:false

            };

        case HeaderActions.HEADER_STATICS_UPDATE:

            return{

                ...state,

                ...actions.data

            };

        default:

            return state;

    }

};

export default HeaderSetting;