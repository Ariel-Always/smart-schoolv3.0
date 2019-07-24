import React,{Component} from 'react';
class Class extends Component{
    render() {
        return (
            <div className='frame_content_right_side'>
                {this.props.match.params.id}
            </div>
        );
    }
}
export default Class;