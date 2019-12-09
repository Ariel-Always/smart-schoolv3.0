import { combineReducers } from 'redux'
import Toggle from './Toggle'
import UIdata from './UIdata'
import HomeDataUpdate from './HomeDataUpdate'
import AppAlert from './AppAlert'
// import HomeData from './'

const Index = combineReducers({
    Toggle,
    UIdata,
    HomeDataUpdate,
    AppAlert

})

export let initialState = {



};
export default Index