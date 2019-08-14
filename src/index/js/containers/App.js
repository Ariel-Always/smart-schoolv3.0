import React from 'react';
import {
    Frame
} from '../../../common'
import {getData,postData} from '../../../common/js/fetch'
import '../../css/App.scss';

class App extends React.Component{

    handle = (method) => {
        if(method === 'get'){
            getData('https://www.easy-mock.com/mock/5d4e8764c0779262e01c9b28/example/UserArchivesMsgOverView?tip=test',4)
        }else if(method === 'post'){
            postData('https://www.easy-mock.com/mock/5d4e8764c0779262e01c9b28/example/upload',{tip:'test'},4)
        }
    }
    render(){
        return (
            <Frame>
                <span onClick = {this.handle('get')}>post</span>
                <br />
                <span onClick = {this.handle('post')}>get</span>
            </Frame>
        )
    }
}
export default App;