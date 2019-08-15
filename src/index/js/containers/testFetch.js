import 'whatwg-fetch';
import { getData, postData } from '../../../common/js/fetch'
import React from 'react'
import { Button } from '../../../common/index'


class Fetch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleGet() {
        getData('https://www.easy-mock.com/mock/5d4e8764c0779262e01c9b28/example/UserArchivesMsgOverView?tips=test').then(res => {
            console.log(res)
        });
    }
    handlePost() {
        postData('https://www.easy-mock.com/mock/5d4e8764c0779262e01c9b28/example/upload',{tips:'test'}).then(res => {
            console.log(res)
        });
    }

    render() {
        return (
            <div>
                <Button style={{margin:20+'px'}} onClick={this.handleGet}>get</Button>
                <Button style={{margin:20+'px'}} onClick={this.handlePost}>post</Button>
            </div>

        )
    }
}

export default Fetch;