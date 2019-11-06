import ABCRActions from '../../actions/Manager/AdjustByClassRoomActions';




const AdjustByClassRoom = (state={

    Show:false,

    LoadingShow:true,

    ClassRoomList:[],

    OriginClassRoom:{

      DropSelectd:{value:"none",title:"请选择教室"},

      SearchList:[],

      SearchOpen:false,

      SearchLoadingShow:true

    },

    TargetClassRoom:{

        DropSelectd:{value:"none",title:"请选择教室"},

        SearchList:[],

        SearchOpen:false,

        SearchLoadingShow:true

    },

    activeRadio:"all",

    monthsList:[],

    monthsCheckedList:[],

    weeksList:[],

    weeksCheckedList:[],

    dateCheckedList:[],

    classHourDate:'',

    WeekDay:'',

    WeekNO:'',

    dateLoadingShow:true,

    classHourList:[],

    classHourCheckedList:[],

    classHourLoadingShow:true,

    classHourPlainOpts:[],

    originTeacherTips:false,

    originTeacherTipsTitle:'',

    replaceTeacherTips:false,

    replaceTeacherTipsTitle:'',

    classTips:false,

    classTipsTitle:'',

    monthTips:false,

    monthTipsTitle:'',

    weekTips:false,

    weekTipsTitle:'',

    dateTips:false,

    dateTipsTitle:'',

    classHourDateTips:false,

    classHourDateTipsTitle:'',

    classHourTips:false,

    classHourTipsTitle:'',

},actions) => {

    switch (actions.type) {

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_SHOW:

            return {

                ...state,

                Show:true,

                LoadingShow:true,

                ClassRoomList:[],

                OriginClassRoom:{

                    DropSelectd:{value:"none",title:"请选择教室"},

                    SearchList:[],

                    SearchOpen:false,

                    SearchLoadingShow:true

                },

                TargetClassRoom:{

                    DropSelectd:{value:"none",title:"请选择教室"},

                    SearchList:[],

                    SearchOpen:false,

                    SearchLoadingShow:true

                },

                activeRadio:"all",

                monthsList:[],

                monthsCheckedList:[],

                weeksList:[],

                weeksCheckedList:[],

                dateCheckedList:[],

                classHourDate:'',

                WeekDay:'',

                WeekNO:'',

                dateLoadingShow:true,

                classHourList:[],

                classHourCheckedList:[],

                classHourLoadingShow:true,

                classHourPlainOpts:[],

                originTeacherTips:false,

                originTeacherTipsTitle:'',

                replaceTeacherTips:false,

                replaceTeacherTipsTitle:'',

                classTips:false,

                classTipsTitle:'',

                monthTips:false,

                monthTipsTitle:'',

                weekTips:false,

                weekTipsTitle:'',

                dateTips:false,

                dateTipsTitle:'',

                classHourDateTips:false,

                classHourDateTipsTitle:'',

                classHourTips:false,

                classHourTipsTitle:'',

                };

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_HIDE:

            return {

                ...state,

                Show:false

            };

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_CLASSROOM_LIST_UPDATE:

            return {

                ...state,

                ClassRoomList:actions.data

            };

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_CLASSROOM_CHANGE:

            return{...state,OriginClassRoom:{...state.OriginClassRoom,DropSelectd:actions.data}};

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LIST_UPDATE:

            return { ...state,OriginClassRoom:{...state.OriginClassRoom,SearchList:actions.data} }

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_OPEN:

            return { ...state,OriginClassRoom:{...state.OriginClassRoom,SearchOpen:true}};

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LOADING_SHOW:

            return { ...state,OriginClassRoom:{...state.OriginClassRoom,SearchLoadingShow:true}};

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LOADING_HIDE:

            return { ...state,OriginClassRoom:{...state.OriginClassRoom,SearchLoadingShow:false}};

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_CLOSE:

            return { ...state,OriginClassRoom:{...state.OriginClassRoom,SearchOpen:false}};




        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_TARGET_CLASSROOM_CHANGE:

            return{...state,TargetClassRoom:{...state.TargetClassRoom,DropSelectd:actions.data}};

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LIST_UPDATE:

            return { ...state,TargetClassRoom:{...state.TargetClassRoom,SearchList:actions.data} }

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_OPEN:

            return { ...state,TargetClassRoom:{...state.TargetClassRoom,SearchOpen:true}};

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LOADING_SHOW:

            return { ...state,TargetClassRoom:{...state.TargetClassRoom,SearchLoadingShow:true}};

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LOADING_HIDE:

            return { ...state,TargetClassRoom:{...state.TargetClassRoom,SearchLoadingShow:false}};

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_CLOSE:

            return { ...state,TargetClassRoom:{...state.TargetClassRoom,SearchOpen:false}};



        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_LOADING_HIDE:

            return {...state,LoadingShow:false};

        case ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_LOADING_SHOW:

            return {...state,LoadingShow:true};

         //所有的错误提示

        case ABCRActions.REPLACE_SHCEDULE_ERROR_TIPS_SHOW:

            switch (actions.data.type) {

                case 'originTeacher':

                    return {...state,replaceSchedule:{...state.replaceSchedule,originTeacherTips:true,originTeacherTipsTitle:actions.data.title}};

                case 'replaceTeacher':

                    return {...state,replaceSchedule:{...state.replaceSchedule,replaceTeacherTips:true,replaceTeacherTipsTitle:actions.data.title}};

                case 'class':

                    return {...state,replaceSchedule:{...state.replaceSchedule,classTips:true,classTipsTitle:actions.data.title}};

                case 'month':

                    return {...state,replaceSchedule:{...state.replaceSchedule,monthTips:true,monthTipsTitle:actions.data.title}};

                case 'week':

                    return {...state,replaceSchedule:{...state.replaceSchedule,weekTips:true,weekTipsTitle:actions.data.title}};

                case 'date':

                    return {...state,replaceSchedule:{...state.replaceSchedule,dateTips:true,dateTipsTitle:actions.data.title}};

                case 'classHourDate':

                    return {...state,replaceSchedule:{...state.replaceSchedule,classHourDateTips:true,classHourDateTipsTitle:actions.data.title}};

                case 'classHour':

                    return {...state,replaceSchedule:{...state.replaceSchedule,classHourTips:true,classHourTipsTitle:actions.data.title}};


                default:

                    return state;

            }

        case ABCRActions.REPLACE_SHCEDULE_ERROR_TIPS_HIDE:

            switch (actions.data.type) {

                case 'originTeacher':

                    return {...state,replaceSchedule:{...state.replaceSchedule,originTeacherTips:false}};

                case 'replaceTeacher':

                    return {...state,replaceSchedule:{...state.replaceSchedule,replaceTeacherTips:false}};

                case 'class':

                    return {...state,replaceSchedule:{...state.replaceSchedule,classTips:false}};

                case 'month':

                    return {...state,replaceSchedule:{...state.replaceSchedule,monthTips:false}};

                case 'week':

                    return {...state,replaceSchedule:{...state.replaceSchedule,weekTips:false}};

                case 'date':

                    return {...state,replaceSchedule:{...state.replaceSchedule,dateTips:false}};

                case 'classHourDate':

                    return {...state,replaceSchedule:{...state.replaceSchedule,classHourDateTips:false}};

                case 'classHour':

                    return {...state,replaceSchedule:{...state.replaceSchedule,classHourTips:false}};


                default:

                    return state;

            }


        default:

            return state;

    }

};

export default AdjustByClassRoom