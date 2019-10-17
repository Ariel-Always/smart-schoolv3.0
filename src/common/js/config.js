import logo from '../images/frame/logo.png';

let config = {};

if (process.env.NODE_ENV === 'development'){

    config = {
        name:"中小学学科一体化教育云",
        logo:logo,
        footer:"蓝鸽科技 版权所有",
        TokenProxy:'http://192.168.129.1:30103',
        SubjectProxy:'http://192.168.129.1:30103/Subject/api',
        CourseClassProxy:'http://192.168.129.1:30103/CourseClass/api',
        UserAccountProxy:'http://192.168.129.1:30103/UserMgr/UserAccount',
        TeachingSolutionProxy:'http://192.168.2.114:8090/SubjectResMgr/TeachingSolutionMgr/Teacher',
        AdmClassProxy:"http://192.168.129.1:30103",
        DeskTopProxy:"http://192.168.129.1:30103",
        ScheduleProxy:"http://192.168.129.1:30103",
        Xproxy:'http://192.168.129.1:30103/UserMgr/UserInfoMgr',
        PowerProxy:'http://192.168.129.1:30103/UserMgr/PowerMgr',
        UserInfoProxy:'http://192.168.129.1:30103/UserMgr/UserInfoMgr',
        proxy:"http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev",
        BasicProxy:'http://localhost:3000',
        LoginProxy:'http://192.168.129.2:10102',
        MockLoginProxy:'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev',
        PersonalProxy:"http://192.168.129.1:30103",
        XTestProxy:'http://192.168.129.242:8066/UserMgr/UserInfoMgr'

    }

}


if (process.env.NODE_ENV === 'production'){

    config = {
        name:"中小学学科一体化教育云",
        logo:logo,
        footer:"蓝鸽科技 版权所有",
        TokenProxy:'',
        SubjectProxy:'/Subject/api',
        CourseClassProxy:'/CourseClass/api',
        UserAccountProxy:'/UserMgr/UserAccount',
        TeachingSolutionProxy:'/SubjectResMgr/TeachingSolutionMgr/Teacher',
        AdmClassProxy:"",
        DeskTopProxy:"",
        ScheduleProxy:'',
        Xproxy:'/UserMgr/UserInfoMgr',
        PowerProxy:'/UserMgr/PowerMgr',
        UserInfoProxy:'/UserMgr/UserInfoMgr',
        BasicProxy:'http://localhost:3000',
        LoginProxy:'',
        MockLoginProxy:'',
        PersonalProxy:""
    }

}




export default config;
