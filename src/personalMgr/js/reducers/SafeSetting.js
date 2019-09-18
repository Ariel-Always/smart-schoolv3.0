import SafeSettingActions from '../actions/SafeSettingAcions';


const SafeSetting = (state={

    initData:'',

    pwdSetShow:false,

    emailSetShow:false,

    qaSetShow:false,

    addQaShow:false,

    qaSelectd:{value:"self",title:"自定义密保问题"},

    questionsList:[],

    pwdErrorTips:{

        origin:false,

        originTips:'',

        new:false,

        newTips:'',

        reNew:false,

        reNewTips:''

    },

    qaErrorTips:{

        self:false,

        answer:false,

        pwd:false

    },

    emailErrorTips:{

        newEmail:false,

        pwd:false

    },

    pwdValue:{

        originPwd:'',

        newPwd:'',

        reNewPwd:''

    },

    qaValue:{

        question:'',

        answer:'',

        pwd:''

    },

    emailValue:{

        newEmail:'',

        pwd:''

    }

},actions) => {

    switch (actions.type) {

        case SafeSettingActions.SAFE_SETTING_INIT_DATA_UPDATE:

            return { ...state,initData:{...state.initData,...actions.data}};
            
        case SafeSettingActions.SAFE_SETTING_CONTENT_SLIDE_UP:
            
            switch (actions.data) {

                case 'pwd':

                    return { ...state,pwdSetShow:false};

                case 'qa':

                    return {...state,qaSetShow:false};

                case 'email':

                    return {...state,emailSetShow:false};

                default:

                    return state;

            }

        case SafeSettingActions.SAFE_SETTING_CONTENT_SLIDE_DOWN:

            switch (actions.data) {

                case 'pwd':

                    return { ...state,pwdSetShow:true};

                case 'qa':

                    return {...state,qaSetShow:true};

                case 'email':

                    return {...state,emailSetShow:true};

                default:

                    return state;

            }

        case SafeSettingActions.SAFE_SETTING_PWD_VALUE_CHANGE:

            switch (actions.data.type) {

                case 'origin':

                    return {

                        ...state,

                        pwdValue: {

                            ...state.pwdValue,

                            originPwd:actions.data.value

                        }

                    };

                case 'new':

                    return {

                        ...state,

                        pwdValue: {

                            ...state.pwdValue,

                            newPwd:actions.data.value

                        }

                    };

                case 'reNew':

                    return {

                        ...state,

                        pwdValue: {

                            ...state.pwdValue,

                            reNewPwd:actions.data.value

                        }

                    };

                default:

                    return state;

            }
            
        case SafeSettingActions.SAFE_SETTING_PWD_TIPS_SHOW:
            
            switch (actions.data.type) {

                case 'origin':

                    return {

                        ...state,

                        pwdErrorTips:{

                            ...state.pwdErrorTips,

                            origin:true,

                            originTips:actions.data.tips

                        }

                    };

                case 'new':

                    return {

                        ...state,

                        pwdErrorTips:{

                            ...state.pwdErrorTips,

                            new:true,

                            newTips:actions.data.tips

                        }

                    };

                case 'reNew':

                    return {

                        ...state,

                        pwdErrorTips:{

                            ...state.pwdErrorTips,

                            reNew:true,

                            reNewTips:actions.data.tips

                        }

                    };

                default:

                    return state;

            }

        case SafeSettingActions.SAFE_SETTING_PWD_TIPS_HIDE:

            switch (actions.data.type) {

                case 'origin':

                    return {

                        ...state,

                        pwdErrorTips:{

                            ...state.pwdErrorTips,

                            origin:false

                        }

                    };

                case 'new':

                    return {

                        ...state,

                        pwdErrorTips:{

                            ...state.pwdErrorTips,

                            new:false

                        }

                    };

                case 'reNew':

                    return {

                        ...state,

                        pwdErrorTips:{

                            ...state.pwdErrorTips,

                            reNew:false

                        }

                    };

                default:

                    return state;

            }

        case SafeSettingActions.SAFE_SETTING_QUESTIONS_WRAPPER_SHOW:

            return { ...state,addQaShow: true  };

        case SafeSettingActions.SAFE_SETTING_QUESTIONS_WRAPPER_HIDE:

            return { ...state,addQaShow: false  };

        case SafeSettingActions.SAFE_SETTING_QUESTIONS_LIST_UPDATE:

            return { ...state,questionsList:actions.data  };

        case SafeSettingActions.SAFE_SETTING_QUESTIONS_PICK_CHANGE:

            return { ...state,qaSelectd:actions.data  };

        default:

            return state;

    }

};

export default SafeSetting