import CONFIG from '../../../common/js/config';

const InitState = ({props,type}) => {

    if (type==='excel'){

        return {

            Step:1,

            ImportTitle:props.ImportTitle?props.ImportTitle:"",

            ImportTarget:props.ImportTarget?props.ImportTarget:'',

            FtpPath:'',

           /* UpLoadLoading:true,

            ModulesLink:[],*/

            UpLoadFileName:'请选择文件...',

            ImportMouldes:[

                {

                    ID:'student',

                    Url:`${CONFIG.Import}/UserMgr/Comm/Controls/Import/DownloadFile.ashx?fileUrl=~%2FUserMgr%2FUserInfoMgr%2FTemplate%2F%E3%80%90%E6%A8%A1%E6%9D%BF%E3%80%91%E5%AD%A6%E7%94%9F%E4%BF%A1%E6%81%AF.xls`

                },

                {

                    ID:'teacher',

                    Url:`${CONFIG.Import}/UserMgr/Comm/Controls/Import/DownloadFile.ashx?fileUrl=~%2FUserMgr%2FUserInfoMgr%2FTemplate%2F%E3%80%90%E6%A8%A1%E6%9D%BF%E3%80%91%E6%95%99%E5%B8%88%E4%BF%A1%E6%81%AF.xls`

                },

                {

                    ID:'leader',

                    Url:`${CONFIG.Import}/UserMgr/Comm/Controls/Import/DownloadFile.ashx?fileUrl=~%2FUserMgr%2FUserInfoMgr%2FTemplate%2F%E3%80%90%E6%A8%A1%E6%9D%BF%E3%80%91%E5%AD%A6%E6%A0%A1%E9%A2%86%E5%AF%BC%E4%BF%A1%E6%81%AF.xls`

                },

                {

                    ID:'courseteacher',

                    Url:`${CONFIG.Import}/UserMgr/Comm/Controls/Import/DownloadFile.ashx?fileUrl=~%2FUserMgr%2FClassMgr%2FTemplate%2F%E3%80%90%E6%A8%A1%E6%9D%BF%E3%80%91%E4%BB%BB%E8%AF%BE%E6%95%99%E5%B8%88%E4%BF%A1%E6%81%AF.xls`

                },

                {

                    ID:'gangermonitor',

                    Url:`${CONFIG.Import}/UserMgr/Comm/Controls/Import/DownloadFile.ashx?fileUrl=~%2FUserMgr%2FClassMgr%2FTemplate%2F%E3%80%90%E6%A8%A1%E6%9D%BF%E3%80%91%E7%8F%AD%E4%B8%BB%E4%BB%BB%E7%8F%AD%E9%95%BF%E4%BF%A1%E6%81%AF.xls`

                },

                {

                    ID:'graduate',

                    Url:`${CONFIG.Import}/UserMgr/Comm/Controls/Import/DownloadFile.ashx?fileUrl=~%2FUserMgr%2FUserInfoMgr%2FTemplate%2F%E3%80%90%E6%A8%A1%E6%9D%BF%E3%80%91%E6%AF%95%E4%B8%9A%E5%8E%BB%E5%90%91%E4%BF%A1%E6%81%AF.xls`

                },


            ],

            StepLoading:false,

            UpLoadFile:'',

            AlertObj:{

                Type:1,

                Title:'',

                Show:false,

                Hide:'',

                Close:'',

                Cancel:'',

                Ok:''

            },

            BackEndData:[],

            BackEndDataCopy:[],

            BackEndFileParam:{



            },

            UpLoadResult:{

                Success:0,

                Error:0,

                Unique:0,

                DownLoadPath:''

            }

        }

    }else if (type==='photo') {

        return {

            Step:1,

            ImportTitle:props.ImportTitle?props.ImportTitle:"",

            ImportTarget:props.ImportTarget?props.ImportTarget:'Student',

            UpLoadFileName:'请选择文件...',

            UpLoadFile:'',

            AlertObj:{

                Type:1,

                Title:'',

                Show:false,

                Hide:'',

                Close:'',

                Cancel:'',

                Ok:''

            },

            UpLoadResult:{

                CompressFaile: [],

                Error: 0,

                NotExist: [],

                NotPic: [],

                Total: 0

            },

            BlockSize:1024 * 1024 * 2,

            UpLoadPercent:0,

            FtpPath:''

        }

    }



};

export default InitState;