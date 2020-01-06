import CollectorAction from '../action/CollectorAction'




const CollectDataChange = (state = {
    folderResInfo: {
        List: []
    },
    collectionResult: [],
    typeList: [],
    currentPath: [{ "folderId": "", "folderName": "资料收藏夹" }],
    folderInfo:[],
    rightSelect:"recent"


}, action) => {
    switch (action.type) {
        case CollectorAction.GET_FOLDER_RESCOURCE_INFO:
            return {
                ...state,
                // ...folderResInfo, 
                // List:action.data.List,
                folderResInfo: action.data
            }
        case CollectorAction.REFRESH_FOLDERRES_INFO:
            return {
                ...state,
                folderResInfo: action.data
            }
        case CollectorAction.GET_RECENT_COLLECTOR_INFO:
            return {
                ...state,
                collectionResult: action.data
            }
        case CollectorAction.GET_COLLECTOR_RANK_INFO:
            return {
                ...state,
                collectionResult: action.data
            }
        case CollectorAction.GET_COLLECTOR_INFO_FROM_TYPE:
            return {
                ...state,
                typeList: action.data
            }
        case CollectorAction.REFRESH_COLLECT_RESULT:
            return {
                ...state,
                collectionResult: action.data
            }
        case CollectorAction.UPDATE_CURRENT_PATH:
            return {
                ...state,
                currentPath: action.data
            }
        case CollectorAction.GET_FOLDER_INFO:
            return {
                ...state,
                folderInfo: action.data
            }
        case CollectorAction.STORE_RIGHT_CONTENT:
            return{
                ...state,
                rightSelect:action.data
            }    

        default:
            return state;
    }
};
export default CollectDataChange