import React from 'react'
import { connect } from 'react-redux';
import TeacherCustomActions from '../../../actions/Teacher/TeacherCustomActions';
import { postData, getData } from '../../../../../common/js/fetch'
import CONFIG from '../../../../../common/js/config';
import '../../../../scss/TeacherCustomContent.scss'
import Board  from '@lourenci/react-kanban'

class Website extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: {
                lanes: [
                    {
                        id: 1,
                        title: 'Backlog',
                        cards: [
                            {
                                id: 1,
                                title: 'Add card',
                                description: 'Add capability to add a card in a lane'
                            },
                        ]
                    },
                  {
                        id: 2,
                        title: 'Doing',
                        cards: [
                            {
                                id: 2,
                                title: 'Drag-n-drop support',
                                description: 'Move a card between the lanes'
                            },
                        ]
                    }
                ]
            },
            userMsg: props.LoginUser
        }

    }

    render() {
        return (
        <Board >{this.state.board}</Board>
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