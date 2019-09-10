import ABTActions from '../../actions/Manager/AdjustByTeacherActions';


const AdjustByTeacherModal = (state={

    show:false,

    replaceSchedule:{

        loadingShow:true,

        teacherOptions:{

            dropSelectd:null,

            dropList:[],

            searchList:[],

            searchLoadingShow:false,

            searchOpen:false

        },

        replaceTeacherOptions:{

            dropSelectd:null,

            dropList:[],

            searchList:[],

            searchLoadingShow:false,

            searchOpen:false

        },

        teacherSubject:{

            dropShow:false,

            select:{

                dropSelectd:'',

                dropList:[]

            },

            name:'',

            id:''

        },

        classList:[],

        classCheckedList:[],

        activeRadio:"all",

        monthsList:[],

        monthsCheckedList:[],

        weeksList:[],

        weeksCheckedList:[]

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

                        dropList:[],

                        searchList:[],

                        searchLoadingShow:false,

                        searchOpen:false

                    },

                    replaceTeacherOptions:{

                        dropSelectd:null,

                        dropList:[],

                        searchList:[],

                        searchLoadingShow:false,

                        searchOpen:false

                    },

                    teacherSubject:{

                        dropShow:false,

                        select:{

                            dropSelectd:'',

                            dropList:[]

                        },

                        name:'',

                        id:''

                    },

                    classList:[],

                    classCheckedList:[],

                    activeRadio:"all",

                    monthsList:[],

                    monthsCheckedList:[],

                    weeksList:[],

                    weeksCheckedList:[]

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

        case ABTActions.REPLACE_SHCEDULE_TEACHER_SSUBJECT_DROP_SHOW:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    teacherSubject:{

                        ...state.replaceSchedule.teacherSubject,

                        dropShow:true,

                        select:{

                            dropSelectd:actions.data.dropSelectd,

                            dropList:actions.data.dropList

                        }

                    }

                }

            };

        case ABTActions.REPLACE_SHCEDULE_CLASS_LIST_UPDATE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    classList:actions.data

                }

            };

        case ABTActions.REPLACE_SHCEDULE_TEACHER_SSUBJECT_DROP_HIDE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    teacherSubject:{

                        ...state.replaceSchedule.teacherSubject,

                        dropShow:false,

                        id:actions.data.id,

                        name:actions.data.name

                    }

                }

            };

        case ABTActions.REPLACE_SHCEDULE_TEACHER_DROP_CHANGE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    teacherOptions:{

                        ...state.replaceSchedule.teacherOptions,

                        dropSelectd:actions.data

                    }

                }

            };

        case ABTActions.REPLACE_SHCEDULE_TEACHER_SEARCH_LIST_UPDATE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    teacherOptions:{

                        ...state.replaceSchedule.teacherOptions,

                        searchList:actions.data

                    }

                }

            };

        case ABTActions.REPLACE_SHCEDULE_TEACHER_SEARCH_OPEN:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    teacherOptions:{

                        ...state.replaceSchedule.teacherOptions,

                        searchOpen:true

                    }

                }

            };

        case ABTActions.REPLACE_SHCEDULE_TEACHER_SEARCH_CLOSE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    teacherOptions:{

                        ...state.replaceSchedule.teacherOptions,

                        searchOpen:false

                    }

                }

            };

        case ABTActions.REPLACE_SHCEDULE_TEACHER_SEARCH_LOADING_HIDE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    teacherOptions:{

                        ...state.replaceSchedule.teacherOptions,

                        searchLoadingShow:false

                    }

                }


            };

        case ABTActions.REPLACE_SHCEDULE_TEACHER_SEARCH_LOADING_SHOW:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    teacherOptions:{

                        ...state.replaceSchedule.teacherOptions,

                        searchLoadingShow:true

                    }

                }


            };

        case ABTActions.REPLACE_SHCEDULE_REPLACE_TEACHER_LIST_UPDATE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    replaceTeacherOptions:{

                        ...state.replaceSchedule.replaceTeacherOptions,

                        dropList:actions.data

                    }

                }

            };

        case ABTActions.REPLACE_SHCEDULE_REPLACE_TEACHER_DROP_CHANGE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    replaceTeacherOptions:{

                        ...state.replaceSchedule.replaceTeacherOptions,

                        dropSelectd:actions.data

                    }

                }

            };

        case ABTActions.REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LIST_UPDATE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    replaceTeacherOptions:{

                        ...state.replaceSchedule.replaceTeacherOptions,

                        searchList:actions.data

                    }

                }

            };



        case ABTActions.REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_OPEN:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    replaceTeacherOptions:{

                        ...state.replaceSchedule.replaceTeacherOptions,

                        searchOpen:true

                    }

                }

            };

        case ABTActions.REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_CLOSE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    replaceTeacherOptions:{

                        ...state.replaceSchedule.replaceTeacherOptions,

                        searchOpen:false

                    }

                }

            };

        case ABTActions.REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LOADING_HIDE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    replaceTeacherOptions:{

                        ...state.replaceSchedule.replaceTeacherOptions,

                        searchLoadingShow:false

                    }

                }


            };

        case ABTActions.REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LOADING_SHOW:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    replaceTeacherOptions:{

                        ...state.replaceSchedule.replaceTeacherOptions,

                        searchLoadingShow:true

                    }

                }


            };

        case ABTActions.REPLACE_SHCEDULE_CLASS_CHECKED:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    classCheckedList:actions.data

                }


            };

        case ABTActions.REPLACE_SHCEDULE_RADIO_CHANGE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    activeRadio:actions.data

                }

            };

        case ABTActions.REPLACE_SHCEDULE_MONTHS_LIST_UPDATE:

            return{

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    monthsList:actions.data

                }

            };

        case ABTActions.REPLACE_SHCEDULE_MONTHS_CHECKED:

            return{

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    monthsCheckedList:actions.data

                }

            };

        case ABTActions.REPLACE_SHCEDULE_WEEK_LIST_UPDATE:

            return{

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    weeksList:actions.data

                }

            };

        case ABTActions.REPLACE_SHCEDULE_WEEK_CHECKED:

            return{

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    weeksCheckedList:actions.data

                }

            };

        default:

            return state;

    }

};

export default AdjustByTeacherModal