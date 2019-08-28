import React,{Component} from 'react';

import {HashRouter as Router,NavLink} from 'react-router-dom';

class Modal extends Component{

    render() {

        const {TabLinkList} = this.props;

        return (
            <div className="schedule-change-tab">

                {

                    TabLinkList&&TabLinkList.map((item,key) => {

                        return  <NavLink key={key} className="schedule-change-tab-item" activeClassName="active"  to={item.link} title={item.name}>{item.name}</NavLink>

                    })

                }

            </div>
        );
    }
}
export default Modal;