import React,{Component} from 'react';

import {HashRouter as Router, NavLink,withRouter} from 'react-router-dom';

class ChangeTab extends Component{

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
export default withRouter(ChangeTab);