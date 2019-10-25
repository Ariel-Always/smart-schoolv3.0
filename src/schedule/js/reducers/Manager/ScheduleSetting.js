import SSActions from '../../actions/Manager/ScheduleSettingActions';

const ScheduleSetting = (state={

    SettingType:0,//默认为统一设置,

    MultiplePeriod:false,//默认按照单学段设置

    SettingByPeriod:{

        PeriodSettingList:[]//学段信息

    },

    SettingByUnify:{

        ClassHourList:[]

    },

    IsEnable:0,

    Times:0,

    LinkageEditStatus:false

},actions) => {

    switch (actions.type) {

        case SSActions.MANAGER_SCHEDULE_SETTING_INIT:

            return {

                ...state,

                ...actions.data

            };

        case SSActions.MANAGER_SCHEDULE_SETTING_SETTING_TYPE_CHANGE:

            return {

                ...state,

                SettingType:actions.data

            };

        case SSActions.MANAGER_SCHEDULE_SETTING_SETTING_PERIOD_TAB_TOGGLE:

            return {

                ...state,

                SettingByPeriod:{

                    ...state.SettingByPeriod,

                    PeriodSettingList:actions.data

                }

            };

        default:

            return state;

    }

};

export default ScheduleSetting;