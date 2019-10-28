import '@babel/polyfill';

import React,{Component} from 'react';

import ReactDOM from 'react-dom';

import '../common/index.scss';

import * as serviceWorker from '../serviceWorker';

class Index extends Component{

    constructor(props){

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
            }
        }

    }

    render(){

        return (
            <div>{this.state.board}</div>
        )

    }

}





ReactDOM.render(<Index />, document.getElementById('root'));

serviceWorker.register();