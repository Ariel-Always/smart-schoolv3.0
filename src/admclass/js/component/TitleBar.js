import React,{Component} from 'react';
class TitleBar extends Component{
    render() {
        const {title,type} = this.props;
        return (
            <div className={`title-bar ${type}`}>
                <div className="title-word">{title}</div>
            </div>
        );
    }
}
export default TitleBar;