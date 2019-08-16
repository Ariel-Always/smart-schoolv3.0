import React,{Component} from 'react';
class Empty extends Component{
    render() {

        return (
            <div>
                {this.props.match.params.id}
            </div>
        );
    }
}
export default Empty;