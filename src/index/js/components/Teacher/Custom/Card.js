import React from 'react'

import '../../../../scss/Card.scss'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
//图片加载成功调用
ModuleImgLoad({ GroupID, PNO, CNO }) {

    const { dispatch } = this.props;

    dispatch(ModuleActions.ImgLoad({ GroupID, PNO, CNO }));

}


//图片加载失败调用
ModuleImgErrorLoad({ GroupID, PNO, CNO }) {

    const { dispatch } = this.props;

    dispatch(ModuleActions.ImgErrorLoad({ GroupID, PNO, CNO }));

}

    render() {
        //console.log(this.props.data)
        let data= this.props.data;
        return (
            <div
                ref={this.props.provided.innerRef}
                {...this.props.provided.draggableProps}
                {...this.props.provided.dragHandleProps}
                className='Card'
                style={this.props.style}
            >
                <img
                    className='card-img'
                    width={80} alt={''}
                    src={data.ModuleLogoPath||`${data.Url}/favicon.ico`}
                    onLoad={() => this.ModuleImgLoad({ GroupID: item.GroupID, PNO: i.OrderNo, CNO: it.OrderNo })}
                    onError={() => this.ModuleImgErrorLoad({ GroupID: item.GroupID, PNO: i.OrderNo, CNO: it.OrderNo })}
                    height={80}></img>
                <p className='card-name'>{this.props.data.Name}</p>
            </div>
        )
    }
}
Card.defaultProps = {
    type: 'main',
    custom: 'Website'
}

export default Card;