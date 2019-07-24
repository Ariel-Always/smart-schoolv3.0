import React,{Component} from 'react';
class Grade extends Component{
    render() {
        return (
            <div className='frame_content_right_side'>
                {this.props.match.params.id}
            </div>
        );
    }
}
export default Grade;