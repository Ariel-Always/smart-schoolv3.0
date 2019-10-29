import React from 'react'
import { connect } from 'react-redux';
import TeacherCustomActions from '../../../actions/Teacher/TeacherCustomActions';
import { postData, getData } from '../../../../../common/js/fetch'
import CONFIG from '../../../../../common/js/config';
import '../../../../scss/TeacherCustomContent.scss'
import Card from './Card'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {//source为原始出发数据，destination为原始目的地数据，droppableSource为插件出发对象，droppableDestination为插件目的地对象
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);//source去掉失去的

    destClone.splice(droppableDestination.index, 0, removed);//destunation增加等到的

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    width: '126px',
    height: '156px',
    // padding: grid * 2,
    margin: `0 24px 12px 0`,
    border: isDragging ? `solid 1px #02e362` : 'none',
    // change background colour if dragging
    //background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
    //background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
});

class Website extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            main: this.props.Teacher.TeacherCustomData.WebsiteData,
            alter1: this.props.Teacher.TeacherCustomData.WebsiteAlterData,
            userMsg: props.LoginUser
        }
        this.onDragEnd = this.onDragEnd.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        const { Teacher } = nextProps
        this.setState({
            main: Teacher.TeacherCustomData.WebsiteData,
            //main: Teacher.TeacherCustomData.WebsiteAlterData,
            alter1: Teacher.TeacherCustomData.WebsiteAlterData,
        })
    }
    // 从id选择列表
    id2List = {
        main: 'main',
        alter1: 'alter1'
    };
    getList = id => this.state[this.id2List[id]];
    onDragEnd = result => {
        const { source, destination } = result;
        console.log(result)
        //        result:{ combine: null
        // destination: {droppableId: "droppable2", index: 4}
        // draggableId: "item-4"
        // mode: "FLUID"
        // reason: "DROP"
        // source: {index: 6, droppableId: "droppable"}
        // type: "DEFAULT"}
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {//同一个区域
            const main = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { main };

            if (source.droppableId === 'alter1') {
                state = { alter1: main };
            }

            this.setState(state);
        } else {//非同一个区域
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                main: result.main,
                alter1: result.alter1
            });
        }
    };

    render() {
        const { Teacher } = this.props;
        let MainData = Teacher.TeacherCustomData.WebsiteData;
        let AlterData = Teacher.TeacherCustomData.WebsiteAlterData;
        console.log(this.state.main)
        return (
            <div id='Website'>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="main" direction="horizontal">
                        {(provided, snapshot) => {//provided生成的数据，snapshot监听拖拽时的数据变化，snapshot:{draggingFromThisWith: null,draggingOverWith: null,isDraggingOver: false},draggingFromThisWith为拖拽对象的id，draggingOverWith为拖拽对象在该区域的id，isDraggingOver为是否有拖拽事件
                            console.log(provided, snapshot)
                            return (
                                <div className='main-box'>
                                    <p className='main-header'>
                                        已添加至桌面的网站:
                                </p>
                                    <div
                                        ref={provided.innerRef}
                                        className='main-drop'
                                        style={getListStyle(snapshot.isDraggingOver)}
                                        {...provided.droppableProps}
                                    >
                                        {this.state.main.map((item, index) => (
                                            <Draggable key={'main-'+item.ID} draggableId={'main-'+item.ID} index={index}>
                                                {(provided, snapshot) => (
                                                    <Card
                                                        type='main'
                                                        custom='Website'
                                                        data={item}
                                                        ID={'main-'+item.ID}
                                                        provided={provided}
                                                        snapshot={snapshot}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}

                                                    ></Card>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                </div>

                            )
                        }}
                    </Droppable>
                    <Droppable droppableId="alter1" direction="horizontal">
                        {(provided, snapshot) => {
                            return (
                                <div className='alter-box'>
                                    <p className='alter-header'>综合类</p>
                                    <div
                                        className='alter-drop'
                                        ref={provided.innerRef}
                                        style={getListStyle(snapshot.isDraggingOver)}
                                        {...provided.droppableProps}
                                    >
                                        {this.state.alter1.map((item, index) => (
                                            <Draggable key={'alter1-'+item.ID} draggableId={'alter1-'+item.ID} index={index}>
                                                {(provided, snapshot) => (
                                                    <Card
                                                    type='alter'
                                                    custom='Website'
                                                    data={item}

                                                    provided={provided}
                                                    snapshot={snapshot}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}

                                                ></Card>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>

                                </div>
                            )
                        }}
                    </Droppable>
                </DragDropContext>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { LoginUser, Teacher, AppLoading } = state;

    return {

        LoginUser,

        Teacher,

        AppLoading

    }
};
export default connect(mapStateToProps)(Website);