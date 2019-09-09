//课表的mock数据
const  Mock  = require('mockjs');


console.log(Mock);
//模拟的登录用户的接口

Mock.mock('/Login','get',{
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


        }
});


//模拟的课表的接口
Mock.mock('/scheduleAddSchedule','post',{
    "Status": 200,
    "Msg": "success"
});

Mock.mock('/scheduleAdjusrtTimeCommit','post',{
    "Status": 200,
    "Msg": "success"
});

Mock.mock('/scheduleAllPeriodClassHour','get',{
    "Status": 200,
    "Msg": "success",
    "Data": {
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

        "ItemClassHour": [
            {
                "PeriodID": "P1",
                "ClassHourType": 1,
                "ClassHourNO": 1,
                "ClassHourName": "第一节",
                "StartTime": "08:30",
                "EndTime": "09:15"
            },
            {
                "PeriodID": "P1",
                "ClassHourType": 1,
                "ClassHourNO": 2,
                "ClassHourName": "第二节",
                "StartTime": "09:25",
                "EndTime": "10:10"
            },
            {
                "PeriodID": "P1",
                "ClassHourType": 1,
                "ClassHourNO": 3,
                "ClassHourName": "第三节",
                "StartTime": "10:20",
                "EndTime": "11:05"
            },
            {
                "PeriodID": "P1",
                "ClassHourType":2,
                "ClassHourNO": 4,
                "ClassHourName": "第四节",
                "StartTime": "14:20",
                "EndTime": "15:05"
            },
            {
                "PeriodID": "P1",
                "ClassHourType": 2,
                "ClassHourNO": 5,
                "ClassHourName": "第五节",
                "StartTime": "15:15",
                "EndTime": "16:00"
            },{
                "PeriodID": "P1",
                "ClassHourType": 2,
                "ClassHourNO":6,
                "ClassHourName": "第六节",
                "StartTime": "16:10",
                "EndTime": "16:55"
            },

            {
                "PeriodID": "P2",
                "ClassHourType": 1,
                "ClassHourNO": 1,
                "ClassHourName": "第一节",
                "StartTime": "08:00",
                "EndTime": "08:45"
            },
            {
                "PeriodID": "P2",
                "ClassHourType": 1,
                "ClassHourNO": 2,
                "ClassHourName": "第二节",
                "StartTime": "08:55",
                "EndTime": "09:40"
            },
            {
                "PeriodID": "P2",
                "ClassHourType": 1,
                "ClassHourNO": 3,
                "ClassHourName": "第三节",
                "StartTime": "10:00",
                "EndTime": "10:45"
            },
            {
                "PeriodID": "P2",
                "ClassHourType":1,
                "ClassHourNO": 4,
                "ClassHourName": "第四节",
                "StartTime": "10:55",
                "EndTime": "11:40"
            },
            {
                "PeriodID": "P2",
                "ClassHourType": 2,
                "ClassHourNO": 5,
                "ClassHourName": "第五节",
                "StartTime": "14:00",
                "EndTime": "14:45"
            },{
                "PeriodID": "P2",
                "ClassHourType": 2,
                "ClassHourNO":6,
                "ClassHourName": "第六节",
                "StartTime": "14:55",
                "EndTime": "15:40"
            },

            {
                "PeriodID": "P2",
                "ClassHourType": 2,
                "ClassHourNO":7,
                "ClassHourName": "第七节",
                "StartTime": "15:50",
                "EndTime": "16:35"
            },

            {
                "PeriodID": "P2",
                "ClassHourType": 2,
                "ClassHourNO":8,
                "ClassHourName": "第八节",
                "StartTime": "16:45",
                "EndTime": "17:30"
            },

            {
                "PeriodID": "P2",
                "ClassHourType": 3,
                "ClassHourNO":9,
                "ClassHourName": "第九节",
                "StartTime": "19:00",
                "EndTime": "19:45"
            },
            {
                "PeriodID": "P2",
                "ClassHourType": 3,
                "ClassHourNO":10,
                "ClassHourName": "第十节",
                "StartTime": "19:55",
                "EndTime": "20:40"
            },
            {
                "PeriodID": "P3",
                "ClassHourType": 1,
                "ClassHourNO": 1,
                "ClassHourName": "第一节",
                "StartTime": "08:00",
                "EndTime": "08:40"
            },
            {
                "PeriodID": "P3",
                "ClassHourType": 1,
                "ClassHourNO": 2,
                "ClassHourName": "第二节",
                "StartTime": "08:50",
                "EndTime": "09:30"
            },
            {
                "PeriodID": "P3",
                "ClassHourType": 1,
                "ClassHourNO": 3,
                "ClassHourName": "第三节",
                "StartTime": "09:50",
                "EndTime": "10:30"
            },
            {
                "PeriodID": "P3",
                "ClassHourType":1,
                "ClassHourNO": 4,
                "ClassHourName": "第四节",
                "StartTime": "10:40",
                "EndTime": "11:20"
            },
            {
                "PeriodID": "P3",
                "ClassHourType": 1,
                "ClassHourNO": 5,
                "ClassHourName": "第五节",
                "StartTime": "11:30",
                "EndTime": "12:00"
            },{
                "PeriodID": "P3",
                "ClassHourType": 2,
                "ClassHourNO":6,
                "ClassHourName": "第六节",
                "StartTime": "14:00",
                "EndTime": "14:40"
            },

            {
                "PeriodID": "P3",
                "ClassHourType": 2,
                "ClassHourNO":7,
                "ClassHourName": "第七节",
                "StartTime": "14:50",
                "EndTime": "15:30"
            },

            {
                "PeriodID": "P3",
                "ClassHourType": 2,
                "ClassHourNO":8,
                "ClassHourName": "第八节",
                "StartTime": "15:40",
                "EndTime": "16:20"
            },

            {
                "PeriodID": "P3",
                "ClassHourType": 2,
                "ClassHourNO":9,
                "ClassHourName": "第九节",
                "StartTime": "16:30",
                "EndTime": "17:10"
            },
            {
                "PeriodID": "P3",
                "ClassHourType": 3,
                "ClassHourNO":10,
                "ClassHourName": "第十节",
                "StartTime": "19:00",
                "EndTime": "19:40"
            },
            {
                "PeriodID": "P3",
                "ClassHourType": 3,
                "ClassHourNO":11,
                "ClassHourName": "第十一节",
                "StartTime": "19:50",
                "EndTime": "20:30"
            },
            {
                "PeriodID": "P3",
                "ClassHourType": 3,
                "ClassHourNO":12,
                "ClassHourName": "第十二节",
                "StartTime": "20:40",
                "EndTime": "21:20"
            }


        ],


    }
});

Mock.mock('/scheduleDateUpdate','post',{
    "Status": 200,
    "Msg": "success",
    "Data": {
            "WeekNO": Mock.Random.integer(1, 29),
            "WeekDay": Mock.Random.integer(0, 6)
        }
});

Mock.mock('/scheduleDelSchedule','post',{
    "Status": 200,
    "Msg": "success"

});

Mock.mock('/schedulePeriod','get',{
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
});

Mock.mock('/scheduleSearchClass','get',{
    "Status": 200,
    "Msg": "success",
    "Data":  [ {
        "GradeID": "jkkj4551",
        "ClassID": "jkkj4551sdfs",
        "ClassName": "一年级1班"
    },
        {
            "GradeID": "jkkj4551",
            "ClassID": "jkkj4551dfsdfdg",
            "ClassName": "一年级2班"
        },
        {
            "GradeID": "jkkj4552",
            "ClassID": "jkkj4552bghsfd",
            "ClassName": "二年级1班"
        },
        {
            "GradeID": "jkkj4552",
            "ClassID": "jkkj4552bgnfgdf",
            "ClassName": "二年级2班"
        },
        {
            "GradeID": "jkkj4552",
            "ClassID": "jkkj4552zcnbm",
            "ClassName": "二年级3班"
        },
        {
            "GradeID": "jkkj4552",
            "ClassID": "jkkj4552vbvxcv",
            "ClassName": "二年级4班"
        },
        {
            "GradeID": "jkkj4553",
            "ClassID": "jkkj4553dvcvbvnszc",
            "ClassName": "三年级1班"
        },
        {
            "GradeID": "jkkj4553",
            "ClassID": "jkkj4553zxcvfhggh",
            "ClassName": "三年级2班"
        },
        {
            "GradeID": "jkkj4553",
            "ClassID": "jkkj4553zcfhgfhg",
            "ClassName": "三年级3班"
        },
        {
            "GradeID": "jkkj4554",
            "ClassID": "jkkj4554vncvc",
            "ClassName": "四年级1班"
        }

    ]
});

Mock.mock('/scheduleSearchClassRoom','get',{
    "Status": 200,
    "Msg": "success",
    "Data": [
        {
            "ClassRoomTypeID": "f455f1",
            "ClassRoomID": "f455f1sdsdf",
            "ClassRoomName": "A栋501"
        },
        {
            "ClassRoomTypeID": "f455f1",
            "ClassRoomID": "f455f1dsfsdf",
            "ClassRoomName": "A栋502"
        },
        {
            "ClassRoomTypeID": "f455f1",
            "ClassRoomID": "f455f1fghfgh",
            "ClassRoomName": "A栋503"
        },
        {
            "ClassRoomTypeID": "f455f2",
            "ClassRoomID": "f455f2dfgfh",
            "ClassRoomName": "B栋501"
        },
        {
            "ClassRoomTypeID": "f455f2",
            "ClassRoomID": "f455f2gfhzxcz",
            "ClassRoomName": "B栋502"
        },
        {
            "ClassRoomTypeID": "f455f2",
            "ClassRoomID": "f455f2cvZsds",
            "ClassRoomName": "B栋503"
        }

    ]
});

Mock.mock('/scheduleStopSchedule','post',{
    "Status": 200,
    "Msg": "success"

});

Mock.mock('/scheduleSubjectGrade','get',{
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
});

Mock.mock('/scheduleSubjectGrade-teacher','get',{
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
});

Mock.mock('/scheduleSubjectTeacherSubject','get',{
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
});

Mock.mock('/scheduleSubjectTeacherTeacher','get',{
    "Status": 200,
    "Msg": "success",
    "Data": [{
            "SubjectID": "jkhjh41",
            "Teacher": "T0001",
            "TeacherName": Mock.Random.cname()
        },
            {
                "SubjectID": "jkhjh41",
                "Teacher": "T0002",
                "TeacherName": Mock.Random.cname()
            },
            {
                "SubjectID": "jkhjh41",
                "Teacher": "T0003",
                "TeacherName": Mock.Random.cname()
            },
            {
                "SubjectID": "jkhjh41",
                "Teacher": "T0004",
                "TeacherName": Mock.Random.cname()
            },
            {
                "SubjectID": "jkhjh41",
                "Teacher": "T0005",
                "TeacherName": Mock.Random.cname()
            },
            {
                "SubjectID": "jkhjh42",
                "Teacher": "T0006",
                "TeacherName": Mock.Random.cname()
            },

            {
                "SubjectID": "jkhjh42",
                "Teacher": "T0007",
                "TeacherName": Mock.Random.cname()
            },
            {
                "SubjectID": "jkhjh42",
                "Teacher": "T0008",
                "TeacherName": Mock.Random.cname()
            },
            {
                "SubjectID": "jkhjh46",
                "Teacher": "T0009",
                "TeacherName": Mock.Random.cname()
            },
            {
                "SubjectID": "jkhjh46",
                "Teacher": "T00010",
                "TeacherName": Mock.Random.cname()
            },
            {
                "SubjectID": "jkhjh46",
                "Teacher": "T00011",
                "TeacherName": Mock.Random.cname()
            },
            {
                "SubjectID": "jkhjh46",
                "Teacher": "T00012",
                "TeacherName": Mock.Random.cname()
            }

        ]
});

Mock.mock('/scheduleSubjectTeacherTeacherSchedule','get',{
    "Status": 200,
    "Msg": "success",
    "Data": {
        "NowWeekNO": "3",
        "NowDate": '2019-9-3',
        "StartDate": "2019-9-9",
        "ScheduleCount": 20,
        "ItemSchedule": [{
            "OrderNO": 1,
            "ScheduleID": "hhhsjhd1114",
            "ScheduleType": 1,
            "SubjectID": "Fhjhkj",
            "SubjectName": "语文",
            "ClassRoomID": "J001",
            "ClassRoomName": "A101",
            "ClassID": "jd45s3s45s",
            "ClassName": "七年级1班",
            "CourseClassID": "12d32s",
            "CourseClassName": "语文七年级1班",
            "WeekNO": 3,
            "WeekDay": 1,
            "ClassHourNO": 2,
            "TeacherID": "T0011",
            "TeacherName": "黄大帅",
            "ScheduleLog": "黄某某将李乐乐设为代课教师"
        },
            {
                "OrderNO": 2,
                "ScheduleID": "hhhsjhd1115",
                "ScheduleType": 2,
                "SubjectID": "Fhjhkj",
                "SubjectName": "语文",
                "ClassRoomID": "J001",
                "ClassRoomName": "A101",
                "ClassID": "jd45s3s455",
                "ClassName": "七年级1班",
                "CourseClassID": "12d32s",
                "CourseClassName": "语文七年级1班",
                "WeekNO": 3,
                "WeekDay": 1,
                "ClassHourNO": 5,
                "TeacherID": "T0011",
                "TeacherName": "黄大帅",
                "ScheduleLog": "黄某某将李乐乐设为代课教师"
            },

            {
                "OrderNO": 3,
                "ScheduleID": "hhhsjhd1115",
                "ScheduleType": 1,
                "SubjectID": "Fhjhkj",
                "SubjectName": "语文",
                "ClassRoomID": "J001",
                "ClassRoomName": "A101",
                "ClassID": "jd45s3s455",
                "ClassName": "七年级3班",
                "CourseClassID": "12d32s",
                "CourseClassName": "语文七年级1班",
                "WeekNO": 3,
                "WeekDay": 5,
                "ClassHourNO": 1,
                "TeacherID": "T0011",
                "TeacherName": "黄大帅",
                "ScheduleLog": "黄某某将李乐乐设为代课教师"
            },

            {
                "OrderNO": 1,
                "ScheduleID": "hhhsjhd1115",
                "ScheduleType": 2,
                "SubjectID": "Fhjhkj",
                "SubjectName": "体育",
                "ClassRoomID": "J001",
                "ClassRoomName": "A101",
                "ClassID": "jd45s3s455",
                "ClassName": "七年级7班",
                "CourseClassID": "12d32s",
                "CourseClassName": "语文七年级7班",
                "WeekNO": 3,
                "WeekDay": 4,
                "ClassHourNO": 8,
                "TeacherID": "T0011",
                "TeacherName": "黄大帅",
                "ScheduleLog": "黄某某将李乐乐设为代课教师"
            }


        ]
    }
});

Mock.mock('/scheduleSubjectTeacherTeacher-teacher','get',{
    "Status": 200,
    "Msg": "success",
    "Data":[{
            "SubjectID": "jkhjh41",
            "Teacher": "T0001",
            "TeacherName": Mock.Random.cname()
        },
            {
                "SubjectID": "jkhjh41",
                "Teacher": "T0002",
                "TeacherName": Mock.Random.cname()
            },
            {
                "SubjectID": "jkhjh41",
                "Teacher": "T0003",
                "TeacherName": Mock.Random.cname()
            },
            {
                "SubjectID": "jkhjh41",
                "Teacher": "T0004",
                "TeacherName": Mock.Random.cname()
            },
            {
                "SubjectID": "jkhjh41",
                "Teacher": "T0005",
                "TeacherName": Mock.Random.cname()
            }

        ]
});


















