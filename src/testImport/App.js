import React,{ Component } from 'react';

import {Frame} from '../common';

import Import from '../common/js/Import/ImportPhoto';



class APP extends Component{

    render() {

        const  { props } = this.props;

        return (

            <Frame>

                <div ref="frame-right-content">

                    <Import></Import>

                </div>

            </Frame>

        );

    }

}

export default APP;