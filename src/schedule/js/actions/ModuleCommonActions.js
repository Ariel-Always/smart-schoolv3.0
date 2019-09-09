import ModuleSettingActions from './ModuleSettingActions';

import LoginUserActions from './LoginUserActions';

import PeriodWeekTermActions from './PeriodWeekTermActions';

import Mock from 'mockjs';

import Method from "./Method";


const getCommonInfo = () => {

    return ( dispatch,getState ) => {
        //获取登录信息
        Method.getGetData(`/Login?method=GetUserInfo`).then(json => {

            json = {
                    "error": 0,
                    "data": {
                        "result": {
                            "UserID": Mock.Random.guid(),
                            "UserName": "王先之",
                            "Gender": Mock.Random.pick(['男', '女', '保密']),
                            "UserType":0,
                            "UserClass": Mock.Random.pick([1, 2]),
                            "PhotoPath": "http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg",
                            "ShortName": "王先之",
                            "Sign": "我要我的滋味！",
                            "SchoolID": Mock.Random.natural(),
                            "SchoolName": "广州蓝鸽中学"
                        }
                }};

            switch (json.data.result.UserType) {

                case 0:

                    dispatch({type:ModuleSettingActions.UPDATE_MANAGER_MODULE_SETTING});

                    break;

                case 1:

                    dispatch({type:ModuleSettingActions.UPDATE_TEACHER_MODULE_SETTING});

                    break;

                case 2:

                    dispatch({type:ModuleSettingActions.UPDATE_STUDENT_MODULE_SETTING});

                    break;

                default:

                    dispatch({type:ModuleSettingActions.UPDATE_MANAGER_MODULE_SETTING});

            }

            dispatch({type:LoginUserActions.UPDATE_LOGIN_USER,data:json.data.result});

            let {LoginUser} = getState();

            let SchoolID = LoginUser.SchoolID;

            let UserID = LoginUser.UserID;

            let UserType = LoginUser.UserType;

            //获取学段等等的信息
            let getPeriodPromise = Method.getGetData(`/schedulePeriod?SchoolID=${SchoolID}&UserID=${UserID}&UserType=${UserType}`);

            getPeriodPromise.then(json => {

                json = {
                    "Status": 200,
                    "Msg": "success",
                    "Data": {
                        "ItemTerm": {
                            "Term": "2019-2020 01",
                            "TermName": "2019-2020上学期"
                        },
                        "ItemPeriod": [{
                            "PeriodID": "P1",
                            "PeriodName": "小学"
                        },
                            {
                                "PeriodID": "P2",
                                "PeriodName": "初中"
                            },
                            {
                                "PeriodID": "P3",
                                "PeriodName": "高中"
                            }
                        ],

                        "NowWeekNo": 3,

                        "ItemWeek": [{
                            "WeekNO": 1,
                            "StartDate": "2019-8-26",
                            "EndDate": "2019-9-1",
                            "StartWeekDay": "星期一",
                            "EndWeekDay": "星期日"
                        },
                            {
                                "WeekNO": 2,
                                "StartDate": "2019-9-2",
                                "EndDate": "2019-9-8",
                                "StartWeekDay": "星期一",
                                "EndWeekDay": "星期日"
                            },
                            {
                                "WeekNO": 3,
                                "StartDate": "2019-9-9",
                                "EndDate": "2019-9-15",
                                "StartWeekDay": "星期一",
                                "EndWeekDay": "星期日"
                            },
                            {
                                "WeekNO": 4,
                                "StartDate": "2019-9-16",
                                "EndDate": "2019-9-22",
                                "StartWeekDay": "星期一",
                                "EndWeekDay": "星期日"
                            },
                            {
                                "WeekNO": 5,
                                "StartDate": "2019-9-23",
                                "EndDate": "2019-9-29",
                                "StartWeekDay": "星期一",
                                "EndWeekDay": "星期日"
                            }


                        ]
                    }
                };

                if ( UserType === 1 ){

                    if ( json.Data.ItemPeriod.length  <= 1 ){

                        dispatch({type:ModuleSettingActions.TIME_BARNER_HIDE});

                    }else{

                        dispatch({type:ModuleSettingActions.TIME_BARNER_SHOW});

                    }

                }

                dispatch({type:PeriodWeekTermActions.UPDATE_PERIOD_TERM_WEEK,data:json.Data});

            });

        });

    }

};

export default {

    getCommonInfo

}