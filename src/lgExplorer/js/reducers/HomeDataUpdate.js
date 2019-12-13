import HomeData from '../action/HomeData'


const HomeDataUpdate = (state = {
    WebsiteResLink: [],
    PeriodList: [],
    ResLinkList: [],
    MyResLibList:[]

}, action) => {
    switch (action.type) {
        case HomeData.GET_WEBSITELINK_FROM_DIFFERENT_PREIOD:

            return {
                ...state,
                WebsiteResLink: action.data
            }
        case HomeData.REFRESH_WEBSITELINK_RESOURCE:
            return {
                ...state,
                WebsiteResLink: action.data
            }
        case HomeData.GET_PEROIDLIST_INFO:
            return {
                ...state,
                PeriodList: action.data

            }
        case HomeData.GET_RESOURCE_LINK_INFO:
            return {
                ...state,
                ResLinkList: action.data
            }
        case HomeData.REFRESH_RESOURCELINK_INFO:
            return{
                ...state,
                ResLinkList: action.data
            }
        case HomeData.GET_MYRESOURCE_INFO:
            return{
                ...state,
                MyResLibList:action.data
            }    

        default:
            return state;
    }
};
export default HomeDataUpdate;