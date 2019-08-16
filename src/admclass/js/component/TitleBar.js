import React,{Component} from 'react';
class TitleBar extends Component{
    render() {
        const {title} = this.props;
        return (
            <div className="title-bar">
                <div className="title-word">{title}</div>
            </div>
        );
    }
}
export default TitleBar;