const InitState = ({props,type}) => {

    if (type==='excel'){

        return {

            Step:1,

            ImportTitle:props.ImportTitle?props.ImportTitle:"",

            ImportTarget:props.ImportTarget?props.ImportTarget:'student',

            UpLoadFileName:'请选择文件...',

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