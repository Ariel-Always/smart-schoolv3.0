import TeacherCustomActions from '../../actions/Teacher/TeacherCustomActions';
const TeacherCustomData = (
    state = {
        ToolData: {},
        ToolAlterData: {},
        WebsiteData: {},
        WebsiteAlterData:{},
        AppData: {},
        AppAlterData:{},
        DataBaseData: {},
        DataBaseAlterData:{}
    }, actions) => {
    switch (actions.type) {
        case TeacherCustomActions.GET_CUSTOM_DATA:
            let data = handleData(actions.data, actions.data2, actions.key)
            return Object.assign({}, state, { ...data });
        default:
            return state;
    }
};
function handleData(data, data2, key) {
    if (key === 'tool') {
        return { ToolData: data, ToolAlterData: data2 }
    } else if (key === 'App') {
        return { AppData: data, AppAlterData: data2 }
    } else if (key === 'Website') {
        return { WebsiteData: data, WebsiteAlterData: data2 }
    } else if (key === 'database') {
        return { DataBaseData: data, DataBaseAlterData: data2 }
    }
    
}

export default TeacherCustomData;