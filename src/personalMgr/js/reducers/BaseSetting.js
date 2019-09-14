import BaseActions from '../actions/BaseActions';

const BaseSetting = (state={

    editor:false,

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

            }

        default:

            return state;

    }

};

export default BaseSetting