import '../../../sass/tabheader.scss'

import React, { Component } from 'react'
import HomeData from '../../action/HomeData'
import { connect } from 'react-redux';

class Tabheader extends Component {



    //监听列表头的点击事件
    headerChange(id) {
        const { dispatch } = this.props;
        dispatch({
            type: id
        });
        switch (id) {
            // case "website":
            //     // dispatch(HomeData.getResLinkList());
            //     dispatch(HomeData.getLinkData("P1"))
            //     dispatch(HomeData.getPeriodList())
            // break;    
            case "resourceBase":
                    dispatch(HomeData.getResLinkList())
            break;
            case "myResourceBase"  :
                    dispatch(HomeData.getMyResLibList())      
        }

    }


    render() {

        const { tabActive } = this.props;

        const LiList = [
            { id: "website", name: "网站" },
            { id: "resourceBase", name: "资源库" },
            { id: "myResourceBase", name: "我的资料库" },
        ]



        let result = LiList.map((item, key) => {
            return <li key={key} onClick={(e) => this.headerChange(item.id)}>
                <a className={tabActive === item.id ? "active" : ""}>
                    <div className={`tab-icon ${item.id}`}>{item.name}</div>
                </a>

            </li>;
        })

        return (
            <div className="nav">
                <div className="nav-in">
                    <ul>
                        {result}
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    const { Toggle } = state;

    return {

        tabActive: Toggle.tabActive

    }

}

export default connect(mapStateToProps)(Tabheader);