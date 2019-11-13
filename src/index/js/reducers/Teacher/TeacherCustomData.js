import TeacherCustomActions from '../../actions/Teacher/TeacherCustomActions';
const TeacherCustomData = (
    state = {
        ToolData: [],
        ToolAlterData: [],
        WebsiteData: [],
        WebsiteAlterData: [],
        AppData: [],
        AppAlterData: [],
        DataBaseData: [],
        DataBaseAlterData: [],
        AlterPeriod: [],
        TipsShow: {
            WebsiteTipsShow: false,
            ToolTipsShow: false,
            AppTipsShow: false,
            DataBaseTipsShow: false
        }
    }, actions) => {
    let TipsShow = '';
    switch (actions.type) {
        case TeacherCustomActions.GET_CUSTOM_DATA:
            let data = handleData(actions.data, actions.data2, actions.key)
            return Object.assign({}, state, { ...data });
        case TeacherCustomActions.SET_CUSTOM_DATA:
            let newData = handleCustomData(actions.dataType, actions.dataObj, actions.source, actions.destination, state.WebsiteAlterData)
            return Object.assign({}, state, { ...newData });
        case TeacherCustomActions.SET_ONE_CUSTOM_DATA:
            let oneData = handleOneCustomData(actions.dataObj, actions.source)
            return Object.assign({}, state, { ...oneData });
        case TeacherCustomActions.GET_ALTER_PERIOD_DATA:
            return Object.assign({}, state, { AlterPeriod: actions.data });
        case TeacherCustomActions.GET_ALTER_DATA:
            return Object.assign({}, state, { WebsiteAlterData: handleWebsiteAlter(actions.data) });
        case TeacherCustomActions.GET_WEBSITE_ALTER_TIPS:
            TipsShow = Object.assign({}, state.TipsShow, { WebsiteTipsShow: actions.data });
            return Object.assign({}, state, { TipsShow });
        case TeacherCustomActions.GET_TOOL_ALTER_TIPS:
            TipsShow = Object.assign({}, state.TipsShow, { ToolTipsShow: actions.data });
            return Object.assign({}, state, { TipsShow });
        case TeacherCustomActions.GET_APP_ALTER_TIPS:
            TipsShow = Object.assign({}, state.TipsShow, { AppTipsShow: actions.data });
            return Object.assign({}, state, { TipsShow });
        case TeacherCustomActions.GET_DATABASE_ALTER_TIPS:
            TipsShow = Object.assign({}, state.TipsShow, { DataBaseTipsShow: actions.data });
            return Object.assign({}, state, { TipsShow });
        default:
            return state;
    }
};
function handleData(data, data2, key) {
    if (key === 'tool') {
        return { ToolData: handleWebsiteMain(data), ToolAlterData: handleAlter(data2) }
    } else if (key === 'App') {
        return { AppData: handleWebsiteMain(data), AppAlterData: handleAlter(data2) }
    } else if (key === 'Website') {
        return { WebsiteData: handleWebsiteMain(data), WebsiteAlterData: handleWebsiteAlter(data2) }
    } else if (key === 'database') {
        return { DataBaseData: handleWebsiteMain(data), DataBaseAlterData:  handleAlter(data2) }
    }

}

function handleWebsiteMain(data) {
    let main = []
    data instanceof Array && data.map((child, index) => {
        if (!child.IsGroup) {
            main = Sort(main, child)
        } else {
            let group = []
            child.List.map((child2, index2) => {
                group = Sort(group, child2)
            })
            group.map((child2, index2) => {
                child2.key = index2
                return child2
            })
            child.List = group;
            main = Sort(main, child)
        }
    })
    main.map((child, index) => {
        child.key = index;
        return child
    })
    return main
}
function handleWebsiteAlter(data) {
    if(!(data instanceof Array))
    return []
    let newData =  data.map((child, index) => {
        let List = child.List.map((child1, index1) => {
            let number = Math.random() * 3
            let myColor = number > 2 ? 'blue' : number > 1 ? 'orange' : 'green';
            child1.myColor = myColor//设计颜色
            child1.Img = child1.ModuleLogoPath||child1.ImgUrl || (UrlGetIcon(child1.Url) + '/favicon.ico')// data数据处理:img
            return child1
        })

        child.List = List;
        return child;
    })
    return newData;
}
function handleAlter(data) {
    if(!(data instanceof Array))
    return []
    let newData = data.map((child, index) => {
            let number = Math.random() * 3
            let myColor = number > 2 ? 'blue' : number > 1 ? 'orange' : 'green';
            child.myColor = myColor//设计颜色
            child.key = child.OrderNo
            child.Img = child.ModuleLogoPath||child.ImgUrl || (UrlGetIcon(child.Url) + '/favicon.ico')// data数据处理:img
            return child
    })
    return [{List:newData}];
    
}
// 排序
function Sort(dataArr, data) {
    let end = dataArr
    let first = true;
    let number = Math.random() * 3
    let myColor = number > 2 ? 'blue' : number > 1 ? 'orange' : 'green';
    data.myColor = myColor//设计颜色
    let Img = data.ImgUrl || (UrlGetIcon(data.Url) + '/favicon.ico')// data数据处理:img
    data.Img = Img
    if (data.IsGroup) {
        data.Name = data.GroupName;
        data.ID = data.GroupId
    }
    if (dataArr instanceof Array && !dataArr.length) {
        end.push(data)
    } else {
        dataArr instanceof Array && dataArr.map((child, index) => {
            if (first && child.OrderNo > data.OrderNo) {
                end.splice(index, 0, data)
                first = false
            } else if (first && index === dataArr.length - 1) {
                end.push(data)
            }
        })

    }

    return end;
}

// 滑块
function handleCustomData(type, data, source, destination, WebsiteAlterData) {
    let droppableSource = [];
    let droppableDestination = [];
    let newData = {}
    let dataKeys = []
    for (let key in data) {
        dataKeys.push(key);
    }
    if (dataKeys.length === 2) {
        if (destination.droppableId.indexOf('alter') === -1) {
            droppableDestination = Array.from(data[dataKeys[0]]);
            droppableSource = Array.from(data[dataKeys[1]]);
        } else {
            droppableSource = Array.from(data[dataKeys[0]]);
            droppableDestination = Array.from(data[dataKeys[1]]);
        }

    } else if (dataKeys.length === 1) {
        droppableDestination = droppableSource = Array.from(data[dataKeys[0]]);
    } else {
        // console.log(dataKeys)
    }

    if (type === 'main') {
        newData[dataKeys[0]] = reorder(droppableSource, source.index, destination.index)
    } else if (type === 'alter') {
        newData = move(droppableSource, droppableDestination, source, destination, dataKeys, WebsiteAlterData)
    }
    // console.log(newData)
    return newData;
}
// 处理一个card
const handleOneCustomData = (dataObj, source) => {
    let newData = {}
    let dataKeys = ''
    let data = []
    let Clone = ''
    for (let key in dataObj) {
        dataKeys = key;
        data = dataObj[key]
    }
    if (source.droppableId.indexOf('alter') === -1) {
        data.splice(source.index, 1)
    } else {
        let Clone = data;
        let alterIndex = Number(source.droppableId.split('alter')[1]);
        data[alterIndex].List.splice(source.index, 1)
    }
    return { dataKeys: data }
}

// 同滑块
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result.map((child, index) => {
        child.key = index
        return child
    });
};
// 不同滑块
const move = (source, destination, Source, Destination, keys, WebsiteAlterData) => {//source为原始出发数据，destination为原始目的地数据，droppableSource为插件出发对象，droppableDestination为插件目的地对象
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const result = {};
    let alterIndex = 0
    // console.log(destClone, sourceClone, Source, Destination)

    if (Destination.droppableId.indexOf('alter') === -1) {
        alterIndex = Number(Source.droppableId.split('alter')[1]);
        const [removed] = sourceClone[alterIndex].List.splice(Source.index, 1);//source去掉失去的
        if (Destination.index === -1) {
            destClone.push(removed);//destunation增加等到的
        } else {
            destClone.splice(Destination.index, 0, removed);//destunation增加等到的
        }
        // console.log(alterIndex,sourceClone,destClone,removed,sourceClone[alterIndex])

        result[keys[0]] = destClone.map((child, index) => {
            child.key = index
            return child
        });
        result[keys[1]] = sourceClone;

        result[keys[1]][alterIndex].List = sourceClone[alterIndex].List.map((child, index) => {
            child.key = index
            return child
        });;
    } else {
        //alterIndex = Number(Destination.droppableId.split('alter')[1]);
        const [removed] = sourceClone.splice(Source.index, 1);//source去掉失去的
        let SubtypeID = removed.SubTypeId;
        destClone.map((child, index) => {
            if (child.SubTypeId === SubtypeID) {
                alterIndex = index
            }
        })
        destClone[alterIndex].List.push(removed);//destunation增加等到的
        result[keys[0]] = sourceClone.map((child, index) => {
            child.key = index
            return child
        });
        result[keys[1]] = destClone;
        result[keys[1]][alterIndex].List = destClone[alterIndex].List.map((child, index) => {
            child.key = index
            return child
        });;
    }
    // console.log(destClone, sourceClone, result)


    // if (Destination.droppableId.indexOf('alter') === '-1') {
    //     alterIndex = Source.droppableId.split('alter')[1];
    //     result[keys[1]][alterIndex].List = destClone.map((child, index) => {
    //         child.key = index
    //         return child
    //     });;
    // } else {
    //     alterIndex = Destination.droppableId.split('alter')[1];
    //     result[keys[1]][alterIndex].List = destClone.map((child, index) => {
    //         child.key = index
    //         return child
    //     });;
    // }
    // result[keys[1]] = destClone.map((child, index) => {
    //     child.key = index
    //     return child
    // });;

    return result
};
// 处理url适合获取icon
const UrlGetIcon = (url) => {
    let urlArr = ''
    // console.log(url,url instanceof String,typeof url)
    if (typeof url !== 'string') {
        return
    }
    if (url.indexOf('://') !== '-1') {
        urlArr = url.split('/').slice(0, 3).join('/')
        // console.log(urlArr)
        return urlArr
    } else {
        urlArr = url.split('/')[0];
        // console.log(urlArr)

        return urlArr
    }

}
export default TeacherCustomData;