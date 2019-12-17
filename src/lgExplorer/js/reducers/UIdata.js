
import Data from '../action/HomeData'

export default (state = {
    linkArr: [],
    resourceArr: [],
    word: ""


}, action) => {
    switch (action.type) {
        //获取初始网站链接数组
        case Data.LINK_INFORMATION:
            return {
                ...state,
                linkArr: action.data

            }
        //获取初始资源库链接的数组
        case Data.RESOURCE_INFORMATION:

            return {
                ...state,
                resourceArr: action.data
            }
        //返回图片加载失败后更新的网站链接数组
        case Data.LINK_ARRUPDATE:

            return {

                ...state,

                linkArr: action.linkArr

            };
        //返回图片加载失败后更新的资源库链接数组
        case Data.RESOURCE_ARRUPDATE:

            return {
                ...state,
                resourceArr: action.resourceArr

            }
        case Data.WORD_CHANGE:
            return {
                ...state,
                word:action.word

            }

        default:
            return state;
    }
};