import BaseActions from '../actions/BaseActions';

const BaseSetting = (state={

    editorStatus:false,

    baseInfo:{},

    concactInfo:{},

    signInfo:{}

},actions) => {

    switch (actions.type) {

        case BaseActions.BASE_INFO_UPDATE:

            return {

                ...state,

                baseInfo: {

                    ...state.baseInfo,

                    ...actions.data

                }

            };

        case BaseActions.BASE_SETTING_STATUS_CHANGE:

            return {...state,editorStatus:actions.data};

        default:

            return state;

    }

};

export default BaseSetting