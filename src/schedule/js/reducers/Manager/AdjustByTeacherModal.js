import ABTActions from '../../actions/Manager/AdjustByTeacherActions';



const AdjustByTeacherModal = (state={

    show:false,

    teacherList:[],

    replaceSchedule:{

        loadingShow:true,

        teacherOptions:{

            dropSelectd:null,

            searchList:[],

            searchLoadingShow:false,

            searchOpen:false

        },

        replaceTeacherOptions:{

            dropSelectd:null,

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

        weeksCheckedList:[],

        dateCheckedList:[],

        classHourDate:'',

        WeekDay:'',

        WeekNO:'',

        dateLoadingShow:true,

        classHourList:[],

        classHourCheckedList:[],

        classHourLoadingShow:true,

        classHourPlainOpts:[]

    },

    changeSchedule:{

        originDropSelectd:"",

        originSearchList:[],

        originSearchOpen:false,

        originSearchLoadingShow:true,

        originDate:'',

        originSchedulePickDisabled:true,

        originScheduleList:[],

        originScheduleDropSelectd:"",

        targetDropSelectd:"",

        targetSearchList:[],

        targetSearchOpen:false,

        targetSearchLoadingShow:true,

        targetDate:'',

        targetSchedulePickDisabled:true,

        targetScheduleList:[],

        targetScheduleDropSelectd:""

    },

    changeTime:{

        oldClassRoomList:[],

        teacherDrop:{value:"none",title:"请选择教师"},

        searchList:[],

        searchOpen:false,

        searchLoadingShow:true,

        originDate:'',

        oldClassHourDrop:{value:"none",title:"请选择节次"},

        oldClassHourList:[],

        oldClassHourDisabled:true,

        oldWeek:'',

        oldWeekLoading:true,

        newDate:'',

        newClassHourDrop:{value:"none",title:"请选择节次"},

        newClassHourList:[],

        newClassHourDisabled:true,

        newWeek:'',

        newWeekLoading:true,

        newClassRoomDrop:{value:"none",title:"请选择教室"},

        newClassRoomList:[],

        newClassRoomDisabled:true

    }

}, actions) => {

    switch (actions.type) {

        case ABTActions.ADJUST_BY_TEACHER_SHOW:

            return {

                ...state,

                show:true,

                teacherList:[],

                replaceSchedule:{

                    loadingShow:true,

                    teacherOptions:{

                        dropSelectd:null,

                        searchList:[],

                        searchLoadingShow:false,

                        searchOpen:false

                    },

                    replaceTeacherOptions:{

                        dropSelectd:null,

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

                    weeksCheckedList:[],

                    dateCheckedList:[],

                    classHourDate:'',

                    WeekDay:'',

                    WeekNO:'',

                    dateLoadingShow:true,

                    classHourList:[],

                    classHourCheckedList:[],

                    classHourLoadingShow:true,

                    classHourPlainOpts:[]

                },

                changeSchedule:{

                    originDropSelectd:"",

                    originSearchList:[],

                    originSearchOpen:false,

                    originSearchLoadingShow:true,

                    originDate:'',

                    originSchedulePickDisabled:true,

                    originScheduleList:[],

                    originScheduleDropSelectd:"",

                    targetDropSelectd:"",

                    targetSearchList:[],

                    targetSearchOpen:false,

                    targetSearchLoadingShow:true,

                    targetDate:'',

                    targetSchedulePickDisabled:true,

                    targetScheduleList:[],

                    targetScheduleDropSelectd:""

                }

            };

        case ABTActions.ADJUST_BY_TEACHER_HIDE:

            return {

                ...state,

                show:false,

            };

        case ABTActions.ADJUST_BY_TEACHER_TEACHER_LIST_UPDATE:

            return {

                ...state,

                teacherList:actions.data

            };

        case ABTActions.REPLACE_SHCEDULE_LOADING_HIDE:

            return {...state,replaceSchedule:{...state.replaceSchedule,loadingShow:false}};

        case ABTActions.REPLACE_SHCEDULE_LOADING_SHOW:

            return {...state,replaceSchedule:{...state.replaceSchedule,loadingShow:true}};

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

        case ABTActions.REPLACE_SHCEDULE_DATE_CHECKED:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    dateCheckedList:actions.data

                }

            };

        case ABTActions.REPLACE_SHCEDULE_CLASSHOUR_DATE_CHECKED:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    classHourDate:actions.data

                }

            };

        case ABTActions.REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_LOADING_SHOW:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    dateLoadingShow:true

                }

            };

        case ABTActions.REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_LOADING_HIDE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    dateLoadingShow:false

                }

            };

        case ABTActions.REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_UPDATE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    WeekNO:actions.data.WeekNO,

                    WeekDay:actions.data.WeekDay

                }

            };


        case ABTActions.REPLACE_SHCEDULE_CLASSHOUR_LOADING_SHOW:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    classHourLoadingShow:true

                }

            };

        case ABTActions.REPLACE_SHCEDULE_CLASSHOUR_LOADING_HIDE:

            return {

            ...state,

            replaceSchedule:{

                ...state.replaceSchedule,

                classHourLoadingShow:false

            }

        };

        case ABTActions.REPLACE_SHCEDULE_CLASSHOUR_LIST_CHANGE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    classHourList:actions.data.classHourList,

                    classHourPlainOpts:actions.data.classHourPlainOpts,

                    classHourCheckedList:actions.data.classHourCheckedList

                }

            };

        case ABTActions.REPLACE_SHCEDULE_CLASSHOUR_CHECKED_LIST_CHANGE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    classHourCheckedList:actions.data

                }

            };

            //与人换课

        case ABTActions.CHANGE_SHCEDULE_ORIGIN_TEACHER_DROP_CHANGE:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,

                    originDropSelectd:actions.data

                }

            };

        case ABTActions.CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_LIST_UPDATE:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,

                    originSearchList:actions.data

                }

            };

        case ABTActions.CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_OPEN:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,


                    originSearchOpen:true

                }

            };

        case ABTActions.CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_CLOSE:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,


                    originSearchOpen:false

                }

            };

        case ABTActions.CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_LOADING_HIDE:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,


                    originSearchLoadingShow:false

                }

            };

        case ABTActions.CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_LOADING_SHOW:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,


                    originSearchLoadingShow:true

                }

            };

        case ABTActions.CHANGE_SHCEDULE_ORIGIN_TEACHER_DATE_PICK:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,


                    originDate:actions.data

                }

            };

        case ABTActions.CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_ABLED:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,

                    originSchedulePickDisabled:false

                }

            };

        case ABTActions.CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_LIST_UPDATE:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,

                    originScheduleList:actions.data

                }

            };

        case ABTActions.CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_DROP_SELECTD:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,

                    originScheduleDropSelectd:actions.data

                }

            };

        case ABTActions.CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_DISABLED:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,

                    originSchedulePickDisabled:true

                }

            };

        case ABTActions.CHANGE_SHCEDULE_TARGET_TEACHER_DROP_CHANGE:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,

                    targetDropSelectd:actions.data

                }

            };

        case ABTActions.CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LIST_UPDATE:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,

                    targetSearchList:actions.data

                }

            };

        case ABTActions.CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_OPEN:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,


                    targetSearchOpen:true

                }

            };

        case ABTActions.CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_CLOSE:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,


                    targetSearchOpen:false

                }

            };

        case ABTActions.CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LOADING_HIDE:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,


                    targetSearchLoadingShow:false

                }

            };

        case ABTActions.CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LOADING_SHOW:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,


                    targetSearchLoadingShow:true

                }

            };

        case ABTActions.CHANGE_SHCEDULE_TARGET_TEACHER_DATE_PICK:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,


                    targetDate:actions.data

                }

            };

        case ABTActions.CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_ABLED:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,

                    targetSchedulePickDisabled:false

                }

            };

        case ABTActions.CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_LIST_UPDATE:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,

                    targetScheduleList:actions.data

                }

            };

        case ABTActions.CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_DROP_SELECTD:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,

                    targetScheduleDropSelectd:actions.data

                }

            };

        case ABTActions.CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_DISABLED:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,

                    targetSchedulePickDisabled:true

                }

            };

            //调整时间

        case ABTActions.CHANGE_TIME_TEACHER_DROP_CHANGE:

            switch (actions.data.type) {

                case 'drop':

                    return {


                        ...state,

                      changeTime: {

                          ...state.changeTime,


                          teacherDrop:actions.data.value

                      }

                    };

                case 'search':

                    return {


                        ...state,

                        changeTime: {

                            ...state.changeTime,


                            searchOpen:true

                        }

                    };

                case 'searchLoadingShow':

                    return {


                        ...state,

                        changeTime: {

                            ...state.changeTime,


                            searchLoadingShow:true

                        }

                    };

                case 'teacherListChange':

                    return {


                        ...state,

                        changeTime: {

                            ...state.changeTime,


                            searchList:actions.data.value

                        }

                    };

                case 'searchLoadingHide':

                    return {


                        ...state,

                        changeTime: {

                            ...state.changeTime,


                            searchLoadingShow:false

                        }

                    };

                case 'searchClose':

                    return {


                        ...state,

                        changeTime: {

                            ...state.changeTime,


                            searchOpen:false

                        }

                    };

                default:

                    return state;

            }

        case ABTActions.CHANGE_TIME_ORIGIN_CHANGE:

            switch (actions.data.type) {

                case 'date':

                    return{

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            originDate:actions.data.value

                        }

                    };

                case 'classHourDisabled':

                    return{

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            oldClassHourDisabled:true

                        }

                    };

                case 'classHourAbled':

                    return{

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            oldClassHourDisabled:false,

                            oldClassHourDrop:actions.data.value

                        }

                    };

                case 'classHourListChange':

                    return{

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            oldClassHourList:actions.data.value

                        }

                    };

                case 'classHourPick':

                    return{

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            oldClassHourDrop:actions.data.value

                        }

                    };

                case 'weekChange':

                    return{

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            oldWeek:actions.data.value

                        }

                    };

                case 'oldClassRoomListChange':

                    return{

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            oldClassRoomList:actions.data.value

                        }

                    };


                default:

                    return state;

            }

        case ABTActions.CHANGE_TIME_NEW_CHANGE:

            switch (actions.data.type) {

                case 'classRoomDrop':

                    return {

                        ...state,

                      changeTime:{

                          ...state.changeTime,

                          newClassRoomDrop:actions.data.value

                      }

                    };

                case 'date':

                    return {

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            newDate:actions.data.value

                        }

                    };

                case 'classHourDisabled':

                    return {

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            newClassHourDisabled:true

                        }

                    };

                case 'weekChange':

                    return {

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            newWeek:actions.data.value

                        }

                    };

                case 'classHourListChange':

                    return {

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            newClassHourList:actions.data.value

                        }

                    };

                case 'classHourAbled':

                    return {

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            newClassHourDisabled:false

                        }

                    };

                case 'classHourDrop':

                    return {

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            newClassHourDrop:actions.data.value

                        }

                    };

                case 'classRoomAbled':

                    return {

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            newClassRoomDisabled:false

                        }

                    };

                case 'classRoomListChange':

                    return {

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            newClassRoomList:actions.data.value

                        }

                    };

                default:

                    return state;

            }





        default:

            return state;

    }

};

export default AdjustByTeacherModal