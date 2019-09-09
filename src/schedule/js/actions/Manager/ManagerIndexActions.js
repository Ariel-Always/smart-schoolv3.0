import Method from '../Method';

import SCGCRActions  from './SCGCRActions'

import AppLoadingActions from '../../actions/AppLoadingActions'

import STSActions from './SubjectTeacherScheduleActions';

import STTActions from './SubjectTeacherTeacherActions';


//学科教师总表学科课表界面初始化
const STSPageInit = () => {

    return (dispatch,getState) => {

        let {PeriodWeekTerm,LoginUser} = getState();
        //如果前面获取的周次、学段信息已获得
        if (PeriodWeekTerm&&PeriodWeekTerm.ItemPeriod){

            let SchoolID =LoginUser.SchoolID;//需要的参数后期加入

            let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数

            let getSCGCPromise = Method.getGetData(`/scheduleSubjectGrade?SchoolID=${SchoolID}&PeriodID=${PeriodID}`);

            let getSTSPromise = Method.getGetData(`/scheduleSubjectTeacherSubject?PageSize=10&SchoolID=${SchoolID}&PeriodID=${PeriodID}&SubjectID=''&WeekNO=0&PageIndex=1`);


            Promise.all([getSCGCPromise,getSTSPromise]).then((res)=>{
                //将课程、学期、等等放到redux中
                // res[0].Data['NowWeekNo'] = PeriodWeekTerm.NowWeekNo;

                res = [{
                    "Status": 200,
                    "Msg": "success",
                    "Data": {
                        "ItemClassHourCount": [{
                            "ClassHourType": 1,
                            "CountType": 4
                        }, {
                            "ClassHourType": 2,
                            "CountType": 4
                        }],
                        "ItemClassHour": [{
                            "OrderNO": 1,
                            "ClassHourNO": 1,
                            "ClassHourType": 1,
                            "StartTime": "08:30",
                            "EndTime": "09:10",
                            "ClassHourName": "第一节"
                        },
                            {
                                "OrderNO": 2,
                                "ClassHourNO": 2,
                                "ClassHourType": 1,
                                "StartTime": "09:20",
                                "EndTime": "10:00",
                                "ClassHourName": "第二节"
                            },
                            {
                                "OrderNO": 3,
                                "ClassHourNO": 3,
                                "ClassHourType": 1,
                                "StartTime": "10:20",
                                "EndTime": "11:00",
                                "ClassHourName": "第三节"
                            },
                            {
                                "OrderNO": 4,
                                "ClassHourNO": 4,
                                "ClassHourType": 1,
                                "StartTime": "11:10",
                                "EndTime": "11:50",
                                "ClassHourName": "第四节"
                            },
                            {
                                "OrderNO": 5,
                                "ClassHourNO": 5,
                                "ClassHourType": 2,
                                "StartTime": "14:00",
                                "EndTime": "14:40",
                                "ClassHourName": "第五节"
                            },
                            {
                                "OrderNO": 6,
                                "ClassHourNO": 6,
                                "ClassHourType": 2,
                                "StartTime": "14:50",
                                "EndTime": "15:30",
                                "ClassHourName": "第六节"
                            },
                            {
                                "OrderNO": 7,
                                "ClassHourNO": 7,
                                "ClassHourType": 2,
                                "StartTime": "15:40",
                                "EndTime": "16:20",
                                "ClassHourName": "第七节"
                            },
                            {
                                "OrderNO": 8,
                                "ClassHourNO": 8,
                                "ClassHourType": 2,
                                "StartTime": "16:30",
                                "EndTime": "17:10",
                                "ClassHourName": "第八节"
                            }

                        ],
                        "ItemGrade": [{
                            "GradeID": "jkkj4554",
                            "GradeName": "一年级"
                        },
                            {
                                "GradeID": "jkkj4555",
                                "GradeName": "二年级"
                            },
                            {
                                "GradeID": "jkkj4556",
                                "GradeName": "三年级"
                            },
                            {
                                "GradeID": "jkkj4557",
                                "GradeName": "四年级"
                            },
                            {
                                "GradeID": "jkkj4558",
                                "GradeName": "五年级"
                            }
                        ],

                        "ItemClassRoomType": [{
                            "ClassRoomTypeID": "f455fa",
                            "ClassRoomName": "多媒体电教室"
                        },
                            {
                                "ClassRoomTypeID": "f455fb",
                                "ClassRoomName": "多媒体语音教室"
                            },
                            {
                                "ClassRoomTypeID": "f455fc",
                                "ClassRoomName": "云网络教室"
                            }, {
                                "ClassRoomTypeID": "f455fd",
                                "ClassRoomName": "普通PC电脑室"
                            }
                        ],
                        "ItemSubject": [{
                            "SubjectID": "jkhjh41",
                            "SubjectName": "英语"
                        },
                            {
                                "SubjectID": "jkhjh42",
                                "SubjectName": "数学"
                            },
                            {
                                "SubjectID": "jkhjh43",
                                "SubjectName": "语文"
                            },
                            {
                                "SubjectID": "jkhjh44",
                                "SubjectName": "政治"
                            },
                            {
                                "SubjectID": "jkhjh45",
                                "SubjectName": "历史"
                            },
                            {
                                "SubjectID": "jkhjh46",
                                "SubjectName": "地理"
                            },
                            {
                                "SubjectID": "jkhjh47",
                                "SubjectName": "物理"
                            }

                        ]
                    }
                },{
                    "Status": 200,
                    "Msg": "success",
                    "Data": {
                        "NowWeekNO": "12",
                        "StartDate": "2018-11-12",
                        "PageIndex": 1,
                        "ItemTeacher": [

                            {
                                "OrderNO": 1,
                                "TeacherID": "T0001",
                                "TeacherName": "黄西坡"
                            },

                            {
                                "OrderNO": 2,
                                "TeacherID": "T0002",
                                "TeacherName": "苏东坡"
                            },
                            {
                                "OrderNO": 3,
                                "TeacherID": "T0003",
                                "TeacherName": "奔北坡"
                            },
                            {
                                "OrderNO": 4,
                                "TeacherID": "T0004",
                                "TeacherName": "奔南坡"
                            },
                            {
                                "OrderNO": 5,
                                "TeacherID": "T0005",
                                "TeacherName": "新加坡"
                            },
                            {
                                "OrderNO": 6,
                                "TeacherID": "T0006",
                                "TeacherName": "没有坡"
                            },
                            {
                                "OrderNO": 7,
                                "TeacherID": "T0007",
                                "TeacherName": "向南坡"
                            },
                            {
                                "OrderNO": 8,
                                "TeacherID": "T0008",
                                "TeacherName": "不知道叫啥的坡"
                            },
                            {
                                "OrderNO": 9,
                                "TeacherID": "T0009",
                                "TeacherName": "坡啊坡"
                            },
                            {
                                "OrderNO": 10,
                                "TeacherID": "T00010",
                                "TeacherName": "到处都是坡"
                            }


                        ],
                        "ItemSchedule": [{
                            "OrderNO": 1,
                            "ScheduleID": "hhhsjhd1114",
                            "ScheduleType": 1,
                            "SubjectID": "Fhjhkj",
                            "SubjectName": "语文",
                            "TeacherID": "T0001",
                            "TeacherName": "黄西坡",
                            "ClassRoomID": "J001",
                            "ClassRoomName": "A101",
                            "ClassID": "jd45s3s45s",
                            "ClassName": "七年级1班",
                            "CourseClassID": "12d32s",
                            "CourseClassName": "语文七年级1班",
                            "WeekNO": 12,
                            "WeekDay": 1,
                            "ClassHourNO": 2
                        },

                            {
                                "OrderNO": 2,
                                "ScheduleID": "hhhsjhd1115",
                                "ScheduleType": 2,
                                "SubjectID": "Fhjhkj",
                                "SubjectName": "语文",
                                "TeacherID": "T0001",
                                "TeacherName": "黄西坡",
                                "ClassRoomID": "J006",
                                "ClassRoomName": "A102",
                                "ClassID": "jd45s3s45s",
                                "ClassName": "七年级2班",
                                "CourseClassID": "12d322",
                                "CourseClassName": "语文七年级2班",
                                "WeekNO": 12,
                                "WeekDay": 1,
                                "ClassHourNO": 5
                            },
                            {
                                "OrderNO": 3,
                                "ScheduleID": "hhhsjhd1115",
                                "ScheduleType": 3,
                                "SubjectID": "1233445",
                                "SubjectName": "数学",
                                "TeacherID": "T0002",
                                "TeacherName": "苏东坡",
                                "ClassRoomID": "J001",
                                "ClassRoomName": "A101",
                                "ClassID": "jd45s3s45635",
                                "ClassName": "七年级1班",
                                "CourseClassID": "12d322",
                                "CourseClassName": "语文七年级1班",
                                "WeekNO": 12,
                                "WeekDay": 3,
                                "ClassHourNO": 6
                            },

                            {
                                "OrderNO": 2,
                                "ScheduleID": "hhhsjhd1115",
                                "ScheduleType": 1,
                                "SubjectID": "1233445",
                                "SubjectName": "数学",
                                "TeacherID": "T0002",
                                "TeacherName": "苏东坡",
                                "ClassRoomID": "J006",
                                "ClassRoomName": "A102",
                                "ClassID": "jd45s3s45635",
                                "ClassName": "七年级1班",
                                "CourseClassID": "12d32223",
                                "CourseClassName": "数学七年级1班",
                                "WeekNO": 12,
                                "WeekDay": 0,
                                "ClassHourNO": 7
                            }
                        ]
                    }
                }];

                let NowWeekNo = PeriodWeekTerm.NowWeekNo;

                dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0].Data});

                dispatch({type:STSActions.STS_NOW_WEEK_CHANGE,data:NowWeekNo});

                //组织课表的信息存放到redux中
                const json = res[1].Data;

                let SubjectTeacherSchedule =  json.ItemTeacher.map((item) => {

                    let teacherObj = {

                        id:item.TeacherID,

                        name:item.TeacherName

                    };

                    let list = json.ItemSchedule.map((i) => {

                        if (i.TeacherID === item.TeacherID){

                            return {

                                type:i.ScheduleType,

                                title:(i.ClassName!==''?i.ClassName:CourseClassName),

                                titleID:(i.ClassName!==''?i.ClassID:CourseClassID),

                                secondTitle:i.SubjectName,

                                secondTitleID:i.SubjectID,

                                thirdTitle:i.ClassRoomName,

                                thirdTitleID:i.ClassRoomID,

                                WeekDay:i.WeekDay,

                                ClassHourNO:i.ClassHourNO

                            };

                        }else {

                            return ;

                        }

                    }).filter(i => {return i!==undefined});

                    teacherObj['list'] = list;

                    return teacherObj;

                });

                dispatch({type:STSActions.SUBJECT_TEACHER_SCHEDULE_INIT,data:SubjectTeacherSchedule});

                dispatch({type:STSActions.LOADING_HIDE});

                dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

            });

        }else{//如果前面获取的周次、学段信息没获得，等待获得。

            let  PeriodWeekTermInterVal =  setInterval(()=>{

                const {PeriodWeekTerm,LoginUser} = getState();

                if (PeriodWeekTerm&&PeriodWeekTerm.ItemPeriod){

                    clearInterval(PeriodWeekTermInterVal);

                    //异步获取到周次、学段信息等

                    let SchoolID =LoginUser.SchoolID;//需要的参数后期加入

                    let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数

                    let getSCGCPromise = Method.getGetData(`/scheduleSubjectGrade?SchoolID=${SchoolID}&PeriodID=${PeriodID}`);

                    let getSTSPromise = Method.getGetData(`/scheduleSubjectTeacherSubject?PageSize=10&SchoolID=${SchoolID}&PeriodID=${PeriodID}&SubjectID=''&WeekNO=0&PageIndex=1`);


                    Promise.all([getSCGCPromise,getSTSPromise]).then((res)=>{
                        //将课程、学期、等等放到redux中
                       // res[0].Data['NowWeekNo'] = PeriodWeekTerm.NowWeekNo;

                        res = [{
                            "Status": 200,
                            "Msg": "success",
                            "Data": {
                                "ItemClassHourCount": [{
                                    "ClassHourType": 1,
                                    "CountType": 4
                                }, {
                                    "ClassHourType": 2,
                                    "CountType": 4
                                }],
                                "ItemClassHour": [{
                                    "OrderNO": 1,
                                    "ClassHourNO": 1,
                                    "ClassHourType": 1,
                                    "StartTime": "08:30",
                                    "EndTime": "09:10",
                                    "ClassHourName": "第一节"
                                },
                                    {
                                        "OrderNO": 2,
                                        "ClassHourNO": 2,
                                        "ClassHourType": 1,
                                        "StartTime": "09:20",
                                        "EndTime": "10:00",
                                        "ClassHourName": "第二节"
                                    },
                                    {
                                        "OrderNO": 3,
                                        "ClassHourNO": 3,
                                        "ClassHourType": 1,
                                        "StartTime": "10:20",
                                        "EndTime": "11:00",
                                        "ClassHourName": "第三节"
                                    },
                                    {
                                        "OrderNO": 4,
                                        "ClassHourNO": 4,
                                        "ClassHourType": 1,
                                        "StartTime": "11:10",
                                        "EndTime": "11:50",
                                        "ClassHourName": "第四节"
                                    },
                                    {
                                        "OrderNO": 5,
                                        "ClassHourNO": 5,
                                        "ClassHourType": 2,
                                        "StartTime": "14:00",
                                        "EndTime": "14:40",
                                        "ClassHourName": "第五节"
                                    },
                                    {
                                        "OrderNO": 6,
                                        "ClassHourNO": 6,
                                        "ClassHourType": 2,
                                        "StartTime": "14:50",
                                        "EndTime": "15:30",
                                        "ClassHourName": "第六节"
                                    },
                                    {
                                        "OrderNO": 7,
                                        "ClassHourNO": 7,
                                        "ClassHourType": 2,
                                        "StartTime": "15:40",
                                        "EndTime": "16:20",
                                        "ClassHourName": "第七节"
                                    },
                                    {
                                        "OrderNO": 8,
                                        "ClassHourNO": 8,
                                        "ClassHourType": 2,
                                        "StartTime": "16:30",
                                        "EndTime": "17:10",
                                        "ClassHourName": "第八节"
                                    }

                                ],
                                "ItemGrade": [{
                                    "GradeID": "jkkj4554",
                                    "GradeName": "一年级"
                                },
                                    {
                                        "GradeID": "jkkj4555",
                                        "GradeName": "二年级"
                                    },
                                    {
                                        "GradeID": "jkkj4556",
                                        "GradeName": "三年级"
                                    },
                                    {
                                        "GradeID": "jkkj4557",
                                        "GradeName": "四年级"
                                    },
                                    {
                                        "GradeID": "jkkj4558",
                                        "GradeName": "五年级"
                                    }
                                ],

                                "ItemClassRoomType": [{
                                    "ClassRoomTypeID": "f455fa",
                                    "ClassRoomName": "多媒体电教室"
                                },
                                    {
                                        "ClassRoomTypeID": "f455fb",
                                        "ClassRoomName": "多媒体语音教室"
                                    },
                                    {
                                        "ClassRoomTypeID": "f455fc",
                                        "ClassRoomName": "云网络教室"
                                    }, {
                                        "ClassRoomTypeID": "f455fd",
                                        "ClassRoomName": "普通PC电脑室"
                                    }
                                ],
                                "ItemSubject": [{
                                    "SubjectID": "jkhjh41",
                                    "SubjectName": "英语"
                                },
                                    {
                                        "SubjectID": "jkhjh42",
                                        "SubjectName": "数学"
                                    },
                                    {
                                        "SubjectID": "jkhjh43",
                                        "SubjectName": "语文"
                                    },
                                    {
                                        "SubjectID": "jkhjh44",
                                        "SubjectName": "政治"
                                    },
                                    {
                                        "SubjectID": "jkhjh45",
                                        "SubjectName": "历史"
                                    },
                                    {
                                        "SubjectID": "jkhjh46",
                                        "SubjectName": "地理"
                                    },
                                    {
                                        "SubjectID": "jkhjh47",
                                        "SubjectName": "物理"
                                    }

                                ]
                            }
                        },{
                            "Status": 200,
                            "Msg": "success",
                            "Data": {
                                "NowWeekNO": "12",
                                "StartDate": "2018-11-12",
                                "PageIndex": 1,
                                "ItemTeacher": [

                                    {
                                        "OrderNO": 1,
                                        "TeacherID": "T0001",
                                        "TeacherName": "黄西坡"
                                    },

                                    {
                                        "OrderNO": 2,
                                        "TeacherID": "T0002",
                                        "TeacherName": "苏东坡"
                                    },
                                    {
                                        "OrderNO": 3,
                                        "TeacherID": "T0003",
                                        "TeacherName": "奔北坡"
                                    },
                                    {
                                        "OrderNO": 4,
                                        "TeacherID": "T0004",
                                        "TeacherName": "奔南坡"
                                    },
                                    {
                                        "OrderNO": 5,
                                        "TeacherID": "T0005",
                                        "TeacherName": "新加坡"
                                    },
                                    {
                                        "OrderNO": 6,
                                        "TeacherID": "T0006",
                                        "TeacherName": "没有坡"
                                    },
                                    {
                                        "OrderNO": 7,
                                        "TeacherID": "T0007",
                                        "TeacherName": "向南坡"
                                    },
                                    {
                                        "OrderNO": 8,
                                        "TeacherID": "T0008",
                                        "TeacherName": "不知道叫啥的坡"
                                    },
                                    {
                                        "OrderNO": 9,
                                        "TeacherID": "T0009",
                                        "TeacherName": "坡啊坡"
                                    },
                                    {
                                        "OrderNO": 10,
                                        "TeacherID": "T00010",
                                        "TeacherName": "到处都是坡"
                                    }


                                ],
                                "ItemSchedule": [{
                                    "OrderNO": 1,
                                    "ScheduleID": "hhhsjhd1114",
                                    "ScheduleType": 1,
                                    "SubjectID": "Fhjhkj",
                                    "SubjectName": "语文",
                                    "TeacherID": "T0001",
                                    "TeacherName": "黄西坡",
                                    "ClassRoomID": "J001",
                                    "ClassRoomName": "A101",
                                    "ClassID": "jd45s3s45s",
                                    "ClassName": "七年级1班",
                                    "CourseClassID": "12d32s",
                                    "CourseClassName": "语文七年级1班",
                                    "WeekNO": 12,
                                    "WeekDay": 1,
                                    "ClassHourNO": 2
                                },

                                    {
                                        "OrderNO": 2,
                                        "ScheduleID": "hhhsjhd1115",
                                        "ScheduleType": 2,
                                        "SubjectID": "Fhjhkj",
                                        "SubjectName": "语文",
                                        "TeacherID": "T0001",
                                        "TeacherName": "黄西坡",
                                        "ClassRoomID": "J006",
                                        "ClassRoomName": "A102",
                                        "ClassID": "jd45s3s45s",
                                        "ClassName": "七年级2班",
                                        "CourseClassID": "12d322",
                                        "CourseClassName": "语文七年级2班",
                                        "WeekNO": 12,
                                        "WeekDay": 1,
                                        "ClassHourNO": 5
                                    },
                                    {
                                        "OrderNO": 3,
                                        "ScheduleID": "hhhsjhd1115",
                                        "ScheduleType": 3,
                                        "SubjectID": "1233445",
                                        "SubjectName": "数学",
                                        "TeacherID": "T0002",
                                        "TeacherName": "苏东坡",
                                        "ClassRoomID": "J001",
                                        "ClassRoomName": "A101",
                                        "ClassID": "jd45s3s45635",
                                        "ClassName": "七年级1班",
                                        "CourseClassID": "12d322",
                                        "CourseClassName": "语文七年级1班",
                                        "WeekNO": 12,
                                        "WeekDay": 3,
                                        "ClassHourNO": 6
                                    },

                                    {
                                        "OrderNO": 2,
                                        "ScheduleID": "hhhsjhd1115",
                                        "ScheduleType": 1,
                                        "SubjectID": "1233445",
                                        "SubjectName": "数学",
                                        "TeacherID": "T0002",
                                        "TeacherName": "苏东坡",
                                        "ClassRoomID": "J006",
                                        "ClassRoomName": "A102",
                                        "ClassID": "jd45s3s45635",
                                        "ClassName": "七年级1班",
                                        "CourseClassID": "12d32223",
                                        "CourseClassName": "数学七年级1班",
                                        "WeekNO": 12,
                                        "WeekDay": 0,
                                        "ClassHourNO": 7
                                    }
                                ]
                            }
                        }];

                        let NowWeekNo = PeriodWeekTerm.NowWeekNo;

                        dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0].Data});

                        dispatch({type:STSActions.STS_NOW_WEEK_CHANGE,data:NowWeekNo});

                        //组织课表的信息存放到redux中
                        const json = res[1].Data;

                        let SubjectTeacherSchedule =  json.ItemTeacher.map((item) => {

                            let teacherObj = {

                                id:item.TeacherID,

                                name:item.TeacherName

                            };

                            let list = json.ItemSchedule.map((i) => {

                                if (i.TeacherID === item.TeacherID){

                                    return {

                                        type:i.ScheduleType,

                                        title:(i.ClassName!==''?i.ClassName:CourseClassName),

                                        titleID:(i.ClassName!==''?i.ClassID:CourseClassID),

                                        secondTitle:i.SubjectName,

                                        secondTitleID:i.SubjectID,

                                        thirdTitle:i.ClassRoomName,

                                        thirdTitleID:i.ClassRoomID,

                                        WeekDay:i.WeekDay,

                                        ClassHourNO:i.ClassHourNO

                                    };

                                }else {

                                    return ;

                                }

                            }).filter(i => {return i!==undefined});

                            teacherObj['list'] = list;

                            return teacherObj;

                        });

                        dispatch({type:STSActions.SUBJECT_TEACHER_SCHEDULE_INIT,data:SubjectTeacherSchedule});

                        dispatch({type:STSActions.LOADING_HIDE});

                        dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                    });

                }

            },50)

        }

    }

};

//学科教师总表教师课表界面初始化
const STTPageInit = () => {

  return (dispatch,getState) => {


      let {PeriodWeekTerm,LoginUser} = getState();
      //如果前面获取的周次、学段信息已获得
      if (PeriodWeekTerm&&PeriodWeekTerm.ItemPeriod&&LoginUser.SchoolID){

          let SchoolID =LoginUser.SchoolID;//需要的参数后期加入

          let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数

          let getSCGCPromise = Method.getGetData(`/scheduleSubjectGrade?SchoolID=${SchoolID}&PeriodID=${PeriodID}`);

          let getSTTMenuPromise = Method.getGetData(`/scheduleSubjectTeacherTeacher?SchoolID=${SchoolID}&PeriodID=${PeriodID}`);

          Promise.all([getSCGCPromise,getSTTMenuPromise]).then(res => {

              let NowWeekNo = PeriodWeekTerm.NowWeekNo;
              //将课程、学期、等等放到redux中

              dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0].Data});

              dispatch({type:STTActions.STT_NOW_WEEK_CHANGE,data:NowWeekNo});
              //根据获取的学科信息和教师信息组织数据
              let subjectList = res[0].Data.ItemSubject;

              let leftMenuData = subjectList.map((item) => {

                  let list = res[1].Data.map((i) => {

                      if (i.SubjectID===item.SubjectID){

                          return {

                              id:i.Teacher,

                              name:i.TeacherName

                          }

                      }else{

                          return;

                      }

                  }).filter((i) =>i!==undefined);

                  return {

                      id:item.SubjectID,

                      name:item.SubjectName,

                      list

                  }

              });

              dispatch({type:STTActions.TEACHER_LIST_UPDATE,data:leftMenuData});

              dispatch({type:STTActions.SCHEDULE_LOADING_HIDE});

              dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

          });

      }else{//如果前面获取的周次、学段信息没获得，等待获得。

          let  PeriodWeekTermInterVal =  setInterval(()=>{

              const {PeriodWeekTerm,LoginUser} = getState();

              if (PeriodWeekTerm&&PeriodWeekTerm.ItemPeriod){

                  clearInterval(PeriodWeekTermInterVal);

                  //异步获取到周次、学段信息等

                  let SchoolID =LoginUser.SchoolID;//需要的参数后期加入

                  let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数

                  let getSCGCPromise = Method.getGetData(`/scheduleSubjectGrade?SchoolID=${SchoolID}&PeriodID=${PeriodID}`);

                  let getSTTMenuPromise = Method.getGetData(`/scheduleSubjectTeacherTeacher?SchoolID=${SchoolID}&PeriodID=${PeriodID}`);

                  Promise.all([getSCGCPromise,getSTTMenuPromise]).then(res => {


                      let NowWeekNo = PeriodWeekTerm.NowWeekNo;

                      //将课程、学期、等等放到redux中

                      dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0].Data});

                      dispatch({type:STTActions.STT_NOW_WEEK_CHANGE,data:NowWeekNo});
                      //根据获取的学科信息和教师信息组织数据
                      let subjectList = res[0].Data.ItemSubject;

                      let leftMenuData = subjectList.map((item) => {

                          let list = res[1].Data.map((i) => {

                              if (i.SubjectID===item.SubjectID){

                                  return {

                                      id:i.Teacher,

                                      name:i.TeacherName

                                  }

                              }else{

                                  return;

                              }

                          }).filter((i) =>i!==undefined);

                          return {

                              id:item.SubjectID,

                              name:item.SubjectName,

                              list

                          }

                      });

                      dispatch({type:STTActions.TEACHER_LIST_UPDATE,data:leftMenuData});

                      dispatch({type:STTActions.SCHEDULE_LOADING_HIDE});

                      dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                  });

              }

          },50)

      }

  }

};



export default {

    STSPageInit,

    STTPageInit

}