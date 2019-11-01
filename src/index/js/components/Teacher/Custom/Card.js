import React from 'react'
import { Button } from 'antd'
import '../../../../scss/Card.scss'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isTrue: true
        }

    }
    //图片加载成功调用
    ImgLoad(e, imgData) {

        const { dispatch } = this.props;

        // console.log(e,imgData,'true')
    }


    //图片加载失败调用
    ImgErrorLoad(e, imgData) {

        const { dispatch } = this.props;
        this.setState({
            isTrue: false
        })
        // console.log(e,imgData,'false',this.state.isTrue)


    }

    render() {
        //console.log(this.props.data)
        let data = this.props.data;
        let number = Math.random() * 3
        let myColor = number > 2 ? 'blue' : number > 1 ? 'orange' : 'green';
        return (
            <div
                ref={this.props.provided.innerRef}
                {...this.props.provided.draggableProps}
                {...this.props.provided.dragHandleProps}
                className='Card'
                style={this.props.style}
            >
                <div className={`img-box ${data.myColor}`}>
                    {this.state.isTrue ? (<img
                        className='card-img'
                        alt={''}
                        src={data.Img}
                        onLoad={this.ImgLoad.bind(this, data)}
                        onError={this.ImgErrorLoad.bind(this, data)}
                    ></img>) : <span className='inErrorText'>{data.Name ? data.Name.split('')[0] : ''}</span>}
                </div>
                <p className='card-name' title={this.props.data.Name}><i style={{display:this.props.data.IsCreatedByMe?'inline-block':'none'}} className='isSelf'></i><span style={{paddingLeft:this.props.data.IsCreatedByMe?'12px':'0'}}>{this.props.data.Name}</span></p>
                {this.props.type === 'main' ?
                    <span onClick={() => {this.props.onEditClick()}} className='main-btn' >移除</span> :
                    <span onClick={() => {this.props.onAddClick()}} className='alter-btn' >添加至桌面</span>

                }
                {this.props.data.IsCreatedByMe?
                <div  className='handle-box'>
                    <span onClick={() => {this.props.onDeleteClick()}} className='delete'></span>
                    <span onClick={() => {this.props.onResetClick()}} className='reset'></span>
                </div>:''}
            </div>
        )
    }
}
Card.defaultProps = {
    type: 'main',
    custom: 'Website'
}

export default Card;